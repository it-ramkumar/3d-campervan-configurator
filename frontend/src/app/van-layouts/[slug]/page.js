import { notFound } from "next/navigation";
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
  const title = `${van.van_listing?.title} | Big Bear Vans`;
  const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
  const imageUrl = van.gallery?.[0] || "/default-og-image.webp";
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
  if (!slug) return { title: "Not Found" };

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
  const hasPrice = vanDetail?.data?.van_listing?.price && vanDetail?.data?.van_listing?.price > 10;

  const jsonLd = {
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/van-layouts/${slug}#product`,
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": vanDetail.data.van_listing?.title,
    "image": vanDetail.data.gallery || ['https://www.bigbearvans.com/images/blackLogo.webp'],
    "description": vanDetail.data.van_listing?.subtitle || vanDetail.data.van_listing?.description,
    "sku": vanDetail.data.van_listing?.slug || slug,
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
    "keywords": vanDetail.data.van_listing?.tags?.join(", ") || "custom van, camper van, van conversion",
    "offers": {
      "@type": "Offer",
      "price": hasPrice ? vanDetail?.data?.van_listing?.price : "0",
      "priceCurrency": "USD",
      "availability": hasPrice
        ? (vanDetail.data.status === "available"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock")
        : "https://schema.org/PreOrder",
      "itemCondition": "https://schema.org/NewCondition",
      ...(hasPrice ? {} : {
        "description": "Custom build price — contact us for a quote"
      }),
      "seller": {
        "@type": "Organization",
        "name": "Big Bear Vans"
      }
    }
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
