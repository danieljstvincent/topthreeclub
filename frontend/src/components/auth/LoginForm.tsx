import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../lib/api';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

interface SocialUrls {
  google?: string;
  facebook?: string;
}

const DEFAULT_SOCIAL_URLS: SocialUrls = {
  google: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_URL,
};

// Helper to get base URL for fallback social URLs
const getFallbackSocialUrls = (): SocialUrls => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  return {
    google: DEFAULT_SOCIAL_URLS.google || `${baseUrl}/accounts/google/login/`,
    facebook: DEFAULT_SOCIAL_URLS.facebook || `${baseUrl}/accounts/facebook/login/`,
  };
};

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialUrls, setSocialUrls] = useState<SocialUrls>({});
  const [loadingSocial, setLoadingSocial] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSocialUrls = async () => {
      try {
        const result = await apiClient.getSocialAuthUrls();
        
        if (!isMounted) return;
        
        if (result.data) {
          setSocialUrls(result.data);
        } else {
          // Fallback to default URLs
          setSocialUrls(getFallbackSocialUrls());
        }
      } catch (error) {
        console.error('Failed to fetch social auth URLs:', error);
        if (!isMounted) return;
        setSocialUrls(getFallbackSocialUrls());
      } finally {
        if (isMounted) {
          setLoadingSocial(false);
        }
      }
    };

    fetchSocialUrls();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSocialLogin = useCallback((provider: 'google' | 'facebook') => {
    const url = socialUrls[provider];
    if (url) {
      window.location.href = url;
    }
  }, [socialUrls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await apiClient.login(username, password);
      
      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialLoginAvailable = (provider: keyof SocialUrls) => 
    !loadingSocial && Boolean(socialUrls[provider]);

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login</h