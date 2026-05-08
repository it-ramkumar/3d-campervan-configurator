import React from 'react'
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import Family from "@/components/Layouts/All_Layout/All_Layout";
import All_Titles_Client from "@/components/Layouts/All_Titles/All_Titles";
import { vanLayoutsData } from "@/DataUseInComp/LayouData";
export async function generateMetadata() {
  const totalLayouts = vanLayoutsData.length;

  const title = `Browse ${totalLayouts}+ Camper Van Layout Categories | Big Bear Vans`;
  const description = `Explore ${totalLayouts}+ camper van layout categories including family vans, luxury builds, and custom conversions. Find the perfect layout for your next adventure.`;

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
export default function page() {
  const heroImage = "/images2/layout2.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText = "Explore our camper van layout options for 2-7 person setups. From a luxury sprinter van layout (144 & 170) to a professional food van layout, find your perfect floor plan today.";
  const LayoutText = {
    text: "Have a look at our completed projects...",
    description: "Discover the ideal camper van layout for your 2-7 person build. From luxury sprinter van layouts (144 & 170) to professional food van layouts, browse our custom floor plans and start your conversion today.",
  };
 const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Camper Van Layout Categories",
  "description": "Browse different camper van layout categories including family, couples, and custom builds.",
  "numberOfItems": vanLayoutsData.length,
  "itemListElement": vanLayoutsData.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "CollectionPage",
      "name": item.title,
      "url": `https://www.bigbearvans.com${item.link}`,
      "image": item.images?.[0]?.url || "/images2/layout2.webp",
      "description": item.title
    }
  }))
};
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>

      {/* Client Component for Pagination */}
      <All_Titles_Client />

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
    </div>
  )
}
