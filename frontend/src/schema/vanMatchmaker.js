import { BUSINESS } from "./business";

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
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
          "name": "Take the Van Matchmaker Quiz",
        },
      },
      BUSINESS,
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
