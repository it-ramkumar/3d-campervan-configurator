import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Mission from "./Mission/Mission";
import Adventure from "./Adventure/Adventure";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet-async";
import { generateAboutSchema } from "../../schema/about"; // Path check karleib

export default function AboutUs() {

  const heroImage = "/heroSlider/processhero.webp";
  const newTitleText = "About Big Bear Vans | Custom Van Builders California";
const newDescriptionText =
  "Artur and Anna founded Big Bear Vans, building family-focused Sprinter conversions with smart elevator beds.";
  const aboutSchema = generateAboutSchema();
  const pageUrl = "https://bigbearvans.com/about-us";
  return (
    <>
     <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>{newTitleText}</title>
  <meta name="description" content={newDescriptionText} />
  <meta name="keywords" content="Big Bear Vans founders, custom van builders California, 5 person sleeper van, sprinter elevator bed conversion, CNC engineered campervans" />
  <link rel="canonical" href={pageUrl} />

  {/* ✅ 2. Open Graph (Facebook/LinkedIn/WhatsApp) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={newTitleText} />
  <meta property="og:description" content={newDescriptionText} />
  <meta property="og:image" content="https://bigbearvans.com/images/mission.webp" />
  <meta property="og:url" content={pageUrl} />

  {/* ✅ 3. Twitter Card Tags (Jo missing thay) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={newTitleText} />
  <meta name="twitter:description" content={newDescriptionText} />
  <meta name="twitter:image" content="https://bigbearvans.com/images/mission.webp" />

  {/* ✅ 4. JSON-LD Schema */}
  <script type="application/ld+json">
    {JSON.stringify(aboutSchema)}
  </script>
</Helmet>
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>
      <div className="tour-mission">
        <Mission />
      </div>
      <div className="tour-adventure">
        <Adventure />
      </div>

      <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>

      <Footer />
    </>
  );
}