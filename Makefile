.PHONY: help frontend-dev frontend-build frontend-install backend-dev backend-migrate backend-test

help:
	@echo "Available commands:"
	@echo "  make frontend-dev      - Start Next.js development server"
	@echo "  make frontend-build    - Build Next.js for production"
	@echo "  make frontend-install  - Install frontend dependencies"
	@echo "  make backend-dev       - Start Django development server"
	@echo "  make backend-migrate    - Run Django migrations"
	@echo "  make backend-test      - Run backend tests"

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

frontend-install:
	cd frontend && npm install

backend-dev:
	cd backend && python manage.py runserver

backend-migrate:
	cd backend && python manage.py migrate

backend-test:
	cd backend && pytest





