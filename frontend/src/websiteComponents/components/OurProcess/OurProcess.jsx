import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Processlist from "./ProcessList/Processlist";

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
      {/* ✅ REACT 19 SEO METADATA */}
      <title>{newTitleText}</title>
      <meta name="description" content={newDescriptionText} />
      <meta name="keywords" content="camper van build process, custom van conversion steps, 3D van design, vehicle sourcing for campervans, big bear vans california" />
      <link rel="canonical" href={pageUrl} />

      {/* Social Media */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={newTitleText} />
      <meta property="og:description" content={newDescriptionText} />
      <meta property="og:image" content={heroImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD HowTo Schema */}
      <script type="application/ld+json">
        {JSON.stringify(processSchema)}
      </script>
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