/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  /**
   * CRITICAL:
   * Skip trailing slash redirects entirely to prevent loops with Django
   * Django expects trailing slashes (APPEND_SLASH=True), so we pass through as-is
   */
  skipTrailingSlashRedirect: true,

  /**
   * Public env vars
   */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  /**
   * Rewrites API calls to Django backend on Render
   */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://topthreeclub.onrender.com/api/:path*',
      },
    ];
  },

  /**
   * Headers
   * ⚠️ DO NOT apply security headers to _next/*
   */
  async headers() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://www.topthree.club';

    // Check if running on Vercel
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_URL;

    return [
      /**
       * App pages ONLY (exclude Next internals)
       */
      {
        source: '/((?!_next/|favicon.ico).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com" + (isVercel ? " https://vercel.live" : ""),
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' " + apiUrl + " https://accounts.google.com" + (isVercel ? " https://vercel.live wss://ws-us3.pusher.com wss://ws-us4.pusher.com" : ""),
              "frame-src https://accounts.google.com" + (isVercel ? " https://vercel.live" : ""),
            ].join('; '),
          },
        ],
      },

      /**
       * Next.js static assets (NO CSP / NO nosniff)
       */
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      /**
       * API routes (no cache)
       */
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
