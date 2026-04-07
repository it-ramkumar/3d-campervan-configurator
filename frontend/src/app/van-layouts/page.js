import HeroSection from "@/components/HeroSection/HeroSection";
import Family from "@/components/Layouts/All_Layout/All_Layout";
import All_Titles_Client from "@/components/Layouts/All_Titles/All_Titles";
import { vanLayoutsData } from "@/DataUseInComp/LayouData";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";

// 1. Dynamic Metadata: Jo total layouts count fetch karega
export async function generateMetadata() {
  const res = await getAllPortfolio(1, 1, ""); // Sirf total count ke liye
  const totalBuilds = res?.data?.total || 105; // Fallback agar API fail ho

  const title = `Browse Our ${totalBuilds}+ Custom Camper Van Layouts | Big Bear Vans`;
  const description = `Explore ${totalBuilds}+ 3D designed floor plans and custom camper van layouts. Find inspiration for your dream Sprinter or Transit conversion by Big Bear Vans.`;

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

export default async function LayoutsPage() {
  const LIMIT = 12;

  // 2. Server Side Fetching (Initial Page)
  const res = await getAllPortfolio(1, LIMIT, "");
  const initialData = res.success ? res.data : { data: [], pages: 0, page: 1, total: 0 };

  // 3. JSON-LD Schema (Based on real database data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Custom Camper Van Layouts & Floor Plans",
    "numberOfItems": initialData.total,
    "itemListElement": initialData.data.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.van_listing?.title || "Custom Layout",
        "url": `https://www.bigbearvans.com/layout-detail/${item.slug}`,
        "description": `Custom wheelbase ${item?.specifications?.wheelbase || ''} floor plan by Big Bear Vans.`,
        "image": item.gallery?.[0]  || "/images2/layout2.webp"
      }
    }))
  };

  const heroImage = "/images2/layout2.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText = "Explore our camper van layout options for 2-7 person setups. From a luxury sprinter van layout (144 & 170) to a professional food van layout, find your perfect floor plan today.";

  const LayoutText = {
    text: "Have a look at our completed projects...",
    description: "Explore camper van layouts for 2-7 person setups. Luxury sprinter van layouts (144 & 170) and professional food van layouts.find your perfect floor plan today",
  };

  return (
    <main>
      {/* React 19 Metadata & Script Hoisting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>

      {/* Client Component for Pagination */}
      <All_Titles_Client initialData={initialData} />

      {/* Static/Constant Layouts from Local File */}
      {vanLayoutsData.map((item) => (
        <div key={item.id} className={`tour-${item.id}`}>
          <Family
            layout={item}
            LayoutText={LayoutText}
            text={item.showIntro || false}
          />
        </div>
      ))}
    </main>
  );
}