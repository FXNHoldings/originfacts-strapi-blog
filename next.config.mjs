/** @type {import('next').NextConfig} */
const strapiHost = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.fxnstudio.com'
).hostname;

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['preview.fxnstudio.com'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: strapiHost },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // Travel Resources merged into Travel Tips on 2026-05-02.
      { source: '/category/travel-resources', destination: '/category/travel-tips', permanent: true },
      // Car Rental → Car Rentals (category renamed in Strapi, 2026-05-20).
      { source: '/category/car-rental', destination: '/category/car-rentals', permanent: true },
      // Staging → production: bounce every /flights visit on the
      // originfacts.fxnstudio.com host over to www.originfacts.com so
      // bookings go through the production TravelPayouts affiliate config.
      // (Vercel prod doesn't match this host predicate, so the rule is a
      // no-op there.) Must precede the /flights/:slug+ rule below.
      {
        source: '/flights/:path*',
        has: [{ type: 'host', value: 'originfacts.fxnstudio.com' }],
        destination: 'https://www.originfacts.com/flights/:path*',
        permanent: false,
      },
      // Old /flights/<slug> route-detail pages → /flight-routes/<slug>. Must come before
      // the /flights page so detail slugs don't try to hit the search widget.
      { source: '/flights/:slug+', destination: '/flight-routes/:slug+', permanent: true },
      // Search page lived briefly at /flight-search; canonical name is /flights now.
      { source: '/flight-search', destination: '/flights', permanent: true },
      { source: '/fly', destination: '/flights', permanent: true },
      // TPWL whitelabel (wl_id=16677) is configured with Results Page URL pointing at
      // the bare origin, so submitting the search form lands on / with ?flightSearch=…
      // — bounce it to /flights where the #tpwl-tickets container lives.
      // Soft redirect (permanent:false) — the proper fix is to clear the resultsURL in
      // the TP admin so search rendering stays in-place.
      {
        source: '/',
        has: [{ type: 'query', key: 'flightSearch' }],
        destination: '/flights',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
