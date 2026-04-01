import React from "react";
import Van from "../../components/van/Van";
import { configuratorSchema } from "@/schema/configuratorSchema";

// ✅ SEO Metadata (Next.js way)
export const metadata = {
  // 1. metadataBase add karne se saare relative paths absolute ban jate hain
  metadataBase: new URL("https://bigbearvans.com"),

  title: "3D Camper Van Configurator | Design Your Own Van | Big Bear Vans",
  description:
    "Use our professional 3D Van Configurator to design your dream Mercedes Sprinter build. Customize layouts, colors, and features in real-time.",

  alternates: {
    canonical: "/configurator",
  },

  openGraph: {
    title: "3D Camper Van Configurator | Big Bear Vans",
    description: "Design your dream camper van in 3D with real-time customization tools.",
    url: "/configurator",
    siteName: "Big Bear Vans",
    type: "website",
    images: [
      {
        // Space hata kar check karein (e.g., custom-build ya custom_build)
        url: "/custom-build/configurator.jpg",
        width: 1200,
        height: 630,
        alt: "Big Bear Vans 3D Configurator Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "3D Camper Van Configurator | Big Bear Vans",
    description: "Design your dream camper van in 3D.",
    images: ["/custom-build/configurator.jpg"],
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