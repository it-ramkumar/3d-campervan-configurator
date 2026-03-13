import React from "react";
// import Clientdetail from "./Clientdetail/Clientdetail";
import Consultation from "../Consultation/Consultation";
import HeroSection from "../HeroSection/HeroSection"
import { Helmet } from "react-helmet-async";
import { schemaData } from "../../schema/ourClient";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import { Heading2, RichParagraph } from '../Common/Common'
import YoutubeSection from "./Clientdetail/YoutubeSection";
import CTRSection from "./Clientdetail/CTRSection";
import WhyChoose from "./Clientdetail/WhyChoose";
import { imageData } from "../../DataUseInComp/ImageOFOurClient";
import FamilySection from "./Clientdetail/FamilySection";
import PetFriendlySection from "./Clientdetail/PetFriendlySection";
import AdventureSection from "./Clientdetail/AdventureSection";
import RetireeSection from "./Clientdetail/RetireeSection";
import FullTimeVanLifeSection from "./Clientdetail/FullTimeVanLifeSection";
import MobileOfficeSection from "./Clientdetail/MobileOfficeSection";


export default function OurClients() {


  const heroImage = "/images2/about.webp";
  const newTitleText = "Our Clients at Big Bear Vans";



  return (
    <>
     <Helmet>
  <title>Client Stories & Custom Build Gallery | Big Bear Vans</title>
  <meta name="description" content="Explore our custom campervan case studies. From pet-friendly sanctuaries and mobile offices to family-ready Sprinters with elevator beds. See how our clients live off-grid." />
  <meta name="keywords" content="custom van stories, pet friendly campervans, mobile office sprinter, moto van garage, retiree rv adventure, Big Bear Vans reviews" />
  <link rel="canonical" href="https://bigbearvans.com/our-clients" />

  {/* Standard Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@bigbearvans" />
  <meta name="twitter:title" content="Custom Campervan Stories | Big Bear Vans" />
  <meta name="twitter:description" content="From pet sanctuaries to mobile offices—see how we build dream rigs for our clients." />
  <meta name="twitter:image" content="https://bigbearvans.com/ourClients/v4.jpg"  />

  {/* Open Graph (Facebook/LinkedIn/WhatsApp) */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bigbearvans.com/our-clients" />
  <meta property="og:title" content="Real Stories, Real Adventures | Big Bear Vans" />
  <meta property="og:description" content="Explore our luxurious custom campervan conversions. Built for families, pets, and off-grid living." />
  <meta property="og:image" content="https://bigbearvans.com/ourClients/v4.jpg" />
    <script type="application/ld+json">
        {JSON.stringify(schemaData())}
      </script>
</Helmet>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} image={heroImage} showButton={false} description="Delivering trusted van solutions to our valued clients." />
      </div>
     <div className="min-h-screen bg-white">
      {/* Hero Section */}
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

      {/* Families With Kids */}
      <FamilySection imageData={imageData} />
      <PetFriendlySection imageData={imageData} />

      <AdventureSection imageData={imageData} />
      <RetireeSection imageData={imageData} />
      {/* Full-Time Van Lifers Section */}

      <FullTimeVanLifeSection imageData={imageData} />

      {/* Entrepreneurs */}
      <MobileOfficeSection />
      <WhyChoose />
      <CTRSection />
      <YoutubeSection />

    </div>
      <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer />
    </>
  );
}