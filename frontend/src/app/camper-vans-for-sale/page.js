import React from 'react';
import { vansByStatus } from "@/api/van/van-by-status";
import HeroImage from '@/components/Common/HeroSectionNew/HeroSectionNew'; import VanListClient from "../../components/Vansforsale/VanListClient"
export const dynamic = 'force-dynamic';
// --- Dynamic Metadata (SEO) ---
export async function generateMetadata() {

  try {


    const title = `Custom Camper Vans for Sale | Mercedes Sprinter & Ford Transit | Big Bear Vans`;

    const description = `Shop ready-to-buy custom camper vans built on Mercedes Sprinter & Ford Transit. Layouts for 2-7 people, AWD options available. 100+ sold.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ["/images2/vfs.webp"],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Custom Camper Vans for Sale | Mercedes Sprinter & Ford Transit | Big Bear Vans",
      description: `Shop ready-to-buy custom camper vans built on Mercedes Sprinter & Ford Transit. Layouts for 2-7 people, AWD options available. 100+ sold.`,
    };
  }
}
export default async function VansForSale() {
  const limit = 9;

  // 1. Next.js Fetching Pattern: Promise.all use karein taake saari requests parallel chalein (Fast load)
  // Hum pehle page ka data server par hi mangwa rahe hain
  const [availableData, soldData, pendingData, comingData] = await Promise.all([
    vansByStatus("available", 1, limit),
    vansByStatus("sold", 1, limit),
    vansByStatus("sale_pending", 1, limit),
    vansByStatus("coming_soon", 1, limit),
  ]);

// Saari active categories ko combine karke ek list banayenge
  const allActiveVans = [
    ...(availableData?.data || []),
    ...(pendingData?.data || []),
    ...(comingData?.data || [])
  ];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Custom Camper Vans for Sale | Big Bear Vans",
  "description": "`Shop ready-to-buy custom camper vans built on Mercedes Sprinter & Ford Transit. Layouts for 2-7 people, AWD options available. 100+ sold.",
  "numberOfItems": allActiveVans.length,
  "itemListElement": allActiveVans.map((van, index) => {

    const price = van.van_listing.price;
    const hasPrice = price && price >= 10;

    const rawImage = van.gallery?.[0] || "";
    const imageUrl = rawImage
      ? rawImage.startsWith("http")
        ? encodeURI(rawImage)
        : encodeURI(`https://www.bigbearvans.com${rawImage}`)
      : "https://www.bigbearvans.com/images2/vfs.webp";

    const description = van.van_listing.subtitle
      || van.van_listing.title
      || "Custom camper van by Big Bear Vans.";

    return {
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": van.van_listing.title,
        "url": `https://www.bigbearvans.com/van/${van.slug}`,
        "image": imageUrl,
        "description": description,
        "brand": {
          "@type": "Brand",
          "name": "Big Bear Vans"
        },
        // ⭐ Stars Google search mein dikhenge
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "111"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          // ✅ Price fix — Google ko number chahiye
          ...(hasPrice
            ? {
                "price": price,
                "priceValidUntil": "2026-12-31"
              }
            : {
                "price": "0",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Contact for pricing"
                }
              }
          ),
          "availability": van.status === "available"
            ? "https://schema.org/InStock"
            : van.status === "sale_pending"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/PreOrder",
          "url": `https://www.bigbearvans.com/van/${van.slug}`,
          "seller": {
            "@type": "Organization",
            "name": "Big Bear Vans"
          }
        }
      }
    };
  })
};
  return (
    <main>
      {/* --- SEO Script --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroImage
        title="Custom Camper Vans for Sale"
        description="Find your dream sprinter van for sale or a rugged ford transit van for sale. From luxury mercedes sprinter camper van to versatile 4x4 vans, we offer expert craftsmanship for 2-7 person layouts. Join 111+ happy owners today"
        image="/images2/vfs.webp"
        link="/inquiry"
        buttonText="Get a Quote"
        showButton={true}
      />

      <VanListClient
        initialAvailable={availableData}
        initialSold={soldData}
        initialPending={pendingData}
        initialComing={comingData}
      />
    </main>
  );
}