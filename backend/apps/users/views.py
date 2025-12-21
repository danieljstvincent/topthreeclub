import os
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.contrib.auth import login, logout
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.utils import timezone
from django.db import transaction
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from datetime import date, timedelta, datetime
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google.views import oauth2_login
# from allauth.socialaccount.providers.facebook.views import oauth2_login as fb_oauth2_login  # Facebook login disabled
from .models import User, QuestProgress, Subscription
from .serializers import UserSerializer, LoginSerializer, QuestProgressSerializer
from . import stripe_service


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def register_view(request):
    """Register a new user"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        # Create a serializer instance without password fields for response
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_joined': user.date_joined.isoformat() if user.date_joined else None,
        }
        return Response({
            'user': user_data,
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)
    # Format errors for better frontend display
    errors = {}
    for field, error_list in serializer.errors.items():
        if isinstance(error_list, list):
            errors[field] = error_list[0] if error_list else 'Invalid value'
        else:
            errors[field] = str(error_list)
    return Response({
        'error': 'Registration failed',
        'errors': errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def login_view(request):
    """Login user"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    # Security: Don't reveal whether username exists or not
    # Return generic error message to prevent user enumeration
    return Response({
        'error': 'Invalid credentials'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user"""
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    """Get current authenticated user"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def social_auth_urls_view(request):
    """Get social authentication URLs"""
    try:
        from django.contrib.sites.models import Site
        
        base_url = None
        DEBUG = settings.DEBUG
        
        # Use request to build URL (most reliable - uses actual request domain)
        if request and request.get_host():
            scheme = request.scheme
            host = request.get_host()
            # Only use request host if it's not localhost (for production)
            if 'localhost' not in host and '127.0.0.1' not in host:
                base_url = f"{scheme}://{host}"
            else:
                # If localhost, try Site model or env var
                try:
                    site = Site.objects.get_current()
                    if site.domain and 'localhost' not in site.domain and '127.0.0.1' not in site.domain:
                        if site.domain.startswith('http'):
                            base_url = site.domain
                        else:
                            scheme = 'https' if not DEBUG else 'http'
                            base_url = f"{scheme}://{site.domain}"
                    else:
                        # Site is localhost, try env var or use request host
                        base_url = os.environ.get('BACKEND_URL', f"{scheme}://{host}")
                except:
                    base_url = os.environ.get('BACKEND_URL', f"{scheme}://{host}")
        else:
            # No request, try Site model or env var, fallback to localhost
            try:
                site = Site.objects.get_current()
                if site.domain and 'localhost' not in site.domain and '127.0.0.1' not in site.domain:
                    if site.domain.startswith('http'):
                        base_url = site.domain
                    else:
                        scheme = 'https' if not DEBUG else 'http'
                        base_url = f"{scheme}://{site.domain}"
                else:
                    base_url = os.environ.get('BACKEND_URL', 'http://localhost:8000')
            except:
                base_url = os.environ.get('BACKEND_URL', 'http://localhost:8000')
        
        return Response({
            'google': f"{base_url}/accounts/google/login/",
            # 'facebook': f"{base_url}/accounts/facebook/login/",  # Facebook login disabled
        })
    except Exception as e:
        # Fallback to localhost if everything fails
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"Failed to generate social auth URLs: {e}, using localhost fallback")
        base_url = os.environ.get('BACKEND_URL', 'http://localhost:8000')
        return Response({
            'google': f"{base_url}/accounts/google/login/",
            # 'facebook': f"{base_url}/accounts/facebook/login/",  # Facebook login disabled
        })


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def quest_progress_view(request):
    """Get or update quest progress for today"""
    today = date.today()
    
    if request.method == 'GET':
        # Get today's progress
        try:
            progress = QuestProgress.objects.get(user=request.user, date=today)
            serializer = QuestProgressSerializer(progress)
            return Response(serializer.data)
        except QuestProgress.DoesNotExist:
            # Return default empty progress
            return Response({
                'date': today.isoformat(),
                'quest_1_text': '',
                'quest_2_text': '',
                'quest_3_text': '',
                'quest_1_completed': False,
                'quest_2_completed': False,
                'quest_3_completed': False,
                'submitted': False,
            })
    
    elif request.method == 'POST' or request.method == 'PUT':
        # Create or update today's progress
        data = request.data.copy()
        data['date'] = today.isoformat()
        
        progress, created = QuestProgress.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={
                'quest_1_text': data.get('quest_1_text', ''),
                'quest_2_text': data.get('quest_2_text', ''),
                'quest_3_text': data.get('quest_3_text', ''),
                'quest_1_completed': data.get('quest_1_completed', False),
                'quest_2_completed': data.get('quest_2_completed', False),
                'quest_3_completed': data.get('quest_3_completed', False),
            }
        )
        
        if not created:
            # Update existing progress (but don't allow resubmission if already submitted)
            if not progress.submitted:
                progress.quest_1_text = data.get('quest_1_text', progress.quest_1_text)
                progress.quest_2_text = data.get('quest_2_text', progress.quest_2_text)
                progress.quest_3_text = data.get('quest_3_text', progress.quest_3_text)
                progress.quest_1_completed = data.get('quest_1_completed', progress.quest_1_completed)
                progress.quest_2_completed = data.get('quest_2_completed', progress.quest_2_completed)
                progress.quest_3_completed = data.get('quest_3_completed', progress.quest_3_completed)
                progress.save()
        
        serializer = QuestProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quest_view(request):
    """Submit today's quest progress (one submission per day)"""
    today = date.today()
    
    try:
        progress = QuestProgress.objects.get(user=request.user, date=today)
        
        # Check if already submitted
        if progress.submitted:
            return Response({
                'error': 'You have already submitted today',
                'submitted': True,
                'submitted_at': progress.submitted_at.isoformat() if progress.submitted_at else None
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark as submitted
        from django.utils import timezone
        progress.submitted = True
        progress.submitted_at = timezone.now()
        progress.save()
        
        serializer = QuestProgressSerializer(progress)
        return Response({
            'message': 'Successfully submitted!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
        
    except QuestProgress.DoesNotExist:
        return Response({
            'error': 'No quest progress found for today'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def lock_choices_view(request):
    """Lock in quest choices for today"""
    from django.utils import timezone

    today = date.today()

    try:
        progress = QuestProgress.objects.get(user=request.user, date=today)

        # Validate all 3 quests have text
        if not all([
            progress.quest_1_text.strip(),
            progress.quest_2_text.strip(),
            progress.quest_3_text.strip()
        ]):
            return Response({
                'error': 'All 3 quests must have text before locking'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Lock the choices
        progress.choices_locked = True
        progress.choices_locked_at = timezone.now()
        progress.save()

        serializer = QuestProgressSerializer(progress)
        return Response({
            'message': 'Choices locked successfully!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    except QuestProgress.DoesNotExist:
        return Response({
            'error': 'No quest progress found for today'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account_view(request):
    """
    Delete user account and all associated data.
    Requires password verification for security.
    """
    password = request.data.get('password')
    confirmation = request.data.get('confirmation')

    # Validate input
    if not password:
        return Response({
            'error': 'Password is required'
        }, status=status.HTTP_400_BAD_REQUEST)

    if confirmation != 'DELETE MY ACCOUNT':
        return Response({
            'error': 'Please type "DELETE MY ACCOUNT" to confirm'
        }, status=status.HTTP_400_BAD_REQUEST)

    # Verify password
    user = request.user
    if not user.check_password(password):
        return Response({
            'error': 'Incorrect password'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Use atomic transaction to ensure all-or-nothing deletion
        with transaction.atomic():
            # Logout before deletion
            logout(request)

            # Delete user (CASCADE will delete QuestProgress automatically)
            user.delete()

        return Response({
            'message': 'Account successfully deleted'
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'error': 'Failed to delete account. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quest_history_view(request):
    """Get quest progress history for heatmap"""
    progress_list = QuestProgress.objects.filter(user=request.user).order_by('date')
    serializer = QuestProgressSerializer(progress_list, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def quest_bulk_sync_view(request):
    """Bulk sync quest progress from client"""
    data_list = request.data if isinstance(request.data, list) else [request.data]
    
    synced_count = 0
    for item in data_list:
        try:
            date_str = item.get('date')
            if not date_str:
                continue
                
            progress_date = date.fromisoformat(date_str) if isinstance(date_str, str) else date_str
            
            progress, created = QuestProgress.objects.get_or_create(
                user=request.user,
                date=progress_date,
                defaults={
                    'quest_1_text': item.get('quest_1_text', ''),
                    'quest_2_text': item.get('quest_2_text', ''),
                    'quest_3_text': item.get('quest_3_text', ''),
                    'quest_1_completed': item.get('quest_1_completed', False),
                    'quest_2_completed': item.get('quest_2_completed', False),
                    'quest_3_completed': item.get('quest_3_completed', False),
                }
            )
            
            if not created:
                # Update existing
                progress.quest_1_text = item.get('quest_1_text', progress.quest_1_text)
                progress.quest_2_text = item.get('quest_2_text', progress.quest_2_text)
                progress.quest_3_text = item.get('quest_3_text', progress.quest_3_text)
                progress.quest_1_completed = item.get('quest_1_completed', progress.quest_1_completed)
                progress.quest_2_completed = item.get('quest_2_completed', progress.quest_2_completed)
                progress.quest_3_completed = item.get('quest_3_completed', progress.quest_3_completed)
                progress.save()
            
            synced_count += 1
        except Exception as e:
            continue
    
    return Response({
        'synced_count': synced_count,
        'message': f'Successfully synced {synced_count} days'
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quest_stats_view(request):
    """Get user statistics (streak, total XP, momentum hours)"""
    progress_list = list(QuestProgress.objects.filter(user=request.user).order_by('-date'))
    
    total_xp = 0
    streak = 0
    today = timezone.localdate()
    
    # Create a map for quick lookup
    progress_map = {progress.date: progress for progress in progress_list}
    
    for progress in progress_list:
        completed_count = sum([
            progress.quest_1_completed,
            progress.quest_2_completed,
            progress.quest_3_completed
        ])
        total_xp += completed_count
    
    # Calculate streak (consecutive days with all 3 quests completed)
    for i in range(365):  # Check up to a year
        check_date = date.fromordinal(today.toordinal() - i)
        progress = progress_map.get(check_date)
        
        if progress:
            if (progress.quest_1_completed and 
                progress.quest_2_completed and 
                progress.quest_3_completed):
                streak += 1
            else:
                break
        else:
            # If no progress for this day, streak is broken
            break
    
    # Calculate hours of consistency based on current streak
    momentum_hours = 0
    if streak > 0:
        # Start counting from the beginning of the streak (midnight of first day)
        streak_start_date = today - timedelta(days=streak - 1)
        start_datetime = datetime.combine(streak_start_date, datetime.min.time())
        
        # Ensure timezone awareness matches the current time
        if timezone.is_naive(start_datetime):
            start_datetime = timezone.make_aware(start_datetime, timezone.get_default_timezone())
        
        now = timezone.now()
        momentum_hours = int((now - start_datetime).total_seconds() // 3600)
    
    return Response({
        'streak': streak,
        'total_xp': total_xp,
        'momentum_hours': momentum_hours,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def password_reset_request_view(request):
    """Request password reset - sends email with reset link"""
    email = request.data.get('email')
    username = request.data.get('username')
    
    if not email and not username:
        return Response({
            'error': 'Email or username is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Find user by email or username
    try:
        if email:
            user = User.objects.get(email=email)
        else:
            user = User.objects.get(username=username)
    except User.DoesNotExist:
        # Don't reveal if user exists (security best practice)
        return Response({
            'message': 'If an account exists with that email/username, a password reset link has been sent.'
        }, status=status.HTTP_200_OK)
    
    # Generate password reset token
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    
    # Build reset URL
    # Use settings.FRONTEND_URL if available, otherwise fallback to env var
    frontend_url = getattr(settings, 'FRONTEND_URL', None) or os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    reset_url = f"{frontend_url}/reset-password?uid={uid}&token={token}"
    
    # Send email (in production, configure email backend)
    try:
        subject = 'Reset your Top Three Club password'
        message = f"""
Hello {user.username},

You requested to reset your password for Top Three Club.

Click the link below to reset your password:
{reset_url}

This link will expire in 24 hours.

If you didn't request this, please ignore this email.

Best regards,
Top Three Club Team
"""
        if user.email:
            send_mail(
                subject,
                message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
    except Exception as e:
        # Log error but don't reveal to user
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Failed to send password reset email: {e}")
    
    # Always return success message (don't reveal if user exists)
    return Response({
        'message': 'If an account exists with that email/username, a password reset link has been sent.'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def password_reset_confirm_view(request):
    """Confirm password reset with token"""
    uid = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if not all([uid, token, new_password, password2]):
        return Response({
            'error': 'All fields are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if new_password != password2:
        return Response({
            'error': 'Passwords do not match'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Validate password strength
    from django.contrib.auth.password_validation import validate_password
    try:
        validate_password(new_password)
    except Exception as e:
        return Response({
            'error': '; '.join(e.messages) if hasattr(e, 'messages') else 'Password does not meet requirements'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Decode user ID
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({
            'error': 'Invalid reset link'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Verify token
    if not default_token_generator.check_token(user, token):
        return Response({
            'error': 'Invalid or expired reset link'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Reset password
    user.set_password(new_password)
    user.save()
    
    return Response({
        'message': 'Password has been reset successfully. You can now login with your new password.'
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subscription_status_view(request):
    """Get current subscription status"""
    try:
        subscription = Subscription.objects.get(user=request.user)
        return Response({
            'tier': subscription.tier,
            'billing_interval': subscription.billing_interval,
            'status': subscription.status,
            'is_premium': subscription.is_premium,
            'current_period_end': subscription.current_period_end.isoformat() if subscription.current_period_end else None,
        })
    except Subscription.DoesNotExist:
        return Response({
            'tier': 'free',
            'billing_interval': None,
            'status': 'active',
            'is_premium': False,
            'current_period_end': None,
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_view(request):
    """Create Stripe checkout session for subscription"""
    billing_interval = request.data.get('billing_interval', 'monthly')
    frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    success_url = f"{frontend_url}/settings?subscription=success"
    cancel_url = f"{frontend_url}/pricing"

    try:
        checkout_url = stripe_service.create_checkout_session(
            user=request.user,
            billing_interval=billing_interval,
            success_url=success_url,
            cancel_url=cancel_url
        )
        return Response({'checkout_url': checkout_url})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_subscription_view(request):
    """Cancel user subscription"""
    success = stripe_service.cancel_subscription(request.user)
    if success:
        return Response({'message': 'Subscription cancelled successfully'})
    return Response({'error': 'No active subscription found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def stripe_webhook_view(request):
    """Handle Stripe webhook events"""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE', '')

    try:
        event_type = stripe_service.handle_webhook_event(payload, sig_header)
        return Response({'status': 'success', 'event': event_type})
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

