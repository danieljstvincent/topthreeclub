import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Top Three Club</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* 404 Content */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Large 404 */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none">
                404
              </h1>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="btn-primary px-8 py-3 text-lg"
              >
                Go Home
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary px-8 py-3 text-lg"
              >
                View Dashboard
              </Link>
            </div>

            {/* Popular Links */}
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">
                Popular Pages
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/features" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Features
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  How It Works
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  About
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
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
