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
              <span>Designed for ADHD brains</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Brain on
              <br />
              <span className="gradient-text">Three Tasks</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Focus on what matters. Forget the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="btn-primary btn-lg text-base font-semibold"
              >
                Start Your Top 3 Today
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary btn-lg text-base font-semibold"
              >
                View Demo
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">No overwhelm. No guilt. Just three things.</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Work with your brain, not against it
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Designed specifically for ADHD and executive dysfunction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Wall of Awful Stops Here</h3>
                <p className="text-gray-600">
                  Standard to-do lists are overwhelming. We hide the noise and show you exactly three things. That&apos;s it. Your ADHD brain will thank you.
                </p>
              </div>

              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Built for Executive Dysfunction</h3>
                <p className="text-gray-600">
                  Forget willpower. Forget motivation. This isn&apos;t about being better—it&apos;s about working with your brain, not against it.
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
                Three things. That&apos;s it.
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                No overwhelm. No shame. No guilt. Just progress.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Your Top 3 Today
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}







