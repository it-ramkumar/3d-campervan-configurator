import React from 'react';
import { vansByStatus } from "@/api/van/van-by-status";
import HeroSection from "@/components/HeroSection/HeroSection";
import VanListClient from "../../components/Vansforsale/VanListClient"

// --- Dynamic Metadata (SEO) ---
export async function generateMetadata() {
  const limit = 1;

  try {
    // Parallel Fetching: Dono requests ek saath jayengi
    const [resAvail, resSold] = await Promise.all([
      vansByStatus("available", 1, limit),
      vansByStatus("sold", 1, limit)
    ]);

    const availCount = resAvail?.total || 0;
    const soldCount = resSold?.total || 105; // Fallback agar sold count na mile

    // Dynamic Title Logic
    // Example: "5 Available & 110+ Sold Custom Camper Vans | Big Bear Vans"
    const title = `${availCount > 0 ? availCount + ' Available & ' : ''}${soldCount}0+ Sold Custom Camper Vans | Big Bear Vans`;

    const description = `Explore our ${availCount || 'latest'} available builds and our gallery of ${soldCount}+ high-quality custom conversions. Trusted by van lifers across the country.`;

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
      title: "Custom Camper Vans for Sale | Big Bear Vans",
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
    "name": "Custom Camper Vans Inventory | Big Bear Vans",
    "description": "Ready-to-go and upcoming custom Mercedes Sprinter and Ford Transit camper vans.",
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

      <HeroSection
        title="Camper Vans For Sale"
        description="Buy our exclusive and ready-to-roll vans for sale Today."
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