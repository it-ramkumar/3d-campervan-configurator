export const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.bigbearvans.com/about-us/#webpage",
      "url": "https://www.bigbearvans.com/about-us",
      "name": "About Big Bear Vans - Our Story & Team | Big Bear Vans",
      "description": `Meet the team behind Big Bear Vans. Founded by van lifers
 Artur & Anna, we've delivered 105+ custom Sprinter and
Transit camper van conversions.`,
      "publisher": { "@id": "https://www.bigbearvans.com/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.bigbearvans.com/#organization",
      "name": "Big Bear Vans",
      "image": "https://www.bigbearvans.com/images/mission.webp",
"description": `Meet the team behind Big Bear Vans. Founded by van lifers
 Artur & Anna, we've delivered 105+ custom Sprinter and
Transit camper van conversions.`,
      "url": "https://www.bigbearvans.com",
      "telephone": "+1-951-441-9719",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "320 W Big Bear Blvd",
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
      "founder": [
        {
          "@type": "Person",
          "name": "Artur",
          "jobTitle": "Co-Founder & Lead Engineer"
        },
        {
          "@type": "Person",
          "name": "Anna",
          "jobTitle": "Co-Founder & Design Lead",
          "image": "https://www.bigbearvans.com/images/anna.webp"
        }
      ],
      "knowsAbout": [
        "Custom Van Conversions",
        "Sprinter Van Builds",
        "Ford Transit Conversions",
        "Family Campervans",
        "CNC Engineered Cabinetry"
      ],
      "sameAs": [
        "https://www.instagram.com/bigbearvans",
        "https://www.facebook.com/bigbearvans",
        "https://twitter.com/bigbearvans",
        "https://www.linkedin.com/company/big-bear-vans",
        "https://www.tiktok.com/@bigbearvans_"
      ]
    }
  ]
});