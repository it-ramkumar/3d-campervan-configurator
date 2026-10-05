import { notFound } from "next/navigation";
import { vanTitle } from "@/utils/seoTitle";
import { SITE_URL, BUSINESS_REF } from "@/schema/business";
import VanPage from "../../../components/VanDetail/VanListing";

// --- Dynamic Metadata for SEO ---
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Data fetch for metadata
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/${slug}`)
    .then(res => res.json())
    .catch(() => null);

  if (!data?.van) return { title: "Van Not Found | Big Bear Vans" };

  const van = data.van;
  const title = vanTitle(van.van_listing, "sale");
  const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
  const imageUrl = van.gallery?.[0] || "/images/blackLogo.webp"; // Pehli image OG image ke liye
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL}/camper-vans-for-sale/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

 const vanDetail = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/van/${slug}`,
    // { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);


  if (!vanDetail?.van) return notFound();

    const variantsData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/variants?vanSlug=${slug}`,
    // { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  // console.log(vanDetail.van, "detail page ")
  // Same >=10 floor the listing page uses — filters out placeholder prices
  // (some listings were saved with a stray "1" or "2" before the real price was set).
  const price = vanDetail?.van?.van_listing?.price;
  const hasPrice = price && price >= 10;
  const listing = vanDetail.van.van_listing;
  const url = `${SITE_URL}/camper-vans-for-sale/${slug}`;
  const base = {
    "@context": "https://schema.org/",
    "name": listing?.title,
    "url": url,
    // Google needs absolute image URLs; some gallery entries are site-relative
    "image": vanDetail.van.gallery?.length
      ? vanDetail.van.gallery.map((img) => encodeURI(img.startsWith("http") ? img : `${SITE_URL}${img}`))
      : [`${SITE_URL}/images/blackLogo.webp`],
    "description": listing?.subtitle || listing?.title,
  };

  // Only available vans have a real price → Product + Offer.
  // Pending / coming-soon vans → Service (a Product without offers is invalid).
  const jsonLd = vanDetail?.van?.status === "available" && hasPrice
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
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Chassis", "value": listing?.specifications?.make_model },
        { "@type": "PropertyValue", "name": "Transmission", "value": listing?.specifications?.transmission }
      ].filter((p) => p.value)
    }
    : {
      ...base,
      "@type": "Service",
      "serviceType": "Custom Camper Van Conversion",
      "provider": BUSINESS_REF,
      "areaServed": "US"
    };

  return (
    <>
      {/* JSON-LD ko Head mein inject karna */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VanPage
        vanDetail={vanDetail.van}
        variants={variantsData?.variants || []}
      />
    </>
  );
}
