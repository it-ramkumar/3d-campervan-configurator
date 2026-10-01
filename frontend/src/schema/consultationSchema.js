import { SITE_URL, BUSINESS, PHONE } from "./business";

export const generateConsultationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact/#webpage`,
      "url": `${SITE_URL}/contact`,
      "name": "Book a Free Custom Van Consultation | Big Bear Vans",
      "description": `Schedule a free consultation with Big Bear Vans.
Discuss financing, book a showroom visit, or start your
custom Sprinter or Transit build today.`,
      "inLanguage": "en-US",
      "about": { "@id": BUSINESS["@id"] },
      "potentialAction": {
        "@type": "ScheduleAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/contact`,
          "inLanguage": "en-US",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "name": "Book a Free Consultation"
      }
    },
    {
      ...BUSINESS,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": PHONE,
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "en"
      }
    }
  ]
});
