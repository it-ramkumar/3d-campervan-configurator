import React from 'react';
import { vansByStatus } from "@/api/van/van-by-status";
import HeroImage from '@/components/Common/HeroSectionNew/HeroSectionNew'; import VanListClient from "../../components/Vansforsale/VanListClient"
export const dynamic = 'force-dynamic';
// --- Dynamic Metadata (SEO) ---
export async function generateMetadata() {
  const limit = 1;

  try {
    const [resAvail, resSold] = await Promise.all([
      vansByStatus("available", 1, limit),
      vansByStatus("sold", 1, limit)
    ]);

    const availCount = resAvail?.total || 0;
    const soldCount = 100;

    const title = `Camper Vans for Sale | ${availCount > 0 ? availCount + ' Available & ' : ''}${soldCount}+ Sold | Big Bear Vans`;

    const description = `Find premium camper vans for sale. We offer bespoke 2-7 person layouts on Mercedes Sprinter & Ford Transit chassis.`;
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
      title: "Camper Vans for Sale | Big Bear Vans",
      description: "Custom Mercedes Sprinter and Ford Transit camper vans for sale. High-quality conversions for 2-7 persons.",
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
    "name": "Camper Vans Inventory | Big Bear Vans",
    "description": "Find premium camper vans for sale. We offer bespoke 2-7 person layouts on Mercedes Sprinter & Ford Transit chassis.",
    "numberOfItems": allActiveVans.length,
    "itemListElement": allActiveVans.map((van, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product", // Isse Google search mein "In Stock" ya price dikha sakta hai
        "name": van.van_listing.title,
        "url": `https://www.bigbearvans.com/van/${van.slug}`,
        "image": van.gallery?.[0]  || "/images/default-van.webp",
        "description": van.excerpt || `Custom conversion build by Big Bear Vans.`,
        "brand": {
          "@type": "Brand",
          "name": "Big Bear Vans"
        },
        "offers": {
          "@type": "Offer",
          "availability": van.status === "available"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          "priceCurrency": "USD",
          "price": van.van_listing.price || "0" // Agar price backend mein hai toh wo dikhayega
        }
      }
    }))
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