import HeroSection from "@/components/HeroSection/HeroSection";
import Van_layout from "@/components/van_layout/Van_layout";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";

export async function generateMetadata() {
  const res = await getAllPortfolio({ page: 1, limit: 1 });
  const totalBuilds = res?.data?.total || 105;

  const title = `Browse ${totalBuilds}+ Custom Camper Van Layouts & Floor Plans | Big Bear Vans`;

  const description = `Explore ${totalBuilds}+ custom camper van layouts including Sprinter, Transit, and family van conversions. View detailed 3D floor plans and find the perfect setup for your next adventure.`;

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

export default async function LayoutsPage({ searchParams }) {

  const params = await searchParams;

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
      "image": item.gallery?.[0] || "/images2/layout2.webp",
      "description": item.van_listing?.description || "Custom camper van floor plan",
      "brand": {
        "@type": "Brand",
        "name": "Big Bear Vans"
      }
    }
  }))
};
const wheelbaseData = {
  "144": {
    title: "Compact 144\" Wheelbase",
    image: "/heroSlider/144.webp",
    desc: "Perfect for city driving and easy parking."
  },
  "148": {
    title: "Standard 148\" Wheelbase",
    image: "/heroSlider/148.webp",
    desc: "The balanced choice for comfort and space."
  },
  "159": {
    title: "Extended 159\" Wheelbase",
    image: "/heroSlider/159.webp",
    desc: "Maximum storage for long-haul adventures."
  },
  "170": {
    title: "Extra Long 170\" Wheelbase",
    image: "/heroSlider/170.webp",
    desc: "The ultimate spacious layout for full-time living."
  },
  "default": {
    title: "Explore Layouts of Our Custom Vans",
    image: "/images2/layout2.webp",
    desc: "Explore our camper van layout options."
  }
};
// 2. Wheelbase nikalen (yahan array check bhi kar lete hain safety ke liye)
  const wb = Array.isArray(params.wheelbase) ? params.wheelbase[0] : params.wheelbase;

  // 3. Content select karein
  const currentContent = wheelbaseData[wb] || wheelbaseData.default;
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        title={currentContent.title}
        description={currentContent.desc}
        image={currentContent.image }
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