import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Mission from "./Mission/Mission";
import Adventure from "./Adventure/Adventure";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function AboutUs() {

    const heroImage = "/heroSlider/AboutUshero.webp";
const newTitleText = "About Big Bear Vans";
const newDescriptionText =
  "Learn more about Big Bear Vans, our story, and our commitment to quality custom van conversions.";

  return (
    <>
      {/* Page Sections */}
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

      <Footer/>
    </>
  );
}