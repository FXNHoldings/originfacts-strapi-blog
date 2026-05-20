import type { Metadata } from 'next';
import { Outfit, Urbanist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FixedRightBar from '@/components/FixedRightBar';
import FixedPopularNow from '@/components/FixedPopularNow';
import FixedScrollToTop from '@/components/FixedScrollToTop';
import FixedSocialFollow from '@/components/FixedSocialFollow';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '@/lib/adsense';
import { listSidebarArticles } from '@/lib/strapi';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.originfacts.com'),
  title: {
    default: 'Originfacts — The facts behind every place worth visiting',
    template: '%s · Originfacts',
  },
  description:
    'The facts behind every place worth visiting — plus the latest on flights, hotels, airlines, airports and destinations.',
  openGraph: { type: 'website', siteName: 'Originfacts', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'Originfacts RSS' }],
    },
  },
  other: ADSENSE_ENABLED ? { 'google-adsense-account': ADSENSE_CLIENT } : {},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const sidebar = await listSidebarArticles(7).catch(() => ({ recent: [], popular: [] }));

  return (
    <html lang="en" className={`${outfit.variable} ${urbanist.variable}`}>
      <body className="min-h-screen flex flex-col font-sans font-normal grain" data-testid="app-shell">
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}</Script>
        {ADSENSE_ENABLED && (
          <Script
            id="adsbygoogle"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <Script id="tp-em-401311" strategy="afterInteractive">{`
          (function () {
            var script = document.createElement("script");
            script.async = 1;
            script.src = 'https://tp-em.com/NDAxMzEx.js?t=401311';
            document.head.appendChild(script);
          })();
        `}</Script>
        <Header />
        <main className="flex-1">{children}</main>
        <FixedPopularNow articles={sidebar.popular} />
        <FixedRightBar popularPosts={sidebar.popular} />
        <FixedScrollToTop />
        <FixedSocialFollow />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
