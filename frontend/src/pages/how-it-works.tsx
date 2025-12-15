import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works - Top Three Club</title>
        <meta name="description" content="Learn how to use Top Three Club to focus on what matters, build better habits, and achieve your goals—three things at a time." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              How It
              <br />
              <span className="gradient-text">Works</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Master Top Three Club in minutes. Focus on what matters, build lasting habits, and achieve your goals—three things at a time.
            </p>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Core Concept</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Every day, you get <strong>three task slots</strong>. That&apos;s it. No more, no less. This simple constraint forces you to prioritize ruthlessly and focus on what truly matters. Complete your three tasks consistently to build momentum, maintain streaks, and develop lasting habits.
              </p>
            </div>
          </div>
        </section>

        {/* Step by Step */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Getting Started in 4 Steps</h2>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      1
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Create Your Account</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Sign up with your email or use Google/Facebook for instant access. It takes less than 30 seconds to get started.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sign up with email, Google, or Facebook
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No credit card required for free plan
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Start using immediately after signup
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="card p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mt-4 font-medium">Quick & Easy Signup</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="card p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mt-4 font-medium">Choose Your Three Tasks</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      2
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Choose Your Three Tasks</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Each day, identify the three most important things you need to accomplish. Not five, not ten—just three.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Focus on high-impact tasks
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Prioritize ruthlessly
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Keep tasks specific and actionable
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      3
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Complete & Track Progress</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Check off tasks as you complete them. Watch your streak grow and your heat meter rise as you build momentum.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Visual progress tracking
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Build daily streaks
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      See your momentum grow
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="card p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mt-4 font-medium">Track Your Progress</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="card p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mt-4 font-medium">Repeat & Build Habits</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      4
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Repeat & Build Habits</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Come back tomorrow and do it again. Consistency is key. The power of three tasks per day adds up to massive progress over time.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Daily consistency builds habits
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Small wins compound into big results
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sustainable productivity without burnout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features to Know</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Brain Dump</h3>
                    <p className="text-gray-600 text-sm">
                      Got more than three tasks? Use the brain dump feature to capture ideas without cluttering your daily focus. Premium users get unlimited cloud storage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Heat Meter</h3>
                    <p className="text-gray-600 text-sm">
                      Visual momentum tracker that gets hotter as you maintain your streak. Watch it glow as you build consistent habits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tomorrow Planning</h3>
                    <p className="text-gray-600 text-sm">
                      Plan your three tasks for tomorrow in advance. Wake up each morning with clarity and purpose.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Quest History</h3>
                    <p className="text-gray-600 text-sm">
                      Review your completed quests over time. Free users get 30 days, Premium users get unlimited history and analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Success */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tips for Success</h2>

            <div className="space-y-6">
              <div className="card p-6 flex items-start">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-success-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Choose Tasks the Night Before</h3>
                  <p className="text-gray-600">
                    Use tomorrow planning to set your three tasks before bed. You&apos;ll wake up knowing exactly what to focus on.
                  </p>
                </div>
              </div>

              <div className="card p-6 flex items-start">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-success-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Make Tasks Specific and Measurable</h3>
                  <p className="text-gray-600">
                    Instead of &quot;Work on project,&quot; try &quot;Write 500 words of project proposal.&quot; Specific tasks are easier to complete.
                  </p>
                </div>
              </div>

              <div className="card p-6 flex items-start">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-success-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Don&apos;t Break the Chain</h3>
                  <p className="text-gray-600">
                    Your streak is powerful motivation. Even on busy days, completing three small tasks keeps your momentum alive.
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
                Ready to focus on what matters?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of people who are achieving more by doing less.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/features"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  Explore Features
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
