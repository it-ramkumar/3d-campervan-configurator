// app/preview/[id]/page.js (Server Component)
import { notFound } from "next/navigation";
import PreviewClient from "@/components/preview/PreviewConfigureVan";
// Data Fetching Functions
async function getQuoteData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/quote/preview/${id}`, {
    cache: 'no-store' // Fresh data ke liye
  });
  if (!res.ok) return null;
  return res.json();
}

async function getBaseVan(modelId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/add-base-van/${modelId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

async function getAllModels() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/models/all`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function PreviewPage({ params }) {
  const { id } =await params;

//   Server-side fetching
  const quoteData = await getQuoteData(id);

  if (!quoteData) {
    notFound();
  }

  const [baseVan, allModels] = await Promise.all([
    getBaseVan(quoteData.model.id),
    getAllModels(),
  ]);

  // Parts filter karna (Server par hi logic handle ho gaya)
  const partsData = quoteData.parts
    .map((p) => allModels.find((m) => m._id === p.id))
    .filter(Boolean);

  return (
    <PreviewClient
      quoteData={quoteData}
      baseVan={baseVan}
      partsData={partsData}
    />

  );
}