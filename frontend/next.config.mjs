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
};

export default nextConfig;
