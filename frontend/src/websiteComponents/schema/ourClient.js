// helpers/clientStoriesSchema.js

export const generateClientStoriesSchema = () => {
  const url = typeof window !== "undefined" ? window.location.href : "https://bigbearvans.com/client-stories";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Client Stories | Big Bear Vans",
    "description": "Explore custom built campervans for families, pet owners, adventure lovers, and retirees. Real stories from real van owners.",
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Lake Tahoe Campervan - Family Edition",
          "description": "A custom 144 AWD Sprinter van designed for a family of four with elevator bed system.",
          "item": {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Family of Four" },
            "reviewBody": "Big Bear Vans had the design layout that we wanted for a family, and they're family-focused.",
            "itemReviewed": {
              "@type": "Product",
              "name": "Lake Tahoe Campervan"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cusco Campervan - Pet Friendly",
          "description": "Pet-friendly campervan featuring dedicated dog areas and climate control.",
          "item": {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Cathy and Ben" },
            "reviewBody": "One of the big reasons why we decided to go with Big Bear Vans was that we have four dogs.",
            "itemReviewed": {
              "@type": "Product",
              "name": "Cusco Campervan"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "MotoVan - Adventure Basecamp",
          "description": "Built for riders with a separate garage for three motorcycles and living space for five.",
          "item": {
             "@type": "Product",
             "name": "MotoVan"
          }
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bigbearvans.com/logo.png"
      }
    }
  };
};

/**
 * Meta Tags Helper (Optional but Recommended)
 */
export const getClientStoriesMetaTags = () => {
  return {
    title: "Our Client Stories | Custom Built Campervans by Big Bear Vans",
    description: "See how Big Bear Vans builds luxury custom vans for families, pets, and off-grid adventures. Read real customer reviews and see their builds.",
    ogImage: "https://bigbearvans.com/OurClients/v1.jpg",
    url: "https://bigbearvans.com/client-stories"
  };
};