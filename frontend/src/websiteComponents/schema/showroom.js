export const generateShowroomSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Big Bear Vans Showroom",
  "image": "https://bigbearvans.com/heroSlider/Showroomhero.webp",
  "description": "Visit our van conversion workshop in Big Bear City, California. Watch the build process live and explore our van collection.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Big Bear City",
    "addressLocality": "Big Bear",
    "addressRegion": "CA",
    "countryName": "USA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "34.2611", // Apni exact coordinates check karlein
    "longitude": "-116.8450"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Showroom Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Live Build Process Tour" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Design Session" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Virtual Zoom Tours" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Pickup Service" } }
    ]
  }
});