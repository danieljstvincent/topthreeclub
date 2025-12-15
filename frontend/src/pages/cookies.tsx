import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Cookies() {
  return (
    <>
      <Head>
        <title>Cookie Policy - Top Three Club</title>
        <meta name="description" content="Learn about how Top Three Club uses cookies and similar technologies to improve your experience." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cookie
              <br />
              <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Understanding how we use cookies and tracking technologies.
            </p>
            <p className="text-sm text-gray-500">Last Updated: December 15, 2025</p>
          </div>
        </section>

        {/* Cookie Policy Content */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 space-y-8">

              {/* Introduction */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  This Cookie Policy explains how Top Three Club uses cookies and similar tracking technologies when you visit our website and use our services. This policy should be read in conjunction with our{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* 1. What Are Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-700 mb-3">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-gray-700">
                  Cookies can be &quot;persistent&quot; (remaining on your device until deleted or expired) or &quot;session&quot; (deleted when you close your browser).
                </p>
              </div>

              {/* 2. How We Use Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Top Three Club uses cookies for the following purposes:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Essential Cookies</h3>
                <p className="text-gray-700 mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>User authentication and login sessions</li>
                  <li>Security and fraud prevention</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Maintaining your session across pages</li>
                </ul>
                <p className="text-gray-700 mt-3 italic">
                  You cannot opt out of essential cookies as they are required for the service to work.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Performance and Analytics Cookies</h3>
                <p className="text-gray-700 mb-3">
                  These cookies help us understand how visitors interact with our website by collecting anonymous information about:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Pages visited and features used</li>
                  <li>Time spent on pages</li>
                  <li>Navigation paths through the site</li>
                  <li>Errors encountered</li>
                  <li>Device and browser information</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  This information helps us improve our service and user experience.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Functional Cookies</h3>
                <p className="text-gray-700 mb-3">
                  These cookies enable enhanced functionality and personalization, such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Remembering your language preferences</li>
                  <li>Remembering your dashboard layout</li>
                  <li>Saving your quest progress</li>
                  <li>Remembering form inputs</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.4 Authentication Cookies</h3>
                <p className="text-gray-700 mb-3">
                  When you use social login (Google or Facebook), these services set their own cookies to authenticate you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Google OAuth cookies</li>
                  <li>Facebook Login cookies</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  These cookies are governed by Google&apos;s and Facebook&apos;s respective privacy policies.
                </p>
              </div>

              {/* 3. Types of Cookies We Use */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">sessionid</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Essential</td>
                        <td className="px-6 py-4 text-sm text-gray-600">User authentication</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Session</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">csrftoken</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Essential</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Security (CSRF protection)</td>
                        <td className="px-6 py-4 text-sm text-gray-600">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">preferences</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Functional</td>
                        <td className="px-6 py-4 text-sm text-gray-600">User preferences</td>
                        <td className="px-6 py-4 text-sm text-gray-600">1 year</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Usage analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-600">2 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Third-Party Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-3">
                  We use services from third parties who may also set cookies on your device. These include:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Google</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Google OAuth for authentication</li>
                  <li>Google Analytics for usage statistics (if applicable)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Facebook</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Facebook Login for authentication</li>
                </ul>

                <p className="text-gray-700 mt-4">
                  Third-party cookies are governed by the respective third parties&apos; privacy policies. We do not have control over these cookies.
                </p>
              </div>

              {/* 5. Local Storage */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Local Storage and Similar Technologies</h2>
                <p className="text-gray-700 mb-3">
                  In addition to cookies, we use browser local storage to store:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Quest progress and task data (Free users)</li>
                  <li>Brain dump ideas (Free users - last 10)</li>
                  <li>User preferences and settings</li>
                  <li>Cached data for offline functionality</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Local storage data remains on your device and is not transmitted to our servers (for Free users). Premium users&apos; data is synced to the cloud.
                </p>
              </div>

              {/* 6. Managing Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Browser Settings</h3>
                <p className="text-gray-700 mb-3">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>View what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Delete all cookies when you close your browser</li>
                  <li>Enable &quot;Do Not Track&quot; preferences</li>
                </ul>

                <p className="text-gray-700 mt-4 mb-3">
                  To manage cookies in popular browsers, visit:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies</li>
                  <li><strong>Firefox:</strong> Settings &gt; Privacy & Security &gt; Cookies</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
                  <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Impact of Blocking Cookies</h3>
                <p className="text-gray-700">
                  Please note that if you block or delete cookies, some features of Top Three Club may not work properly. Essential cookies are required for basic functionality like logging in and maintaining your session.
                </p>
              </div>

              {/* 7. Do Not Track */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track Signals</h2>
                <p className="text-gray-700">
                  Some browsers support a &quot;Do Not Track&quot; (DNT) feature that signals websites you visit that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals, and we do not currently respond to these signals.
                </p>
              </div>

              {/* 8. Updates to This Policy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-700">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of significant changes by updating the &quot;Last Updated&quot; date at the top of this page.
                </p>
              </div>

              {/* 9. Contact Us */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-2">
                    <strong>Website:</strong>{' '}
                    <Link href="/" className="text-primary-600 hover:text-primary-700">
                      topthreeclub.com
                    </Link>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Contact:</strong>{' '}
                    <Link href="/contact" className="text-primary-600 hover:text-primary-700">
                      Contact Form
                    </Link>
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <p className="text-center text-gray-600">
                  For more information about how we handle your data, please see our{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Questions about cookies?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                We&apos;re transparent about our data practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
