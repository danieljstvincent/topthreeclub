import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Focus on what matters with Top Three Club. Track your top three daily tasks, build lasting habits, and overcome overwhelm. Designed for ADHD brains." />
        <meta name="keywords" content="productivity, task management, ADHD, habits, daily planner, three tasks, focus, overwhelm, executive dysfunction" />
        <meta name="author" content="Top Three Club" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://topthreeclub.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://topthreeclub.com" />
        <meta property="og:title" content="Top Three Club - Your Brain on Three Tasks" />
        <meta property="og:description" content="Focus on what matters. Forget the rest. Track your top three daily tasks and build lasting habits. No overwhelm. No guilt. Just three things." />
        <meta property="og:image" content="https://topthreeclub.com/og-image.png" />
        <meta property="og:site_name" content="Top Three Club" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://topthreeclub.com" />
        <meta name="twitter:title" content="Top Three Club - Your Brain on Three Tasks" />
        <meta name="twitter:description" content="Focus on what matters. Forget the rest. Track your top three daily tasks and build lasting habits." />
        <meta name="twitter:image" content="https://topthreeclub.com/og-image.png" />

        {/* Additional SEO */}
        <meta name="application-name" content="Top Three Club" />
        <meta name="apple-mobile-web-app-title" content="Top Three Club" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6366f1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

