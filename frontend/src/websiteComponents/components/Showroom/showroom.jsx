
import Consultation from "../Consultation/Consultation";
import Visitshowroom from "./Visitshowroom/Visitshowroom";
import Virtualroom from "./virtualroom/virtualroom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet-async";
import { generateShowroomSchema } from "../../schema/showroom";

export default function Showroom() {

  const heroImage = "/heroSlider/Showroomhero.webp";
  const newTitleText = "Visit Our Showroom in Big Bear California";
  const newDescriptionText = "Want us to customize your van? The best way to get started is by visiting our van workshop in Big Bear City, California..";
  const showroomSchema = generateShowroomSchema(heroImage);
  return (
    <>
     <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>Visit Our Showroom | Custom Van Conversions | Big Bear Vans</title>
  <meta name="description" content="Experience our luxury campervan builds in person. Visit the Big Bear Vans showroom in California for a 3D tour, workshop walkthrough, and expert consultation." />
  <meta name="keywords" content="van conversion showroom california, big bear vans workshop, sprinter van tour, LAX airport pickup van build, virtual van tour, custom campervan gallery" />
  <link rel="canonical" href="https://bigbearvans.com/showroom" />

  {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bigbearvans.com/showroom" />
  <meta property="og:title" content="Experience Big Bear Vans | Showroom & Workshop Tour" />
  <meta property="og:description" content="See our latest Sprinter and Transit builds. Schedule your visit to our California showroom today." />
  <meta property="og:image" content={heroImage} />

  {/* ✅ 3. Twitter Card Tags (Social Media optimized) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Big Bear Vans Showroom | Custom Campervan Tour" />
  <meta name="twitter:description" content="Come see how we build dream rigs. From 3D design to the finished build, explore it all at our workshop." />
  <meta name="twitter:image" content={heroImage} />

  {/* ✅ 4. Local Business JSON-LD (Crucial for Local SEO) */}
  <script type="application/ld+json">
    {JSON.stringify(showroomSchema)}
  </script>
</Helmet>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>
      <div className="tour-visitshowroom">
        <Visitshowroom />
      </div>
      <div className="tour-virtualroom">
        <Virtualroom />
      </div>
      <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>

      <Footer />
    </>
  );
}