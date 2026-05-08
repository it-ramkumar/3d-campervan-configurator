import React from "react";
import Flist from "../../components/Financing/Flist/Flist";
import HeroSection from "../../components/Common/HeroSectionNew/HeroSectionNew";
import { generateFinancingSchema } from "../../schema/financing";

// ✅ 1, 2, 3. Standard, Twitter, and Open Graph Metadata
export const metadata = {
  title: "Campervan Financing & RV Loans | Custom Sprinter Builds | Big Bear Vans",
  description: "Explore flexible financing for your custom Mercedes Sprinter. From specialized 15-year RV loans through Trident Funding to all-in-one build loans. 20-30% down payment options available.",
  keywords: "sprinter van financing, trident funding rv, campervan loan california",
  alternates: {
    canonical: "https://www.bigbearvans.com/financing",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bigbearvans",
    title: "Financing Your Dream Campervan | Big Bear Vans",
    description: "Get pre-approved for specialized RV loans or all-in-one conversion financing. Flexible 15-year terms available.",
    images: ["https://www.bigbearvans.com/heroSlider/limage2.webp"],
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/financing",
    title: "Campervan Financing & RV Loans | Big Bear Vans",
    description: "Easy financing options for your custom van build. Partnered with Trident Funding & Mercedes-Benz Financial.",
    images: ["https://www.bigbearvans.com/heroSlider/limage2.webp"],
  },
};

export default function FinancingPage() {
  const heroImage = "/heroSlider/limage2.webp";
  const newTitleText = "Financing For Your Campervan";
  const newDescriptionText = "Get flexible financing options and take home your dream campervan with ease.";

  const financingSchema = generateFinancingSchema();

  return (
    <>
      {/* ✅ 4. JSON-LD (Structured Data) - Server-side injected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financingSchema) }}
      />

      <main>
        {/* Hero Section */}
        <div className="tour-hero">
          <HeroSection
            title={newTitleText}
            description={newDescriptionText}
            image={heroImage}
            link="/contact"
            buttonText="Get a Quote"
          />
        </div>

        {/* Financing List Section */}
        <div className="tour-financing-list">
          {/* Note: If Flist uses animations or hooks, ensure "use client" is at the top of Flist.jsx */}
          <Flist />
        </div>

        {/* Consultation Section */}
        <div className="tour-consultation">
          {/* Content can be added here */}
        </div>
      </main>
    </>
  );
}