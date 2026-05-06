import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import { generateConsultationSchema } from "@/schema/consultationSchema";

// ✅ 1, 2, 3. Metadata API (SEO aur Social Media Tags)
export const metadata = {
  title: "Book a Consultation | Custom Van Building & Inquiry | Big Bear Vans",
  description: "Schedule your free consultation with Big Bear Vans. Book a showroom visit, discuss financing, or start your custom 3D van design journey in Big Bear City, CA.",
  keywords: "book van consultation, campervan build inquiry, schedule showroom tour, Big Bear Vans contact, custom van building quote, Mercedes Sprinter conversion California",
  alternates: {
    canonical: "https://www.bigbearvans.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/contact",
    title: "Ready to Start Your Adventure? | Big Bear Vans Consultation",
    description: "Talk to our experts about your dream rig. Schedule a call or visit our California workshop for a personalized tour.",
    images: ["https://www.bigbearvans.com/heroSlider/bloghero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule Your Free Van Build Consultation",
    description: "From 15-year financing to 3D layouts, let's discuss your custom Sprinter build today.",
    images: ["https://www.bigbearvans.com/heroSlider/bloghero.webp"],
  },
};

export default function Contact() {
  const heroImage = "/heroSlider/bloghero.webp";
  const newTitleText = "Contact Us | Custom Van Builders in Big Bear City, CA";
  const newDescriptionText = "Contact Big Bear Vans today for your custom van conversion. Our team of expert van builders in Big Bear City, California, is ready to help you begin your dream van life.";

  const jsonld = generateConsultationSchema();

  return (
    <>
      {/* ✅ 4. JSON-LD Schema (Server-side Injection) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
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

      </main>
    </>
  );
}