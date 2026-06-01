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
        // Yeh pattern Next.js image optimization endpoint ko target karta hai
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            // Browser cache for 1 day, and CDN cache for 1 week (stale-while-revalidate)
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Aapke existing static image files ke liye
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
      // 2. Page Specific Redirects
      {
        source: "/vans-for-sale",
        destination: "/camper-vans-for-sale",
        permanent: true,
      },
      // 3. Wheelbase Redirects (Query parameters focus)
      {
        source: "/wheel-base/148",
        destination: "/van-layouts?wheelbase=148",
        permanent: true,
      },
      {
        source: "/wheel-base/144",
        destination: "/van-layouts?wheelbase=144",
        permanent: true,
      },
      {
        source: "/wheel-base/159",
        destination: "/van-layouts?wheelbase=159",
        permanent: true,
      },
      {
        source: "/wheel-base/170",
        destination: "/van-layouts?wheelbase=170",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
