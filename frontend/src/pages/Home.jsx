import { lazy, Suspense } from "react";
import { generateHomeSchema } from "../websiteComponents/schema/homeSchema";
import { createFAQSchema } from "../websiteComponents/schema/faqSchema";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Ruler from "lucide-react/dist/esm/icons/ruler";
import LayoutPanelTop from "lucide-react/dist/esm/icons/layout-panel-top";
import BatteryCharging from "lucide-react/dist/esm/icons/battery-charging";
import Armchair from "lucide-react/dist/esm/icons/armchair";
import { CustomLink } from "../websiteComponents/components/Common/Common";
import { Helmet } from "react-helmet-async";

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
    {
      text: (
        <span>
          <CustomLink to="/configurator" text={"3D renderings "}/>
           to help you visualise your future van before we even pick up a tool.
        </span>
      ), icon: CheckCircle2
    },
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

  const image =[{img: "/long/cusco(2).webp",link:""
  },{img:"/long/imperial(8).webp", link: "/layout-detail/imperial"},{img: "/long/imperial(9).webp", link: "/layout-detail/imperial"},{img:"/long/san(1).webp", link: "/layout-detail/san-clemente"},{img:"/long/moto(10).webp", link: "/layout-detail/moto-van"},{img:"/family/casa(11).webp", link: "/layout-detail/calabasas"},{img:"/family/santa(9).webp",  link: "/layout-detail/santa-cruz"},{img:"/family/san(7).webp", link: "/layout-detail/san-clemente"},];

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

  const homeSchemaData = generateHomeSchema(faqs);
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
     <Helmet>
        {/* Basic Meta Tags */}
        <title>Luxury Custom Camper Van Conversions | Big Bear Vans</title>
        <meta name="description" content="Expertly crafted custom camper vans for off-grid living. We use 3D Scanning and CNC precision to build your dream Mercedes Sprinter or Ford Transit conversion." />
        <meta name="keywords" content="custom camper vans, van conversion USA, big bear vans, sprinter van conversion, luxury motorhomes" />
        <link rel="canonical" href="https://bigbearvans.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Big Bear Vans | Premium Custom Builds & 3D Design" />
        <meta property="og:description" content="From 3D renderings to the final build, we create high-end camper vans tailored to your lifestyle." />
        <meta property="og:image" content="https://bigbearvans.com/images/custom4.webp" />
        <meta property="og:url" content="https://bigbearvans.com" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Big Bear Vans | Luxury Custom Camper Vans" />
        <meta name="twitter:description" content="Design and build your dream camper van with 3D precision. Order your custom build today." />
        <meta name="twitter:image" content="https://bigbearvans.com/images/custom4.webp" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify([homeSchemaData, faqSchema])}
        </script>
      </Helmet>
      {/* Above the fold - Load immediately */}
      <Navbar />
      <Hero />
      <div className="overflow-x-hidden bg-white flex flex-col space-y-16 md:space-y-32">

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <section >
            <Buy />
          </section>
        </Suspense>

        {/* Section: Customize - py-16 md:py-24 ko handle kiya gaya hai */}
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <section className="tour-customizer bg-secondary py-16 md:py-24">
            <Customize
              mainTitle={maintitle}
              sectionTitle={sectiontitle}
              description={desc}
              descriptionList={descriptionList}
              image={image}
              orderButtonLabel={orderButtonLabel}
              orderButtonLink={orderButtonLink}
              lastText={lastText}
            />
          </section>
        </Suspense>

        {/* Portfolio */}
        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <section>
            <Portfolio />
          </section>
        </Suspense>
        {/* Section: Why Choose */}
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <section >
            <WhyChoose />
          </section>
        </Suspense>

        {/* Section: Our Process */}
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <section >
            <OurProcess />
          </section>
        </Suspense>

        {/* Section: Testimonials */}
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <section >      <Testimonials />
          </section>
        </Suspense>

        {/* Section: Blog */}
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <section >      <Blog />
          </section>
        </Suspense>

        {/* Section: Consultation */}
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <section className="tour-consultation bg-secondary">
            <Consultation />
          </section>
        </Suspense>

        {/* Section: FAQs */}
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <section className="tour-Faqs">
            <FAQs faqs={faqs} />
          </section>
        </Suspense>

        {/* Footer: No extra top space-y needed usually, but it follows the pattern */}
        <Suspense fallback={<SectionSkeleton height="200px" />}>
          <footer className="Footer">
            <Footer />
          </footer>
        </Suspense>
      </div>
    </>
  );
};

export default Home;