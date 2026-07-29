export const configuratorSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Service"],
    "name": "Big Bear Vans 3D Configurator",
    "operatingSystem": "Web Browser",
    "applicationCategory": "DesignApplication",
    "serviceType": "Custom Van Design",
    "description": `Design your dream Mercedes Sprinter camper van
in our free 3D configurator. Customize layouts, colors,
 and systems in real time - then get a custom quote.`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Big Bear Vans",
      "image": "/custom build/configurator.webp" // 3D tool ka screenshot URL
    }
  };
};