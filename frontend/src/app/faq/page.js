import React from 'react';
import FAQClient from '../../components/FAQPage/FAQPage';
import Image from 'next/image';

const faqData = [
  {
    category: "About Big Bear Vans",
    questions: [
      { q: "Where is Big Bear Vans located? What are your working hours?", a: "The exact location of Big Bear Vans is 320 W Big Bear Blvd, Big Bear City, CA 92314, USA. We’re available Mon-Fri from 9 AM to 6 PM and on Saturday from 10 AM to 4 PM." },
      // Duplicate removed: "What models of vans do you work on?"
      { q: "What makes you different?", a: "Unlike other companies, we are true custom builders. We don’t hand over general templates or fixed layouts; instead, our campervans are built exactly according to our clients’ choice." },
      { q: "Can you install van components for me?", a: "Yes, at Big Bear Vans, we also install various van components, including swivel seats, aluminum bathrooms, custom cabinets, etc." },
      // Duplicate removed: "Do you offer financing options?"
      { q: "How many people can sleep in a campervan?", a: "It depends on the layout. Campervans with our signature Santa Monica layout can accommodate up to 4-6 people." },
      { q: "Can I book a tour to see your models?", a: "Absolutely, you can book a tour to our spacious showroom in Big Bear to see ready-to-go campervans and ongoing projects." },
      { q: "Do you offer builds that fit more than two people?", a: "Yes, our custom vans, like Blue Whale and Santa Monica black, can accommodate sitting and sleeping for five to six people." },
      { q: "How does the payment process work?", a: "We take a 50% advance to start, 12% after large parts are built, and the rest upon completion." },
      { q: "What kind of after-sales support do you provide?", a: "We provide a 1-year or 3-year extended warranty on craftsmanship and offer servicing/troubleshooting." },
      { q: "How can I contact Big Bear Vans?", a: "Schedule a free consultation call, email us, or visit our showroom in Big Bear." }
    ]
  },
  {
    category: "About Campervan Customization",
    questions: [
      { q: "What is the first step in starting a custom campervan build?", a: "The first step is to schedule a free consultation call with our design team to discuss vision, budget, and timeline." },
      { q: "Do I need to provide the base vehicle?", a: "Both options are available! You can provide your own, or we can help you source one at up to $8000 off through our partners." },
      { q: "Can you build a mobile office for me?", a: "Yes. We’ve built custom campervans for digital nomads, architects, and remote workers." },
      // Duplicate removed: "How long will it take to build?"
      { q: "Will I be warm enough in winter?", a: "Yes, all our vans are fully insulated and feature glycol water/air heaters hooked directly to the fuel." }
    ]
  }
];
// Metadata API
export const metadata = {
  title: "Frequently Asked Questions | Big Bear Vans",
  description: "Get answers to all your campervan questions. From custom builds to financing, locations to warranties.",
  alternates: { canonical: "https://www.bigbearvans.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Big Bear Vans",
    description: "Your Comprehensive Guide to Big Bear Vans builds and services.",
    url: "https://www.bigbearvans.com/faq",
    images: ["https://www.bigbearvans.com/images/w9.webp"],
  },
};

export default function FAQPage() {
  // Schema Generators (Simplified for server rendering)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(cat => cat.questions.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    })))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-[#f8fafc]">
        {/* HERO SECTION */}
        <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center bg-black overflow-hidden">
          <Image
            src="/images/review.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Big Bear Van Adventure"
            width={1920}
            height={1080}
          />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight">
              FAQ<span className="text-slate-400">s</span>
            </h1>
            <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
            <p className="text-white text-xl md:text-2xl font-light opacity-90 tracking-wide">
              Your Comprehensive Guide to Big Bear Vans
            </p>
          </div>
        </section>

        {/* CLIENT COMPONENT FOR INTERACTION */}
        <FAQClient faqData={faqData} />
      </main>
    </>
  );
}