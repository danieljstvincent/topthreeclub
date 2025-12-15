import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function DataRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend
    console.log('Data request submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Data Subject Request - Top Three Club</title>
        <meta name="description" content="Request access to your personal data, request deletion, or exercise your data protection rights." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Data Subject
              <br />
              <span className="gradient-text">Request</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Exercise your data protection rights under GDPR and CCPA.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Request Form */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Request</h2>

                {submitted ? (
                  <div className="p-6 bg-success-50 border border-success-200 rounded-lg text-center">
                    <svg className="w-16 h-16 text-success-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h3>
                    <p className="text-gray-700 mb-4">
                      We&apos;ve received your data request and will process it within 30 days as required by law.
                    </p>
                    <p className="text-sm text-gray-600">
                      You will receive a confirmation email shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Must match the email associated with your account
                      </p>
                    </div>

                    <div>
                      <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                        Request Type
                      </label>
                      <select
                        id="requestType"
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a request type</option>
                        <option value="access">Access My Data (Data Download)</option>
                        <option value="delete">Delete My Account & Data</option>
                        <option value="correct">Correct My Data</option>
                        <option value="portability">Data Portability</option>
                        <option value="restrict">Restrict Processing</option>
                        <option value="object">Object to Processing</option>
                        <option value="withdraw">Withdraw Consent</option>
                        <option value="other">Other Request</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Details
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Please provide any additional information about your request..."
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        By submitting this form, you confirm that you are the account holder or authorized representative. We may request additional verification to protect your privacy.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full"
                    >
                      Submit Request
                    </button>
                  </form>
                )}
              </div>

              {/* Information Sidebar */}
              <div className="space-y-6">
                {/* Your Rights */}
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Data Rights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Right to Access</p>
                        <p className="text-sm text-gray-600">Request a copy of all personal data we hold about you</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Right to Deletion</p>
                        <p className="text-sm text-gray-600">Request permanent deletion of your account and data</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Right to Correction</p>
                        <p className="text-sm text-gray-600">Update or correct inaccurate personal information</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Right to Portability</p>
                        <p className="text-sm text-gray-600">Receive your data in a structured, machine-readable format</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Right to Object</p>
                        <p className="text-sm text-gray-600">Object to certain types of data processing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Timeline */}
                <div className="card p-8 bg-primary-50 border-primary-100">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Timeline</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        We will respond to your request within <strong>30 days</strong> as required by GDPR and CCPA. Complex requests may take up to 90 days, and we&apos;ll notify you if this is the case.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="card p-8 bg-yellow-50 border-yellow-100">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Identity Verification</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        To protect your privacy, we may ask for additional verification before processing your request. This may include confirming your email or providing account details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Some actions can be done directly from your account:
                  </p>
                  <div className="space-y-2">
                    <Link href="/settings" className="block text-primary-600 hover:text-primary-700 text-sm font-medium">
                      → Update your profile information
                    </Link>
                    <Link href="/settings" className="block text-primary-600 hover:text-primary-700 text-sm font-medium">
                      → Download your data (Premium users)
                    </Link>
                    <Link href="/settings" className="block text-primary-600 hover:text-primary-700 text-sm font-medium">
                      → Delete your account
                    </Link>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have questions about your data rights or this form:
                  </p>
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                    Contact our support team →
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="card p-8 md:p-12 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens when I request data deletion?</h3>
                  <p className="leading-relaxed">
                    When you request account deletion, we will permanently remove your personal information from our active systems within 30 days. Some information may be retained in backups for a limited period as required for legal compliance. Public content you&apos;ve shared may be anonymized rather than deleted.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What data will I receive with an access request?</h3>
                  <p className="leading-relaxed">
                    You will receive a comprehensive export of all personal data we hold about you, including: account information, profile data, quest history, top three lists, brain dump ideas, usage analytics, and any other data associated with your account. The data will be provided in a structured, machine-readable format (JSON/CSV).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I withdraw consent for data processing?</h3>
                  <p className="leading-relaxed">
                    Yes, you can withdraw consent at any time. However, please note that some data processing is necessary to provide our services. Withdrawing consent for essential processing may mean we cannot continue providing you with an account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I&apos;m not satisfied with the response?</h3>
                  <p className="leading-relaxed">
                    If you&apos;re not satisfied with how we handle your data request, you have the right to lodge a complaint with your local data protection authority (for EU residents) or the relevant regulatory body in your jurisdiction.
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
