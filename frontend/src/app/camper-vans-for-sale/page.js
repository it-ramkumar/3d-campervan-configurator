import React from 'react';
import { SITE_URL, BUSINESS_REF } from "@/schema/business";
import { vansByStatus } from "@/api/van/van-by-status";
import HeroImage from '@/components/Common/HeroSectionNew/HeroSectionNew';
import VanListClient from "../../components/Vansforsale/VanListClient"
export const dynamic = 'force-dynamic';
import FAQs from '@/components/Faqs/Faqs';
import { effectivePrice, hasSale, isBlackFriday } from "@/utils/salePrice";
import BlackFridayBanner from "@/components/BlackFriday/BlackFridayBanner";
import ForSaleGuide from "@/components/Vansforsale/ForSaleGuide";

// Targets the non-branded buying queries in GSC ("camper vans for sale",
// "... with bed / shower / pop top / awd", "... california").
const SEO_TITLE = "Camper Vans for Sale in California | AWD Sprinter & Transit";
const SEO_DESCRIPTION =
  "Ready-to-buy custom camper vans: AWD Mercedes Sprinter & Ford Transit with elevator beds, showers & toilets, pop tops and off-grid power. Financing available.";
// --- Dynamic Metadata (SEO) ---
export async function generateMetadata() {

  try {
    let title = SEO_TITLE;
    let description = SEO_DESCRIPTION;

    // During Black Friday, put the sale in front of the normal title/description.
    // Same request as the page body, so Next.js dedupes it. Reverts on its own after the end date.
    if (isBlackFriday()) {
      const availableData = await vansByStatus("available", 1, 9);
      const maxSavings = (availableData?.data || []).reduce(
        (max, van) =>
          hasSale(van.van_listing)
            ? Math.max(max, Number(van.van_listing.price) - Number(van.van_listing.sale_price))
            : max,
        0,
      );
      if (maxSavings > 0) {
        title = `Black Friday Sale: ${title}`;
        description = `Black Friday camper van sale: save up to $${maxSavings.toLocaleString("en-US")}. ${description}`;
      }
    }

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
            alt: "Custom camper van for sale with elevator bed | Big Bear Vans",
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
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
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
  const maxSavings = (availableData?.data || []).reduce(
    (max, van) =>
      hasSale(van.van_listing)
        ? Math.max(max, Number(van.van_listing.price) - Number(van.van_listing.sale_price))
        : max,
    0,
  );

  // Live price range of the available vans, used in the copy and the price FAQ
  const availablePrices = (availableData?.data || [])
    .map((van) => Number(effectivePrice(van.van_listing)))
    .filter((p) => p >= 10);
  const priceRange = availablePrices.length
    ? { min: Math.min(...availablePrices), max: Math.max(...availablePrices) }
    : null;
  const fmtPrice = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

  // Buyer-intent FAQs (keep answers in line with docs/claude-project-knowledge/02-faq.md)
  const faqs = [
    {
      question: "How much does a camper van for sale cost at Big Bear Vans?",
      answer: priceRange
        ? `Our ready-to-buy camper vans are currently listed from ${fmtPrice(priceRange.min)} to ${fmtPrice(priceRange.max)}. The price depends on the chassis (Mercedes Sprinter or Ford Transit), wheelbase, AWD, battery and solar system, and whether the van has a full bathroom or pop top. Financing is available.`
        : "The price depends on the chassis (Mercedes Sprinter or Ford Transit), wheelbase, AWD, battery and solar system, and whether the van has a full bathroom or pop top. Each listing shows its current price, and financing is available.",
    },
    {
      question: "Are your camper vans for sale new or used?",
      answer: "They are not used RVs. Every van for sale is a custom conversion built in our Big Bear, California workshop on a Mercedes-Benz Sprinter or Ford Transit chassis. Each listing shows the chassis year, wheelbase, drivetrain, engine, seats and sleeping capacity.",
    },
    {
      question: "Do you have camper vans for sale with a shower and toilet?",
      answer: "Yes. Many of our builds, including the Montreal 170 and Santa Monica layouts, have a full indoor wet bath with hot water, a shower and a toilet. Other builds use a hide-away indoor shower to keep more open floor space.",
    },
    {
      question: "Do you build camper vans with elevator beds?",
      answer: "Yes. Our signature elevator bed lowers with a button for sleeping and lifts to the ceiling during the day, giving you a full garage for bikes, boards and gear underneath.",
    },
    {
      question: "Can I buy a camper van if I live outside California?",
      answer: "Yes. Owners across the US buy from us. You can book a showroom tour in Big Bear or a virtual tour by FaceTime or Zoom. Vans are picked up at our Big Bear workshop, about 2 to 2.5 hours from Los Angeles, with a full walkthrough and test drive of every system.",
    },
    {
      question: "Do you offer financing and a warranty?",
      answer: "Yes. Financing options are available on our camper vans for sale. Every van includes a 1-year warranty on craftsmanship, with a 3-year extended warranty available, plus servicing and remote support from our California workshop.",
    },
    {
      question: "Can I change a van that is listed for sale?",
      answer: "You can explore changes to a listed van in our 3D configurator, and our team will confirm what can be updated. If nothing in stock fits, we can design and build a fully custom camper van for you.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
      "name": SEO_TITLE,
    "description": SEO_DESCRIPTION,
    "numberOfItems": allActiveVans.length,
    "itemListElement": allActiveVans.map((van, index) => {

      const price = effectivePrice(van.van_listing);
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

      const url = `${SITE_URL}/camper-vans-for-sale/${van.slug}`;
      const base = {
        "name": van.van_listing.title,
        "url": url,
        "image": imageUrl,
        "description": description,
      };

      // Only available vans have a real price → Product + Offer.
      // Pending / coming-soon vans have no buyable price, so they're a Service
      // (a Product without a price is flagged invalid, and "0" is misleading).
      const item = van.status === "available" && hasPrice
        ? {
          ...base,
          "@type": "Product",
          "brand": { "@type": "Brand", "name": "Big Bear Vans" },
          "offers": {
            "@type": "Offer",
            "url": url,
            "price": price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            // Vans are picked up at the workshop, never shipped
            "availableDeliveryMethod": "https://schema.org/OnSitePickup",
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "doesNotShip": true,
              "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" }
            },
            "seller": BUSINESS_REF
          }
        }
        : {
          ...base,
          "@type": "Service",
          "serviceType": "Custom Camper Van Conversion",
          "provider": BUSINESS_REF,
          "areaServed": "US"
        };

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": item
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
    <div>
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
        title="Camper Vans for Sale: Custom AWD Sprinter & Transit Builds"
        description="Ready-to-buy custom Mercedes Sprinter and Ford Transit camper vans, built in Big Bear, California. Elevator beds, indoor showers and toilets, pop tops and off-grid lithium power. Trusted by 111+ owners across the US."
        image="/Home/home-portfolio-elevator-bed-big-bear-vans.webp"
        alt="Custom camper van for sale with an elevator bed by Big Bear Vans"
        link="/build-your-own-camper-van"
        buttonText="Reserve your van"
        showButton={true}
      />
      <BlackFridayBanner
        maxSavings={maxSavings}
        ctaHref="#black-friday-vans"
        ctaLabel="See the deals ↓"
      />
      <div id="black-friday-vans" className="scroll-mt-24" />
      <VanListClient
        initialAvailable={availableData}
        initialSold={soldData}
        initialPending={pendingData}
        initialComing={comingData}
      />
      <ForSaleGuide
        priceRange={priceRange}
        availableCount={availableData?.total || availableData?.data?.length || 0}
      />
      <FAQs faqs={faqs} />
    </div>
  );
}
