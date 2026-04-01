export const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://bigbearvans.com/about-us/#webpage",
      "url": "https://bigbearvans.com/about-us",
      "name": "About Big Bear Vans | Our Story & Founders",
      "description": "Meet Artur and Anna, the founders of Big Bear Vans. Learn about our journey in building innovative, family-friendly custom campervans in California.",
      "publisher": { "@id": "https://bigbearvans.com/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://bigbearvans.com/#organization",
      "name": "Big Bear Vans",
      "image": "https://bigbearvans.com/images/mission.webp",
      "description": "Specializing in family-friendly custom campervan builds with innovative space-saving solutions like elevator beds and compact aluminum bathrooms.",
      "url": "https://bigbearvans.com",
      "telephone": "+1 951-441-9719",
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
      "founder": [
        {
          "@type": "Person",
          "name": "Artur",
          "jobTitle": "Co-Founder & Lead Engineer",
          "image": "https://bigbearvans.com/images/anna.webp"
        },
        {
          "@type": "Person",
          "name": "Anna",
          "jobTitle": "Co-Founder & Design Lead",
          "image": "https://bigbearvans.com/images/anna.webp"
        }
      ],
      "knowsAbout": [
        "Custom Van Conversions",
        "Sprinter Van Builds",
        "RV Innovation",
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