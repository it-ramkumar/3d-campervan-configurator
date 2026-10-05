import { notFound } from "next/navigation";
import { vanTitle } from "@/utils/seoTitle";
import VanPage from "../../../components/LayoutDetail/LayoutDetail";

// --- Dynamic Metadata for SEO (Ismein koi change nahi hai) ---
export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`)
    .then(res => res.json())
    .catch(() => null);
  if (!data?.data) return { title: "Van Not Found | Big Bear Vans" };

  const van = data?.data;
  const title = vanTitle(van.van_listing, "layout");
  const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
  const imageUrl = van.gallery?.[0] || "/images/blackLogo.webp";
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL}/van-layouts/${slug}`;

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

// 🚀 FIXED: Next.js khud context se params aur searchParams bhejta hai
export default async function Page({ params, searchParams }) {
  // Resolved variables
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams); // Safe Next.js asynchronous reading

  const slug = resolvedParams?.slug;
  if (!slug) notFound();

  // ✅ Ab hum direct searchParams se query parameters read kar sakte hain bina hook ke
  const viewMode = resolvedSearchParams?.view || "photos";

  const vanDetail = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`,
    {
    // next: { revalidate: 604800 }
  }
).then(res => res.json()).catch(() => null);

  if (!vanDetail?.data) return notFound();

  // console.log(vanDetail.data, "viewMode Server Side par read ho gaya!");

  // --- JSON-LD Structured Data ---
  const listing = vanDetail.data.van_listing;
  const hasPrice = listing?.price && listing.price > 10;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/van-layouts/${slug}`;

  const baseLd = {
    "@context": "https://schema.org/",
    "name": listing?.title,
    "url": pageUrl,
    "image": vanDetail.data.gallery || ['https://www.bigbearvans.com/images/blackLogo.webp'],
    "description": listing?.subtitle || listing?.description,
  };

  // Google requires `price` on a Product's Offer — without it Product snippets are
  // flagged invalid. So: real price → Product + Offer, custom quote → Service
  // (not a rich result type, so no validation errors).
  const jsonLd = hasPrice
    ? {
      ...baseLd,
      "@id": `${pageUrl}#product`,
      "@type": "Product",
      "sku": listing?.slug || slug,
      "brand": {
        "@type": "Brand",
        "name": "Big Bear Vans"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Big Bear Vans",
        "url": process.env.NEXT_PUBLIC_SITE_URL
      },
      "category": "Custom Camper Vans",
      "keywords": listing?.tags?.join(", ") || "custom van, camper van, van conversion",
      "offers": {
        "@type": "Offer",
        "url": pageUrl,
        "price": listing.price,
        "priceCurrency": "USD",
        // made-to-order builds, not stock items
        "availability": "https://schema.org/PreOrder",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Big Bear Vans"
        }
      }
    }
    : {
      ...baseLd,
      "@id": `${pageUrl}#service`,
      "@type": "Service",
      "serviceType": "Custom Camper Van Conversion",
      "provider": {
        "@type": "Organization",
        "name": "Big Bear Vans",
        "url": process.env.NEXT_PUBLIC_SITE_URL
      },
      "areaServed": "US"
    };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ⚡ Ab hum viewMode ko as a prop bhej rahe hain child client component ko */}
      <VanPage van={vanDetail.data} initialView={viewMode} />
    </>
  );
}
