import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/auth/LoginForm';

// Mock the API client
vi.mock('../../lib/api', () => ({
  apiClient: {
    login: vi.fn(),
    getSocialAuthUrls: vi.fn(),
  },
}));

import { apiClient } from '../../lib/api';

describe('LoginForm', () => {
  const mockOnSuccess = vi.fn();
  const mockOnSwitchToRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (apiClient.getSocialAuthUrls as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: {
        google: 'http://localhost:8000/accounts/google/login/',
        facebook: 'http://localhost:8000/accounts/facebook/login/',
      },
    });
  });

  it('renders login form correctly', () => {
    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('calls onSuccess when login is successful', async () => {
    const user = userEvent.setup();
    (apiClient.login as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { user: { id: 1, username: 'testuser' } },
    });

    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );

    await user.type(screen.getByPlaceholderText('Username'), 'testuser');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message when login fails', async () => {
    const user = userEvent.setup();
    (apiClient.login as ReturnType<typeof vi.fn>).mockResolvedValue({
      error: 'Invalid credentials',
    });

    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );

    await user.type(screen.getByPlaceholderText('Username'), 'testuser');
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSwitchToRegister when switch link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );

    const switchLink = screen.getByRole('button', { name: /register/i });
    await user.click(switchLink);

    expect(mockOnSwitchToRegister).toHaveBeenCalled();
  });
});

