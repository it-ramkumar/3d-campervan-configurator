import React from "react";
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import { generateConsultationSchema } from "@/schema/consultationSchema";

// ✅ 1, 2, 3. Metadata API (SEO aur Social Media Tags)
export const metadata = {
  title: "Book a Free Custom Van Consultation | Big Bear Vans",
  description: `Schedule a free consultation with Big Bear Vans.
Discuss financing, book a showroom visit, or start your
custom Sprinter or Transit build today.`,
  keywords: "book van consultation, campervan build inquiry, schedule showroom tour, Big Bear Vans contact, custom van building quote, Mercedes Sprinter conversion California",
  alternates: {
    canonical: "https://www.bigbearvans.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/contact",
      title: "Book a Free Custom Van Consultation | Big Bear Vans",
  description: `Schedule a free consultation with Big Bear Vans.
Discuss financing, book a showroom visit, or start your
custom Sprinter or Transit build today.`,
    images: ["https://www.bigbearvans.com/heroSlider/bloghero.webp"],
  },
  twitter: {
    card: "summary_large_image",
     title: "Book a Free Custom Van Consultation | Big Bear Vans",
  description: `Schedule a free consultation with Big Bear Vans.
Discuss financing, book a showroom visit, or start your
custom Sprinter or Transit build today.`,
    images: ["https://www.bigbearvans.com/heroSlider/bloghero.webp"],
  },
};

export default function Contact() {
  const heroImage = "/heroSlider/bloghero.webp";
  const newTitleText = "Book a Free Custom Van Consultation | Big Bear Vans";
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