// API client for making requests to the backend
// In production: use same domain (Vercel proxies /api/* to Django backend via vercel.json)
// In development: call Django directly on localhost
const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
  ? '' // Use same domain in production (relative URLs)
  : 'http://localhost:8000'; // Local development

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface BrainDumpIdea {
  id: number;
  text: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
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
        // Handle different error formats
        let errorMessage = errorData.error || errorData.detail;
        
        // If there are field-specific errors, format them nicely
        if (errorData.errors && typeof errorData.errors === 'object') {
          const fieldErrors = Object.entries(errorData.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMessage = fieldErrors || errorMessage;
        }
        
        // If errorData is a string or array, use it directly
        if (!errorMessage && typeof errorData === 'string') {
          errorMessage = errorData;
        }
        
        // Fallback to status code
        if (!errorMessage) {
          errorMessage = `HTTP ${response.status}`;
        }
        
        return {
          error: errorMessage,
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

  async deleteAccount(
    password: string,
    confirmation: string
  ): Promise<ApiResponse<any>> {
    return this.request('/api/users/account/delete/', {
      method: 'POST',
      body: JSON.stringify({ password, confirmation }),
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

  async lockChoices(): Promise<ApiResponse<any>> {
    return this.request('/api/users/quests/lock-choices/', {
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

  // Brain Dump API methods
  async getBrainDumpIdeas(showArchived = false): Promise<ApiResponse<BrainDumpIdea[]>> {
    const queryParam = showArchived ? '?archived=true' : '';
    return this.request(`/api/users/brain-dump/${queryParam}`);
  }

  async createBrainDumpIdea(text: string): Promise<ApiResponse<BrainDumpIdea>> {
    return this.request('/api/users/brain-dump/', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async updateBrainDumpIdea(
    id: number,
    data: Partial<BrainDumpIdea>
  ): Promise<ApiResponse<BrainDumpIdea>> {
    return this.request(`/api/users/brain-dump/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteBrainDumpIdea(id: number): Promise<ApiResponse<void>> {
    return this.request(`/api/users/brain-dump/${id}/`, {
      method: 'DELETE',
    });
  }

  async getArchivedIdeas(): Promise<ApiResponse<BrainDumpIdea[]>> {
    return this.request('/api/users/brain-dump/archived/');
  }

  // Password reset methods
  async requestPasswordReset(emailOrUsername: string): Promise<ApiResponse<any>> {
    const isEmail = emailOrUsername.includes('@');
    const body: { email?: string; username?: string } = {};
    
    if (isEmail) {
      body.email = emailOrUsername;
    } else {
      body.username = emailOrUsername;
    }
    
    return this.request('/api/users/password-reset/', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async confirmPasswordReset(
    uid: string,
    token: string,
    password: string,
    password2: string
  ): Promise<ApiResponse<any>> {
    return this.request('/api/users/password-reset-confirm/', {
      method: 'POST',
      body: JSON.stringify({ uid, token, password, password2 }),
    });
  }
}

export const apiClient = new ApiClient();

