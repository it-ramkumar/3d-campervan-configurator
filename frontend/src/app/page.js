import Hero from "@/components/HomePage/Hero/Hero";
import { generateHomeSchema } from "../schema/homeSchema";
import nextDynamic from "next/dynamic";
import { Heading1,RichParagraph, SpanTag } from "@/components/Common/Common";
import { availableVans } from "@/api/van/availableVans";
import { hasSale } from "@/utils/salePrice";
import BlackFridayBanner from "@/components/BlackFriday/BlackFridayBanner";

// Sale prices by van slug (the /van/available endpoint doesn't include them).
async function salePricesBySlug() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/van/van-by-status?status=available&page=1&limit=50`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return {};
    const json = await res.json();
    const map = {};
    for (const van of json?.data || []) {
      if (van?.slug && hasSale(van.van_listing)) {
        map[van.slug] = Number(van.van_listing.sale_price);
      }
    }
    return map;
  } catch (error) {
    console.error("Error fetching sale prices on home page:", error);
    return {};
  }
}

// ISR: serve a cached copy, regenerate in the background at most every 5 minutes
export const revalidate = 300;

export const metadata = {
  title: "Custom Camper Van Conversions in California | Big Bear Vans",
  description:
    "Big Bear Vans builds 100% custom Sprinter & Transit camper vans in Big Bear, CA, with off-grid power and 105+ builds delivered. Get a free quote.",
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
    "Big Bear Vans builds 100% custom Sprinter & Transit camper vans in Big Bear, CA, with off-grid power and 105+ builds delivered. Get a free quote.",
    url: "https://www.bigbearvans.com",
    siteName: "Big Bear Vans",
    images: [
      {
        url: "https://www.bigbearvans.com/meta-data/home-meta-image.webp",
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
// const Blog = nextDynamic(() => import("@/components/HomePage/Blog/Blog"));
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

  const salePrices = await salePricesBySlug();
  readyToGoVans = readyToGoVans.map((van) =>
    salePrices[van?.slug] ? { ...van, sale_price: salePrices[van.slug] } : van,
  );
  const maxSavings = readyToGoVans.reduce(
    (max, van) =>
      hasSale(van) ? Math.max(max, Number(van.price) - Number(van.sale_price)) : max,
    0,
  );

  const homeSchemaData = generateHomeSchema(faqs);


  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchemaData),
        }}
      />

      <div>
        <Hero />

        <BlackFridayBanner maxSavings={maxSavings} />

        <div className="overflow-x-hidden bg-secondary flex flex-col space-y-10 ">
          <Buy initialVans={readyToGoVans} />

          {/* Replaced <Customize /> with the Matchmaker Quiz System */}
          <section id="quiz-section" className="bg-secondary py-10 border-y border-slate-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center px-4 mb-8">
                <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold">
                  BBV Matchmaker Engine
                </RichParagraph>


                <Heading1 variant="section" textColor="text-primary" text="Match Your Vibe with a Layout"/>

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

          {/* <Blog /> */}

          <section className="tour-Faqs">
            <FAQs faqs={faqs} />
          </section>
        </div>
      </div>
    </>
  );
}
