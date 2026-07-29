import React from "react";
import Van from "../../components/van/Van";
import { configuratorSchema } from "@/schema/configuratorSchema";

// ✅ SEO Metadata (Next.js way)
export const metadata = {
  metadataBase: new URL("https://www.bigbearvans.com"),

  title: "Free 3D Camper Van Configurator Tool | Big Bear Vans",
  description:
    `Design your dream Mercedes Sprinter camper van
in our free 3D configurator. Customize layouts, colors,
 and systems in real time - then get a custom quote.`,

  alternates: {
    canonical: "https://www.bigbearvans.com/configurator",
  },

  openGraph: {
   title: "Free 3D Camper Van Configurator Tool | Big Bear Vans",
  description:
    `Design your dream Mercedes Sprinter camper van
in our free 3D configurator. Customize layouts, colors,
 and systems in real time - then get a custom quote.`,
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
    title: "Free 3D Camper Van Configurator Tool | Big Bear Vans",
  description:
    `Design your dream Mercedes Sprinter camper van
in our free 3D configurator. Customize layouts, colors,
 and systems in real time - then get a custom quote.`,
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