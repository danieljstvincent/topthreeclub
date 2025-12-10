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
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '1.5em', fontWeight: 500 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33'
          }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              fontSize: '0.95em',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              fontSize: '0.95em',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.95em',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          gap: '12px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e5e5' }}></div>
          <span style={{ color: '#999', fontSize: '0.85em' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e5e5' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={!socialUrls.google}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#fff',
              color: '#1a1a1a',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              fontSize: '0.95em',
              fontWeight: 500,
              cursor: socialUrls.google ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              opacity: socialUrls.google ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (socialUrls.google) {
                e.currentTarget.style.borderColor = '#ccc';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseOut={(e) => {
              if (socialUrls.google) {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: '4px' }}>
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
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1877F2',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.95em',
              fontWeight: 500,
              cursor: socialUrls.facebook ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              opacity: socialUrls.facebook ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (socialUrls.facebook) {
                e.currentTarget.style.backgroundColor = '#166FE5';
              }
            }}
            onMouseOut={(e) => {
              if (socialUrls.facebook) {
                e.currentTarget.style.backgroundColor = '#1877F2';
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginRight: '4px' }}>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>

      <p style={{ marginTop: '16px', textAlign: 'center', color: '#666', fontSize: '0.9em' }}>
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
}