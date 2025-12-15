import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Daily Quests',
      description: 'Focus on three tasks per day—no more, no less. Research shows this is the optimal number for productivity without overwhelm.',
      details: [
        'Three task slots every single day',
        'Simple checkbox interface',
        'Daily reset for fresh starts',
        'Tomorrow planning feature',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Streak & Momentum Tracking',
      description: 'Build lasting habits by maintaining daily streaks. Watch your momentum grow as you consistently complete your quests.',
      details: [
        'Visual streak counter',
        'Momentum indicators',
        'Heat meter visualization',
        'Achievement milestones',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Brain Dump',
      description: 'Capture ideas and tasks without interrupting your focus. Free users get the last 10 ideas, Premium gets unlimited cloud storage.',
      details: [
        'Quick idea capture',
        'Unlimited storage (Premium)',
        'Cloud sync (Premium)',
        'Easy organization',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Heat Meter',
      description: 'Visualize your productivity momentum with an intuitive heat meter that grows hotter as you complete daily quests consistently.',
      details: [
        'Visual progress indicator',
        'Color-coded intensity',
        'Motivation boost',
        'At-a-glance status',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Quest History',
      description: 'Track your progress over time. Free users get 30 days of history, Premium users get unlimited access to all past quests.',
      details: [
        '30 days free, unlimited premium',
        'Completion statistics',
        'Pattern insights',
        'Progress charts',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Cloud Sync',
      description: 'Premium users get automatic cloud synchronization across all devices. Access your data from phone, tablet, or computer.',
      details: [
        'Cross-device sync (Premium)',
        'Automatic backups',
        'Real-time updates',
        'Never lose your data',
      ],
      premium: true,
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics',
      description: 'Premium users get detailed insights into their productivity patterns, completion rates, and habit trends over time.',
      details: [
        'Completion rate analytics',
        'Productivity patterns',
        'Weekly/monthly reports',
        'Trend visualization',
      ],
      premium: true,
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Data Export',
      description: 'Premium users can export all their data in CSV or JSON format for backup or analysis in other tools.',
      details: [
        'CSV export',
        'JSON export',
        'Full data portability',
        'Easy backups',
      ],
      premium: true,
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Social Authentication',
      description: 'Sign in seamlessly with your Google or Facebook account. No need to remember another password.',
      details: [
        'Google OAuth',
        'Facebook Login',
        'Secure authentication',
        'One-click login',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Fully Responsive',
      description: 'Perfect experience on any device—desktop, tablet, or mobile. Your productivity tools go wherever you go.',
      details: [
        'Mobile-optimized',
        'Tablet support',
        'Desktop experience',
        'Works on all browsers',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Customizable Preferences',
      description: 'Personalize your experience with customizable settings, themes, and preferences that match your workflow.',
      details: [
        'Personal preferences',
        'Custom settings',
        'Flexible options',
        'Your way, your style',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Priority Support',
      description: 'Premium members get priority customer support with faster response times and dedicated assistance.',
      details: [
        'Priority queue',
        'Faster responses',
        'Dedicated support',
        'Premium care',
      ],
      premium: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Features - Top Three Club</title>
        <meta name="description" content="Explore all the powerful features of Top Three Club including daily quests, streak tracking, cloud sync, analytics, and more." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Powerful
              <br />
              <span className="gradient-text">Features</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Everything you need to focus on what matters, build better habits, and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary">
                Get Started Free
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card p-8 hover:shadow-xl transition-shadow relative">
                  {feature.premium && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                      Premium
                    </span>
                  )}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Power of Three */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Three?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The magic number behind Top Three Club isn&apos;t random—it&apos;s backed by science and psychology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Memorable</h3>
                <p className="text-gray-600">
                  The human brain naturally remembers things in groups of three. It&apos;s called the &quot;Rule of Three&quot; in psychology.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Achievable</h3>
                <p className="text-gray-600">
                  Three tasks hit the sweet spot between ambition and realism. It&apos;s enough to make real progress without overwhelming you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Decisive</h3>
                <p className="text-gray-600">
                  Limiting to three forces you to prioritize ruthlessly and focus on what truly matters most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Free vs Premium
              </h2>
              <p className="text-xl text-gray-600">
                Choose the plan that&apos;s right for you
              </p>
            </div>

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
                      <td className="px-6 py-4 text-sm text-gray-900">Daily Tasks (Always 3)</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Streak & Momentum</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Heat Meter</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600">✓</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Brain Dump Ideas</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Last 10 (local)</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Quest History</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">30 days</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">Unlimited</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Cloud Sync</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Advanced Analytics</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Data Export</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Priority Support</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                      <td className="px-6 py-4 text-center text-sm text-success-600 font-medium">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="btn-primary">
                See Full Pricing Details
              </Link>
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
                Join Top Three Club today and start focusing on what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Start Free
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  How It Works
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
