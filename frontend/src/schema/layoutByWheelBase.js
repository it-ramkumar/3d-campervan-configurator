// export const generateWheelbaseLayoutsSchema = (layouts, wheelbase, currentPage = 1) => {
//   if (!layouts || layouts.length === 0) return null;

//   // ✅ Wheelbase-friendly slug
//   const wheelbaseSlug = wheelbase
//     ? wheelbase
//         .toLowerCase()
//         .replace(/[\s—–]+/g, "-") // spaces & em-dash to hyphen
//         .replace(/[^\w-]/g, "")   // remove special characters
//     : "all";

//   const baseUrl = "https://www.bigbearvans.com/layout-by-wheelbase";
//   const currentUrl = currentPage > 1
//     ? `${baseUrl}/${wheelbaseSlug}?page=${currentPage}`
//     : `${baseUrl}/${wheelbaseSlug}`;

//   return {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "CollectionPage",
//         "@id": `${currentUrl}#webpage`,
//         "url": currentUrl,
//         "name": `${wheelbase || 'All'} Wheelbase Van Layouts${currentPage > 1 ? ` - Page ${currentPage}` : ""} | Big Bear Vans`,
//         "description": `Explore our ${wheelbase || 'custom'} camper van layouts. Custom built for comfort and adventure.${currentPage > 1 ? ` Page ${currentPage}` : ""}`
//       },
//       {
//         "@type": "ItemList",
//         "@id": `${currentUrl}#itemlist`,
//         "name": `${wheelbase || 'Big Bear Vans'} Layout Gallery`,
//         "numberOfItems": layouts.length,
//         "itemListElement": layouts.map((project, index) => ({
//           "@type": "ListItem",
//           "position": index + 1,
//           "item": {
//             "@type": "Product",
//             "name": project.van_listing?.title || project.title,
//             "image": project.gallery?.[0] || "https://www.bigbearvans.com/images/limage1.webp",
//             "url": `${baseUrl}/${wheelbaseSlug}/${project.slug}`,
//             "category": wheelbase || "Camper Van Layout",
//             "brand": { "@type": "Brand", "name": "Big Bear Vans" },
//             "description": project.van_listing?.description?.substring(0, 150) || "",
//             "additionalProperty": [
//               {
//                 "@type": "PropertyValue",
//                 "name": "Seating / Sleeping",
//                 "value": `${project.van_listing?.specifications?.capacity?.sits || 0} / ${project.van_listing?.specifications?.capacity?.sleeps || 0}`
//               }
//             ]
//           }
//         }))
//       }
//     ]
//   };
// };