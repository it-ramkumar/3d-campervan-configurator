import React from "react";
import Visitshowroom from "../../components/Showroom/Visitshowroom/Visitshowroom";
import Virtualroom from "../../components/Showroom/virtualroom/virtualroom";
import HeroSection from "../../components/Common/HeroSectionNew/HeroSectionNew";
import { generateShowroomSchema } from "../../schema/showroom";

// ✅ Next.js Metadata API for SEO
export const metadata = {
  title: "Visit Our Camper Van Showroom in Big Bear, CA | Big Bear Vans",
  description: `Tour Big Bear Vans' California showroom and workshop.
 See finished camper van builds in person, meet our team,
and start your custom conversion.`,
  keywords: "van conversion showroom california, big bear vans workshop, sprinter van tour, LAX airport pickup van build, virtual van tour, custom campervan gallery",
  alternates: {
    canonical: "https://www.bigbearvans.com/showroom",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/showroom",
    title: "Visit Our Camper Van Showroom in Big Bear, CA | Big Bear Vans",
  description: `Tour Big Bear Vans' California showroom and workshop.
 See finished camper van builds in person, meet our team,
and start your custom conversion.`,
    images: ["/heroSlider/Showroomhero.webp"], // Absolute path use karein agar possible ho
  },
  twitter: {
    card: "summary_large_image",
     title: "Visit Our Camper Van Showroom in Big Bear, CA | Big Bear Vans",
  description: `Tour Big Bear Vans' California showroom and workshop.
 See finished camper van builds in person, meet our team,
and start your custom conversion.`,
    images: ["/heroSlider/Showroomhero.webp"],
  },
};

export default function ShowroomPage() {
  const heroImage = "/heroSlider/Showroomhero.webp";
  const newTitleText = "Visit Our Showroom in Big Bear California";
  const newDescriptionText = "Want us to customize your van? The best way to get started is by visiting our van workshop in Big Bear City, California..";

  const showroomSchema = generateShowroomSchema(heroImage);

  return (
    <>
      {/* ✅ Local Business JSON-LD (Crucial for Local SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showroomSchema) }}
      />

      <main>
        {/* Hero Section */}
        <div className="tour-hero">
          <HeroSection
            title={newTitleText}
            description={newDescriptionText}
            image={heroImage}
            showButton={false}
          />
        </div>

        {/* Visit Showroom Section */}
        <div className="tour-visitshowroom">
          <Visitshowroom />
        </div>

        {/* Virtual Room Section */}
        <div className="tour-virtualroom">
          <Virtualroom />
        </div>

      </main>
    </>
  );
}