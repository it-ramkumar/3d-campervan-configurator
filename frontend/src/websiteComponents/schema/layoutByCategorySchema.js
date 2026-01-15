export const LayoutByCategorySchema = (category, layouts) => {
  const formattedCategory = category
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${formattedCategory} Custom Camper Van Layouts | Big Bear Vans`,
    "description": `Explore professional ${formattedCategory} conversion layouts. Custom-built for comfort and adventure.`,
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