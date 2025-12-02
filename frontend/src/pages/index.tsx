import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../lib/api';
import Landing from './landing';
import Dashboard from './dashboard';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await apiClient.getCurrentUser();
      if (result.data) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If authenticated, show dashboard; otherwise show landing page
  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <Landing />;
}
