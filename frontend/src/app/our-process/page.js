import React from "react";
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import Processlist from "../../components/OurProcess/ProcessList/Processlist";
import { generateProcessSchema } from "@/schema/ourProcess";

// ✅ Next.js Metadata API (Standard way for Server Components)
export const metadata = {
  title: "Our 5-Month Custom Van Build Process | Big Bear Vans",
  description:
    `From 3D design to final handover: see Big Bear Vans'
 transparent 5-month custom camper van build process,
including vehicle sourcing and lifetime support.`,
  keywords:
    "custom van build timeline, sprinter van conversion process, 3D van design, Mercedes Sprinter sourcing, Big Bear Vans warranty, fly in drive out van build",
  alternates: {
    canonical: "https://www.bigbearvans.com/our-process",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/our-process",
   title: "Our 5-Month Custom Van Build Process | Big Bear Vans",
  description:
    `From 3D design to final handover: see Big Bear Vans'
 transparent 5-month custom camper van build process,
including vehicle sourcing and lifetime support.`,
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our 5-Month Custom Van Build Process | Big Bear Vans",
  description:
    `From 3D design to final handover: see Big Bear Vans'
 transparent 5-month custom camper van build process,
including vehicle sourcing and lifetime support.`,
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
  },
};

export default function OurProcess() {
  const heroImage = "/heroSlider/processhero.webp";
  const mobileHeroImage = "/heroSlider/processhero_mobile.webp";
  const newTitleText = "Our 5-Month Custom Van Build Process";
  const newDescriptionText =
    "A complete process of how we customize your dream custom van";

  const processSchema = generateProcessSchema();

  return (
    <>
      {/* ✅ JSON-LD Schema (Server-side injected) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
      />

      <main>
        <div className="tour-hero">
          <HeroSection
            title={newTitleText}
            description={newDescriptionText}
            image={heroImage}
            mobileImage={mobileHeroImage}
            link="/contact"
            buttonText="Contact Us"
            showButton={true}
          />
        </div>

        <div className="tour-processlist">
          <Processlist />
        </div>
      </main>
    </>
  );
}
