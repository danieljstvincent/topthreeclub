import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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

              {/* Subscription Management */}
              <div className="card p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription</h2>

                {/* Current Plan */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Free Plan</h3>
                        <span className="px-2.5 py-0.5 text-xs font-medium text-primary-700 bg-primary-200 rounded-full">
                          Current
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">3 tasks per day, basic features</p>
                      <p className="text-2xl font-bold text-gray-900">$0<span className="text-sm font-normal text-gray-600">/month</span></p>
                    </div>
                    <div className="text-right">
                      <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Upgrade Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade to Pro</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Unlock unlimited tasks, brain dump history, advanced stats, and priority support
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/pricing">
                      <button className="btn-primary">
                        View Plans
                      </button>
                    </Link>
                    <button className="btn-secondary">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Billing Info (shown when subscribed) - commented out for now */}
                {/* <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Billing Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next billing date</span>
                      <span className="font-medium text-gray-900">January 15, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment method</span>
                      <span className="font-medium text-gray-900">•••• 4242</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                    <button className="btn-secondary text-sm flex-1">
                      Update Payment Method
                    </button>
                    <button className="btn-secondary text-sm text-orange-600 border-orange-300 hover:bg-orange-50 flex-1">
                      Cancel Subscription
                    </button>
                  </div>
                </div> */}
              </div>

              <div className="card p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Danger Zone</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Irreversible and destructive actions
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-gray-700 border-gray-300 hover:bg-gray-50 w-full"
                  >
                    Logout
                  </button>
                  <Link href="/delete-account">
                    <button className="btn-secondary w-full text-red-600 border-red-300 hover:bg-red-50">
                      Delete Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}






