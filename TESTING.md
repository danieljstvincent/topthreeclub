# Testing Guide

This project includes both TypeScript (Vitest) and Python (pytest) test suites.

## TypeScript Tests (Vitest)

### Setup

Install dependencies:
```bash
cd frontend
npm install
```

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Test Structure

- `src/test/setup.ts` - Test setup and global mocks
- `src/test/utils.test.ts` - Utility function tests
- `src/test/components/` - Component tests
- `src/test/hooks/` - React hook tests
- `src/test/mocks/` - Mock implementations

### Writing Tests

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Python Tests (pytest)

### Setup

Install dependencies:
```bash
cd backend
pip install -r requirements/development.txt
```

### Running Tests

Run all tests:
```bash
pytest
```

Run tests for a specific app:
```bash
pytest apps/users/
```

Run tests with coverage:
```bash
pytest --cov=apps --cov-report=html
```

Run tests in verbose mode:
```bash
pytest -v
```

Run specific test file:
```bash
pytest apps/users/tests.py
```

Run specific test:
```bash
pytest apps/users/tests.py::TestUserRegistration::test_register_success
```

### Test Structure

- `backend/conftest.py` - Pytest configuration and shared fixtures
- `backend/pytest.ini` - Pytest settings
- `backend/apps/*/tests.py` - Test files for each app
- `backend/config/settings/testing.py` - Test-specific Django settings

### Writing Tests

Example test structure:
```python
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

@pytest.mark.django_db
class TestUserRegistration:
    def test_register_success(self, api_client):
        # Your test code here
        pass
```

### Test Markers

- `@pytest.mark.unit` - Unit tests
- `@pytest.mark.integration` - Integration tests
- `@pytest.mark.slow` - Slow tests (skip with `-m "not slow"`)

### Fixtures

Available fixtures:
- `api_client` - Unauthenticated API client
- `user` - Test user instance
- `authenticated_client` - Authenticated API client

## Continuous Integration

Both test suites can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run TypeScript tests
  run: |
    cd frontend
    npm install
    npm test

- name: Run Python tests
  run: |
    cd backend
    pip install -r requirements/development.txt
    pytest
```



