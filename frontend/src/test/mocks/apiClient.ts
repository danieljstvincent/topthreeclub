import { vi } from 'vitest';

// Mock API client for testing
export const mockApiClient = {
  login: vi.fn(),
  register: vi.fn(),
  getCurrentUser: vi.fn(),
  getSocialAuthUrls: vi.fn(),
  logout: vi.fn(),
};

// Re-export for convenience
export default mockApiClient;

