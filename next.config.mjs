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
    ];
  },
};

export default nextConfig;
