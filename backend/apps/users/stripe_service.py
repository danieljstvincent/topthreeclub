import stripe
from django.conf import settings
from django.utils import timezone
from datetime import datetime
from .models import User, Subscription

stripe.api_key = settings.STRIPE_SECRET_KEY


def get_or_create_stripe_customer(user: User) -> str:
    """Get or create a Stripe customer for the user."""
    subscription, created = Subscription.objects.get_or_create(
        user=user,
        defaults={'tier': Subscription.Tier.FREE}
    )

    if subscription.stripe_customer_id:
        return subscription.stripe_customer_id

    customer = stripe.Customer.create(
        email=user.email,
        name=user.get_full_name() or user.username,
        metadata={'user_id': user.id}
    )

    subscription.stripe_customer_id = customer.id
    subscription.save()

    return customer.id


def create_checkout_session(user: User, billing_interval: str, success_url: str, cancel_url: str) -> str:
    """Create a Stripe Checkout session for subscription."""
    customer_id = get_or_create_stripe_customer(user)

    if billing_interval == 'yearly':
        price_id = settings.STRIPE_PREMIUM_YEARLY_PRICE_ID
    else:
        price_id = settings.STRIPE_PREMIUM_MONTHLY_PRICE_ID

    session = stripe.checkout.Session.create(
        customer=customer_id,
        payment_method_types=['card'],
        line_items=[{
            'price': price_id,
            'quantity': 1,
        }],
        mode='subscription',
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={'user_id': user.id}
    )

    return session.url


def cancel_subscription(user: User) -> bool:
    """Cancel a user's subscription."""
    try:
        subscription = Subscription.objects.get(user=user)
        if subscription.stripe_subscription_id:
            stripe.Subscription.delete(subscription.stripe_subscription_id)
            subscription.tier = Subscription.Tier.FREE
            subscription.status = Subscription.Status.CANCELED
            subscription.stripe_subscription_id = None
            subscription.save()
            return True
    except Subscription.DoesNotExist:
        pass
    return False


def handle_webhook_event(payload: bytes, sig_header: str):
    """Handle Stripe webhook events."""
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise ValueError("Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise ValueError("Invalid signature")

    event_type = event['type']
    data = event['data']['object']

    if event_type == 'checkout.session.completed':
        handle_checkout_completed(data)
    elif event_type == 'customer.subscription.updated':
        handle_subscription_updated(data)
    elif event_type == 'customer.subscription.deleted':
        handle_subscription_deleted(data)

    return event_type


def handle_checkout_completed(session):
    """Handle successful checkout."""
    customer_id = session.get('customer')
    subscription_id = session.get('subscription')

    try:
        subscription = Subscription.objects.get(stripe_customer_id=customer_id)
        subscription.stripe_subscription_id = subscription_id
        subscription.tier = Subscription.Tier.PREMIUM
        subscription.status = Subscription.Status.ACTIVE

        # Get subscription details from Stripe
        stripe_sub = stripe.Subscription.retrieve(subscription_id)
        subscription.current_period_start = timezone.make_aware(
            datetime.fromtimestamp(stripe_sub.current_period_start)
        )
        subscription.current_period_end = timezone.make_aware(
            datetime.fromtimestamp(stripe_sub.current_period_end)
        )

        # Determine billing interval from the price
        price = stripe_sub['items']['data'][0]['price']
        if price['recurring']['interval'] == 'year':
            subscription.billing_interval = Subscription.BillingInterval.YEARLY
        else:
            subscription.billing_interval = Subscription.BillingInterval.MONTHLY

        subscription.save()
    except Subscription.DoesNotExist:
        pass


def handle_subscription_updated(stripe_subscription):
    """Handle subscription updates."""
    try:
        subscription = Subscription.objects.get(
            stripe_subscription_id=stripe_subscription['id']
        )

        status_map = {
            'active': Subscription.Status.ACTIVE,
            'past_due': Subscription.Status.PAST_DUE,
            'canceled': Subscription.Status.CANCELED,
            'incomplete': Subscription.Status.INCOMPLETE,
        }

        subscription.status = status_map.get(
            stripe_subscription['status'],
            Subscription.Status.ACTIVE
        )
        subscription.current_period_start = timezone.make_aware(
            datetime.fromtimestamp(stripe_subscription['current_period_start'])
        )
        subscription.current_period_end = timezone.make_aware(
            datetime.fromtimestamp(stripe_subscription['current_period_end'])
        )
        subscription.save()
    except Subscription.DoesNotExist:
        pass


def handle_subscription_deleted(stripe_subscription):
    """Handle subscription cancellation."""
    try:
        subscription = Subscription.objects.get(
            stripe_subscription_id=stripe_subscription['id']
        )
        subscription.tier = Subscription.Tier.FREE
        subscription.status = Subscription.Status.CANCELED
        subscription.stripe_subscription_id = None
        subscription.save()
    except Subscription.DoesNotExist:
        pass






