import { notFound } from "next/navigation";
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
  const title = `${van.van_listing?.title} | Big Bear Vans`;
  const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
  const imageUrl = van.gallery?.[0] || "/default-og-image.webp"; // Pehli image OG image ke liye
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
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": vanDetail.van.van_listing?.title,
    "image": vanDetail.van.gallery || ['https://www.bigbearvans.com/images/blackLogo.webp'],
    "description": vanDetail.van.van_listing?.subtitle,
    "brand": {
      "@type": "Brand",
      "name": "Big Bear Vans"
    },
    ...(hasPrice && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "USD",
        // Mirrors the listing page's mapping so a van's availability reads
        // the same everywhere instead of collapsing sale_pending/coming_soon into OutOfStock.
        "availability": vanDetail?.van?.status === "available"
          ? "https://schema.org/InStock"
          : vanDetail?.van?.status === "sale_pending"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/PreOrder",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Chassis",
        "value": vanDetail.van.van_listing?.specifications?.make_model
      },
      {
        "@type": "PropertyValue",
        "name": "Transmission",
        "value": vanDetail.van.van_listing?.specifications?.transmission
      }
    ]
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
