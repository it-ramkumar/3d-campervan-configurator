import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import RoofOptions from "./Roofoptions/Roofoptions";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Exteriorpage() {

  const heroImage = "/heroSlider/exteriorhero.webp";
const newTitleText = "Campervan Exterior Upgrades";
const newDescriptionText =" The exterior of your campervan is all about looks and functionality. At Big Bear Vans, we go beyond aesthetics to equip your van with the most practical exterior accessories that turn heads along the way.";
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
          <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
        <div className="tour-roofoptions">
          <RoofOptions />
      </div>

       <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>

      <Footer/>
    </>
  );
}