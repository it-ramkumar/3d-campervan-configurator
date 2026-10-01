import { SITE_URL, BUSINESS_REF } from "./business";

const PAGE_URL = `${SITE_URL}/build-your-own-camper-van`;

export const generateInquirySchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "Build Your Own Custom Camper Van - Get a Quote | Big Bear Vans",
      "description": `Configure your dream Mercedes Sprinter or Ford
Transit camper van. Choose your layout, electrical system,
and off-grid power needs, then get a custom quote.`,
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      "name": "Custom Van Configuration & Quote",
      "serviceType": "Campervan Conversion Design",
      "description": "Interactive tool to design custom van layouts and receive pricing estimates.",
      "provider": BUSINESS_REF,
      "areaServed": "US",
      "mainEntityOfPage": { "@id": `${PAGE_URL}#webpage` }
    }
  ]
});
