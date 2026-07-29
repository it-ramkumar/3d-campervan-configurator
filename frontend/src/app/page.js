import Hero from "@/components/HomePage/Hero/Hero";
import { generateHomeSchema } from "../schema/homeSchema";
import nextDynamic from "next/dynamic";
import { Heading2,RichParagraph, SpanTag } from "@/components/Common/Common";
import { availableVans } from "@/api/van/availableVans";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Custom Camper Van Conversions in California | Big Bear Vans",
  description:
    "Big Bear Vans builds 100% custom Mercedes Sprinter & Ford Transit camper vans in Big Bear, CA. Off-grid power, CNC precision & 105+ builds delivered. Get a free quote today.",
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
    title: "Custom Camper Van Conversions in California | Big Bear Vans",
  description:
    "Big Bear Vans builds 100% custom Mercedes Sprinter & Ford Transit camper vans in Big Bear, CA. Off-grid power, CNC precision & 105+ builds delivered. Get a free quote today.",
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

const Buy = nextDynamic(() => import("@/components/HomePage/Buy/Buy"));
// Dynamic Import for the new Front-end Matchmaker Quiz Component
const VanRecommendation = nextDynamic(() => import("@/components/VanRecommendation/VanRecommendation"));

const Portfolio = nextDynamic(
  () => import("@/components/HomePage/Portfolio/Portfolio"),
);
const WhyChoose = nextDynamic(
  () => import("@/components/HomePage/WhyChoose/WhyChoose"),
);
const OurProcess = nextDynamic(
  () => import("@/components/HomePage/OurProcess/OurProcess"),
);
const Testimonials = nextDynamic(
  () => import("@/components/HomePage/Testimonials/Testimonials"),
);
const Blog = nextDynamic(() => import("@/components/HomePage/Blog/Blog"));
const FAQs = nextDynamic(() => import("@/components/Faqs/Faqs"));

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

        <div className="overflow-x-hidden bg-secondary flex flex-col space-y-16 ">
          <Buy initialVans={readyToGoVans} />

          {/* Replaced <Customize /> with the Matchmaker Quiz System */}
          <section id="quiz-section" className="bg-secondary py-16 md:py-24 border-y border-slate-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center px-4 mb-8">
                <SpanTag text={"BBV Matchmaker Engine"} className="font-bold uppercas"/>


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