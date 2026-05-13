import React from "react";
import HeroSection from "../../components/Common/HeroSectionNew/HeroSectionNew";
import Mission from "../../components/AboutUs/Mission/Mission";
import Adventure from "../../components/AboutUs/Adventure/Adventure";
import { generateAboutSchema } from "@/schema/about";

export const metadata = {
  title: "Custom Camper Van Builders in California | Big Bear Vans",
  description: "Big Bear Vans builds 100% custom Mercedes Sprinter & Ford Transit campervans in Big Bear City, CA. 105+ builds, 5-star rated, founded by van lifers Artur & Anna. See our story.",
  keywords: "Big Bear Vans founders, custom van builders California, 5 person sleeper van, sprinter elevator bed conversion, CNC engineered campervans",
  alternates: {
    canonical: "https://www.bigbearvans.com/about-us",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/about-us",
    title: "Custom Camper Van Builders in California | Big Bear Vans",
    description: "Big Bear Vans builds 100% custom Mercedes Sprinter & Ford Transit campervans in Big Bear City, CA. 105+ builds, 5-star rated, founded by van lifers Artur & Anna. See our story.",
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Camper Van Builders in California | Big Bear Vans",
    description: "Big Bear Vans builds 100% custom Mercedes Sprinter & Ford Transit campervans in Big Bear City, CA. 105+ builds, 5-star rated, founded by van lifers Artur & Anna. See our story.",
    images: ["https://www.bigbearvans.com/heroSlider/processhero.webp"],
  },
};

export default function AboutUs() {
  const heroImage = "/heroSlider/processhero.webp";
  const newTitleText = "About Big Bear Vans | Custom Van Builders California";
  const newDescriptionText = "Artur and Anna founded Big Bear Vans, building family-focused Sprinter conversions with smart elevator beds.";

  const aboutSchema = generateAboutSchema();

  return (
    <>
      {/* ✅ 4. JSON-LD Schema (Server-side injected) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main>
        <div className="tour-hero">
          <HeroSection
            title={newTitleText}
            description={newDescriptionText}
            image={heroImage}
            showButton={false}
          />
        </div>

        <div className="tour-mission">
          {/* Note: Agar Mission component mein hooks ya framer-motion hai,
              toh Mission.jsx ke top par "use client" zaroor likhiyega. */}
          <Mission />
        </div>

        <div className="tour-adventure">
          <Adventure />
        </div>
      </main>
    </>
  );
}