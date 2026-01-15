import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Mission from "./Mission/Mission";
import Adventure from "./Adventure/Adventure";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { generateAboutSchema } from "../../schema/about"; // Path check karleib

export default function AboutUs() {

  const heroImage = "/heroSlider/AboutUshero.webp";
  const newTitleText = "About Big Bear Vans";
  const newDescriptionText =
    "Learn more about Big Bear Vans, our story, and our commitment to quality custom van conversions.";
const aboutSchema = generateAboutSchema();
  const pageUrl = "https://bigbearvans.com/about";
  return (
    <>
      {/* ✅ SEO METADATA */}
      <title>{newTitleText}</title>
      <meta name="description" content={newDescriptionText} />
      <meta name="keywords" content="Big Bear Vans story, custom van builders California, family campervan 5 seater, Sprinter elevator bed, Artur and Anna vans" />
      <link rel="canonical" href={pageUrl} />

      {/* Social Media (OG) Tags */}
      <meta property="og:title" content={newTitleText} />
      <meta property="og:description" content={newDescriptionText} />
      <meta property="og:image" content="/images/mission.webp" />
      <meta property="og:url" content={pageUrl} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(aboutSchema)}
      </script>
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