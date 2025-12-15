import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          q: 'What is Top Three Club?',
          a: 'Top Three Club is a productivity and social platform built around the power of three. We help you focus on what matters by limiting daily tasks to three, sharing curated top-three lists, and building sustainable habits through daily quests.',
        },
        {
          q: 'How do I create an account?',
          a: 'You can sign up in three ways: with your email and password, using Google OAuth, or using Facebook Login. Simply click "Sign Up" in the navigation menu and choose your preferred method.',
        },
        {
          q: 'Is Top Three Club free?',
          a: 'Yes! We offer a generous free plan that includes 3 daily tasks, basic tracking, and local storage. Premium plans start at $9.97/month and add cloud sync, unlimited history, advanced analytics, and more.',
        },
        {
          q: 'How do I get started?',
          a: 'After creating your account, you\'ll see today\'s quest with three task slots. Simply add your three most important tasks for the day and start checking them off. That\'s it! The simplicity is intentional.',
        },
      ],
    },
    {
      title: 'Features & Functionality',
      questions: [
        {
          q: 'Why only three tasks per day?',
          a: 'Research shows that three is the optimal number for memory retention and decision-making. By limiting to three tasks, you\'re forced to prioritize what truly matters. This constraint reduces overwhelm and increases the likelihood of completion.',
        },
        {
          q: 'What are daily quests?',
          a: 'Daily quests are your daily task management system. Each day, you get three task slots to fill with your most important priorities. Complete them to build streaks and track your momentum over time.',
        },
        {
          q: 'What is the brain dump feature?',
          a: 'Brain dump is where you capture ideas, thoughts, and potential tasks that come to mind. Free users can store the last 10 items locally. Premium users get unlimited cloud-synced storage for all their ideas.',
        },
        {
          q: 'Can I plan tasks for tomorrow?',
          a: 'Yes! The "tomorrow planning" feature lets you set up your three tasks for the next day in advance. This helps you start each morning with clarity and purpose.',
        },
        {
          q: 'What is the heat meter?',
          a: 'The heat meter is a visual representation of your momentum and consistency. The more consistently you complete your daily quests, the "hotter" your meter gets. It\'s a motivating way to see your progress at a glance.',
        },
      ],
    },
    {
      title: 'Free vs Premium',
      questions: [
        {
          q: 'What\'s the difference between Free and Premium?',
          a: 'Free includes 3 daily tasks, basic tracking, heat meter, and local storage. Premium adds unlimited brain dump ideas, cloud sync across devices, full quest history, advanced analytics, data export (CSV/JSON), and priority support.',
        },
        {
          q: 'Can I try Premium before committing?',
          a: 'We offer a 30-day money-back guarantee on Premium subscriptions. If you\'re not satisfied within the first 30 days, contact us for a full refund.',
        },
        {
          q: 'How does cloud sync work?',
          a: 'With Premium, all your data (quests, brain dump ideas, preferences) is automatically synced to the cloud. This means you can access your information from any device - phone, tablet, or computer.',
        },
        {
          q: 'Can I upgrade or downgrade my plan?',
          a: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately. If you downgrade, you\'ll keep Premium features until the end of your current billing period.',
        },
      ],
    },
    {
      title: 'Account & Data',
      questions: [
        {
          q: 'How do I delete my account?',
          a: 'You can delete your account from your settings page or by submitting a data deletion request through our Data Subject Request form. We\'ll permanently remove your data within 30 days.',
        },
        {
          q: 'Can I export my data?',
          a: 'Premium users can export their data in CSV or JSON format anytime from their settings. Free users can request a data export through our Data Subject Request form.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes! We use industry-standard encryption (HTTPS/SSL), secure password hashing, and PostgreSQL databases. We never sell your data to third parties. Read our Privacy Policy for complete details.',
        },
        {
          q: 'What happens to my data if I cancel Premium?',
          a: 'Your quest history and data remain intact. You\'ll still have access to the last 30 days of quest history and last 10 brain dump ideas (stored locally). Full history is preserved and will be accessible if you upgrade again.',
        },
      ],
    },
    {
      title: 'Technical & Troubleshooting',
      questions: [
        {
          q: 'Which browsers are supported?',
          a: 'Top Three Club works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.',
        },
        {
          q: 'Does it work on mobile?',
          a: 'Yes! Our web app is fully responsive and works great on phones and tablets. We\'re also considering native mobile apps in the future.',
        },
        {
          q: 'I forgot my password. What do I do?',
          a: 'Click "Forgot Password" on the login page. We\'ll send a password reset link to your email. If you signed up with Google or Facebook, simply use those login methods.',
        },
        {
          q: 'Why can\'t I log in with Google/Facebook?',
          a: 'Make sure you\'re using the same login method you used to create your account. If you originally signed up with email, you\'ll need to continue using email login (or link your social accounts from settings).',
        },
        {
          q: 'My quest isn\'t saving. What\'s wrong?',
          a: 'First, check your internet connection. Free users store data locally, so ensure your browser allows localStorage. Premium users need an active internet connection for cloud sync. Try refreshing the page and contact support if the issue persists.',
        },
      ],
    },
    {
      title: 'Billing & Payments',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor.',
        },
        {
          q: 'When will I be charged?',
          a: 'Premium subscriptions are billed monthly on the date you first subscribed. You\'ll receive an email receipt for each payment.',
        },
        {
          q: 'How do I cancel my subscription?',
          a: 'You can cancel anytime from your account settings. You\'ll retain Premium access until the end of your current billing period, then automatically switch to the Free plan.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied within the first 30 days of subscribing to Premium, contact us for a full refund.',
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ & Help Center - Top Three Club</title>
        <meta name="description" content="Find answers to frequently asked questions about Top Three Club, including features, pricing, and troubleshooting." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Help
              <br />
              <span className="gradient-text">Center</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find answers to frequently asked questions about Top Three Club.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/how-it-works" className="card p-6 text-center hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">How It Works</h3>
                <p className="text-sm text-gray-600">Learn the basics</p>
              </Link>

              <Link href="/pricing" className="card p-6 text-center hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">Pricing Plans</h3>
                <p className="text-sm text-gray-600">Compare features</p>
              </Link>

              <Link href="/contact" className="card p-6 text-center hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">Contact Support</h3>
                <p className="text-sm text-gray-600">Get personalized help</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div key={faqIndex} className="card overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                We&apos;re here to help. Reach out to our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Contact Support
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
