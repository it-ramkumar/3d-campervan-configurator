import { notFound } from "next/navigation";
import ExteriorChoiceClient from "../../../components/Options/ExteriorChoiceClient";
import { generateDynamicSchema } from "@/schema/optionsSchema";
import { PAGE_CONFIG, fetchOptionItems } from "@/components/Options/optionsConfig";


export async function generateMetadata({ params }) {
  const { options } = await params;
  const current = PAGE_CONFIG[options];

  if (!current) return { title: "Options | Big Bear Vans", robots: { index: false, follow: false } };

  const title = `${current.title} | Big Bear Vans`;
  const description = current.desc;
  const canonical = `https://www.bigbearvans.com/van-options/${options}`;

  // ✅ Har option ke liye specific image ya default image path
  const ogImage = current.heroImage || "/images/blackLogo.webp";

  return {
    // 1. metadataBase lazmi hai (Iske bina WhatsApp/FB image pick nahi karte)
    metadataBase: new URL("https://www.bigbearvans.com"),

    title,
    description,
    alternates: { canonical },

    // 2. Open Graph (Facebook, WhatsApp, LinkedIn)
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Big Bear Vans",
      type: "website",
      images: [
        {
          url: ogImage, // Agar current.image mein "/img.webp" hai to ye poora URL bana dega
          width: 1200,
          height: 630,
        },
      ],
    },

    // 3. Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { options } = await params;
  const current = PAGE_CONFIG[options];

  if (!current) notFound();

  const categoriesData = await fetchOptionItems(current.api);
  const jsonLd = generateDynamicSchema(options, current, categoriesData);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ExteriorChoiceClient
        options={options}
        current={current}
        initialRawData={categoriesData}
      />
    </>
  );
}
