// export const generateVanSchema = (van) => {
//   if (!van) return null;

//   const url = window.location.href;
//   const details = van.van_listing || van;
//   const gallery = van.gallery || [van.heroImage];
//   const specs = van.specifications || {};

//   // Determine availability status
//   const getAvailabilityStatus = () => {
//     const status = van.status?.toLowerCase();
//     switch (status) {
//       case 'available': return 'https://schema.org/InStock';
//       case 'sold': return 'https://schema.org/OutOfStock';
//       case 'sale_pending': return 'https://schema.org/InStoreOnly';
//       case 'coming_soon': return 'https://schema.org/PreOrder';
//       default: return 'https://schema.org/InStock';
//     }
//   };

//   // Create comprehensive product schema
//   const schema = {
//     "@context": "https://schema.org/",
//     "@type": ["Product", "Vehicle"],
//     "name": details.title || details.name || `Custom ${specs.make_model || 'Campervan'}`,
//     "image": gallery.filter(img => img), // Remove empty images
//     "description": details.description || details.subtitle || `Explore the ${details.title} custom campervan build by Big Bear Vans with premium features and quality craftsmanship.`,
//     "url": url,
//     "brand": {
//       "@type": "Brand",
//       "name": "Big Bear Vans",
//       "url": "https://www.bigbearvans.com"
//     },
//     "manufacturer": {
//       "@type": "Organization",
//       "name": "Big Bear Vans",
//       "url": "https://www.bigbearvans.com",
//       "logo": "https://www.bigbearvans.com/images/logo.png"
//     },
//     "category": "Recreational Vehicle",
//     "vehicleConfiguration": "Van",
//     "bodyType": "Van",
//     "fuelType": specs.fuel_type || "Diesel",
//     "additionalProperty": []
//   };

//   // Add offers with proper pricing
//   const offerData = {
//     "@type": "Offer",
//     "url": url,
//     "priceCurrency": "USD", // Change to GBP if needed
//     "availability": getAvailabilityStatus(),
//     "seller": {
//       "@type": "Organization",
//       "name": "Big Bear Vans",
//       "url": "https://www.bigbearvans.com"
//     }
//   };

//   // Add price if available and valid
//   if (details.price && details.price > 1000) {
//     offerData.price = details.price;
//     offerData.priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 90 days from now
//   } else if (van.price && van.price > 1000) {
//     offerData.price = van.price;
//     offerData.priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
//   }

//   // Add sold date for sold vans
//   if (van.status === 'sold' && van.soldDate) {
//     offerData.validThrough = van.soldDate;
//   }

//   schema.offers = offerData;

//   // Vehicle-specific properties
//   if (specs.make_model) {
//     const [make, ...modelParts] = specs.make_model.split(' ');
//     schema.vehicleModelDate = specs.year || new Date().getFullYear();
//     schema.model = modelParts.join(' ') || specs.make_model;

//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Make & Model",
//       "value": specs.make_model
//     });
//   }

//   if (specs.year) {
//     schema.vehicleModelDate = specs.year;
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Year",
//       "value": specs.year.toString()
//     });
//   }

//   if (specs.wheelbase) {
//     schema.wheelbase = specs.wheelbase;
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Wheelbase",
//       "value": specs.wheelbase
//     });
//   }

//   if (specs.engine) {
//     schema.vehicleEngine = {
//       "@type": "EngineSpecification",
//       "name": specs.engine
//     };
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Engine",
//       "value": specs.engine
//     });
//   }

//   if (specs.mileage) {
//     schema.mileageFromOdometer = {
//       "@type": "QuantitativeValue",
//       "value": specs.mileage,
//       "unitCode": "SMI" // Statute miles
//     };
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Mileage",
//       "value": `${specs.mileage} miles`
//     });
//   }

//   // Capacity information
//   if (specs.capacity) {
//     if (specs.capacity.sleeps) {
//       schema.additionalProperty.push({
//         "@type": "PropertyValue",
//         "name": "Sleep Capacity",
//         "value": specs.capacity.sleeps.toString()
//       });
//     }
//     if (specs.capacity.sits) {
//       schema.seatingCapacity = specs.capacity.sits;
//       schema.additionalProperty.push({
//         "@type": "PropertyValue",
//         "name": "Seating Capacity",
//         "value": specs.capacity.sits.toString()
//       });
//     }
//   }

//   // Van size/configuration
//   if (details.size) {
//     schema.additionalProperty.push({
//       "@type": "PropertyValue",
//       "name": "Van Configuration",
//       "value": details.size
//     });
//   }

//   // Build features organized by category
//   if (van.detailed_features && Array.isArray(van.detailed_features)) {
//     van.detailed_features.forEach(feature => {
//       if (feature.category && feature.items) {
//         const items = Array.isArray(feature.items) ? feature.items : [feature.items];
//         schema.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": feature.category,
//           "value": items.join(", ")
//         });
//       }
//     });
//   }

//   // Add review/rating if available
//   if (van.rating || van.reviews) {
//     schema.aggregateRating = {
//       "@type": "AggregateRating",
//       "ratingValue": van.rating || "5",
//       "bestRating": "5",
//       "worstRating": "1",
//       "ratingCount": van.reviewCount || "1"
//     };
//   }

//   // Add warranty information
//   schema.warranty = {
//     "@type": "WarrantyPromise",
//     "durationOfWarranty": "P1Y", // 1 year
//     "warrantyScope": "All pre-built vans come with a 1-year warranty (excludes third-party products)"
//   };

//   // Add build completion date if available
//   if (van.completionDate || van.buildDate) {
//     schema.releaseDate = van.completionDate || van.buildDate;
//   }

//   return schema;
// };