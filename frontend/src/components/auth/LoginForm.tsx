import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialUrls, setSocialUrls] = useState<{ google?: string; facebook?: string }>({});

  useEffect(() => {
    // Get social auth URLs
    apiClient.getSocialAuthUrls().then(result => {
      if (result.data) {
        setSocialUrls(result.data);
      } else {
        // If API fails, still try to show buttons with default URLs
        // This allows social login to work even if the endpoint has issues
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        setSocialUrls({
          google: `${baseUrl}/accounts/google/login/`,
          facebook: `${baseUrl}/accounts/facebook/login/`,
        });
      }
    }).catch(error => {
      // On error, still provide default URLs
      console.error('Failed to fetch social auth URLs:', error);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      setSocialUrls({
        google: `${baseUrl}/accounts/google/login/`,
        facebook: `${baseUrl}/accounts/facebook/login/`,
      });
    });
  }, []);

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    const url = socialUrls[provider];
    if (url) {
      // Open in same window for OAuth flow
      // After OAuth, user will be redirected back and we can check auth status
      window.location.href = url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await apiClient.login(username, password);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-10 sm:px-6 sm:py-12">
      <h2 className="mb-6 text-2xl font-medium text-gray-900">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input w-full"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all ${
            loading
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:bg-gray-800 active:scale-[0.98]'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6">
        <div className="flex items-center mb-4 gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={!socialUrls.google}
            className={`w-full py-3 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg transition-all flex items-center justify-center gap-2 ${
              socialUrls.google
                ? 'hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" className="flex-shrink-0">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.965-2.184l-2.908-2.258c-.806.54-1.837.86-3.057.86-2.35 0-4.34-1.587-5.053-3.72H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.947 10.698c-.18-.54-.282-1.117-.282-1.698s.102-1.158.282-1.698V4.97H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.03l3.99-3.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.97L3.947 7.302C4.66 5.167 6.65 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            disabled={!socialUrls.facebook}
            className={`w-full py-3 px-4 text-sm font-medium text-white bg-[#1877F2] rounded-lg transition-all flex items-center justify-center gap-2 ${
              socialUrls.facebook
                ? 'hover:bg-[#166FE5] active:scale-[0.98]'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          className="bg-transparent border-none text-gray-900 underline cursor-pointer p-0 hover:text-gray-700"
        >
          Register
        </button>
      </p>
    </div>
  );
}