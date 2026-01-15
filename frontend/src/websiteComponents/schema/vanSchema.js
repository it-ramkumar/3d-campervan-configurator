export const createItemListSchema = (name, vans, availability) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": name,
  "itemListElement": vans.map((van, index) => {
    const details = van.van_listing || van;
    const specs = van.specifications || {};

    // 1. Base Property array banana specs ke liye
    const properties = [];

    // Wheelbase add karna
    if (specs.wheelbase) {
      properties.push({
        "@type": "PropertyValue",
        "name": "Wheelbase",
        "value": specs.wheelbase
      });
    }

    // Capacity (Sits/Sleeps) add karna
    if (specs.capacity) {
      if (specs.capacity.sleeps) {
        properties.push({ "@type": "PropertyValue", "name": "Sleep Capacity", "value": specs.capacity.sleeps });
      }
      if (specs.capacity.sits) {
        properties.push({ "@type": "PropertyValue", "name": "Seating Capacity", "value": specs.capacity.sits });
      }
    }

    // Features ko categories ke hisab se add karna
    if (van.detailed_features) {
      van.detailed_features.forEach(feature => {
        properties.push({
          "@type": "PropertyValue",
          "name": feature.category,
          "value": Array.isArray(feature.items) ? feature.items.join(", ") : feature.items
        });
      });
    }

    // 2. Main ListItem Return karna
    return {
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": details.title || details.name,
        "image": van.gallery?.[0] || van.heroImage,
        "description": details.description?.substring(0, 160) || `Custom built ${specs.make_model || 'Campervan'} by Big Bear Vans.`,
        "url": `https://bigbearvans.com/van-detail/${van.slug}`,
        "brand": {
          "@type": "Brand",
          "name": "Big Bear Vans"
        },
        "offers": {
          "@type": "Offer",
          "availability": `https://schema.org/${availability}`,
          "priceCurrency": "USD", // Aap GBP ya USD jo bhi use karein
          "seller": {
            "@type": "Organization",
            "name": "Big Bear Vans"
          }
        },
        "additionalProperty": properties // Yahan saare specs aur features inject ho gaye
      }
    };
  })
});