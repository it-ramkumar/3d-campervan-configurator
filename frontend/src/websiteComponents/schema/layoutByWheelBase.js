export const layoutByWheelbaseSchema = (wheelbase, layouts) => {
  // Wheelbase titles mapping
  const wheelbaseTitles = {
    "144": "Sprinter 144 Wheelbase",
    "148": "Transit 148 Wheelbase",
    "159": "Promaster 159 Wheelbase",
    "136": "Promaster 136 Wheelbase"
  };

  // Wheelbase descriptions mapping
  const wheelbaseDescriptions = {
    "144": "Explore the versatility of the Sprinter 144 wheelbase. Ideal for a range of campervan layouts, offering ample space and comfort for your adventures.",
    "148": "Discover the spacious Transit 148 wheelbase. Perfect for custom campervan builds that prioritize roominess and functionality for all your travel needs.",
    "159": "Experience the expansive Promaster 159 wheelbase. Designed for those seeking maximum interior space and flexibility in their campervan lifestyle.",
    "136": "Uncover the compact efficiency of the Promaster 136 wheelbase. Great for agile campervan designs that don't compromise on comfort and utility."
  };

  const title = wheelbaseTitles[wheelbase] || `${wheelbase} Wheelbase Camper Vans`;
  const description = wheelbaseDescriptions[wheelbase] || `Custom camper van layouts for ${wheelbase} wheelbase.`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${title} | Big Bear Vans`,
    "description": description,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": layouts.length,
      "itemListElement": layouts.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.van_listing?.title,
          "image": project.gallery?.[0],
          "url": `https://bigbearvans.com/layout-detail/${project.slug}`,
          "description": project.van_listing?.description?.substring(0, 150)
        }
      }))
    }
  };
};