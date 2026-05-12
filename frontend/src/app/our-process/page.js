import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import Processlist from "../../components/OurProcess/ProcessList/Processlist";
import { generateProcessSchema } from "@/schema/ourProcess";

// ✅ Next.js Metadata API (Standard way for Server Components)
export const metadata = {
  title: "Our Process: From 3D Design to Handover | Big Bear Vans",
  description: "Explore our transparent 5-month custom van build process. From 3D visualization and vehicle sourcing to complimentary LAX valet pickup and lifetime care.",
  keywords: "custom van build timeline, sprinter van conversion process, 3D van design, Mercedes Sprinter sourcing, Big Bear Vans warranty, fly in drive out van build",
  alternates: {
    canonical: "https://www.bigbearvans.com/our-process",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/our-process",
    title: "How We Build Your Dream Van | The Big Bear Process",
    description: "5 months. 3D precision. Lifetime care. See how we turn your vision into a high-end off-grid home.",
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
    },
  twitter: {
    card: "summary_large_image",
    title: "Your Custom Van Journey | Big Bear Vans",
    description: "From the first 3D sketch to your first campout. Learn about our 5-month build process and airport valet service.",
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
  },
};

export default function OurProcess() {
  const heroImage = "/heroSlider/processhero.webp";
  const newTitleText = "Our Process At Big Bear Vans";
  const newDescriptionText = "A complete process of how we customize your dream custom van";

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