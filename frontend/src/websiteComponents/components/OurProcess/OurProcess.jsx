import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Processlist from "./ProcessList/Processlist";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { generateProcessSchema } from "../../schema/ourProcess"; // Adjust path


export default function OurProcess() {

  const heroImage = "/heroSlider/processhero.webp";
  const newTitleText = "Our Process At Big Bear Vans"
  const newDescriptionText =
    "A complete process of how we customize your dream custom van";

  const processSchema = generateProcessSchema();
  const pageUrl = "https://bigbearvans.com/our-process";
  return (
    <>
     <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>Our Process: From 3D Design to Handover | Big Bear Vans</title>
  <meta name="description" content="Explore our transparent 5-month custom van build process. From 3D visualization and vehicle sourcing to complimentary LAX valet pickup and lifetime care." />
  <meta name="keywords" content="custom van build timeline, sprinter van conversion process, 3D van design, Mercedes Sprinter sourcing, Big Bear Vans warranty, fly in drive out van build" />
  <link rel="canonical" href={pageUrl} />

  {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl}/>
  <meta property="og:title" content="How We Build Your Dream Van | The Big Bear Process" />
  <meta property="og:description" content="5 months. 3D precision. Lifetime care. See how we turn your vision into a high-end off-grid home." />
  <meta property="og:image" content="https://bigbearvans.com/images/process6.webp" />

  {/* ✅ 3. Twitter Card Tags (Social Media optimized) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Custom Van Journey | Big Bear Vans" />
  <meta name="twitter:description" content="From the first 3D sketch to your first campout. Learn about our 5-month build process and airport valet service." />
  <meta name="twitter:image" content="https://bigbearvans.com/images/process6.webp" />

  {/* ✅ 4. JSON-LD (How-To Schema) - Google loves this for processes */}
 <script type="application/ld+json">
    {JSON.stringify(processSchema)}
  </script>
</Helmet>
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/contact" buttonText="Contact Us" showButton={true} />
      </div>

      <div className="tour-processlist">
        <Processlist />
      </div>
      <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>

      <Footer />
    </>
  );
}