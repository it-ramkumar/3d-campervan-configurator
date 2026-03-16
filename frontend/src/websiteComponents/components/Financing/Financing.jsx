
import Consultation from "../Consultation/Consultation";
 import Flist from "./Flist/Flist";
 import HeroSection from "../HeroSection/HeroSection"
 import Navbar from "../Navbar/Navbar";
 import Footer from  "../Footer/Footer";
 import { Helmet } from "react-helmet-async";
 import { generateFinancingSchema } from "../../schema/financing";


export default function Sprinterpage() {


  const heroImage = "/images2/finance.webp";
  const newTitleText = "Financing For Your Campervan";
  const newDescriptionText =
    "Get flexible financing options and take home your dream campervan with ease.";

    const financingSchema = generateFinancingSchema();

  return (
    <>
  <Helmet>
  {/* --- 1. Standard Meta Tags --- */}
  <title>Campervan Financing & RV Loans | Custom Sprinter Builds | Big Bear Vans</title>
  <meta name="description" content="Explore flexible financing for your custom Mercedes Sprinter. From specialized 15-year RV loans through Trident Funding to all-in-one build loans. 20-30% down payment options available." />
  <meta name="keywords" content="sprinter van financing, trident funding rv, campervan loan california" />
  <link rel="canonical" href="https://bigbearvans.com/financing" />

  {/* --- 2. Twitter Card Tags (X) --- */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@bigbearvans" />
  <meta name="twitter:title" content="Financing Your Dream Campervan | Big Bear Vans" />
  <meta name="twitter:description" content="Get pre-approved for specialized RV loans or all-in-one conversion financing. Flexible 15-year terms available." />
  <meta name="twitter:image" content="https://bigbearvans.com/heroSlider/limage2.webp" />

  {/* --- 3. Open Graph Tags (Facebook, LinkedIn, WhatsApp) --- */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bigbearvans.com/financing" />
  <meta property="og:title" content="Campervan Financing & RV Loans | Big Bear Vans" />
  <meta property="og:description" content="Easy financing options for your custom van build. Partnered with Trident Funding & Mercedes-Benz Financial." />
  <meta property="og:image" content="https://bigbearvans.com/heroSlider/limage2.webp" />

  {/* --- 4. JSON-LD (Structured Data) --- */}
  <script type="application/ld+json">
    {JSON.stringify(financingSchema)}
  </script>
</Helmet>
      <Navbar />
      <div className="tour-hero">
   <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/contact" buttonText="Get a Quote"/>
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