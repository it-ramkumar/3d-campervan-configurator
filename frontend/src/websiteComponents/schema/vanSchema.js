export const createItemListSchema = (name, vans, availability) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": name,
  "itemListElement": vans.map((van, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": van.van_listing?.title,
      "image": van.gallery?.[0],
      "url": `https://bigbearvans.com/van-detail/${van.slug}`,
      "offers": {
        "@type": "Offer",
        "availability": `https://schema.org/${availability}`,
        "priceCurrency": "USD"
      }
    }
  }))
});