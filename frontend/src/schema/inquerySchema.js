export const generateInquirySchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bigbearvans.com/inquiry#webpage",
      "url": "https://www.bigbearvans.com/inquiry",
      "name": "Build Your Dream Van | Custom Van Configurator",
      "description": "Use our custom van configurator to design your dream Mercedes Sprinter or Ford Transit build. Choose your layout, electrical systems, and get a custom quote today.",
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": "https://www.bigbearvans.com/inquiry#service",
      "name": "Custom Van Configuration & Quote",
      "serviceType": "Campervan Conversion Design",
      "description": "Interactive tool to design custom van layouts and receive pricing estimates.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://www.bigbearvans.com/#organization",
        "name": "Big Bear Vans",
        "url": "https://www.bigbearvans.com",
        "logo": "https://www.bigbearvans.com/images/blackLogo.jpg",
        "telephone": "+1-951-441-9719",
         "address": {
        "@type": "PostalAddress",
        "streetAddress": "320 W Big Bear Blvd, Big Bear, CA 92314, United States",
        "addressLocality": "Big Bear City",
        "addressRegion": "CA",
        "postalCode": "92314",
        "addressCountry": "US"
      },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+1-951-441-9719",
          "areaServed": "US",
          "availableLanguage": "en"
        }
      },
      "areaServed": "US",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.bigbearvans.com/inquiry"
      }
    }
  ]
});