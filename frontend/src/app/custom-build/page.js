import React from 'react'
import CustomBuild from "../../components/CustomBuild/CustomBuild"

export async function generateMetadata() {
  try {
    const title = `Custom Camper Van Builds - Sprinter & Transit | Big Bear Vans`;
    const description = `100% custom Mercedes Sprinter & Ford Transit camper
van conversions. You choose the layout, materials & systems.
 105+ builds delivered - get a free quote.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ["/renderings/imperial.webp"],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: `Custom Camper Van Builds - Sprinter & Transit | Big Bear Vans`,
      description: `100% custom Mercedes Sprinter & Ford Transit camper
van conversions. You choose the layout, materials & systems.
 105+ builds delivered - get a free quote.`,
    };
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Camper Van Build",
  "serviceType": "Custom Camper Van Conversion",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Big Bear Vans",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "105"
    }
  },
  "description": `100% custom Mercedes Sprinter & Ford Transit camper
van conversions. You choose the layout, materials & systems.
 105+ builds delivered - get a free quote.`,
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom Camper Van Builds",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mercedes Sprinter Custom Build"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ford Transit Custom Build"
        }
      }
    ]
  }
};

export default function page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomBuild />
    </div>
  )
}