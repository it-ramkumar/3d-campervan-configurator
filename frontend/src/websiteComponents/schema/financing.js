export const generateFinancingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Big Bear Vans Financing Options",
  "description": "Custom campervan financing solutions. Options include RV loans for pre-built vans, all-in-one chassis and conversion loans, and real estate collateral financing.",
  "serviceType": ["RV Loans", "Custom Van Conversion Financing", "Auto Loans"],
  "provider": {
    "@type": "LocalBusiness",
    "name": "Big Bear Vans"
  },
  "areaServed": "USA",
  "offers": {
    "@type": "Offer",
    "description": "Extended 15-year terms for RV loans and all-in-one custom build financing with 20-30% down payment."
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://bigbearvans.com/financing"
  }
});