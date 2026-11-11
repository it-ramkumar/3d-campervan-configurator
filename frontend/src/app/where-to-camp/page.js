import React from 'react'
import WhereToCamp from '@/components/WhereToCamp/WhereToCamp'
import { campgrounds, campingFaqs } from "@/DataUseInComp/WhereToCamp";

// Targets the GSC queries for this page: "big bear camping", "big bear campgrounds",
// "big bear lake camping", "pineknot campground", "big bear rv parks", "camping near big bear".
const SEO_TITLE = "Big Bear Camping: 9 Campgrounds & RV Parks Near Big Bear Lake";
const SEO_DESCRIPTION =
  "Compare 9 campgrounds and RV parks near Big Bear Lake, CA: Serrano, Pineknot, Holcomb Valley and more. Prices, hookups, season dates and free sites.";
const OG_IMAGE = "https://www.bigbearvans.com/whereToCamp/Pineknot%20campground%202.webp";

export const metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: "https://www.bigbearvans.com/where-to-camp",
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: "https://www.bigbearvans.com/where-to-camp",
    type: "article",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function Page() {
  const campingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": SEO_TITLE,
    "description": SEO_DESCRIPTION,
    "itemListElement": campgrounds.flatMap(cat => cat.locations).map((loc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Campground",
        "name": loc.name,
        "description": loc.desc,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "CA",
          "addressCountry": "US"
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": campingFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };

  return (
    <div>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WhereToCamp campgrounds={campgrounds} />
    </div>
  )
}
