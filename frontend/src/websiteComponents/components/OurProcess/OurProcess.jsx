import HeroSection from "../HeroSection/HeroSection";
import Consultation from "../Consultation/Consultation";
import Processlist from "./ProcessList/Processlist";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function OurProcess() {

  const heroImage = "/heroSlider/processhero.webp";
const newTitleText = "Our Process At Big Bear Vans"
const newDescriptionText =
  "A complete process of how we customize your dream custom van";
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
              <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} link="/contact" buttonText="Contact Us" showButton={true} />
      </div>

        <div className="tour-processlist">
          <Processlist />
      </div>
       <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>

      <Footer/>
    </>
  );
}