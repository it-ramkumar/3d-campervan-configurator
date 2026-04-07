/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dsbl2e3mrs2k7.cloudfront.net', // Aapka image source
      },
    ],
  },

  // 301 Redirect yahan add karein
  async redirects() {
    return [
      {
        source: '/vans-for-sale',
        destination: '/camper-vans-for-sale',
        permanent: true, // Iska matlab hai 301 Permanent Redirect (SEO ke liye best)
      },
    ];
  },
};

export default nextConfig;