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
      // /fly → /flights (search page rename, 2026-05-20). /flights is now the search page.
      { source: '/fly', destination: '/flights', permanent: true },
      // /flights/<slug> → /flight-routes/<slug>. Bare /flights now serves the new search page,
      // so only the dynamic route-detail children get redirected.
      { source: '/flights/:slug+', destination: '/flight-routes/:slug+', permanent: true },
      // TPWL whitelabel (wl_id=16677) is configured with Results Page URL pointing at
      // the bare origin, so submitting the search form on /flights lands on / with
      // ?flightSearch=… — bounce it to /flights where the #tpwl-tickets container lives.
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
