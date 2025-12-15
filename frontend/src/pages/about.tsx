import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Top Three Club</title>
        <meta name="description" content="Learn about Top Three Club's mission to help people focus on what truly matters through the power of three." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About
              <br />
              <span className="gradient-text">Top Three Club</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Helping people focus on what truly matters, three things at a time.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In a world of endless choices and overwhelming to-do lists, Top Three Club was born from a simple yet powerful idea: <strong>three is the perfect number</strong>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We believe that by focusing on your top three—whether it&apos;s tasks for the day, favorite restaurants in your city, or books that changed your life—you can make better decisions, reduce overwhelm, and share more meaningful recommendations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to help you curate what matters most, build sustainable habits, and connect with others through thoughtful, purposeful sharing.
              </p>
            </div>
          </div>
        </section>

        {/* Why Three Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Three?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Memorable</h3>
                <p className="text-gray-600">
                  Research shows three items is the optimal number for memory retention. People naturally remember things in threes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable</h3>
                <p className="text-gray-600">
                  Three tasks is enough to make progress without feeling overwhelmed. It&apos;s the sweet spot between ambition and achievability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Decisive</h3>
                <p className="text-gray-600">
                  Limiting to three forces you to prioritize and make deliberate choices about what truly matters most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Top Three Club started as a personal productivity experiment. Like many people, founder Daniel St. Vincent struggled with overwhelming to-do lists, decision fatigue, and the constant feeling of never doing enough.
                </p>
                <p>
                  The breakthrough came with a simple rule: <strong>focus on just three things each day</strong>. Not ten, not twenty—just three. The results were transformative. Days became more focused, progress became more visible, and accomplishments felt more meaningful.
                </p>
                <p>
                  But the power of three extended beyond daily tasks. When Daniel was asked for restaurant recommendations, movie suggestions, or book picks, limiting to three made recommendations more thoughtful and valuable. Three options are enough to provide variety without overwhelming the recipient.
                </p>
                <p>
                  That&apos;s when the vision became clear: the world needs a platform built around this principle. A place where people can share their carefully curated top threes, discover recommendations from others, and build habits through focused daily quests.
                </p>
                <p>
                  Today, Top Three Club is helping thousands of people focus on what matters, make better decisions, and share more meaningful recommendations—three things at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Focus Over Abundance</h3>
                  <p className="text-gray-600">
                    We believe in the power of constraints. Limiting choices leads to better decisions and more meaningful outcomes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Over Quantity</h3>
                  <p className="text-gray-600">
                    Better to complete three important tasks than start twenty. Better to share three great recommendations than a mediocre list of fifty.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community & Connection</h3>
                  <p className="text-gray-600">
                    We&apos;re building a community of thoughtful curators who help each other discover new favorites and achieve their goals.
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
                Ready to join the club?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Start focusing on what matters. Three things at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-block bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  See How It Works
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
