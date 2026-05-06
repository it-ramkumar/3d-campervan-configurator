import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import VanConfig from "@/components/SprinterPresentation/VanConfig";
import Table from "@/components/SprinterPresentation/Table";
import ExteriorColourChoices from "@/components/SprinterPresentation/ExteriorColourChoices";
import SeatOptions from "@/components/SprinterPresentation/SeatOption";
import SprinterUpgrade from "@/components/SprinterPresentation/SprinterUpgrade";
import ConvenienceTech from "@/components/SprinterPresentation/ConvenienceTech";
import Speclist from "@/components/SprinterPresentation/Speclist";
import DecisionFactors from "@/components/SprinterPresentation/DecisionFactors";
import CustomBuild from "@/components/SprinterPresentation/CustomBuild";
// Import your schema/meta logic
import { generateSprinterGuideSchema, getSprinterGuideMetaTags } from "@/schema/sprinterGuide";

// ✅ 1. Metadata Handling (Next.js Way)
const meta = getSprinterGuideMetaTags();

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
    url: meta.url,
  },
};

export default function SprinterPage() {
  const heroImage = "/sprinter/sphero.webp";
  const newTitleText = "Choosing The Right Sprinter Van For Custom Conversion";
  const newDescriptionText =
    "Learn how to choose the ideal Sprinter van model and features to create your dream custom conversion.";

  // ✅ 2. Schema Logic
  const schemaData = generateSprinterGuideSchema();

  return (
    <>
      {/* ✅ JSON-LD Schema (Rendered on Server) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Page Sections */}
      <div className="tour-hero">
        <HeroSection
          title={newTitleText}
          description={newDescriptionText}
          image={heroImage}
          showButton= {false}
        />
      </div>
    <div className="space-y-20">
      <div className="tour-van-config">
        <VanConfig />
      </div>

      <div className="tour-table">
        <Table />
      </div>

      <div className="tour-exterior-colour-choices">
        <ExteriorColourChoices />
      </div>

      <div className="tour-seat-options">
        <SeatOptions />
      </div>

      <div className="tour-sprinter-upgrade">
        <SprinterUpgrade />
      </div>

      <div className="tour-convenience-tech">
        <ConvenienceTech />
      </div>

      <div className="tour-spec-list">
        <Speclist />
      </div>

      <div className="tour-decision-factors">
        <DecisionFactors />
      </div>

      <div className="tour-custom-build">
        <CustomBuild />
      </div>
      </div>
    </>
  );
}