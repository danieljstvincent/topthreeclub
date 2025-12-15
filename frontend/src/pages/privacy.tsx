import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Top Three Club</title>
        <meta name="description" content="Privacy Policy for Top Three Club. Learn how we collect, use, and protect your personal information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Privacy
              <br />
              <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Your privacy matters to us. Here&apos;s how we protect it.
            </p>
            <p className="text-sm text-gray-500">Last Updated: December 15, 2025</p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 space-y-8">

              {/* Introduction */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Top Three Club. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and usage when you use our platform.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By accessing or using Top Three Club, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please do not use our services.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.1 Information You Provide Directly</h3>
                <p className="text-gray-700 mb-3"><strong>Account Registration:</strong></p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Email address</li>
                  <li>Password (stored securely using industry-standard encryption)</li>
                  <li>Username/display name</li>
                  <li>Profile information you choose to add</li>
                </ul>

                <p className="text-gray-700 mb-3 mt-4"><strong>Social Authentication:</strong></p>
                <p className="text-gray-700 mb-2">When you sign up or log in using Google or Facebook, we receive:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Profile picture (if available)</li>
                  <li>User ID from the social platform</li>
                </ul>

                <p className="text-gray-700 mb-3 mt-4"><strong>Content You Create:</strong></p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Top three lists you create and share</li>
                  <li>Quest responses and submissions</li>
                  <li>Brain dump ideas (Premium users)</li>
                  <li>Comments, ratings, or interactions with other users&apos; content</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.2 Information Collected Automatically</h3>
                <p className="text-gray-700 mb-3"><strong>Usage Data:</strong></p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Pages you visit and features you use</li>
                  <li>Time and date of your visits</li>
                  <li>Browser type and version</li>
                  <li>Device information (type, operating system)</li>
                  <li>IP address</li>
                  <li>Referring website URLs</li>
                </ul>

                <p className="text-gray-700 mb-2 mt-4"><strong>Cookies and Similar Technologies:</strong></p>
                <p className="text-gray-700">
                  We use cookies and similar tracking technologies to enhance your experience, maintain sessions, and analyze usage patterns. You can control cookie preferences through your browser settings.
                </p>
              </div>

              {/* 2. How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Service Delivery</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Create and manage your account</li>
                  <li>Authenticate users and maintain security</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Enable social features and community interactions</li>
                  <li>Deliver daily quests and track your progress</li>
                  <li>Sync data across devices (Premium users)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Communication</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Send service-related notifications</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send updates about new features or changes to our services</li>
                  <li>Provide personalized recommendations (with your consent)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Improvement and Analytics</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Develop new features and functionality</li>
                  <li>Monitor and analyze trends and user preferences</li>
                  <li>Ensure technical functionality and troubleshoot issues</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.4 Security and Compliance</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Detect, prevent, and address fraud or security issues</li>
                  <li>Enforce our Terms of Service</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>

              {/* 3. How We Share Your Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
                <p className="text-gray-700 mb-4">
                  <strong>We do not sell your personal information to third parties.</strong> We may share your information in the following limited circumstances:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Public Content</h3>
                <p className="text-gray-700">
                  Content you choose to make public (such as your top three lists) will be visible to other users of the platform.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Service Providers</h3>
                <p className="text-gray-700 mb-2">
                  We may share information with trusted third-party service providers who assist us in operating our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Cloud hosting services (for data storage)</li>
                  <li>Authentication services (Google OAuth, Facebook Login)</li>
                  <li>Analytics providers</li>
                  <li>Email service providers</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  These providers are contractually obligated to protect your data and use it only for the services they provide to us.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Legal Requirements</h3>
                <p className="text-gray-700 mb-2">
                  We may disclose your information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Comply with legal processes</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Protect the rights, property, or safety of our users or the public</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.4 Business Transfers</h3>
                <p className="text-gray-700">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change and provide options regarding your data.
                </p>
              </div>

              {/* 4. Third-Party Services */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 OAuth Authentication</h3>
                <p className="text-gray-700 mb-2">
                  We use Google and Facebook OAuth for authentication. When you use these services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You are also subject to Google&apos;s and Facebook&apos;s privacy policies</li>
                  <li>We only receive the information you authorize these services to share</li>
                  <li>You can revoke our access through your Google or Facebook account settings</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 External Links</h3>
                <p className="text-gray-700">
                  Our platform may contain links to external websites or services not operated by us. We are not responsible for the privacy practices of these third-party sites. We encourage you to review their privacy policies.
                </p>
              </div>

              {/* 5. Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-3">
                  We implement appropriate technical and organizational security measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Encryption of data in transit (HTTPS/SSL)</li>
                  <li>Secure password hashing using industry-standard algorithms</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure database storage with PostgreSQL</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  However, no method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>

              {/* 6. Data Retention */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                <p className="text-gray-700 mb-3">
                  We retain your personal information for as long as your account is active or as needed to provide our services. You may request deletion of your account at any time. After deletion:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Your personal information will be removed from our active databases</li>
                  <li>Some information may be retained in backup systems for a limited period</li>
                  <li>We may retain certain data as required by law or for legitimate business purposes</li>
                </ul>
              </div>

              {/* 7. Your Rights and Choices */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">
                  Depending on your location, you may have the following rights:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Access and Portability</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Request access to the personal information we hold about you</li>
                  <li>Receive a copy of your data in a structured, commonly used format</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.2 Correction and Deletion</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Update or correct inaccurate information</li>
                  <li>Request deletion of your account and associated data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.3 Control and Consent</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing (where applicable)</li>
                  <li>Control your privacy settings and what information is public</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.4 Data Protection Rights (GDPR)</h3>
                <p className="text-gray-700 mb-2">
                  If you are in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Right to object to processing</li>
                  <li>Right to restriction of processing</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.5 California Privacy Rights (CCPA)</h3>
                <p className="text-gray-700 mb-2">
                  If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>

                <p className="text-gray-700 mt-4">
                  To exercise any of these rights, please contact us at the email address provided below.
                </p>
              </div>

              {/* 8. Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-gray-700">
                  Top Three Club is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </div>

              {/* 9. International Data Transfers */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to our facilities and service providers globally.
                </p>
              </div>

              {/* 10. Changes to This Privacy Policy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-3">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the &quot;Last Updated&quot; date at the top of this page</li>
                  <li>Sending an email notification (for material changes)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Your continued use of Top Three Club after changes are posted constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>

              {/* 11. Do Not Track Signals */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Do Not Track Signals</h2>
                <p className="text-gray-700">
                  Some browsers include a &quot;Do Not Track&quot; (DNT) feature. Our platform does not currently respond to DNT signals, as there is no industry standard for how to interpret these signals.
                </p>
              </div>

              {/* 12. Contact Us */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-2">
                    <strong>Website:</strong>{' '}
                    <Link href="/" className="text-primary-600 hover:text-primary-700">
                      topthreeclub.com
                    </Link>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Engineer:</strong>{' '}
                    <Link
                      href="https://danieljstvincent.com"
                      className="text-primary-600 hover:text-primary-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Daniel St. Vincent
                    </Link>
                  </p>
                </div>
              </div>

              {/* 13. Consent */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Consent</h2>
                <p className="text-gray-700">
                  By using Top Three Club, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and sharing of your information as described herein.
                </p>
              </div>

              {/* Footer Note */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <p className="text-center text-gray-600 font-medium">
                  Thank you for trusting Top Three Club with your information. We are committed to protecting your privacy and providing a safe, enjoyable experience.
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
                Questions about privacy?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                We&apos;re here to help. Reach out anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  href="/terms"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  View Terms of Service
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
