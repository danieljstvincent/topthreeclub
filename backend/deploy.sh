#!/bin/bash
# Deployment script for Top Three Club Backend
# This script should be run during deployment to configure the application

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Run database migrations
echo "📦 Running database migrations..."
python manage.py migrate --noinput

# Configure OAuth social apps from environment variables
echo "🔐 Configuring OAuth providers..."
python manage.py configure_socialapps

# Collect static files for production
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Deployment complete!"
