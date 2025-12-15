import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: { id: number; username: string; email: string } | null;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ user, isAuthenticated, onLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2" onClick={handleMobileLinkClick}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Top Three Club</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{user?.username}</span>
                    </div>
                    <button
                      onClick={onLogout}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-gray-600 hover:text-gray-900 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleMobileMenuToggle}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <Link
            href="/how-it-works"
            className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleMobileLinkClick}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleMobileLinkClick}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleMobileLinkClick}
          >
            Pricing
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={handleMobileLinkClick}
              >
                Dashboard
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={() => {
                    handleMobileLinkClick();
                    onLogout?.();
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                onClick={handleMobileLinkClick}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                onClick={handleMobileLinkClick}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

