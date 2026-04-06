import Hero from "@/components/HomePage/Hero/Hero";
import { CustomLink } from "@/components/Common/Common";
import { generateHomeSchema } from "../schema/homeSchema";
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { availableVans } from "@/api/van/availableVans";

export const metadata = {
  title: "Luxury Custom Camper Van Conversions | Big Bear Vans",
  description: "Expertly crafted custom camper vans for off-grid living. We use 3D Scanning and CNC precision to build your dream Mercedes Sprinter or Ford Transit conversion.",
  keywords: ["custom camper vans", "van conversion USA", "big bear vans", "sprinter van conversion", "luxury motorhomes"],
  alternates: {
    canonical: "https://www.bigbearvans.com",
  },
  openGraph: {
    title: "Big Bear Vans | Premium Custom Builds & 3D Design",
    description: "From 3D renderings to the final build, we create high-end camper vans tailored to your lifestyle.",
    url: "https://www.bigbearvans.com",
    siteName: "Big Bear Vans",
    images: [{ url: "https://www.bigbearvans.com/images/custom4.webp", width: 1200, height: 630 }],
    type: "website",
  },
};

const Buy = dynamic(() => import("@/components/HomePage/Buy/Buy"));
const Customize = dynamic(() => import("@/components/Customize/Cutomize"));
const Portfolio = dynamic(() => import("@/components/HomePage/Portfolio/Portfolio"));
const WhyChoose = dynamic(() => import("@/components/HomePage/WhyChoose/WhyChoose"));
const OurProcess = dynamic(() => import("@/components/HomePage/OurProcess/OurProcess"));
const Testimonials = dynamic(() => import("@/components/HomePage/Testimonials/Testimonials"));
const Blog = dynamic(() => import("@/components/HomePage/Blog/Blog"));
const FAQs = dynamic(() => import("@/components/Faqs/Faqs"));

const SectionSkeleton = ({ height = "400px" }) => (
  <div style={{ height }} className="bg-gray-100 flex items-center justify-center w-full">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

export default async function Home() {
  // Data Logic
  const maintitle = "Customize Your Van";
  const sectiontitle = "Customize Your Dream Van";
  const desc = "When you give us 4-5 months, we design and build your custom camper van from scratch, the way you want it";

  const descriptionList = [
    { text: <span><CustomLink href="/configurator" text={"3D renderings "} /> to help you visualise your future van.</span> },
    { text: "3D Scanning, engineered CAD modelling, and CNC manufacturing." },
    { text: "Every cabinet, seat, and bed is built for your layout." },
    { text: "Power, water, and heating systems for real off-grid living." },
    { text: "Interior finishes that look like a home, not like a cargo van." },
  ];

  const image = [
    { img: "/long/cusco(2).webp", link: "" },
    { img: "/long/imperial(8).webp", link: "/layout-detail/imperial" },
    { img: "/long/imperial(9).webp", link: "/layout-detail/imperial" },
    { img: "/long/san(1).webp", link: "/layout-detail/san-clemente" },
    { img: "/long/moto(10).webp", link: "/layout-detail/moto-van" },
    { img: "/family/casa(11).webp", link: "/layout-detail/calabasas" },
    { img: "/family/santa(9).webp", link: "/layout-detail/santa-cruz" },
    { img: "/family/san(7).webp", link: "/layout-detail/san-clemente" },
  ];

  const faqs = [
    { question: "What Van Models Do You Customise?", answer: "Mercedes-Benz Sprinter, RAM ProMaster, and Ford Transit." },
    { question: "Do you offer financing options?", answer: "Yes, financing is available through partners like Trident Funding." },
    { question: "How Long Does It Take?", answer: "Usually 4 to 5 months." },
    { question: "Do you offer a warranty?", answer: "Yes, 1-year workmanship and 3-year extended warranty." },
    { question: "Do I need to own a van?", answer: "We can convert yours or source a new one for you." },
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
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([homeSchemaData, faqSchema]) }}
      />

      <main>
        <Hero />

        <div className="overflow-x-hidden bg-white flex flex-col space-y-16 md:space-y-32">

          <Suspense fallback={<SectionSkeleton height="300px" />}>
            <Buy initialVans={readyToGoVans} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <section className="tour-customizer bg-secondary py-16 md:py-24">
              <Customize
                mainTitle={maintitle}
                sectionTitle={sectiontitle}
                description={desc}
                descriptionList={descriptionList}
                image={image}
                orderButtonLabel="Order Custom Build"
                orderButtonLink="/inquiry"
                lastText="Start by filling out our TEST for a real estimate."
              />
            </section>
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <Portfolio />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="400px" />}>
            <WhyChoose />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <OurProcess />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="400px" />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="400px" />}>
            <Blog />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="400px" />}>
            <section className="tour-Faqs">
              <FAQs faqs={faqs} />
            </section>
          </Suspense>
        </div>
      </main>
    </>
  );
}