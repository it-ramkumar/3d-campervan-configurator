export const generateDynamicSchema = (options, current, categories) => {
  const baseUrl = "https://www.bigbearvans.com";
  const currentUrl = `${baseUrl}/van-options/${options}`;

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
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": current.title,
              "item": currentUrl
            }
          ]
        }
      },
      {
        "@type": "ItemList",
        "name": current.title,
        "numberOfItems": categories?.length || 0,
        "itemListElement": (categories || []).map((item, index) => {

          // ✅ Description handler (tumhare data ke mutabiq)
          const getDesc = (item) => {
            if (Array.isArray(item.blocks) && item.blocks.length > 0) {
              return item.blocks
                .map(b => b.text || "")
                .join(" ")
                .substring(0, 160);
            }

            if (Array.isArray(item.description)) {
              return item.description.join(" ").substring(0, 160);
            }

            return item.description || current.desc;
          };

          // ✅ IMPORTANT: return object
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": item.title, // tumhare data me title hai (name nahi)
              "url": `${currentUrl}/${item.slug}`,
              "image": item.images?.[0] || "/fallback.jpg",
              "description": getDesc(item),
              "brand": {
                "@type": "Brand",
                "name": "Big Bear Vans"
              }
            }
          };
        })
      }
    ]
  };
};