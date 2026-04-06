import React from 'react'
import WhereToCamp from '@/components/WhereToCamp/WhereToCamp'
import { campgrounds } from "@/DataUseInComp/WhereToCamp";

// Metadata export (bahar)
export const metadata = {
  title: "Where to Camp in Big Bear | Best RV Parks & Campgrounds | Big Bear Vans",
  description: "Discover the best campgrounds and RV parks near Big Bear Lake. From Serrano's full hookups to Holcomb Valley's quiet escapes, find the perfect basecamp for your new campervan.",
  keywords: "Big Bear Lake camping, RV parks Big Bear, Serrano Campground, Pineknot Campground, campervan basecamp California, RV hookups Big Bear",
  alternates: {
    canonical: "https://www.bigbearvans.com/where-to-camp",
  },
  openGraph: {
    title: "Best Big Bear Campgrounds for Your Van Adventure",
    description: "Picking up your van? Here is our curated list of the best lakeside retreats and alpine escapes in Big Bear.",
    url: "https://www.bigbearvans.com/where-to-camp",
    type: "article",
    images: ["https://www.bigbearvans.com/whereToCamp/Pineknot%20campground%202.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Big Bear Campgrounds for Your Van Adventure",
    description: "Plan your basecamp! A curated guide to RV parks and campgrounds near Big Bear Lake.",
    images: ["/whereToCamp/Pineknot%20campground%202.png"],
  },
};

export default function Page() {
  const campingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Campgrounds Near Big Bear Vans Showroom",
    "description": "A curated guide to the best RV parks and campgrounds in Big Bear Lake for your new campervan adventure.",
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