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
    heroImage: "/heroSlider/interiorHero.png"
  },
  "system-options": {
    api: "system",
    title: "Electrical & Water Systems",
    desc: "Reliable, high-performance electrical and water systems, installed in every custom van.",
    heroImage: "/heroSlider/system.jpg"
  }
};

// --- Standard Metadata (Hydration error se bachne ke liye) ---
export async function generateMetadata({ params }) {
  const { options } = await params;
  const current = PAGE_CONFIG[options];
  if (!current) return { title: "Options" };

  return {
    title: `${current.title} | Big Bear Vans`,
    description: current.desc,
    alternates: { canonical: `https://bigbearvans.com/van-options/${options}` },
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