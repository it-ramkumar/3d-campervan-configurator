export const generateHomeSchema = (faqData) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.bigbearvans.com/#website",
        "url": "https://www.bigbearvans.com",
        "name": "Big Bear Vans",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.bigbearvans.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.bigbearvans.com/#organization",
        "name": "Big Bear Vans",
        "url": "https://www.bigbearvans.com",
        "logo": "https://www.bigbearvans.com/images/blackLogo.jpg",
        "description": "Premium custom camper van conversions featuring 3D design and automated CNC manufacturing.",
        "sameAs": [
          "https://www.instagram.com/bigbearvans",
          "https://www.facebook.com/bigbearvans",
          "https://twitter.com/bigbearvans",
          "https://www.linkedin.com/company/big-bear-vans",
          "https://www.tiktok.com/@bigbearvans_"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.bigbearvans.com/#localbusiness",
        "parentOrganization": { "@id": "https://www.bigbearvans.com/#organization" },
        "name": "Big Bear Vans",
        "image": "https://www.bigbearvans.com/images/custom4.webp",
        "priceRange": "$$$",
        "telephone": "+1-951-441-9719",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "320 W Big Bear Blvd",
          "addressLocality": "Big Bear City",
          "addressRegion": "CA",
          "postalCode": "92314",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.260751,
          "longitude": -116.8497999
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      }
    ]
  };

  // ✅ FAQ Logic: Agar faqData hai toh usay @graph mein push karein
  if (faqData && faqData.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": faqData.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  return schema;
};