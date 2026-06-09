// import { notFound } from "next/navigation";
// import FloorPlanPage from "../../../components/FloorDetail/FloorDetail";
// // --- Dynamic Metadata for SEO ---
// export async function generateMetadata({ params }) {
//   const resolvedParams = await Promise.resolve(params);
//   const slug = resolvedParams?.slug;

//   // Data fetch for metadata
//   const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`)
//     .then(res => res.json())
//     .catch(() => null);
//   if (!data?.data) return { title: "Van Not Found | Big Bear Vans" };

//   const van = data?.data;
//   const title = `${van.van_listing?.title} | Big Bear Vans`;
//   const description = van.van_listing?.subtitle || `Explore the custom ${van.van_listing?.title}. High-quality conversion with premium specs.`;
//   const imageUrl = van.rendering?.[0] || "/default-og-image.webp"; // Pehli image OG image ke liye

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: `${process.env.NEXT_PUBLIC_SITE_URL}/floorplans/${slug}`,
//       images: [{ url: imageUrl }],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [imageUrl],
//     },
//   };
// }

// export default async function Page({ params }) {
//   const resolvedParams = await Promise.resolve(params);
//   const slug = resolvedParams?.slug;

//   if (!slug) return { title: "Not Found" };

//   const vanDetail = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`, {
//     next: { revalidate: 604800 }
//   }).then(res => res.json()).catch(() => null);

//   if (!vanDetail?.data) return notFound();
//   // // console.log(vanDetail, "vanDetail");

// const hasPrice = vanDetail?.data?.van_listing?.price && vanDetail?.data?.van_listing?.price > 10;

// const jsonLd = {
//   "@context": "https://schema.org/",
//   "@type": "Product",
//   "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/floorplans/${slug}#product`,
//   "name": vanDetail?.data?.van_listing?.title || "Custom Camper Van Floorplan",

//   // Image handling: Ensure it's a string or array of strings
//   "image": vanDetail?.data?.rendering || ['https://www.bigbearvans.com/images/blackLogo.webp'],

//   "description": vanDetail?.data?.van_listing?.subtitle || vanDetail?.data?.van_listing?.description || "Custom camper van layout and floorplan design.",
//   "sku": vanDetail?.data?.van_listing?.slug || slug,
//   "brand": {
//     "@type": "Brand",
//     "name": "Big Bear Vans"
//   },
//   "manufacturer": {
//     "@type": "Organization",
//     "name": "Big Bear Vans",
//     "url": process.env.NEXT_PUBLIC_SITE_URL
//   },
//   "category": "Custom Camper Vans Floorplans",
//   "keywords": vanDetail?.data?.van_listing?.tags?.join(", ") || "custom van, camper van, van conversion, floorplan, layout",
//   "offers": {
//     "@type": "Offer",
//     "url": `${process.env.NEXT_PUBLIC_SITE_URL}/floorplans/${slug}`,
//     "price": hasPrice ? vanDetail?.data?.van_listing?.price : "0",
//     "priceCurrency": "USD",
//     "availability": hasPrice
//       ? (vanDetail?.data?.status === "available"
//         ? "https://schema.org/InStock"
//         : "https://schema.org/OutOfStock")
//       : "https://schema.org/PreOrder",
//     "itemCondition": "https://schema.org/NewCondition",
//     ...(!hasPrice && {
//       "description": "Custom build price — contact us for a quote"
//     }),
//     "seller": {
//       "@type": "Organization",
//       "name": "Big Bear Vans"
//     }
//   }
// };
//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <FloorPlanPage van={vanDetail.data} />
//     </>
//   );
// }