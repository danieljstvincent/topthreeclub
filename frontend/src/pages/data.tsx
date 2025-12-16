import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function DataPage() {
  return (
    <>
      <Head>
        <title>Your Data - Top Three Club</title>
        <meta name="description" content="Learn how we handle your data and how you can request deletion of your personal information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Data,
              <br />
              <span className="gradient-text">Your Control</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              We believe you should have full control over your personal information.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Data Deletion Instructions */}
            <div className="card p-8 md:p-12 mb-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Your Data</h2>
                  <p className="text-gray-600">
                    You can request deletion of your personal data at any time
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Delete Your Data</h3>
                  <p className="text-gray-700 mb-4">
                    We provide multiple ways for you to delete your personal information from Top Three Club:
                  </p>

                  <div className="space-y-4">
                    {/* Option 1 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                          1
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">Delete from Your Account Settings</h4>
                          <p className="text-sm text-gray-700 mb-3">
                            Log in to your account and navigate to Settings. In the "Danger Zone" section, you can permanently delete your account and all associated data.
                          </p>
                          <Link href="/settings" className="inline-block btn-primary text-sm px-4 py-2">
                            Go to Settings
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Option 2 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                          2
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">Submit a Data Deletion Request</h4>
                          <p className="text-sm text-gray-700 mb-3">
                            Fill out our data subject request form to formally request deletion of your personal information. We&apos;ll process your request within 30 days.
                          </p>
                          <Link href="/data-request" className="inline-block btn-primary text-sm px-4 py-2">
                            Submit Request
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Option 3 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                          3
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                          <p className="text-sm text-gray-700 mb-3">
                            Reach out to our support team directly, and they will assist you with deleting your account and personal data.
                          </p>
                          <Link href="/contact" className="inline-block btn-secondary text-sm px-4 py-2">
                            Contact Support
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What Gets Deleted */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What Gets Deleted?</h3>
                  <p className="text-gray-700 mb-4">
                    When you delete your account, we permanently remove:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Your account information (username, email, password)</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Your profile data and preferences</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>All your quest history and streak data</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Your top three lists and brain dump ideas</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Usage data and analytics tied to your account</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <strong>Note:</strong> Some data may be retained in backups for a limited time as required by law. Anonymized aggregate data may be retained for statistical purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Data Rights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link href="/data-request" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Your Data</h3>
                <p className="text-sm text-gray-600">
                  Request a copy of all the personal data we have about you.
                </p>
              </Link>

              <Link href="/data-request" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Correct Your Data</h3>
                <p className="text-sm text-gray-600">
                  Update or correct any inaccurate personal information.
                </p>
              </Link>

              <Link href="/privacy" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Privacy Policy</h3>
                <p className="text-sm text-gray-600">
                  Learn how we collect, use, and protect your personal data.
                </p>
              </Link>
            </div>

            {/* Response Timeline */}
            <div className="card p-8 bg-primary-50 border-primary-100">
              <div className="flex items-start">
                <svg className="w-8 h-8 text-primary-600 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Response Timeline</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We take your data rights seriously. All data deletion requests are processed within <strong>30 days</strong> as required by GDPR and CCPA regulations. You&apos;ll receive a confirmation email once your data has been permanently deleted from our systems.
                  </p>
                  <p className="text-sm text-gray-600">
                    For immediate account deletion, use the delete option in your account settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
