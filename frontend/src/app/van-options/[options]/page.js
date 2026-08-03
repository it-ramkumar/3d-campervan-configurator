import { notFound } from "next/navigation";
import ExteriorChoiceClient from "../../../components/Options/ExteriorChoiceClient";
import { generateDynamicSchema } from "@/schema/optionsSchema";

const PAGE_CONFIG = {
  "exterior-options": {
    api: "exterior",
    keyword: "bathroom",
    title: `Camper Van Exterior Upgrades & Accessories | Big Bear Vans`,
    desc: `Explore Big Bear Vans' exterior upgrade options - roof racks,
awnings, storage boxes, window and door choices - for your
 custom Sprinter or Transit build.`,
    heroImage: "/heroSlider/exteriorhero.webp",
    mobileHeroImage: "/heroSlider/exteriorhero_mobile.webp",
  },
  "interior-options": {
    api: "interior",
    title: `Camper Van Interior Finishes & Cabinetry | Big Bear Vans`,
    desc: `Explore premium camper van interior options - wall paneling,
 flooring, cabinetry, and bathroom layouts - for your custom
Big Bear Vans conversion.`,
    heroImage: "/heroSlider/interiorHero.webp",
    mobileHeroImage: "/heroSlider/interiorHero_mobile.webp",
  },
  "system-options": {
    api: "system",
    title: `Camper Van Electrical & Water Systems | Big Bear Vans`,
    desc: `Explore off-grid electrical and water systems for your
custom camper van - lithium batteries, solar,
inverters, and fresh/grey water tanks explained..`,
    heroImage: "/heroSlider/system.webp",
    mobileHeroImage: "/heroSlider/system_mobile.webp",
  },
};

export async function generateMetadata({ params }) {
  const { options } = await params;
  const current = PAGE_CONFIG[options];

  if (!current) return { title: "Options | Big Bear Vans", robots: { index: false, follow: false } };

  const title = `${current.title} | Big Bear Vans`;
  const description = current.desc;
  const canonical = `https://www.bigbearvans.com/van-options/${options}`;

  // ✅ Har option ke liye specific image ya default image path
  const ogImage = current.heroImage || "/images/default-van.webp";

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

  let categoriesData = [];
  try {
    // Variable name fix: NEXT_PUBLIC_URL
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/${current.api}`;

    const res = await fetch(apiUrl, { next: { revalidate: 604800 } });
    const result = await res.json();
    categoriesData = result.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
  }
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
