import { notFound } from "next/navigation";
import VanPage from "../../../components/LayoutDetail/LayoutDetail";

// --- Dynamic Metadata for SEO ---
export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  // Data fetch for metadata
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`)
    .then(res => res.json())
    .catch(() => null);
  if (!data?.data) return { title: "Van Not Found | Big Bear Vans" };

  const van = data?.data;
  const title = `${van.van_listing?.title} | Big Bear Vans`;
  const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
  const imageUrl = van.gallery?.[0] || "/default-og-image.jpg"; // Pehli image OG image ke liye

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/layout-detail/${slug}`,
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
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  if (!slug) return { title: "Not Found" };

  const vanDetail = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()).catch(() => null);

  if (!vanDetail?.data) return notFound();
  // console.log(vanDetail, "vanDetail");
  // // --- JSON-LD Structured Data ---
const hasPrice = vanDetail?.data?.van_listing?.price;

const jsonLd = {
  "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/layout-detail/${slug}#product`,
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": vanDetail.data.van_listing?.title,
  "image": vanDetail.data.gallery || ['https://www.bigbearvans.com/images/blackLogo.jpg'],
  "description": vanDetail.data.van_listing?.subtitle || vanDetail.data.van_listing?.description,
  "brand": {
    "@type": "Brand",
    "name": "Big Bear Vans"
  },
  ...(hasPrice && {
    "offers": {
      "@type": "Offer",
      "price": vanDetail?.data?.van_listing?.price,
      "priceCurrency": "USD",
      "availability": vanDetail.data.status === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  })
};
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VanPage van={vanDetail.data} />
    </>
  );
}