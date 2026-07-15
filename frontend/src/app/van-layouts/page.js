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

// ── EXTENDED DYNAMIC CONFIGURATION ZONE ──
const dynamicHeroData = {
  "144": {
    title: "Compact 144\" Wheelbase Designs",
    image: "/heroSlider/144.webp",
    desc: "Perfect for city driving, weekend getaways, and agile travel."
  },
  "flagship-short-van-santa-monica": {
    title: "Santa Monica Flagship Layouts",
    image: "/heroSlider/144.webp",
    desc: "Premium engineering packed inside an agile 144\" footprint."
  },
  "148": {
    title: "Standard 148\" Wheelbase Plans",
    image: "/heroSlider/148.webp",
    desc: "Versatile medium-wheelbase templates optimized for storage balanced living layouts."
  },
  "148-ext": {
    title: "Extended 148\" Wheelbase Blueprints",
    image: "/heroSlider/148-ext.webp",
    desc: "Maximizing length and space management on the versatile Transit frame."
  },
  "170": {
    title: "Extra Long 170\" Wheelbase Plans",
    image: "/heroSlider/170.webp",
    desc: "The ultimate platform for off-grid luxury and full-time van life."
  },
  "170-ext": {
    title: "170\" Extended Workspace Layouts",
    image: "/heroSlider/170-ext.webp",
    desc: "Maximum structural volume designed for comprehensive cargo configurations."
  },
  "flagship-long-van-montreal": {
    title: "Montreal Flagship Layouts",
    image: "/heroSlider/170.webp",
    desc: "Expansive high-end setups built directly on long-wheelbase platforms."
  },
  "159": {
    title: "Wide-Body 159\" Wheelbase Layouts",
    image: "/heroSlider/159.webp",
    desc: "Clever lateral width layouts perfect for custom fixed bed orientations."
  },
  "layouts-for-families-3-9-people": {
    title: "Spacious Family Van Layouts",
    image: "/heroSlider/144.webp",
    desc: "Smart multi-belt seating and modular sleeping modules designed for the whole crew."
  },
  "layouts-for-solo-and-couple-travelers": {
    title: "Solo & Couple Layout Concepts",
    image: "/heroSlider/adventure.webp",
    desc: "Streamlined ergonomics mapped out for workspace freedom and intimate living comfort."
  },
  "portfolio-of-custom-builds": {
    title: "Custom Build Portfolio Maps",
    image: "/heroSlider/adventure.webp",
    desc: "One-of-a-kind bespoke creations tailor-made to rugged engineering specifications."
  },
  "default": {
    title: "Explore Custom Van Portfolios",
    image: "/images2/layout2.webp",
    desc: "Browse our portfolio of custom van conversions, organized by wheelbase and category."
  }
};

export default async function LayoutsPage({ searchParams }) {
  const params = await searchParams;

  // 1. Array-safe normalization helper for Comma-Separated Multi-select Values
  const getFirstParamValue = (rawParam) => {
    if (!rawParam) return "";
    const actualString = Array.isArray(rawParam) ? rawParam[0] : rawParam;
    return actualString.split(",")[0].trim(); // "144,170" me se "144" nikalega hero block ke liye
  };

  const primaryCategory = getFirstParamValue(params?.category);
  const primaryWheelbase = getFirstParamValue(params?.wheelbase);
  const searchQuery = Array.isArray(params?.search) ? params.search[0] : params?.search;

  // 2. Updated Priority Matrix Evaluator Logic
  let activeKey = "default";

  if (primaryCategory && dynamicHeroData[primaryCategory]) {
    activeKey = primaryCategory;
  }
  else if (primaryWheelbase && dynamicHeroData[primaryWheelbase]) {
    activeKey = primaryWheelbase;
  }
  else if (searchQuery && dynamicHeroData[searchQuery.toLowerCase()]) {
    activeKey = searchQuery.toLowerCase();
  }

  // 3. Multi-Select Ke Liye Clean Params Object Rebuild
  // Pehle hum exact first index target kar rahe the, ab full comma strings ko backend send karna hai
  const cleanParams = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.join(",") : v
    ])
  );

  // API Call Execution
  const res = await getAllPortfolio({
    ...cleanParams,
    limit: 12,
    is_published: true,
  });

  const initialData = res?.success
    ? res.data
    : { data: [], pages: 0, page: 1, total: 0, filters: {} };

  // SEO JSON-LD Microdata Layer
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "111"
        }
      }
    }))
  };

  const currentContent = dynamicHeroData[activeKey] || dynamicHeroData["default"];

  const displayTitle = searchQuery
    ? `Search Results for: "${searchQuery}"`
    : currentContent.title;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        key={activeKey + (searchQuery || '')}
        title={displayTitle}
        description={currentContent.desc}
        image={currentContent.image}
        showButton={false}
      />

      <Van_layout
        layout={initialData}
        currentParams={cleanParams}
      />
    </main>
  );
}