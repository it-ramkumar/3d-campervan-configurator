import React from "react";
import Van from "../../components/van/Van";
import { configuratorSchema } from "@/schema/configuratorSchema";

// ✅ SEO Metadata (Next.js way)
export const metadata = {
  metadataBase: new URL("https://www.bigbearvans.com"),

  title: "3D Camper Van Configurator | Design Your Own Van | Big Bear Vans",
  description:
    "Use our professional 3D Van Configurator to design your dream Mercedes Sprinter build. Customize layouts, colors, and features in real-time.",

  alternates: {
    canonical: "https://www.bigbearvans.com/configurator",
  },

  openGraph: {
    title: "3D Camper Van Configurator | Big Bear Vans",
    description: "Design your dream camper van in 3D with real-time customization tools.",
    url: "https://www.bigbearvans.com/configurator",
    siteName: "Big Bear Vans",
    type: "website",
    images: [
      {
        // Space ko %20 se replace kiya hai taaki URL break na ho
        url: "https://www.bigbearvans.com/images2/fp.webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "3D Camper Van Configurator | Big Bear Vans",
    description: "Design your dream camper van in 3D.",
    images: ["https://www.bigbearvans.com/images2/fp.webp"],
  },
};
export default function Page() {
  const jsonLd = configuratorSchema();

  return (
    <>
      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Van />
    </>
  );
}