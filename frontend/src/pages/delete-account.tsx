import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiClient } from '@/lib/api';

export default function DeleteAccount() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [understood, setUnderstood] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

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

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    setError('');

    try {
      const result = await apiClient.deleteAccount(password, confirmation);
      if (result.error) {
        setError(result.error);
        setIsDeleting(false);
        return;
      }

      // Clear all local storage
      localStorage.clear();

      // Redirect to homepage with success message
      router.push('/?deleted=true');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Delete Account - Top Three Club</title>
      </Head>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Step 1: Warning */}
          {step === 1 && (
            <div className="card p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Delete Your Account
              </h1>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800 font-semibold mb-2">
                  ⚠️ Warning: This action cannot be undone
                </p>
                <p className="text-red-700 text-sm">
                  Deleting your account is permanent. All your data will be lost forever.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  The following data will be permanently deleted:
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Your account information (username, email)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>All quest progress and history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Statistics (streak, XP, momentum hours)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Brain dump ideas and notes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>All settings and preferences</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/settings')}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary flex-1 bg-red-600 hover:bg-red-700"
                >
                  Continue to Deletion
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirmation Form */}
          {step === 2 && (
            <div className="card p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Confirm Account Deletion
              </h1>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleDeleteAccount} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your password to confirm
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="font-bold">DELETE MY ACCOUNT</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="DELETE MY ACCOUNT"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="understood"
                    checked={understood}
                    onChange={(e) => setUnderstood(e.target.checked)}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="understood" className="text-sm text-gray-700">
                    I understand this action is permanent and cannot be undone
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1"
                    disabled={isDeleting}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                    disabled={isDeleting || !understood || confirmation !== 'DELETE MY ACCOUNT'}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete My Account Forever'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
