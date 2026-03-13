export const generateDynamicSchema = (options, current, categories) => {
  const baseUrl = "https://bigbearvans.com";
  const currentUrl = `${baseUrl}/options/${options}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}/#webpage`,
        "url": currentUrl,
        "name": `${current.title} | Big Bear Vans`,
        "description": current.desc,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": current.title, "item": currentUrl }
          ]
        }
      },
      {
        "@type": "ItemList",
        "name": current.title,
        "numberOfItems": categories?.length || 0,
        "itemListElement": (categories || []).map((cat, index) => {

          // ✅ Block-based content (System) vs Simple content (Interior/Exterior) logic
          const getDesc = (item) => {
            // Agar block-based hai (System options)
            if (Array.isArray(item.descriptionBlocks)) {
              return item.descriptionBlocks
                .filter(b => b.type === 'paragraph' || b.type === 'heading')
                .map(b => b.text)
                .join(" ").substring(0, 160) + "...";
            }
            // Agar simple array ya string hai (Interior/Exterior)
            if (Array.isArray(item.description)) {
              return item.description.join(" ").substring(0, 160) + "...";
            }
            return item.description || current.desc;
          };

          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service", // Options are services/upgrades
              "name": cat.name || cat.title,
              "description": getDesc(cat),
              "image": cat.image ? `${baseUrl}${cat.image}` : `${baseUrl}${current.heroImage}`,
              "provider": {
                "@type": "LocalBusiness",
                "@id": `${baseUrl}/#organization`
              }
            }
          };
        })
      }
    ]
  };
};