import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - 3 Top Three Club</title>
        <meta name="description" content="Simple, transparent pricing for Top Three Club. Start free, upgrade when you're ready." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simple, Transparent
              <br />
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start free. Upgrade when you&apos;re ready for more.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Free Plan */}
              <div className="card p-8 relative">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 text-sm">Perfect for getting started</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">3 tasks per day (always)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Basic streak & momentum tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Heat meter visualization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Tomorrow planning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Last 10 brain dump ideas (local only)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Last 30 days of quest history</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Local storage only (no cloud sync)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">No data export</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">No advanced analytics</span>
                  </li>
                </ul>

                <Link
                  href="/signup"
                  className="btn-secondary w-full text-center block"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Premium Plan */}
              <div className="card p-8 relative border-2 border-primary-500 shadow-lg">
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
                
                <div className="text-center mb-8 mt-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">$9.97</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 text-sm">For serious habit builders</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">3 tasks per day (always)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Basic streak & momentum tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Heat meter visualization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Tomorrow planning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Unlimited</strong> brain dump ideas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Cloud sync</strong> across all devices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Full quest history</strong> (unlimited)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Advanced analytics</strong> & insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Data export</strong> (CSV/JSON)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Priority</strong> customer support</span>
                  </li>
                </ul>

                <Link
                  href="/signup?plan=premium"
                  className="btn-primary w-full text-center block"
                >
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Feature Comparison
              </h2>
              
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Daily Tasks</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">3 per day</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">3 per day</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">Streak & Momentum Tracking</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓ Basic</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓ Basic</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Heat Meter</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">Tomorrow Planning</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Brain Dump Ideas</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">Last 10 (local only)</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">Unlimited</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Cloud Sync</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓ All devices</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Quest History</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">Last 30 days</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">Unlimited</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Advanced Analytics</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Data Export</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓ CSV/JSON</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Priority Support</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                        <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I change plans later?
                  </h3>
                  <p className="text-gray-600">
                    Yes! You can upgrade or downgrade at any time. Changes take effect immediately.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What happens if I cancel?
                  </h3>
                  <p className="text-gray-600">
                    You&apos;ll keep access to Premium features until the end of your billing period. After that, you&apos;ll automatically move to the Free plan.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Why is the task limit always 3?
                  </h3>
                  <p className="text-gray-600">
                    Three is the perfect number for decision-making and reducing overwhelm. This limit helps your ADHD brain focus on what truly matters. It&apos;s the same for everyone—free and premium.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you offer refunds?
                  </h3>
                  <p className="text-gray-600">
                    We offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact us for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to build better habits?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Start free. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  View Dashboard
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

