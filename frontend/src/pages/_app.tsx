import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Prefetch routes on hover for better performance
  useEffect(() => {
    const handleRouteChange = () => {
      // Prefetch common routes
      router.prefetch('/login');
      router.prefetch('/signup');
      router.prefetch('/dashboard');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(); // Initial prefetch

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
