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
  // Van detail URL migration: /van-detail/{slug} -> /camper-vans-for-sale/{slug}
  // Child pages first (must be matched before the exact-hub rule below).
  // statusCode: 301 is used explicitly (instead of permanent: true, which this
  // Next.js version maps to 308) so these are literal HTTP 301s.
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
  // Layout detail URL migration: /layout-detail/{slug} -> /van-layouts/{slug}
  // Query strings (e.g. ?view=floorplan) pass through automatically.
  // No bare "/layout-detail" -> "/van-layouts" rule: there is no page at the
  // bare path today (it 404s) and nothing in the codebase links to it without
  // a slug, so that rule is intentionally omitted.
  {
    source: "/layout-detail/:slug+",
    destination: "/van-layouts/:slug+",
    statusCode: 301,
  },
  // Blog detail URL migration: /blog-detail/{slug} -> /blog/{slug}
  // No bare "/blog-detail" -> "/blog" rule: there is no page at the bare path
  // today (it 404s) and nothing live in the codebase links to it without a
  // slug, so that rule is intentionally omitted (same reasoning as layout-detail).
  {
    source: "/blog-detail/:slug+",
    destination: "/blog/:slug+",
    statusCode: 301,
  },
    ];
  },
};

export default nextConfig;
