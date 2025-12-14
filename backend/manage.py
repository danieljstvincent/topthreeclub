#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path

try:
    # Optional: load .env files for local development
    from dotenv import load_dotenv
except Exception:
    load_dotenv = None


def main():
    """Run administrative tasks."""
    # Load environment files from the backend directory if python-dotenv is available
    if load_dotenv is not None:
        base_dir = Path(__file__).resolve().parent
        dotenv_path = base_dir / '.env'
        dotenv_local_path = base_dir / '.env.local'
        # Load .env first, then override with .env.local if present
        try:
            load_dotenv(dotenv_path)
        except Exception:
            pass
        try:
            load_dotenv(dotenv_local_path, override=True)
        except Exception:
            pass

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
