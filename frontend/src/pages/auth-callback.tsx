import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Wait a moment for the session to be set
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = await apiClient.getCurrentUser();
      if (result.data) {
        // Successfully authenticated, redirect to home
        router.push('/');
      } else {
        // Not authenticated, redirect to home anyway (will show login)
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      <p>Completing login...</p>
    </div>
  );
}

