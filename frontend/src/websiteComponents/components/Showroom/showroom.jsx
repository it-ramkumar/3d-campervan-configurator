
import Consultation from "../Consultation/Consultation";
import Visitshowroom from "./Visitshowroom/Visitshowroom";
import Virtualroom from "./virtualroom/virtualroom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { generateShowroomSchema } from "../../schema/showroom";

export default function Showroom() {

  const heroImage = "/heroSlider/Showroomhero.webp";
const newTitleText = "Visit Our Showroom in Big Bear California";
const newDescriptionText ="Want us to customize your van? The best way to get started is by visiting our van workshop in Big Bear City, California..";
const showroomSchema = generateShowroomSchema();
return (
    <>
    {/* ✅ REACT 19 SEO METADATA */}
      <title>{newTitleText}</title>
      <meta name="description" content={newDescriptionText} />
      <meta name="keywords" content="van conversion showroom california, big bear vans workshop, sprinter van tour, LAX airport pickup van build, virtual van tour" />
      <link rel="canonical" href="https://bigbearvans.com/showroom" />

      {/* Social Media Tags */}
      <meta property="og:title" content={newTitleText} />
      <meta property="og:description" content={newDescriptionText} />
      <meta property="og:image" content={heroImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Local Business JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(showroomSchema)}
      </script>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
             <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage}  showButton={false} />
      </div>
      <div className="tour-visitshowroom">
        <Visitshowroom />
      </div>
      <div className="tour-virtualroom">
        <Virtualroom />
      </div>
       <div className="tour-consultation">
        <Consultation vanForSale={true}/>
      </div>

      <Footer/>
    </>
  );
}