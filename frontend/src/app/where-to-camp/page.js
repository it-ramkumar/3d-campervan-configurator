import React from 'react'
import WhereToCamp from '@/components/WhereToCamp/WhereToCamp'
import { campgrounds } from "@/DataUseInComp/WhereToCamp";

// Metadata export (bahar)
export const metadata = {
  title: "Where to Camp Near Big Bear Lake, CA | Big Bear Vans",
  description: `The best campgrounds and RV parks near Big Bear Lake -
 from full-hookup sites to quiet dispersed camping, curated
 by Big Bear Vans.`,
  keywords: "Big Bear Lake camping, RV parks Big Bear, Serrano Campground, Pineknot Campground, campervan basecamp California, RV hookups Big Bear",
  alternates: {
    canonical: "https://www.bigbearvans.com/where-to-camp",
  },
  openGraph: {
    title: "Where to Camp Near Big Bear Lake, CA | Big Bear Vans",
  description: `The best campgrounds and RV parks near Big Bear Lake -
 from full-hookup sites to quiet dispersed camping, curated
 by Big Bear Vans.`,
    url: "https://www.bigbearvans.com/where-to-camp",
    type: "article",
    images: ["https://www.bigbearvans.com/whereToCamp/Pineknot%20campground%202.webp"],
  },
  twitter: {
    card: "summary_large_image",
   title: "Where to Camp Near Big Bear Lake, CA | Big Bear Vans",
  description: `The best campgrounds and RV parks near Big Bear Lake -
 from full-hookup sites to quiet dispersed camping, curated
 by Big Bear Vans.`,
    images: ["/whereToCamp/Pineknot%20campground%202.webp"],
  },
};

export default function Page() {
  const campingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Where to Camp Near Big Bear Lake, CA | Big Bear Vans",
    "description": `The best campgrounds and RV parks near Big Bear Lake -
 from full-hookup sites to quiet dispersed camping, curated
 by Big Bear Vans.`,
    "itemListElement": campgrounds.flatMap(cat => cat.locations).map((loc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Campground",
            "name": loc.name,
            "description": loc.desc,
        }
    }))
  };

  return (
    <div>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campingSchema) }}
      />
      <WhereToCamp campgrounds={campgrounds} />
    </div>
  )
}