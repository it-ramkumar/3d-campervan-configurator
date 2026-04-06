export const generateFinancingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://www.bigbearvans.com/financing/#service",
  "name": "Big Bear Vans Financing Options",
  "description": "Flexible campervan financing with 15-year terms. Partnered with Trident Funding for specialized RV loans and all-in-one van conversion financing.",
  "url": "https://www.bigbearvans.com/financing",
  "serviceType": [
    "RV Loans",
    "Custom Van Conversion Financing",
    "All-in-one Chassis & Build Loans"
  ],
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://www.bigbearvans.com/#organization",
    "name": "Big Bear Vans",
    "image": "https://www.bigbearvans.com/heroSlider/limage2.webp",
    "telephone": "+1-951-441-9719",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "320 W Big Bear Blvd, Big Bear, CA 92314, United States",
      "addressLocality": "Big Bear City",
      "addressRegion": "CA",
      "postalCode": "92314",
      "addressCountry": "US"
    }
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": {
    "@type": "Offer",
    "description": "Specialized RV financing with 20-30% down payment and terms up to 180 months (15 years).",
    "category": "RV Finance",
    "priceCurrency": "USD",
    "url": "https://www.bigbearvans.com/financing"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.bigbearvans.com/financing"
  }
});