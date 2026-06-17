import Hero from "@/components/HomePage/Hero/Hero";
import { generateHomeSchema } from "../schema/homeSchema";
import dynamic from "next/dynamic";
import { Heading2,RichParagraph } from "@/components/Common/Common";
import { availableVans } from "@/api/van/availableVans";

export const metadata = {
  title: "Luxury Custom Camper Van Conversions | Big Bear Vans",
  description:
    "Expertly crafted custom camper vans for off-grid living. We use 3D Scanning and CNC precision to build your dream Mercedes Sprinter or Ford Transit conversion.",
  keywords: [
    "custom camper vans",
    "van conversion USA",
    "big bear vans",
    "sprinter van conversion",
    "luxury motorhomes",
  ],
  alternates: {
    canonical: "https://www.bigbearvans.com",
  },
  openGraph: {
    title: "Big Bear Vans | Premium Custom Builds & 3D Design",
    description:
      "From 3D renderings to the final build, we create high-end camper vans tailored to your lifestyle.",
    url: "https://www.bigbearvans.com",
    siteName: "Big Bear Vans",
    images: [
      {
        url: "https://www.bigbearvans.com/images/custom4.webp",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

const Buy = dynamic(() => import("@/components/HomePage/Buy/Buy"));
// Dynamic Import for the new Front-end Matchmaker Quiz Component
const VanRecommendation = dynamic(() => import("@/components/VanRecommendation/VanRecommendation"));

const Portfolio = dynamic(
  () => import("@/components/HomePage/Portfolio/Portfolio"),
);
const WhyChoose = dynamic(
  () => import("@/components/HomePage/WhyChoose/WhyChoose"),
);
const OurProcess = dynamic(
  () => import("@/components/HomePage/OurProcess/OurProcess"),
);
const Testimonials = dynamic(
  () => import("@/components/HomePage/Testimonials/Testimonials"),
);
const Blog = dynamic(() => import("@/components/HomePage/Blog/Blog"));
const FAQs = dynamic(() => import("@/components/Faqs/Faqs"));

export default async function Home() {
  // FAQs Data
  const faqs = [
    {
      question: "What Van Models Do You Customise?",
      answer: "Mercedes-Benz Sprinter, RAM ProMaster, and Ford Transit.",
    },
    {
      question: "Do you offer financing options?",
      answer:
        "Yes, financing is available through partners like Trident Funding.",
    },
    { question: "How Long Does It Take?", answer: "Usually 4 to 5 months." },
    {
      question: "Do you offer a warranty?",
      answer: "Yes, 1-year workmanship and 3-year extended warranty.",
    },
    {
      question: "Do I need to own a van?",
      answer: "We can convert yours or source a new one for you.",
    },
  ];

  let readyToGoVans = [];
  try {
    const response = await availableVans();
    readyToGoVans = response?.data || [];
  } catch (error) {
    console.error("Error fetching vans on home page:", error);
  }

  const homeSchemaData = generateHomeSchema(faqs);

  // FAQs JSON-LD structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([homeSchemaData, faqSchema]),
        }}
      />

      <main>
        <Hero />

        <div className="overflow-x-hidden bg-white flex flex-col space-y-16 md:space-y-20">
          <Buy initialVans={readyToGoVans} />

          {/* Replaced <Customize /> with the Matchmaker Quiz System */}
          <section id="quiz-section" className="bg-secondary py-16 md:py-24 border-y border-slate-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center px-4 mb-8">
                <span className="text-orange-500 font-bold uppercase tracking-wider text-xs md:text-sm bg-orange-50 px-3 py-1 rounded-full">
                  BBV Matchmaker Engine
                </span>
                <Heading2 text="Match Your Vibe with a Layout"/>
                {/* <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-slate-900 mt-3">
                </h2> */}
               <RichParagraph className="mx-auto text-center max-w-2xl">
  Answer a few simple build questions to view live inventory pricing matching or portfolio configuration blueprints instantly.
</RichParagraph>
              </div>
              <VanRecommendation />
            </div>
          </section>

          <Portfolio />

          <WhyChoose />

          <OurProcess />

          <Testimonials />

          <Blog />

          <section className="tour-Faqs">
            <FAQs faqs={faqs} />
          </section>
        </div>
      </main>
    </>
  );
}