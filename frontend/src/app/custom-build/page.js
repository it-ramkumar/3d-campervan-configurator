import React from 'react'
import { BUSINESS_REF } from "@/schema/business";
import CustomBuild, { faqs } from "../../components/CustomBuild/CustomBuild"

// Targets the non-branded queries in GSC: "custom camper van(s)", "custom van
// conversions", "camper van builders", "van conversion california / los angeles / san diego".
const SEO_TITLE = "Custom Camper Van Builders in California | Sprinter & Transit";
const SEO_DESCRIPTION =
  "Fully custom Sprinter & Transit camper van conversions, designed in 3D and built in Big Bear, CA. About 5 months from sketch to pickup. Book a free consultation.";

export async function generateMetadata() {
  return {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    alternates: { canonical: "https://www.bigbearvans.com/custom-build" },
    openGraph: {
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
      url: "https://www.bigbearvans.com/custom-build",
      images: ["https://www.bigbearvans.com/Home/home-custom-build-big-bear-vans.webp"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Camper Van Conversion",
  "serviceType": "Custom Camper Van Conversion",
  "provider": BUSINESS_REF,
  "description": SEO_DESCRIPTION,
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
          "name": "Mercedes Sprinter Custom Camper Van Conversion"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ford Transit Custom Camper Van Conversion"
        }
      }
    ]
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
};

export default function page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CustomBuild />
    </div>
  )
}
