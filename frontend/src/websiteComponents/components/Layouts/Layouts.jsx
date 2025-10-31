import HeroSection from "../HeroSection/HeroSection";
import Family from "./Family/Family";
import Couples from "./Couples/Couples";
import Consultation from "../Consultation/Consultation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Layouts() {

const heroImage = "heroSlider/layouthero.webp";
const newTitleText = "Explore Layouts of Our Custom Vans";
const newDescriptionText =
  "Discover the various layouts we offer for our custom vans.";
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage}  showButton={false} />
      </div>
      <div className="tour-family">
        <Family />
      </div>
       <div className="tour-couples">
        <Couples />
      </div>
       <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>
      <Footer/>
    </>
  );
}