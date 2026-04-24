// export const generateCategorizedLayoutsSchema = (layouts, categoryName, currentPage = 1) => {
//   if (!layouts || layouts.length === 0) return null;

//   // ✅ Slug-friendly URL banayein
//   const categorySlug = categoryName
//     ? categoryName
//       .toLowerCase()
//       .replace(/[\s—–]+/g, "-") // spaces & em-dash ko hyphen me convert karein
//       .replace(/[^\w-]/g, "") // special characters remove karein
//     : "all";

//   const baseUrl = "https://www.bigbearvans.com/layout-by-category";
//   const currentUrl = currentPage > 1
//     ? `${baseUrl}/${categorySlug}?page=${currentPage}`
//     : `${baseUrl}/${categorySlug}`;

//   return {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "CollectionPage",
//         "@id": `${currentUrl}#webpage`,
//         "url": currentUrl,
//         "name": `${categoryName || 'All'} Van Conversion Layouts${currentPage > 1 ? ` - Page ${currentPage}` : ""} | Big Bear Vans`,
//         "description": `Browse our ${categoryName || 'custom'} configurations. Custom built for comfort and adventure.${currentPage > 1 ? ` Page ${currentPage}` : ""}`,
//       },
//       {
//         "@type": "ItemList",
//         "@id": `${currentUrl}#itemlist`,
//         "name": `${categoryName || 'Big Bear Vans'} Layout Gallery`,
//         "numberOfItems": layouts.length,
//         "itemListElement": layouts.map((layout, index) => ({
//           "@type": "ListItem",
//           "position": index + 1,
//           "item": {
//             "@type": "Product",
//             "name": layout.title,
//             "image": layout.gallery[0] || "https://www.bigbearvans.com/images/p2.webp",
//             "url": `${baseUrl}/${categorySlug}/${layout.slug}`,
//             "category": categoryName || "Camper Van Layout",
//             "brand": { "@type": "Brand", "name": "Big Bear Vans" },
//             "additionalProperty": [
//               { "@type": "PropertyValue", "name": "Seating Capacity", "value": layout.van_listing.specifications?.capacity?.sits || 0 },
//               { "@type": "PropertyValue", "name": "Sleeping Capacity", "value": layout.van_listing.specifications?.capacity?.sleeps || 0 }
//             ]
//           }
//         }))
//       }
//     ]
//   };
// };