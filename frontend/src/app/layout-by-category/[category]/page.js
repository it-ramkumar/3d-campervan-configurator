// src/app/layout-by-category/[category]/page.js
import { getByCategory } from "@/api/portfolio/getByCategory";
import CamperProjectsClient from "../../../components/LayoutByCategory/LayoutByCategory";
const categoryMap = {
  "flagship-long-van-montreal": "Flagship Long Van — Montreal",
  "flagship-short-van-santa-monica": "Flagship Short Van — Santa Monica",
  "layouts-for-families-(3-9-people)": "Layouts for Families (3–9 People)",
  "layouts-for-solo-couple-travelers": "Layouts for Solo & Couple Travelers",
  "portfolio-of-custom-builds": "Portfolio of Custom Builds",
};

// Helper to clean slug: "solo-and-couple" -> "Solo And Couple"
const formatTitle = (slug) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateMetadata({ params, searchParams }) {
  const { category } = await params;
  const sParams = await searchParams;
  const page = parseInt(sParams.page) || 1;

  const categoryName = formatTitle(category);

  // Professional Title: Category + Brand + Pagination
  const title = `${categoryName} | Custom Van Layouts & Floor Plans ${page > 1 ? `(Page ${page})` : ""} | Big Bear Vans`;

  const description = `Explore our ${categoryName} collection. Discover bespoke 3D camper van layouts, seating for ${sParams.sit || "multiple"} people, and innovative sleeping solutions. Tailor-made by Big Bear Vans.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.bigbearvans.com/layout-by-category/${category}${page > 1 ? `?page=${page}` : ""}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.bigbearvans.com/layout-by-category/${category}`,
      type: "website",
      images: [
        {
          url: "/images/p4.webp", // Category specific image agar available ho
          width: 1200,
          height: 630,
          alt: `${categoryName} Layouts`,
        },
      ],
    },
    // Search results mein filters ko index hone se rokne ke liye (SEO Best Practice)
    robots: (sParams.search || sParams.model) ? "noindex, follow" : "index, follow",
  };
}
export default async function CategoryPage({ params, searchParams }) {
  // Params await karna zaroori hai Next.js 15 mein
  const { category: slug } = await params;
  const sParams = await searchParams;
  const queryKey = JSON.stringify(sParams);
  const actualCategoryName = categoryMap[slug] || slug;
  // URL se filters nikalna (Backend ki keys ke mutabiq)
  const page = sParams.page || 1;
  const search = sParams.search || "";
  const model = sParams.model || "";
  const sit = sParams.sit || "";
  const sleep = sParams.sleep || "";
  const bedType = sParams.bedType || "";
  const bathroomType = sParams.bathroomType || "";

  // Backend API Call (Sare filters pass kar rahe hain)
  const data = await getByCategory(
    actualCategoryName,
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
    "name": `${formatTitle(actualCategoryName)} Van Layouts`,
    "description": `A curated collection of custom van conversion layouts for ${formatTitle(actualCategoryName)}.`,
    "url": `https://www.bigbearvans.com/layout-by-category/${actualCategoryName}${page > 1 ? `?page=${page}` : ""}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": initialData.data.length,
      "itemListElement": initialData.data.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": item.van_listing?.title,
          "description": item.van_listing?.description?.substring(0, 150) + "...",
          "image": item.gallery?.[0],
          "url": `https://www.bigbearvans.com/layout-detail/${item.slug}`,
          "brand": {
            "@type": "Brand",
            "name": "Big Bear Vans"
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
        key={`${actualCategoryName}-${queryKey}`} // Yeh 'key' pagination fix karegi
        category={actualCategoryName}
        initialData={initialData}
        currentParams={sParams}
      />
    </>
  );
}