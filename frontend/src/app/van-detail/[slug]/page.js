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
  const imageUrl = van.gallery?.[0] || "/default-og-image.jpg"; // Pehli image OG image ke liye

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/van-detail/${slug}`,
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

  // Page Component ke andar fetch ko aese update karein:
  const vanDetail = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/${slug}`, {
    cache: 'no-store' // Ye browser ke 'force-refresh' ki tarah kaam karega
  }).then(res => res.json()).catch(() => null);
  if (!vanDetail?.van) return notFound();
  // console.log(vanDetail.van, "detail page ")
  const hasPrice = vanDetail?.van?.van_listing?.price;
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": vanDetail.van.van_listing?.title,
    "image": vanDetail.van.gallery || ['https://www.bigbearvans.com/images/blackLogo.jpg'],
    "description": vanDetail.van.van_listing?.subtitle,
    "brand": {
      "@type": "Brand",
      "name": "Big Bear Vans"
    },
    ...(hasPrice && {
      "offers": {
        "@type": "Offer",
        "price": vanDetail?.van?.van_listing?.price,
        "priceCurrency": "USD",
        "availability": vanDetail?.van?.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
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
      <VanPage vanDetail={vanDetail.van} />
    </>
  );
}