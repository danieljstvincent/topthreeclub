"""
Django management command to configure Social Apps for OAuth providers.

This command automatically creates or updates SocialApp entries in the database
based on environment variables. It's designed to be run during deployment to
ensure OAuth providers are properly configured without manual admin intervention.

Usage:
    python manage.py configure_socialapps
    python manage.py configure_socialapps --skip-google  # Skip Google configuration
    python manage.py configure_socialapps --skip-facebook  # Skip Facebook configuration
"""

import os
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp


class Command(BaseCommand):
    help = 'Configure Social Apps for OAuth providers from environment variables'

    def add_arguments(self, parser):
        parser.add_argument(
            '--skip-google',
            action='store_true',
            help='Skip Google OAuth configuration',
        )
        parser.add_argument(
            '--skip-facebook',
            action='store_true',
            help='Skip Facebook OAuth configuration',
        )
        parser.add_argument(
            '--site-id',
            type=int,
            default=1,
            help='Site ID to associate with social apps (default: 1)',
        )

    def handle(self, *args, **options):
        site_id = options['site_id']

        try:
            site = Site.objects.get(pk=site_id)
        except Site.DoesNotExist:
            raise CommandError(f'Site with ID {site_id} does not exist')

        self.stdout.write(self.style.NOTICE(f'Configuring social apps for site: {site.domain}'))
        self.stdout.write('')

        configured_count = 0

        # Configure Google OAuth
        if not options['skip_google']:
            if self._configure_google(site):
                configured_count += 1

        # Configure Facebook OAuth
        if not options['skip_facebook']:
            if self._configure_facebook(site):
                configured_count += 1

        self.stdout.write('')
        if configured_count > 0:
            self.stdout.write(self.style.SUCCESS(
                f'✓ Successfully configured {configured_count} social app(s)'
            ))
        else:
            self.stdout.write(self.style.WARNING(
                '⚠ No social apps were configured. Check your environment variables.'
            ))

    def _configure_google(self, site):
        """Configure Google OAuth from environment variables."""
        client_id = os.environ.get('GOOGLE_CLIENT_ID', '').strip()
        secret = os.environ.get('GOOGLE_CLIENT_SECRET', '').strip()

        if not client_id or not secret:
            self.stdout.write(self.style.WARNING(
                '⚠ Google OAuth: Skipping (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set)'
            ))
            return False

        try:
            social_app, created = SocialApp.objects.get_or_create(
                provider='google',
                defaults={
                    'name': 'Google',
                    'client_id': client_id,
                    'secret': secret,
                }
            )

            if not created:
                # Update existing app
                updated = False
                if social_app.client_id != client_id:
                    social_app.client_id = client_id
                    updated = True
                if social_app.secret != secret:
                    social_app.secret = secret
                    updated = True
                if social_app.name != 'Google':
                    social_app.name = 'Google'
                    updated = True

                if updated:
                    social_app.save()
                    self.stdout.write(self.style.SUCCESS(
                        f'✓ Google OAuth: Updated (ID: {social_app.id})'
                    ))
                else:
                    self.stdout.write(self.style.SUCCESS(
                        f'✓ Google OAuth: Already configured (ID: {social_app.id})'
                    ))
            else:
                self.stdout.write(self.style.SUCCESS(
                    f'✓ Google OAuth: Created (ID: {social_app.id})'
                ))

            # Add to site if not already added
            if site not in social_app.sites.all():
                social_app.sites.add(site)
                self.stdout.write(self.style.NOTICE(
                    f'  → Linked to site: {site.domain}'
                ))

            # Display configuration (masked)
            self.stdout.write(self.style.NOTICE(
                f'  → Client ID: {client_id[:20]}...'
            ))

            return True

        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'✗ Google OAuth: Failed to configure - {str(e)}'
            ))
            return False

    def _configure_facebook(self, site):
        """Configure Facebook OAuth from environment variables."""
        client_id = os.environ.get('FACEBOOK_APP_ID', '').strip()
        secret = os.environ.get('FACEBOOK_APP_SECRET', '').strip()

        if not client_id or not secret:
            self.stdout.write(self.style.WARNING(
                '⚠ Facebook OAuth: Skipping (FACEBOOK_APP_ID or FACEBOOK_APP_SECRET not set)'
            ))
            return False

        try:
            social_app, created = SocialApp.objects.get_or_create(
                provider='facebook',
                defaults={
                    'name': 'Facebook',
                    'client_id': client_id,
                    'secret': secret,
                }
            )

            if not created:
                # Update existing app
                updated = False
                if social_app.client_id != client_id:
                    social_app.client_id = client_id
                    updated = True
                if social_app.secret != secret:
                    social_app.secret = secret
                    updated = True
                if social_app.name != 'Facebook':
                    social_app.name = 'Facebook'
                    updated = True

                if updated:
                    social_app.save()
                    self.stdout.write(self.style.SUCCESS(
                        f'✓ Facebook OAuth: Updated (ID: {social_app.id})'
                    ))
                else:
                    self.stdout.write(self.style.SUCCESS(
                        f'✓ Facebook OAuth: Already configured (ID: {social_app.id})'
                    ))
            else:
                self.stdout.write(self.style.SUCCESS(
                    f'✓ Facebook OAuth: Created (ID: {social_app.id})'
                ))

            # Add to site if not already added
            if site not in social_app.sites.all():
                social_app.sites.add(site)
                self.stdout.write(self.style.NOTICE(
                    f'  → Linked to site: {site.domain}'
                ))

            # Display configuration (masked)
            self.stdout.write(self.style.NOTICE(
                f'  → App ID: {client_id[:10]}...'
            ))

            return True

        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'✗ Facebook OAuth: Failed to configure - {str(e)}'
            ))
            return False
