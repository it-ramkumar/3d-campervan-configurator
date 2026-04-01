// src/app/layout-by-category/[category]/page.js
import { getByWheelBase } from "@/api/portfolio/wheelBase";
import CamperProjectsClient from "../../../components/LayoutByCategory/LayoutByCategory";
// --- Dynamic Metadata ---
export async function generateMetadata({ params }) {
  const { wheelbase } = await params;

  // 144-ext ko "144 Extended" banane ka logic
  const formattedWB = wheelbase.replace(/-/g, '" ').toUpperCase();

  const title = `${formattedWB} Custom Van Layouts & Floor Plans | Big Bear Vans`;
  const description = `Explore our collection of custom camper van layouts specifically designed for the ${formattedWB} wheelbase. High-quality 3D floor plans by Big Bear Vans.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bigbearvans.com/wheel-base/${wheelbase}`,
    },
    openGraph: {
      title,
      description,
      images: ["/images/review.webp"], // Wheelbase specific image bhi de sakte hain
    },
  };
}
export default async function CategoryPage({ params, searchParams }) {
  // Params await karna zaroori hai Next.js 15 mein
  const { wheelbase}  = await params;
  const sParams = await searchParams;
  const queryKey = JSON.stringify(sParams);
  // URL se filters nikalna (Backend ki keys ke mutabiq)
  const page = sParams.page || 1;
  const search = sParams.search || "";
  const model = sParams.model || "";
  const sit = sParams.sit || "";
  const sleep = sParams.sleep || "";
  const bedType = sParams.bedType || "";
  const bathroomType = sParams.bathroomType || "";

  // Backend API Call (Sare filters pass kar rahe hain)
  const data = await getByWheelBase(
    wheelbase,
    page,
    search,
    model,
    sit,
    sleep,
    bedType,
    bathroomType
  );

  const initialData = data?.success ? data : { data: [], pages: 1, filters: {} };
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": `${wheelbase} Wheelbase Van Layouts`,
  "description": `Explore custom van layouts for ${wheelbase} wheelbase by Big Bear Vans.`,
  "url": `https://bigbearvans.com/wheel-base/${wheelbase}${page > 1 ? `?page=${page}` : ""}`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": initialData.data.length,
    "itemListElement": initialData.data.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.van_listing?.title,
        "url": `https://bigbearvans.com/layout-detail/${item.slug}`,
        "image": item.gallery?.[0],
        "description": item.van_listing?.description?.substring(0, 160),
        "brand": {
          "@type": "Brand",
          "name": "Big Bear Vans"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD",
          "price": "0"
        }
      }
    }))
  }
};
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    <CamperProjectsClient
      key={`${wheelbase}-${queryKey}`} // Yeh 'key' pagination fix karegi
      category={wheelbase}
      initialData={initialData}
      currentParams={sParams}
    />
        </>
  );
}