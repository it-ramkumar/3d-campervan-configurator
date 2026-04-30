import HeroSection from "@/components/HeroSection/HeroSection";
import Van_layout from "@/components/van_layout/Van_layout";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";

export async function generateMetadata() {
  const res = await getAllPortfolio({ page: 1, limit: 1 });
  const totalBuilds = res?.data?.total || 105;

  const title = `Browse Our ${totalBuilds}+ Custom Camper Van Layouts | Big Bear Vans`;
  const description = `Explore ${totalBuilds}+ 3D designed floor plans and custom camper van layouts.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/images2/layout2.webp"],
    },
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
    "numberOfItems": initialData.total,
    "itemListElement": (initialData.data || []).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.van_listing?.title || "Custom Layout",
        "url": `https://www.bigbearvans.com/layout-detail/${item.slug}`,
        "description": "Custom camper van floor plan",
        "image": item.gallery?.[0] || "/images2/layout2.webp"
      }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        title="Explore Layouts of Our Custom Vans"
        description="Explore our camper van layout options."
        image="/images2/layout2.webp"
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