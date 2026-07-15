import { notFound } from "next/navigation";
import VanPage from "../../../components/LayoutDetail/LayoutDetail";

// Unlisted preview page — shows draft (unpublished) portfolio/floorplan data.
// Not linked from the site and excluded from search indexing via robots below.
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/preview/${slug}`)
    .then(res => res.json())
    .catch(() => null);

  if (!data?.data) return { title: "Floorplan Not Found | Big Bear Vans", robots: "noindex, nofollow" };

  const van = data.data;
  const title = `${van.van_listing?.title} (Draft) | Big Bear Vans`;

  return {
    title,
    description: van.van_listing?.subtitle || "",
    robots: "noindex, nofollow",
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const viewMode = resolvedSearchParams?.view || "photos";

  const vanDetail = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/portfolio/preview/${slug}`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  if (!vanDetail?.data) return notFound();

  return (
    <VanPage van={vanDetail.data} initialView={viewMode} />
  );
}
