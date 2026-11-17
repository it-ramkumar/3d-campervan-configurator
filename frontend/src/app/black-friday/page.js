import { vansByStatus } from "@/api/van/van-by-status";
import { hasSale } from "@/utils/salePrice";
import { sortVansByPriority } from "@/utils/vanOrder";
import BlackFridayLanding from "@/components/BlackFriday/BlackFridayLanding";

export const dynamic = "force-dynamic";

const PAGE_URL = "https://www.bigbearvans.com/black-friday";
const OG_IMAGE = "https://www.bigbearvans.com/Home/home-portfolio-elevator-bed-big-bear-vans.webp";
const NON_IMAGE_EXT = /\.(mp4|mov|webm|m4v|pdf|glb|gltf)(\?|#|$)/i;

// Same request as the page body (Next.js dedupes it).
async function saleVans() {
  const res = await vansByStatus("available", 1, 12);
  return (res?.data || [])
    .filter((v) => v?.is_published !== false && hasSale(v.van_listing))
    .map((v) => {
      const l = v.van_listing || {};
      const images = (Array.isArray(v.gallery) ? v.gallery : []).filter(
        (src) => typeof src === "string" && src.trim() && !NON_IMAGE_EXT.test(src)
      );
      return {
        id: v._id || v.id,
        slug: v.slug,
        title: l.title || "",
        subtitle: l.subtitle || "",
        roof: l.roof || "",
        price: Number(l.price),
        sale_price: Number(l.sale_price),
        tagline: l.tagline || "",
        availability: typeof v.delivery_date === "string" ? v.delivery_date : "",
        images: images.slice(0, 12),
      };
    });
}

// Card/switcher order: Anna's priority list (the ad's van is moved first in the component).
async function orderedSaleVans() {
  return sortVansByPriority(await saleVans());
}

export async function generateMetadata() {
  const vans = await saleVans();
  const maxSavings = vans.reduce((m, v) => Math.max(m, v.price - v.sale_price), 0);
  const title = "Black Friday Camper Van Sale | Big Bear Vans";
  const description = maxSavings
    ? `Save up to $${maxSavings.toLocaleString("en-US")} on ready-to-go AWD Sprinter & Transit camper vans with indoor showers and elevator beds. Black Friday prices end Nov 28.`
    : "Black Friday prices on ready-to-go AWD Sprinter & Transit camper vans. Ends Nov 28.";
  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { title, description, url: PAGE_URL, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

// Which van the visitor came for: ?van=<slug>, or the Meta ad's utm_content
// (e.g. tof_santa_monica_exterior, bof_montreal_family). That van is shown first
// and preselected in both forms. No match = the default order.
const AD_VAN_KEYS = [
  ["santa_monica", "santa-monica"],
  ["stone_gray", "montreal-stone-gray"],
  ["montreal_pop_top", "montreal-170-awd-pop-top"],
  ["montreal_family", "montreal-170-awd-pop-top"],
  ["lowroof", "poptop-adventure-family-build"],
  ["low_roof", "poptop-adventure-family-build"],
];
function pickVan(vans, sp = {}) {
  const one = (v) => (Array.isArray(v) ? v[0] : v) || "";
  const want = one(sp.van).toLowerCase();
  if (want) {
    const hit = vans.find((v) => v.slug === want) || vans.find((v) => v.slug.startsWith(want));
    if (hit) return hit.slug;
  }
  const content = one(sp.utm_content).toLowerCase();
  for (const [key, slugStart] of AD_VAN_KEYS) {
    if (content.includes(key)) {
      const hit = vans.find((v) => v.slug.startsWith(slugStart));
      if (hit) return hit.slug;
    }
  }
  return "";
}

export default async function BlackFridayPage({ searchParams }) {
  const vans = await orderedSaleVans();
  const sp = (await searchParams) || {};
  const initialVan = pickVan(vans, sp);

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Big Bear Vans Black Friday Camper Van Sale",
    itemListElement: vans.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: v.title,
        description: v.subtitle,
        image: v.images[0],
        url: `https://www.bigbearvans.com/camper-vans-for-sale/${v.slug}`,
        brand: { "@type": "Brand", name: "Big Bear Vans" },
        offers: {
          "@type": "Offer",
          price: v.sale_price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2026-11-28",
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <BlackFridayLanding vans={vans} initialVan={initialVan} />
    </>
  );
}
