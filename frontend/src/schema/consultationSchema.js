export const generateConsultationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.bigbearvans.com/contact/#webpage",
      "url": "https://www.bigbearvans.com/contact",
      "name": "Book a Free Custom Van Consultation | Big Bear Vans",
      "description": `Schedule a free consultation with Big Bear Vans.
Discuss financing, book a showroom visit, or start your
custom Sprinter or Transit build today.`,
      "potentialAction": {
        "@type": "ScheduleAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.bigbearvans.com/contact",
          "inLanguage": "en",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "name": "Book a Free Consultation"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.bigbearvans.com/#organization",
      "name": "Big Bear Vans",
      "image": "https://www.bigbearvans.com/images/mission.webp",
      "telephone": "+1-951-441-9719",
      "priceRange": "$$$",
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
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-951-441-9719",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "en"
      }
    }
  ]
});