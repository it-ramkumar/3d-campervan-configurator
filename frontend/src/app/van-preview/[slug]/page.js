import { notFound } from "next/navigation";
import VanPage from "../../../components/VanDetail/VanListing";

// Unlisted preview page — shows draft (unpublished) van data.
// Not linked from the site and excluded from search indexing via robots below.
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/preview/${slug}`)
    .then(res => res.json())
    .catch(() => null);

  if (!data?.van) return { title: "Van Not Found | Big Bear Vans", robots: "noindex, nofollow" };

  const van = data.van;
  const title = `${van.van_listing?.title} (Draft) | Big Bear Vans`;

  return {
    title,
    description: van.van_listing?.subtitle || "",
    robots: "noindex, nofollow",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const vanDetail = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/van/preview/${slug}`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  if (!vanDetail?.van) return notFound();

  const variantsData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/variants?vanSlug=${slug}`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  return (
    <VanPage
      vanDetail={vanDetail.van}
      variants={variantsData?.variants || []}
    />
  );
}
