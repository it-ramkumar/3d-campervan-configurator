export const generateVanSchema = (van) => {
  if (!van) return null;

  const url = window.location.href;
  const details = van.van_listing || van;
  const gallery = van.gallery || [van.heroImage];
  const specs = details.specifications || {};

  // 1. Base Product Schema
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": details.title || details.name,
    "image": gallery,
    "description": details.description || details.subtitle || `Explore the ${details.title} custom campervan build.`,
    "brand": {
      "@type": "Brand",
      "name": "Big Bear Vans"
    },
    "category": "Campervan Conversion", // Global category
    "model": specs.make_model || "",
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Big Bear Vans"
      }
    },
    "additionalProperty": []
  };

  // 2. Wheelbase, Sit/Sleep, Make/Model ko separate properties mein add karna
  if (specs.wheelbase) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Wheelbase",
      "value": specs.wheelbase
    });
  }

  if (specs.capacity) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Sleep Capacity",
      "value": specs.capacity.sleeps
    });
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Seating Capacity",
      "value": specs.capacity.sits
    });
  }

  if (details.size) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Van Size",
      "value": details.size
    });
  }

  // 3. Build Categories (Insulation, Electrics, etc.) ko add karna
  if (van.detailed_features) {
    van.detailed_features.forEach(feature => {
      schema.additionalProperty.push({
        "@type": "PropertyValue",
        "name": `Build Feature: ${feature.category}`,
        "value": feature.items?.join(", ")
      });
    });
  }

  return schema;
};