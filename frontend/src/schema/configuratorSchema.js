import { SITE_URL, BUSINESS_REF } from "./business";

// Service, not SoftwareApplication: Google's Software App rich result requires
// aggregateRating/review, which we don't have, so it was flagged invalid
export const configuratorSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/configurator/#service`,
  "name": "Big Bear Vans 3D Configurator",
  "url": `${SITE_URL}/configurator`,
  "serviceType": "Custom Van Design",
  "description": `Design your dream Mercedes Sprinter camper van
in our free 3D configurator. Customize layouts, colors,
 and systems in real time - then get a custom quote.`,
  "image": `${SITE_URL}/custom%20build/3d-configurator-big-bear-vans.webp`,
  "isAccessibleForFree": true,
  "provider": BUSINESS_REF,
  "areaServed": "US"
});
