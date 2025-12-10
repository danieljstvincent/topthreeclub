// API client for making requests to the backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.error || errorData.detail || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async login(username: string, password: string): Promise<ApiResponse<any>> {
    return this.request('/api/users/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(
    username: string,
    email: string,
    password: string,
    password2: string
  ): Promise<ApiResponse<any>> {
    return this.request('/api/users/register/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, password2 }),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.request('/api/users/me/');
  }

  async logout(): Promise<ApiResponse<any>> {
    return this.request('/api/users/logout/', {
      method: 'POST',
    });
  }

  async getSocialAuthUrls(): Promise<ApiResponse<{ google?: string; facebook?: string }>> {
    return this.request('/api/users/social-auth-urls/');
  }

  async getTodayQuest(): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/today/');
  }

  async saveTodayQuest(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/today/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitQuest(): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/submit/', {
      method: 'POST',
    });
  }

  async getQuestHistory(): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/history/');
  }

  async getQuestStats(): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/stats/');
  }

  async bulkSyncQuests(data: any[]): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/bulk-sync/', {
      method: 'POST',
      body: JSON.stringify({ quests: data }),
    });
  }
}

export const apiClient = new ApiClient();

