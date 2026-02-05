import { lazy, Suspense } from "react";
import { generateHomeSchema } from "../websiteComponents/schema/homeSchema";
import { createFAQSchema } from "../websiteComponents/schema/faqSchema";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Ruler from "lucide-react/dist/esm/icons/ruler";
import LayoutPanelTop from "lucide-react/dist/esm/icons/layout-panel-top";
import BatteryCharging from "lucide-react/dist/esm/icons/battery-charging";
import Armchair from "lucide-react/dist/esm/icons/armchair";
import { Link } from "react-router-dom";

// Direct imports (Above the fold - immediately visible)
import Navbar from "../websiteComponents/components/Navbar/Navbar";
import Hero from "../websiteComponents/components/HomePage/Hero/Hero";

// Lazy load below-the-fold components
const Buy = lazy(() => import("../websiteComponents/components/HomePage/Buy/Buy"));
const Customize = lazy(() => import("../websiteComponents/components/Customize/Cutomize"));
const Portfolio = lazy(() => import("../websiteComponents/components/HomePage/Portfolio/Portfolio"));
const WhyChoose = lazy(() => import("../websiteComponents/components/HomePage/WhyChoose/WhyChoose"));
const OurProcess = lazy(() => import("../websiteComponents/components/HomePage/OurProcess/OurProcess"));
const Testimonials = lazy(() => import("../websiteComponents/components/HomePage/Testimonials/Testimonials"));
const Blog = lazy(() => import("../websiteComponents/components/HomePage/Blog/Blog"));
const Consultation = lazy(() => import("../websiteComponents/components/Consultation/Consultation"));
const FAQs = lazy(() => import("../websiteComponents/components/Faqs/Faqs"));
const Footer = lazy(() => import("../websiteComponents/components/Footer/Footer"));

// Skeleton/Loading component for better UX
const SectionSkeleton = ({ height = "400px" }) => (
  <div
    style={{
      height,
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <div className="animate-pulse">Loading...</div>
  </div>
);

const Home = () => {
  const maintitle = "Customize Your Van";
  const sectiontitle = "Customize Your Dream Van";
  const desc = "When you give us 4-5 months, we design and build your custom camper van from scratch, the way you want it";

  const descriptionList = [
      {   text: (
          <span>
            <Link to="/configurator" className="text-blue-700 font-bold underline hover:text-blue-900">
              3D renderings
            </Link>{" "}
            to help you visualise your future van before we even pick up a tool.
          </span>
        ), icon: CheckCircle2 },
    {
      text: "3D Scanning, engineered CAD modelling (of your layout), and manufacturing in Automated CNC machines.",
      icon: Ruler,
    },
    {
      text: "Every cabinet, seat, and bed is built for your layout.",
      icon: LayoutPanelTop,
    },
    {
      text: "Power, water, and heating systems are set up for real off-grid living.",
      icon: BatteryCharging,
    },
    {
      text: "Interior finishes that look like a home, not like a cargo van.",
      icon: Armchair,
    },
  ];

  const image = "/images/custom4.webp";
  const orderButtonLabel = "Order Custom Build";
  const orderButtonLink = "/inquiry";
  const lastText = "Start by filling out our TEST. We'll ask a few questions and then give you a real estimate of what your dream van will cost.";

  const faqs = [
    {
      question: "What Van Models Do You Customise at Big Bear Vans?",
      answer: "At Big Bear Vans, we mainly customise Mercedes-Benz Sprinter, RAM ProMaster, and Ford Transit vans.",
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, financing is available for already-built vans through partners like Trident Funding (RV loans) or ADU Loans (using real estate). Many clients also finance a new Sprinter van through Mercedes and pay cash for the conversion. Alternatively, our partner dealership can provide full financing for both a new van and the custom build in a single auto loan.",
    },
    {
      question: "How Long Does It Take to Build a Custom Van?",
      answer: "It depends on various factors like your requirements, our availability, etc. Usually, it takes us about 4 to 5 months to design and build a conversion van.",
    },
    {
      question: "Do you offer a warranty on your van conversions?",
      answer: "Yes, all our van conversions come with a 1-year warranty against workmanship defects, starting from the pickup date. Moreover, we also offer a 3-year extended warranty on our craftsmanship. Please note that while Big Bear Vans warrants its services, this warranty does not cover third-party products themselves.",
    },
    {
      question: "Do I need to own a van, or can you source one for my conversion?",
      answer: "We can do both. At Big Bear Vans, we can convert your existing campervan or source a new Class B RV for you, often with discounts of up to $8,000 off MSRP.",
    },
  ];

  const homeSchemaData = generateHomeSchema();
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Luxury Custom Camper Van Conversions | Big Bear Vans</title>
      <meta name="keywords" content="custom camper vans, van conversion USA, big bear vans, sprinter van conversion" />
      <meta name="description" content="Expertly crafted custom camper vans for off-grid living. We use 3D Scanning and CNC precision to build your dream Mercedes Sprinter or Ford Transit conversion." />
      <link rel="canonical" href="https://bigbearvans.com/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Big Bear Vans | Premium Custom Builds & 3D Design" />
      <meta property="og:description" content="From 3D renderings to the final build, we create high-end camper vans tailored to your lifestyle. Start your journey here." />
      <meta property="og:image" content="https://bigbearvans.com/images/custom4.webp" />
      <meta property="og:url" content="https://bigbearvans.com/" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Big Bear Vans | Luxury Custom Camper Vans" />
      <meta name="twitter:description" content="Design and build your dream camper van with 3D precision. Order your custom build today." />
      <meta name="twitter:image" content="https://bigbearvans.com/images/custom4.webp" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify([homeSchemaData, faqSchema])}
      </script>

      {/* Above the fold - Load immediately */}
      <Navbar />
      <Hero />

      {/* Below the fold - Lazy load with Suspense */}
      <div className="overflow-x-hidden">
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <div className="tour-buy">
            <Buy />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <div className="tour-customizer">
            <Customize
              mainTitle={maintitle}
              sectionTitle={sectiontitle}
              description={desc}
              descriptionList={descriptionList}
              image={image}
              orderButtonLabel={orderButtonLabel}
              orderButtonLink={orderButtonLink}
              lastText={lastText}
              className="bg-gray-100"
            />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <div className="tour-portfolio">
            <Portfolio />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <div className="tour-whychoose">
            <WhyChoose />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <div className="tour-our-process">
            <OurProcess />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <div className="tour-testimonials">
            <Testimonials />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <div className="tour-blog">
            <Blog />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <div className="tour-consultation">
            <Consultation />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <div className="tour-Faqs">
            <FAQs faqs={faqs} />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="200px" />}>
          <div className="Footer">
            <Footer />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Home;