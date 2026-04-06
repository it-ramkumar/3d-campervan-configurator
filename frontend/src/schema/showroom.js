export const generateShowroomSchema = (heroImage) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Big Bear Vans Showroom & Workshop",
  "image": heroImage,
  "@id": "https://www.bigbearvans.com/showroom",
  "url": "https://www.bigbearvans.com/showroom",
  "telephone": "+1-951-441-9719",
   "address": {
        "@type": "PostalAddress",
        "streetAddress": "320 W Big Bear Blvd, Big Bear, CA 92314, United States",
        "addressLocality": "Big Bear City",
        "addressRegion": "CA",
        "postalCode": "92314",
        "addressCountry": "US"
      },
   "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.260751,
        "longitude": -116.8497999
      },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "menu": "https://www.bigbearvans.com/vans-layout",
  "description": "Experience luxury custom campervan builds in person. Our California showroom offers 3D design tours and workshop walkthroughs.",
 "sameAs": [
        "https://www.instagram.com/bigbearvans",
        "https://www.facebook.com/bigbearvans",
        "https://twitter.com/bigbearvans",
        "https://www.linkedin.com/company/big-bear-vans",
        "https://www.tiktok.com/@bigbearvans_"
      ]
});