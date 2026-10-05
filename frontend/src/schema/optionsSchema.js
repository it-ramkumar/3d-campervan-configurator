import { getItemTitle, getItemText } from "@/components/Options/optionBlocks";

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
        "name": current.title,
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

          // ✅ IMPORTANT: return object
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              // Service, not Product: options have no price/reviews (see detail page)
              "@type": "Service",
              "name": getItemTitle(item),
              "url": `${currentUrl}/${item.slug}`,
              "image": item.images?.[0] || `${baseUrl}/images/blackLogo.webp`,
              "description": getItemText(item) || current.desc,
              "provider": {
                "@type": "Organization",
                "name": "Big Bear Vans"
              }
            }
          };
        })
      }
    ]
  };
};