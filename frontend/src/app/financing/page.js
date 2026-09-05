import React from "react";
import Flist from "../../components/Financing/Flist/Flist";
import HeroSection from "../../components/Common/HeroSectionNew/HeroSectionNew";
import { generateFinancingSchema } from "../../schema/financing";

// ✅ 1, 2, 3. Standard, Twitter, and Open Graph Metadata
export const metadata = {
  title: "Camper Van Financing & RV Loan Options | Big Bear Vans",
  description:
    `Flexible financing for your custom Sprinter or Transit build.
15-year RV loans via Trident Funding, 20-30% down.
Get pre-qualified with Big Bear Vans today.`,
  keywords:
    "sprinter van financing, trident funding rv, campervan loan california",
  alternates: {
    canonical: "https://www.bigbearvans.com/financing",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bigbearvans",
    title: "Camper Van Financing & RV Loan Options | Big Bear Vans",
  description:
    `Flexible financing for your custom Sprinter or Transit build.
15-year RV loans via Trident Funding, 20-30% down.
Get pre-qualified with Big Bear Vans today.`,
    images: ["https://www.bigbearvans.com/heroSlider/limage2.webp"],
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/financing",
    title: "Camper Van Financing & RV Loan Options | Big Bear Vans",
  description:
    `Flexible financing for your custom Sprinter or Transit build.
15-year RV loans via Trident Funding, 20-30% down.
Get pre-qualified with Big Bear Vans today.`,
    images: ["https://www.bigbearvans.com/heroSlider/limage2.webp"],
  },
};

export default function FinancingPage() {
  const heroImage = "/Home/home-family-van-big-bear-vans.webp";
  const newTitleText = "Camper Van Financing & RV Loan Options";

  const newDescriptionText =
    "Get flexible financing options and take home your dream campervan with ease.";

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
            imagePosition="right top"
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
