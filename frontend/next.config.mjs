/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // next.config.mjs mein images section ke bahar yeh headers section add karo

  async headers() {
    return [
          {
        source: "/:all*(jpg|jpeg|png|webp|svg|ico|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsbl2e3mrs2k7.cloudfront.net",
        port: "",
        pathname: "/**",
      },
        {
        protocol: "https",
        hostname: "*.previews.dropboxusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bigbearvans.com", // ← ADD THIS
        port: "",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      // 1. Non-WWW to WWW Redirect (Canonicalization)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "bigbearvans.com",
          },
        ],
        destination: "https://www.bigbearvans.com/:path*",
        permanent: true,
      },
{
    source: "/vans-for-sale",
    destination: "/camper-vans-for-sale",
    permanent: true, // This triggers a 301 permanent redirect
  },
  {
    source: "/layout-by-category",
    destination: "/van-layouts",
    permanent: true, // This triggers a 301 permanent redirect
  },
    ];
  },
};

export default nextConfig;
