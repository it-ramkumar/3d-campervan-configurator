import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import Van_layout from "@/components/van_layout/Van_layout";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";

export async function generateMetadata() {
  const res = await getAllPortfolio({ page: 1, limit: 1 });
  const totalBuilds = res?.data?.total || 105;

  const title = `Custom Camper Van Layouts & Floor Plans | Big Bear Vans`;

  const description = `Browse ${totalBuilds}+ Sprinter & Transit floor plans with detailed 3D views. Find the perfect layout for 2-7 people — families, couples, and full-time van lifers. Built in California.`;

  return {
    title,
    description,
    keywords: [
      "camper van layouts",
      "van conversion floor plans",
      "sprinter van layouts",
      "custom camper vans",
      "van build layouts"
    ],
    openGraph: {
      title,
      description,
      images: ["/images2/layout2.webp"],
      type: "website"
    },
    alternates: {
      canonical: "https://www.bigbearvans.com/van-layouts"
    }
  };
}
// Is object ko component ke bahar (import ke niche) rakhein
const dynamicHeroData = {
  "imperial": {
    title: "Spacious Family Van Layouts",
    image: "/heroSlider/144.webp",
    desc: "Designed for comfort with the whole crew."
  },
  "adventure-ready": {
    title: "Off-Grid Adventure Layouts",
    image: "/heroSlider/adventure.webp",
    desc: "Rugged designs for the wild."
  },
  "144": {
    title: "Compact 144\" Wheelbase Designs",
    image: "/heroSlider/144.webp",
    desc: "Perfect for city driving and agile travel."
  },
  "170": {
    title: "Extra Long 170\" Wheelbase Plans",
    image: "/heroSlider/170.webp",
    desc: "The ultimate space for full-time van life."
  },
  "default": {
    title: "Explore Custom Van Layouts",
    image: "/images2/layout2.webp",
    desc: "Find the perfect floor plan for your dream build."
  }
};
export default async function LayoutsPage({ searchParams }) {

  const params = await searchParams;
  // 1. Saare params ko extract karein
  // 1. Safety ke liye values ko normalize karein (string banayein)
// 1. Params normalize karein
const category = Array.isArray(params?.category) ? params.category[0] : params?.category;
const wheelbase = Array.isArray(params?.wheelbase) ? params.wheelbase[0] : params?.wheelbase;
const searchQuery = Array.isArray(params?.search) ? params.search[0] : params?.search;

// 2. Updated Priority Logic
let activeKey = "default";

if (category && dynamicHeroData[category]) {
  activeKey = category;
}
else if (wheelbase && dynamicHeroData[wheelbase]) {
  activeKey = wheelbase;
}
// ✅ Yeh naya hissa add karein:
else if (searchQuery && dynamicHeroData[searchQuery.toLowerCase()]) {
  activeKey = searchQuery.toLowerCase();
}

  // optional: normalize values (important for backend stability)
  const cleanParams = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : v
    ])
  );
  // console.log("Received searchParams in page component:", params);
  // ✅ API CALL
  const res = await getAllPortfolio({
    ...cleanParams,
    limit: 12,
  });

  const initialData = res?.success
    ? res.data
    : { data: [], pages: 0, page: 1, total: 0, filters: {} };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Custom Camper Van Layouts",
  "description": "Browse custom camper van layouts and floor plans designed by Big Bear Vans.",
  "numberOfItems": initialData.total,
  "itemListElement": (initialData.data || []).map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": item.van_listing?.title || "Custom Camper Van Layout",
      "url": `https://www.bigbearvans.com/layout-detail/${item.slug}`,
      "image": item.gallery?.[0]
        ? item.gallery[0].startsWith("http")
          ? encodeURI(item.gallery[0])
          : `https://www.bigbearvans.com${item.gallery[0]}`
        : "https://www.bigbearvans.com/images2/layout2.webp",
      "description": item.van_listing?.description || "Custom camper van floor plan",
      "brand": {
        "@type": "Brand",
        "name": "Big Bear Vans"
      },
      // ✅ Sahi jagah — Product ke andar
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "111"
      }
    }
  }))
};
const currentContent = dynamicHeroData[activeKey];// Title handle karein
  const displayTitle = searchQuery
    ? `Search Results for: "${searchQuery}"`
    : currentContent.title;
    console.log(currentContent,"content")
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    <HeroSection
        key={activeKey + searchQuery} // Key change hote hi React image swap kar dega
        title={displayTitle}
        description={currentContent.desc}
        image={currentContent.image}
        showButton={false}
      />


      {/* ✅ IMPORTANT: pass cleanParams not raw searchParams */}
      <Van_layout
        layout={initialData}
        currentParams={cleanParams}
      />
    </main>
  );
}