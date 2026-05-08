/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Public folder ki images aur static assets ko target karein
        source: '/(.*).(jpg|jpeg|png|webp|svg|ico|gif)',
        headers: [
          {
            key: 'Cache-Control',
            // 1 saal ka cache (31,536,000 seconds)
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsbl2e3mrs2k7.cloudfront.net", // Aapka image source
      },
    ],
  },

  // 301 Redirect yahan add karein
  async redirects() {
    return [
      {
        source: "/vans-for-sale",
        destination: "/camper-vans-for-sale",
        permanent: true, // Iska matlab hai 301 Permanent Redirect (SEO ke liye best)
      },
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
