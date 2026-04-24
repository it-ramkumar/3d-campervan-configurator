// export const createItemListSchema = (name, vans, availability) => ({
//   "@context": "https://schema.org",
//   "@type": "ItemList",
//   "name": name,
//   "numberOfItems": vans.length,
//   "itemListElement": vans.map((van, index) => {
//     const details = van.van_listing || van;
//     const specs = van.specifications || {};

//     // 1. Base Property array banana specs ke liye
//     const properties = [];

//     // Make/Model add karna
//     if (specs.make_model) {
//       properties.push({
//         "@type": "PropertyValue",
//         "name": "Make & Model",
//         "value": specs.make_model
//       });
//     }

//     // Year add karna
//     if (specs.year) {
//       properties.push({
//         "@type": "PropertyValue",
//         "name": "Year",
//         "value": specs.year.toString()
//       });
//     }

//     // Wheelbase add karna
//     if (specs.wheelbase) {
//       properties.push({
//         "@type": "PropertyValue",
//         "name": "Wheelbase",
//         "value": specs.wheelbase
//       });
//     }

//     // Engine specs
//     if (specs.engine) {
//       properties.push({
//         "@type": "PropertyValue",
//         "name": "Engine",
//         "value": specs.engine
//       });
//     }

//     // Mileage
//     if (specs.mileage) {
//       properties.push({
//         "@type": "PropertyValue",
//         "name": "Mileage",
//         "value": specs.mileage.toString()
//       });
//     }

//     // Capacity (Sits/Sleeps) add karna
//     if (specs.capacity) {
//       if (specs.capacity.sleeps) {
//         properties.push({
//           "@type": "PropertyValue",
//           "name": "Sleep Capacity",
//           "value": specs.capacity.sleeps.toString()
//         });
//       }
//       if (specs.capacity.sits) {
//         properties.push({
//           "@type": "PropertyValue",
//           "name": "Seating Capacity",
//           "value": specs.capacity.sits.toString()
//         });
//       }
//     }

//     // Features ko categories ke hisab se add karna
//     if (van.detailed_features && Array.isArray(van.detailed_features)) {
//       van.detailed_features.forEach(feature => {
//         if (feature.category && feature.items) {
//           properties.push({
//             "@type": "PropertyValue",
//             "name": feature.category,
//             "value": Array.isArray(feature.items) ? feature.items.join(", ") : feature.items.toString()
//           });
//         }
//       });
//     }

//     // Price add karna if available
//     const offerData = {
//       "@type": "Offer",
//       "availability": `https://schema.org/${availability}`,
//       "priceCurrency": "USD",
//       "seller": {
//         "@type": "Organization",
//         "name": "Big Bear Vans",
//         "url": "https://www.bigbearvans.com"
//       }
//     };

//     // Price add karna if available
//     if (details.price || van.price) {
//       offerData.price = details.price || van.price;
//     }

//     // Sale date for sold vans
//     if (availability === "OutOfStock" && van.soldDate) {
//       offerData.validThrough = van.soldDate;
//     }

//     // 2. Main ListItem Return karna
//     return {
//       "@type": "ListItem",
//       "position": index + 1,
//       "item": {
//         "@type": "Product",
//         "name": details.title || details.name || `Custom ${specs.make_model || 'Campervan'}`,
//         "image": van.gallery?.[0] || van.heroImage || "https://www.bigbearvans.com/images/blackLogo.jpg",
//         "description": details.description?.substring(0, 160) || `Custom built ${specs.make_model || 'Campervan'} by Big Bear Vans with premium features and quality craftsmanship.`,
//         "url": `https://www.bigbearvans.com/van-detail/${van.slug}`,
//         "brand": {
//           "@type": "Brand",
//           "name": "Big Bear Vans",
//           "url": "https://www.bigbearvans.com"
//         },
//         "manufacturer": {
//           "@type": "Organization",
//           "name": "Big Bear Vans",
//           "url": "https://www.bigbearvans.com"
//         },
//         "category": "Recreational Vehicle",
//         "vehicleConfiguration": "Van",
//         "offers": offerData,
//         "additionalProperty": properties, // Yahan saare specs aur features inject ho gaye

//         // Review/Rating add kar sakte hain if available
//         ...(van.rating && {
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": van.rating,
//             "bestRating": "5",
//             "worstRating": "1"
//           }
//         })
//       }
//     };
//   })
// });