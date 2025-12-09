import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { apiClient } from '@/lib/api';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await apiClient.getCurrentUser();
      if (result.data) {
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    await apiClient.logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Settings - 3 Top Three Club</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <div className="flex-1 pt-20 pb-12">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

              <div className="card p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      disabled
                      className="input bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="input bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Danger Zone</h2>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-red-600 border-red-300 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}






