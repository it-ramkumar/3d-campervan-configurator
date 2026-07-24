export const generateVanMatchmakerSchema = (faqs) => {
  const baseUrl = "https://www.bigbearvans.com";
  const currentUrl = `${baseUrl}/van-matchmaker`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/#webpage`,
        "url": currentUrl,
        "name": "Van Matchmaker Quiz | Find Your Perfect Camper Van Layout | Big Bear Vans",
        "description":
          "Answer a few quick questions about passengers, bathroom, and power needs to get instantly matched with in-stock camper vans or custom Big Bear Vans layout blueprints.",
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "about": { "@id": `${baseUrl}/#organization` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Van Matchmaker Quiz",
              "item": currentUrl,
            },
          ],
        },
        "potentialAction": {
          "@type": "UseAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": currentUrl,
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          "name": "Take the Van Matchmaker Quiz",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        "name": "Big Bear Vans",
        "image": `${baseUrl}/images/custom4.webp`,
        "url": baseUrl,
        "telephone": "+1-951-441-9719",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "320 W Big Bear Blvd",
          "addressLocality": "Big Bear City",
          "addressRegion": "CA",
          "postalCode": "92314",
          "addressCountry": "US",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.260751,
          "longitude": -116.8497999,
        },
      },
    ],
  };

  if (faqs && faqs.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    });
  }

  return schema;
};
