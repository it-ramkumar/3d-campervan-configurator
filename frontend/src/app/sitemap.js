// /sitemap.xml: proxies the backend sitemap (which knows every van, layout and blog post),
// rewritten to the canonical www host. Falls back to the main pages if the backend is down,
// so crawlers never get a 500.
const SITE_URL = "https://www.bigbearvans.com";

export const revalidate = 3600;

const FALLBACK_PATHS = [
  "",
  "/camper-vans-for-sale",
  "/van-layouts",
  "/build-your-own-camper-van",
  "/van-matchmaker",
  "/contact",
  "/about-us",
  "/financing",
  "/van-options/exterior-options",
  "/van-options/interior-options",
  "/van-options/system-options",
  "/sprinter-van-buying-guide",
  "/mobile-power-systems",
  "/our-process",
  "/our-clients",
  "/showroom",
  "/blog",
  "/faq",
];

const CHANGE_FREQUENCIES = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

const decodeXml = (str) =>
  str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const tag = (block, name) => {
  const match = block.match(new RegExp(`<${name}>\\s*([^<]*?)\\s*</${name}>`, "i"));
  return match ? decodeXml(match[1]) : undefined;
};

// Force every URL onto https://www.bigbearvans.com, keeping path + query
const toCanonical = (loc) => {
  try {
    const url = new URL(loc, SITE_URL);
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
    return `${SITE_URL}${path}${url.search}`;
  } catch {
    return null;
  }
};

const fallbackSitemap = () =>
  FALLBACK_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

export default async function sitemap() {
  try {
    // The backend serves /sitemap.xml at the API host root, not under NEXT_PUBLIC_URL's /api path
    const apiOrigin = new URL(process.env.NEXT_PUBLIC_URL).origin;
    const res = await fetch(`${apiOrigin}/sitemap.xml`, {
      next: { revalidate },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Backend sitemap returned ${res.status}`);

    const xml = await res.text();
    const seen = new Set();
    const entries = [];

    for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
      const url = toCanonical(tag(block, "loc") || "");
      if (!url || seen.has(url)) continue;
      seen.add(url);

      const entry = { url };
      const lastmod = tag(block, "lastmod");
      const changefreq = tag(block, "changefreq");
      const priority = parseFloat(tag(block, "priority"));
      if (lastmod) entry.lastModified = lastmod;
      if (CHANGE_FREQUENCIES.includes(changefreq)) entry.changeFrequency = changefreq;
      if (!Number.isNaN(priority)) entry.priority = priority;
      entries.push(entry);
    }

    if (!entries.length) throw new Error("Backend sitemap had no URLs");
    return entries;
  } catch (error) {
    console.error("sitemap: using fallback", error);
    return fallbackSitemap();
  }
}
