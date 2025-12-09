import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Top Three Club</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Build better habits, one day at a time.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} 3 Top Three Club. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Engineered by{' '}
              <Link 
                href="https://danieljstvincent.com" 
                className="text-gray-500 hover:text-gray-900 transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Daniel St. Vincent
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


