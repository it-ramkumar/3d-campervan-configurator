import React from "react";
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import { ClientschemaData } from "@/schema/ourClient";
import { Heading2, RichParagraph } from '@/components/Common/Common';
import YoutubeSection from "@/components/OurClients/Clientdetail/YoutubeSection";
import CTRSection from "@/components/OurClients/Clientdetail/CTRSection";
import WhyChoose from "@/components/OurClients/Clientdetail/WhyChoose";
import { imageData } from "@/DataUseInComp/ImageOFOurClient";
import FamilySection from "@/components/OurClients/Clientdetail/FamilySection";
import PetFriendlySection from "@/components/OurClients/Clientdetail/PetFriendlySection";
import AdventureSection from "../../components/OurClients/Clientdetail/AdventureSection";
import RetireeSection from "@/components/OurClients/Clientdetail/RetireeSection";
import FullTimeVanLifeSection from "@/components/OurClients/Clientdetail/FullTimeVanLifeSection";
import MobileOfficeSection from "@/components//OurClients/Clientdetail/MobileOfficeSection";

// ✅ 1. Next.js Metadata API for SEO
export const metadata = {
  title: "Client Stories & Custom Build Gallery | Big Bear Vans",
  description: "Explore our custom campervan case studies. From pet-friendly sanctuaries and mobile offices to family-ready Sprinters with elevator beds. See how our clients live off-grid.",
  keywords: "custom van stories, pet friendly campervans, mobile office sprinter, moto van garage, retiree rv adventure, Big Bear Vans reviews",
  alternates: {
    canonical: "https://www.bigbearvans.com/our-clients",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bigbearvans",
    title: "Custom Campervan Stories | Big Bear Vans",
    description: "From pet sanctuaries to mobile offices—see how we build dream rigs for our clients.",
   images: ["https://www.bigbearvans.com/images2/about.webp"],
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/our-clients",
    title: "Real Stories, Real Adventures | Big Bear Vans",
    description: "Explore our luxurious custom campervan conversions. Built for families, pets, and off-grid living.",
    images: ["https://www.bigbearvans.com/images2/about.webp"],
  },
};

export default function OurClients() {
  const heroImage = "/images2/about.webp";
  const newTitleText = "Our Clients at Big Bear Vans";

  const OurClientSchema = ClientschemaData()
  return (
    <>
      {/* ✅ 2. JSON-LD Schema (Server-side) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OurClientSchema) }}
      />
      <main>
        <div className="tour-hero">
          <HeroSection
            title={newTitleText}
            image={heroImage}
            showButton={false}
            description="Delivering trusted van solutions to our valued clients."
          />
        </div>

        <div className="min-h-screen bg-white">
          {/* Narrative Hero Section */}
          <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <Heading2 text="Our Client Stories" className="my-4" />
              <RichParagraph className="max-w-3xl mx-auto my-4">
                At Big Bear Vans, we build premium custom campervans. These luxurious
                vans enable our clients to hit the road, explore, and live off the
                grid for as long as they want.
              </RichParagraph>
              <RichParagraph className="max-w-3xl mx-auto my-4">
                Our clients come from different backgrounds. That's why every Big
                Bear Van is a custom reflection of its owner's specific style and
                adventure goals.
              </RichParagraph>
            </div>
          </section>

          {/* Individual Client Story Sections */}
          <FamilySection imageData={imageData} />
          <PetFriendlySection imageData={imageData} />
          <AdventureSection imageData={imageData} />
          <RetireeSection imageData={imageData} />
          <FullTimeVanLifeSection imageData={imageData} />
          <MobileOfficeSection />

          {/* Social Proof & CTA Sections */}
          <WhyChoose />
          <CTRSection />
          <YoutubeSection />
        </div>
      </main>

    </>
  );
}