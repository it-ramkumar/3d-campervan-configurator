/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Strip console.* (except errors) from production bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Fullscreen/autoplay stay allowed for the YouTube and Maps embeds
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), usb=(), browsing-topics=()",
          },
        ],
      },
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
    qualities: [60, 70, 75, 85, 90],
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
      }
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
    source: "/van-detail/:slug+",
    destination: "/camper-vans-for-sale/:slug+",
    statusCode: 301,
  },
  {
    source: "/van-detail{/}?",
    destination: "/camper-vans-for-sale",
    statusCode: 301,
  },

  {
    source: "/layout-detail/:slug+",
    destination: "/van-layouts/:slug+",
    statusCode: 301,
  },

  {
    source: "/blog-detail/:slug+",
    destination: "/blog/:slug+",
    statusCode: 301,
  },
  // Vans listed under the wrong section
  {
    source: "/camper-vans-for-sale/madrid-campervan",
    destination: "/camper-vans-for-sale/madrid-campervan-2023-edition",
    statusCode: 301,
  },
  {
    source: "/camper-vans-for-sale/santa-monica-american-oak",
    destination: "/camper-vans-for-sale/santa-monica-american-oak-2026-edition",
    statusCode: 301,
  },
  {
    source: "/van-layouts/blue-whale-van",
    destination: "/van-layouts/blue-whale-van-2024-edition",
    statusCode: 301,
  },
    {
    source: "/camper-vans-for-sale/santa-monica-golden-brown",
    destination: "/camper-vans-for-sale/santa-monica-golden-brown-2026-edition",
    statusCode: 301,
  },
  // Inquiry page URL migration: /inquiry -> /build-your-own-camper-van
  {
    source: "/inquiry",
    destination: "/build-your-own-camper-van",
    statusCode: 301,
  },
  // Short alias for the sitemap: /site -> /sitemap.xml
  {
    source: "/site",
    destination: "/sitemap.xml",
    statusCode: 301,
  },
  // Sprinter guide URL migration: /sprinter-guide -> /sprinter-van-buying-guide
  {
    source: "/sprinter-guide",
    destination: "/sprinter-van-buying-guide",
    statusCode: 301,
  },
    ];
  },
};

export default nextConfig;
