
import Consultation from "../Consultation/Consultation";
// import Fhero from "./Fhero";
 import Flist from "./Flist/Flist";
 import HeroSection from "../HeroSection/HeroSection"
 import Navbar from "../Navbar/Navbar";
 import Footer from  "../Footer/Footer";
 import { generateFinancingSchema } from "../../schema/financing";


export default function Sprinterpage() {


  const heroImage = "/heroSlider/limage2.webp";
  const newTitleText = "Financing For Your Campervan";
  const newDescriptionText =
    "Get flexible financing options and take home your dream campervan with ease.";

    const financingSchema = generateFinancingSchema();
  const pageUrl = "https://bigbearvans.com/financing";
  return (
    <>
      {/* Page Sections */}
      {/* ✅ REACT 19 SEO METADATA */}
      <title>{newTitleText}</title>
      <meta name="description" content={newDescriptionText} />
      <meta name="keywords" content="sprinter van financing, campervan rv loans, trident funding rv, custom van conversion loan, mercedes sprinter finance california" />
      <link rel="canonical" href={pageUrl} />

      {/* Social Media (Open Graph) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={newTitleText} />
      <meta property="og:description" content={newDescriptionText} />
      <meta property="og:image" content={heroImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Financing Schema */}
      <script type="application/ld+json">
        {JSON.stringify(financingSchema)}
      </script>
      <Navbar />
      <div className="tour-hero">
   <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage}  />
      </div>
        <div className="tour-financing-list">
          <Flist />
        </div>

       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}