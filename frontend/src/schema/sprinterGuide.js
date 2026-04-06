// helpers/sprinterGuideSchema.js

export const generateSprinterGuideSchema = () => {
  const url = typeof window !== "undefined" ? window.location.href : "https://www.bigbearvans.com/sprinter-guide";

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Choosing The Right Sprinter Van For Custom Conversion",
    "description": "A comprehensive guide to selecting the perfect Mercedes Sprinter van configuration, wheelbase, roof height, and tech specs for your custom campervan build.",
    "url": url,
    "image": "https://www.bigbearvans.com/images/p4.webp", // Replace with actual image
    "author": {
      "@type": "Organization",
      "name": "Big Bear Vans"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bigbearvans.com/blackLogo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Van Configuration & Model Selection"
      },
      {
        "@type": "Thing",
        "name": "Wheelbase and Roof Height Options"
      },
      {
        "@type": "Thing",
        "name": "Cargo vs Crew Vans"
      },
      {
        "@type": "Thing",
        "name": "2500 vs 3500 Dually Specs"
      }
    ],
    // FAQ style for the main decision factors
    "mainEntity": {
      "@type": "ItemList",
      "name": "Key Sprinter Decision Factors",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Wheelbase Selection",
          "description": "Choosing between 144\", 170\", and 170\" Extended based on your layout needs."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Payload & Towing (2500 vs 3500)",
          "description": "Decoding the weight ratings for heavy luxury conversions and dually requirements."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Technology Packages",
          "description": "Understanding Mercedes Sprinter spec lists, safety codes, and tech upgrades."
        }
      ]
    }
  };
};

/**
 * Meta Tags Helper for Sprinter Guide
 */
export const getSprinterGuideMetaTags = () => {
  return {
    title: "Choosing The Right Sprinter Van for Conversion | Big Bear Vans Guide",
    description: "Learn how to select the best Sprinter van for your custom build. Expert advice on Wheelbase, Roof Height, 2500 vs 3500, and Crew vs Cargo models.",
    ogImage: "https://www.bigbearvans.com/images/p4.webp", // Replace with your guide's featured image
    url: "https://www.bigbearvans.com/sprinter-guide",
    keywords: "Sprinter van conversion guide, choosing a sprinter van, 144 vs 170 wheelbase, cargo vs crew van, sprinter 2500 vs 3500, custom campervan base"
  };
};