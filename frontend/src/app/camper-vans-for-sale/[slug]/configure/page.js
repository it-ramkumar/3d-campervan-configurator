import { notFound } from "next/navigation";
import VanCanvas from "@/components/VanDetail/Models/VanCanvas"; // Path check kar lijiyega apne project ke mutabiq

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/${slug}`).then(res => res.json()).catch(() => null);

  if (!data?.van) return { title: "Configurator | Big Bear Vans" };
  return {
    title: `Configure ${data.van.van_listing?.title} | Big Bear Vans`,
    description: `Customize your dream van. Select variants, view features, and explore the 3D model.`,
  };
}

export default async function ConfigurePage({ params }) {
  const { slug } = await params;

  // 1. Van Detail Fetching
  const vanDetail = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/van/${slug}`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  if (!vanDetail?.van) return notFound();

  // 2. Variants Fetching (Jaise aapne bataya)
  const variantsData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/variants?vanSlug=${slug}`,
    { cache: "no-store" }
  ).then(res => res.json()).catch(() => null);

  return (
    <div className="w-full h-screen bg-secondary">
      <VanCanvas
        url={vanDetail.van?.glbFile}
        variants={variantsData?.variants || []}
        vanTitle={vanDetail.van?.van_listing?.title}
      />
    </div>
  );
}