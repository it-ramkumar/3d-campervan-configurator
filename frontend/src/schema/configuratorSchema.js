export const configuratorSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Service"],
    "name": "Big Bear Vans 3D Configurator",
    "operatingSystem": "Web Browser",
    "applicationCategory": "DesignApplication",
    "serviceType": "Custom Van Design",
    "description": "Interactive 3D tool to design and customize your own Mercedes Sprinter camper van layout, materials, and features.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Big Bear Vans",
      "image": "/custom build/configurator.png" // 3D tool ka screenshot URL
    }
  };
};