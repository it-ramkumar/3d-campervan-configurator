import ExteriorChoiceClient from "../../../components/Options/ExteriorChoiceClient";
import { generateDynamicSchema } from "@/schema/optionsSchema";

const PAGE_CONFIG = {
  "exterior-options": {
    api: "exterior",
    keyword:"bathroom",
    title: "Campervan Exterior Upgrades",
    desc: "The exterior of your campervan is all about looks and functionality. We equip your van with practical exterior accessories.",
    heroImage: "/heroSlider/exteriorhero.webp"
  },
  "interior-options": {
    api: "interior",
    title: "Premium Interior Finishes",
    desc: "Luxury meets comfort. Explore our range of interior linings, flooring, and bespoke cabinetry options.",
    heroImage: "/heroSlider/interiorHero.webp"
  },
  "system-options": {
    api: "system",
    title: "Electrical & Water Systems",
    desc: "Reliable, high-performance electrical and water systems, installed in every custom van.",
    heroImage: "/heroSlider/system.webp"
  }
};

export async function generateMetadata({ params }) {
  const { options } = await params;
  const current = PAGE_CONFIG[options];

  if (!current) return { title: "Options | Big Bear Vans" };

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
          url: ogImage, // Agar current.image mein "/img.jpg" hai to ye poora URL bana dega
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

  if (!current) return <div>Option not found</div>;

  let categoriesData = [];
  try {
    // Variable name fix: NEXT_PUBLIC_URL
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/${current.api}`;

    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
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