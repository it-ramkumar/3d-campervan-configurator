// export const generateLayoutSchema = (van, currentUrl) => {
//   if (!van) return null;

//   const details = van.van_listing || van;
//   const gallery = van.gallery || [van.heroImage];
//   const specs = details.specifications || {};

//   const schema = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     "@id": `${currentUrl}#product`, // ✅ Unique ID for this specific layout
//     "name": details.title || details.name,
//     "image": gallery,
//     "description": details.description || `Custom ${specs.make_model} camper van conversion layout featuring ${specs.capacity?.sits} seats and ${specs.capacity?.sleeps} berths by Big Bear Vans.`,
//     "brand": {
//       "@type": "Brand",
//       "name": "Big Bear Vans"
//     },
//     "category": "Campervan Conversion",
//     "model": specs.make_model || "",
//     "offers": {
//       "@type": "Offer",
//       "url": currentUrl,
//       "priceCurrency": "USD", // ✅ Fixed from GBP to USD
//       "availability": "https://schema.org/InStock",
//       "seller": {
//         "@type": "Organization",
//         "name": "Big Bear Vans",
//         "@id": "https://www.bigbearvans.com/#organization"
//       }
//     },
//     "additionalProperty": []
//   };

//   // ✅ Adding Specs
//   if (specs.wheelbase) {
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Wheelbase",
//       "value": specs.wheelbase
//     });
//   }

//   if (specs.capacity) {
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Sleep Capacity",
//       "value": specs.capacity.sleeps
//     });
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Seating Capacity",
//       "value": specs.capacity.sits
//     });
//   }

//   // ✅ Build Categories (Insulation, etc.)
//   if (van.detailed_features) {
//     van.detailed_features.forEach(feature => {
//       schema.additionalProperty.push({
//         "@type": "PropertyValue",
//         "name": feature.category,
//         "value": feature.items?.join(", ")
//       });
//     });
//   }

//   return schema;
// };