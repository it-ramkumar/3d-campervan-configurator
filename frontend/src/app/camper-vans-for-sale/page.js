import React from 'react';
import { vansByStatus } from "@/api/van/van-by-status";
import HeroImage from '@/components/Common/HeroSectionNew/HeroSectionNew';
import VanListClient from "../../components/Vansforsale/VanListClient"
export const dynamic = 'force-dynamic';
import FAQs from '@/components/Faqs/Faqs';
// --- Dynamic Metadata (SEO) ---
export async function generateMetadata() {

  try {
    const title = `Camper Vans for Sale - Sprinter & Transit | Big Bear Vans`;
    const description = `Shop ready-to-buy custom camper vans on Mercedes
Sprinter & Ford Transit chassis. Layouts for 2-8 people,
 AWD available. Financing options. 100+ sold.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: "https://www.bigbearvans.com/camper-vans-for-sale",
        type: "website",
        images: [
          {
            url: "https://www.bigbearvans.com/Home/home-portfolio-elevator-bed-big-bear-vans.webp",
            width: 1200,
            height: 630,
            alt: "Custom Camper Vans for Sale | Big Bear Vans",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://www.bigbearvans.com/Home/home-portfolio-elevator-bed-big-bear-vans.webp"],
      },
      alternates: {
        canonical: "https://www.bigbearvans.com/camper-vans-for-sale",
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Camper Vans for Sale - Sprinter & Transit | Big Bear Vans",
      description: `Shop ready-to-buy custom camper vans on Mercedes
Sprinter & Ford Transit chassis. Layouts for 2-8 people,
 AWD available. Financing options. 100+ sold.`,
    };
  }
}
export default async function VansForSale() {
  const limit = 9;
 const faqs = [
    {
      question: "Do you build camper vans with elevator beds?",
      answer: "Yes, we build custom camper vans featuring motorized or manual elevator bed systems. This layout allows you to raise the bed to the ceiling when you need maximum garage or cargo space for bikes and gear, and lower it down easily for sleeping at night.",
    },
    {
      question: "How many watts does a camper van air conditioner use, and can it run off-grid?",
      answer:
        "A typical 12V or rooftop RV air conditioner draws between 600 to 1,200 watts depending on the compressor speed and setting. Our custom electrical systems are engineered with high-capacity Lithium battery banks and high-output inverters specifically to handle running an AC unit off-grid for extended periods.",
    },
    { question: "Can I get a custom moto van layout for hauling motorcycles?",
      answer: "Yes, our garage spaces are fully customizable. We frequently design layouts optimized for moto van featuring reinforced heavy-duty tie-down tracks, waterproof and slip-resistant flooring, and specialized storage for gear, helmets, and ramps." },
    {
      question: "Can you legally live in an RV or camper van on your own property?",
      answer: "Legalities regarding living in an RV or camper van on private property vary significantly by state, county, and local zoning laws. While some states and rural areas permit full-time living or building on your own land, many urban and suburban municipalities have restrictions or time limits. We always recommend checking with your local county zoning or code enforcement office before parking full-time.",
    }
  ];

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
      "name": "Camper Vans for Sale - Sprinter & Transit | Big Bear Vans",
    "description": `Shop ready-to-buy custom camper vans on Mercedes
Sprinter & Ford Transit chassis. Layouts for 2-8 people,
 AWD available. Financing options. 100+ sold.`,
    "numberOfItems": allActiveVans.length,
    "itemListElement": allActiveVans.map((van, index) => {

      const price = van.van_listing.price;
      const hasPrice = price && price >= 10;

      const rawImage = van.gallery?.[0] || "";
      const imageUrl = rawImage
        ? rawImage.startsWith("http")
          ? encodeURI(rawImage)
          : encodeURI(`https://www.bigbearvans.com${rawImage}`)
        : "https://www.bigbearvans.com/Home/home-portfolio-elevator-bed-big-bear-vans.webp";

      const description = van.van_listing.subtitle
        || van.van_listing.title
        || "Custom camper van by Big Bear Vans.";

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": van.van_listing.title,
          "url": `https://www.bigbearvans.com/camper-vans-for-sale/${van.slug}`,
          "image": imageUrl,
          "description": description,
          "brand": {
            "@type": "Brand",
            "name": "Big Bear Vans"
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
            "url": `https://www.bigbearvans.com/camper-vans-for-sale/${van.slug}`,
            "seller": {
              "@type": "Organization",
              "name": "Big Bear Vans"
            }
          }
        }
      };
    })
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main>
      {/* --- SEO Script --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroImage
        title="Custom Camper Vans for Sale | Sprinter & Ford Transit"
        description="At Big Bear Vans, we transform Mercedes Sprinter and Ford Transit vans into fully custom, luxury camper vans for sale. Whether you are searching for a rugged off-grid setup to explore the backcountry or a high-end mobile home for full-time travel living, every build is meticulously engineered around how you want to live, work, and travel. We’re proud to have delivered dream rigs to 111+ happy owners across the US."
        image="/Home/home-portfolio-elevator-bed-big-bear-vans.webp"
        link="/build-your-own-camper-van"
        buttonText="Reserve your van"
        showButton={true}
      />
      <VanListClient
        initialAvailable={availableData}
        initialSold={soldData}
        initialPending={pendingData}
        initialComing={comingData}
      />
          <FAQs faqs={faqs} />
    </main>
  );
}