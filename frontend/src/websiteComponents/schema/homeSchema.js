// helpers/homeSchema.js

export const generateHomeSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bigbearvans.com/#organization",
        "name": "Big Bear Vans",
        "url": "https://bigbearvans.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bigbearvans.com/images/blackLogo.png",
          "width": "512",
          "height": "512"
        },
        "description": "Premium custom camper van conversions featuring 3D design and automated CNC manufacturing for Sprinter, Transit, and ProMaster vans.",
        "sameAs": [
          "https://www.facebook.com/bigbearvans",
          "https://www.instagram.com/bigbearvans",
          "https://www.tiktok.com/@bigbearvans_"
        ]
      },
      {
        "@type": "LocalBusiness",
        "parentOrganization": { "@id": "https://bigbearvans.com/#organization" },
        "name": "Big Bear Vans",
        "image": "https://bigbearvans.com/images/custom4.webp",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "320 W Big Bear Blvd, Big Bear, CA 92314, United States", // Yahan apna street address dalen
          "addressLocality": " Big Bear City",
          "addressRegion": "CA",
          "postalCode": "92314", // Apna zip code dalen
          "addressCountry": "US"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      }
    ]
  };
};