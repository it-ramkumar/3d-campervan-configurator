import { SITE_URL, BUSINESS_REF, AREA_SERVED } from "./business";

export const generateFinancingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${SITE_URL}/financing/#service`,
  "name": "Big Bear Vans Financing Options",
  "description": `Flexible financing for your custom Sprinter or Transit build.
15-year RV loans via Trident Funding, 20-30% down.
Get pre-qualified with Big Bear Vans today.`,
  "url": `${SITE_URL}/financing`,
  "image": `${SITE_URL}/Home/home-google-meet-big-bear-vans.webp`,
  "serviceType": [
    "RV Loans",
    "Custom Van Conversion Financing",
    "All-in-one Chassis & Build Loans"
  ],
  "provider": BUSINESS_REF,
  "areaServed": AREA_SERVED,
  "offers": {
    "@type": "Offer",
    "description": "Specialized RV financing with 20-30% down payment and terms up to 180 months (15 years).",
    "category": "RV Finance",
    "url": `${SITE_URL}/financing`
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/financing`
  }
});
