/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|webp|svg|ico|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true, // Core Web Vitals ke liye agar CDN (Cloudfront) use kar rahe hain toh theek hai
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsbl2e3mrs2k7.cloudfront.net",
      },
    ],
  },

  async redirects() {
    return [
      // 1. Non-WWW to WWW Redirect (Canonicalization)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bigbearvans.com',
          },
        ],
        destination: 'https://www.bigbearvans.com/:path*',
        permanent: true,
      },
      // 2. Page Specific Redirects
      {
        source: "/vans-for-sale",
        destination: "/camper-vans-for-sale",
        permanent: true,
      },
      // 3. Wheelbase Redirects (Query parameters focus)
      {
        source: '/wheel-base/148',
        destination: '/van-layouts?wheelbase=148',
        permanent: true,
      },
      {
        source: '/wheel-base/144',
        destination: '/van-layouts?wheelbase=144',
        permanent: true,
      },
      {
        source: '/wheel-base/159',
        destination: '/van-layouts?wheelbase=159',
        permanent: true,
      },
      {
        source: '/wheel-base/170',
        destination: '/van-layouts?wheelbase=170',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;