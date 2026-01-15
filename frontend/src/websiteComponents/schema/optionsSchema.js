// helpers/schemaHelper.js

export const generateDynamicSchema = (options, currentConfig, categories) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": currentConfig.title,
    "description": currentConfig.desc,
    "url": window.location.href,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 0,
      "itemListElement": []
    }
  };

  if (categories && categories.length > 0) {
    let counter = 1;
    const items = [];

    categories.forEach((cat) => {
      // Direct items aur subcategories dono se items nikalna
      const catItems = cat.items || [];
      const subCatItems = cat.subCategories?.flatMap(sub => sub.items) || [];
      const allItems = [...catItems, ...subCatItems];

      allItems.forEach((item) => {
        items.push({
          "@type": "ListItem",
          "position": counter++,
          "item": {
            "@type": "Product",
            "name": item.title,
            "description": item.description?.[0] || item.title,
            "image": item.images?.[0] || "",
            "brand": {
              "@type": "Brand",
              "name": "Big Bear Vans"
            }
          }
        });
      });
    });

    baseSchema.mainEntity.itemListElement = items;
    baseSchema.mainEntity.numberOfItems = items.length;
  }

  return baseSchema;
};