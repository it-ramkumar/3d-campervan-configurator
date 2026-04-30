import React from 'react'
import HeroSection from "@/components/HeroSection/HeroSection";
import Family from "@/components/Layouts/All_Layout/All_Layout";
import All_Titles_Client from "@/components/Layouts/All_Titles/All_Titles";
import { vanLayoutsData } from "@/DataUseInComp/LayouData";

export default function page() {

  const heroImage = "/images2/layout2.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText = "Explore our camper van layout options for 2-7 person setups. From a luxury sprinter van layout (144 & 170) to a professional food van layout, find your perfect floor plan today.";
 const LayoutText = {
    text: "Have a look at our completed projects...",
    description: "Discover the ideal camper van layout for your 2-7 person build. From luxury sprinter van layouts (144 & 170) to professional food van layouts, browse our custom floor plans and start your conversion today.",
  };
  return (
    <div>
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>

      {/* Client Component for Pagination */}
      <All_Titles_Client/>

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
