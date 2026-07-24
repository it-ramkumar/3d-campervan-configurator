import VanRecommendation from "@/components/VanRecommendation/VanRecommendation";
import { Heading1, RichParagraph, SpanTag } from "@/components/Common/Common";
import FAQs from "@/components/Faqs/Faqs";
import { generateVanMatchmakerSchema } from "@/schema/vanMatchmaker";

export const metadata = {
  title: "Van Matchmaker Quiz | Find Your Perfect Camper Van Layout | Big Bear Vans",
  description:
    "Answer a few quick questions about passengers, bathroom, and power needs to get instantly matched with in-stock camper vans or custom Big Bear Vans layout blueprints.",
  keywords: [
    "van matchmaker quiz",
    "camper van finder",
    "find my camper van layout",
    "custom van layout quiz",
    "big bear vans matchmaker",
  ],
  alternates: {
    canonical: "https://www.bigbearvans.com/van-matchmaker",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/van-matchmaker",
    title: "Van Matchmaker Quiz | Find Your Perfect Camper Van Layout",
    description:
      "Take our free 2-minute quiz and get matched with in-stock camper vans or custom layout blueprints tailored to your build.",
    images: ["https://www.bigbearvans.com/images/custom4.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Matchmaker Quiz | Find Your Perfect Camper Van Layout",
    description:
      "Take our free 2-minute quiz and get matched with in-stock camper vans or custom layout blueprints tailored to your build.",
    images: ["https://www.bigbearvans.com/images/custom4.webp"],
  },
};

const faqs = [
  {
    question: "How does the BBV Matchmaker Engine work?",
    answer:
      "You answer five quick questions about van length, passengers, bathroom, and power needs. We instantly compare your answers against our in-stock inventory and custom layout blueprints to surface the closest match.",
  },
  {
    question: "Is the Van Matchmaker quiz free?",
    answer:
      "Yes, the quiz is completely free and takes under two minutes. There's no obligation to buy — it's designed to help you explore layouts that fit your travel style.",
  },
  {
    question: "What happens after I submit my quiz answers?",
    answer:
      "You'll see your matched layout immediately, including specs, seating, and bathroom configuration. Our BBV team also receives your contact details so we can follow up with pricing and availability.",
  },
  {
    question: "What if none of the layouts fit what I need?",
    answer:
      "If nothing matches your requirements exactly, the quiz will offer to connect you directly with a BBV build engineer on WhatsApp to scope a fully custom blueprint.",
  },
];

export default function VanMatchmakerPage() {
  const schema = generateVanMatchmakerSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="bg-secondary">
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <SpanTag text="BBV Matchmaker Engine" className="font-bold uppercase" />
            <Heading1 className="!text-primary" text="Find Your Perfect Camper Van in Under 2 Minutes" />
            <RichParagraph className="mx-auto text-center max-w-2xl mt-4">
              Answer a few simple build questions to view live inventory pricing
              matching or portfolio configuration blueprints instantly — no
              account or commitment required.
            </RichParagraph>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-8 md:pb-16">
          <VanRecommendation />
        </div>

        <section className="tour-Faqs">
          <FAQs faqs={faqs} />
        </section>
      </main>
    </>
  );
}
