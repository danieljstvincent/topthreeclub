import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Top Three Club</title>
        <meta name="description" content="Terms of Service for Top Three Club. Read about the rules and guidelines for using our platform." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Terms of
              <br />
              <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              The rules and guidelines for using Top Three Club.
            </p>
            <p className="text-sm text-gray-500">Last Updated: December 15, 2025</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 space-y-8">

              {/* Introduction */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Top Three Club! These Terms of Service (&quot;Terms&quot;) govern your access to and use of our platform, website, and services (collectively, the &quot;Service&quot;). By accessing or using Top Three Club, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Please read these Terms carefully before using our Service. If you do not agree to these Terms, you may not access or use the Service.
                </p>
              </div>

              {/* 1. Acceptance of Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-3">
                  By creating an account, accessing, or using Top Three Club, you acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You have read, understood, and agree to be bound by these Terms</li>
                  <li>You have read and agree to our Privacy Policy</li>
                  <li>You are at least 13 years of age</li>
                  <li>You have the legal capacity to enter into a binding agreement</li>
                </ul>
              </div>

              {/* 2. Account Registration */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Account Creation</h3>
                <p className="text-gray-700 mb-3">
                  To use certain features of the Service, you must create an account. You may register:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Directly with an email address and password</li>
                  <li>Through social authentication (Google or Facebook)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Account Security</h3>
                <p className="text-gray-700 mb-3">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access or security breach</li>
                  <li>Providing accurate, current, and complete information during registration</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Account Termination</h3>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate your account at any time for violation of these Terms, illegal activity, or other conduct we deem inappropriate. You may also delete your account at any time through your account settings.
                </p>
              </div>

              {/* 3. Service Plans */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Plans</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Free Plan</h3>
                <p className="text-gray-700 mb-3">
                  The Free plan includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>3 tasks per day</li>
                  <li>Basic streak and momentum tracking</li>
                  <li>Heat meter visualization</li>
                  <li>Tomorrow planning</li>
                  <li>Local storage only (no cloud sync)</li>
                  <li>Last 10 brain dump ideas (local only)</li>
                  <li>Last 30 days of quest history</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Premium Plan</h3>
                <p className="text-gray-700 mb-3">
                  The Premium plan includes all Free features plus:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Unlimited brain dump ideas</li>
                  <li>Cloud sync across all devices</li>
                  <li>Full quest history (unlimited)</li>
                  <li>Advanced analytics and insights</li>
                  <li>Data export (CSV/JSON)</li>
                  <li>Priority customer support</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Plan Changes</h3>
                <p className="text-gray-700">
                  You may upgrade or downgrade your plan at any time. Changes take effect immediately. If you downgrade from Premium to Free, you will retain access to Premium features until the end of your current billing period.
                </p>
              </div>

              {/* 4. Payment and Billing */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment and Billing</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Premium Subscription</h3>
                <p className="text-gray-700 mb-3">
                  By subscribing to a Premium plan:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You authorize us to charge your payment method on a recurring monthly basis</li>
                  <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                  <li>You are responsible for all charges incurred under your account</li>
                  <li>All fees are in USD unless otherwise stated</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Refund Policy</h3>
                <p className="text-gray-700">
                  We offer a 30-day money-back guarantee for Premium subscriptions. If you&apos;re not satisfied within the first 30 days, contact us for a full refund. After 30 days, all payments are non-refundable.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Cancellation</h3>
                <p className="text-gray-700">
                  You may cancel your Premium subscription at any time. Upon cancellation, you will retain access to Premium features until the end of your current billing period, after which your account will revert to the Free plan.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.4 Price Changes</h3>
                <p className="text-gray-700">
                  We reserve the right to change our pricing at any time. We will provide at least 30 days&apos; notice before any price changes take effect. Continued use of the Service after a price change constitutes acceptance of the new pricing.
                </p>
              </div>

              {/* 5. User Content */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Content</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Your Content</h3>
                <p className="text-gray-700 mb-3">
                  You retain ownership of all content you create, post, or share on Top Three Club, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Top three lists</li>
                  <li>Quest responses and submissions</li>
                  <li>Brain dump ideas</li>
                  <li>Comments and interactions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 License to Us</h3>
                <p className="text-gray-700">
                  By posting content on Top Three Club, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content solely for the purpose of operating and improving the Service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.3 Content Restrictions</h3>
                <p className="text-gray-700 mb-3">
                  You agree not to post content that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, or hateful</li>
                  <li>Infringes on intellectual property rights of others</li>
                  <li>Contains spam, advertising, or promotional material (unless authorized)</li>
                  <li>Contains viruses, malware, or other harmful code</li>
                  <li>Violates the privacy or publicity rights of others</li>
                  <li>Is sexually explicit or pornographic</li>
                  <li>Promotes violence or discrimination</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.4 Content Moderation</h3>
                <p className="text-gray-700">
                  We reserve the right to review, moderate, or remove any content that violates these Terms or that we deem inappropriate. However, we are not obligated to monitor all user content.
                </p>
              </div>

              {/* 6. Acceptable Use */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
                <p className="text-gray-700 mb-3">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Use the Service for any illegal purpose or in violation of any laws</li>
                  <li>Attempt to gain unauthorized access to the Service or other users&apos; accounts</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use automated systems (bots, scrapers) without our permission</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                  <li>Sell, rent, or lease access to the Service</li>
                  <li>Impersonate another person or entity</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Collect or store personal data of other users without consent</li>
                </ul>
              </div>

              {/* 7. Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Our Property</h3>
                <p className="text-gray-700">
                  All content, features, and functionality of the Service (including but not limited to text, graphics, logos, icons, images, software, and design) are owned by Top Three Club and are protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.2 Limited License</h3>
                <p className="text-gray-700">
                  We grant you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes in accordance with these Terms.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.3 Trademarks</h3>
                <p className="text-gray-700">
                  &quot;Top Three Club&quot; and related logos are trademarks of Top Three Club. You may not use these trademarks without our prior written permission.
                </p>
              </div>

              {/* 8. Third-Party Services */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
                <p className="text-gray-700 mb-3">
                  Our Service may integrate with third-party services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Google OAuth for authentication</li>
                  <li>Facebook Login for authentication</li>
                  <li>Payment processors</li>
                  <li>Analytics providers</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Your use of third-party services is subject to their respective terms and privacy policies. We are not responsible for the actions or policies of third-party services.
                </p>
              </div>

              {/* 9. Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy</h2>
                <p className="text-gray-700">
                  Your use of the Service is also governed by our{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </Link>
                  , which describes how we collect, use, and protect your personal information. By using the Service, you consent to our privacy practices as described in the Privacy Policy.
                </p>
              </div>

              {/* 10. Disclaimers */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 &quot;As Is&quot; Basis</h3>
                <p className="text-gray-700 mb-3">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                  <li>Warranties that the Service will be uninterrupted, error-free, or secure</li>
                  <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">10.2 No Professional Advice</h3>
                <p className="text-gray-700">
                  The Service is designed for productivity and habit tracking. It does not provide professional advice (medical, legal, financial, or otherwise). You should consult appropriate professionals for specific advice.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">10.3 User Responsibility</h3>
                <p className="text-gray-700">
                  You are solely responsible for your use of the Service and any consequences arising from such use.
                </p>
              </div>

              {/* 11. Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-gray-700 mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOP THREE CLUB SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or use</li>
                  <li>Business interruption or loss of goodwill</li>
                  <li>Damages resulting from unauthorized access to your account or data</li>
                  <li>Damages arising from your use or inability to use the Service</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRIOR TO THE CLAIM, OR $100, WHICHEVER IS GREATER.
                </p>
              </div>

              {/* 12. Indemnification */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to indemnify, defend, and hold harmless Top Three Club, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorney fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
                  <li>Your use of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your content or conduct on the Service</li>
                </ul>
              </div>

              {/* 13. Changes to the Service */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to the Service</h2>
                <p className="text-gray-700">
                  We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                </p>
              </div>

              {/* 14. Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
                <p className="text-gray-700">
                  We may update these Terms from time to time. We will notify you of significant changes by posting the updated Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Service after changes are posted constitutes acceptance of the updated Terms.
                </p>
              </div>

              {/* 15. Dispute Resolution */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Dispute Resolution</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.1 Informal Resolution</h3>
                <p className="text-gray-700">
                  If you have a dispute with us, please contact us first to attempt to resolve it informally. We are committed to working with you to reach a fair resolution.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">15.2 Arbitration</h3>
                <p className="text-gray-700">
                  If we cannot resolve a dispute informally, you agree that any dispute will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, rather than in court.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">15.3 Class Action Waiver</h3>
                <p className="text-gray-700">
                  You agree to resolve disputes with us on an individual basis and waive any right to participate in a class action lawsuit or class-wide arbitration.
                </p>
              </div>

              {/* 16. Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
                </p>
              </div>

              {/* 17. Severability */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Severability</h2>
                <p className="text-gray-700">
                  If any provision of these Terms is found to be invalid or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                </p>
              </div>

              {/* 18. Entire Agreement */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Entire Agreement</h2>
                <p className="text-gray-700">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Top Three Club regarding the use of the Service and supersede all prior agreements and understandings.
                </p>
              </div>

              {/* 19. Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about these Terms of Service, please contact us:
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

              {/* Footer Note */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <p className="text-center text-gray-600 font-medium">
                  By using Top Three Club, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
                Ready to get started?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join Top Three Club today and start building better habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/privacy"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  View Privacy Policy
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
