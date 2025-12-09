import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <>
      <Head>
        <title>3 Top Three Club - Build Better Habits, One Day at a Time</title>
        <meta name="description" content="Track your top three daily goals and build lasting habits. Simple, beautiful, and effective habit tracking." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span>✨</span>
              <span>Simple habit tracking for busy people</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Better Habits,
              <br />
              <span className="gradient-text">One Day at a Time</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Focus on your top three daily goals. Track your progress, build streaks, and watch your habits compound over time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="btn-primary btn-lg text-base font-semibold"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary btn-lg text-base font-semibold"
              >
                View Demo
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">No credit card required • Free forever</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to build better habits
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple tools designed to help you focus on what matters most
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus on Three</h3>
                <p className="text-gray-600">
                  Research shows that focusing on just three goals increases your chances of success. Less is more.
                </p>
              </div>

              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Streak</h3>
                <p className="text-gray-600">
                  Build momentum with visual progress tracking. Watch your streak grow and stay motivated.
                </p>
              </div>

              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Progress</h3>
                <p className="text-gray-600">
                  See your progress at a glance with beautiful heatmaps and statistics. Data that motivates.
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
                Ready to build better habits?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of people building better habits, one day at a time.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}





