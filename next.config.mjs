/** @type {import('next').NextConfig} */
const strapiHost = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.fxnstudio.com'
).hostname;

const nextConfig = {
  reactStrictMode: true,
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
      // Old /flights/<slug> route-detail pages → /flight-routes/<slug>. Must come before
      // the bare /flights redirect so it takes precedence.
      { source: '/flights/:slug+', destination: '/flight-routes/:slug+', permanent: true },
      // Search page renamed from /flights → /flight-search on 2026-05-20.
      { source: '/flights', destination: '/flight-search', permanent: true },
      { source: '/fly', destination: '/flight-search', permanent: true },
      // TPWL whitelabel (wl_id=16677) is configured with Results Page URL pointing at
      // the bare origin, so submitting the search form lands on / with ?flightSearch=…
      // — bounce it to /flight-search where the #tpwl-tickets container lives.
      // Soft redirect (permanent:false) — the proper fix is to clear the resultsURL in
      // the TP admin so search rendering stays in-place.
      {
        source: '/',
        has: [{ type: 'query', key: 'flightSearch' }],
        destination: '/flight-search',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
