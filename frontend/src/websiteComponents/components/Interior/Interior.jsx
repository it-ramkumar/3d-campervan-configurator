import Consultation from "../Consultation/Consultation";
import Interiorlist from "./Interiorlist/Interiorlist";
import Navbar from "../Navbar/Navbar";
import Footer from  "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection"


export default function Interiorpage() {

  const heroImage = "/heroSlider/interiorHero.png";
  const newTitleText = "Interior Design Choices";
  const newDescriptionText =
    "At Big Bear Vans, our goal is to build a campervan that suits you the most. Your custom van’s style can be inspired by something from Instagram, reflect the color scheme of your home, or be something entirely new that you would like to have.";


  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
      <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={false} />
      </div>
      <div className="tour-interior-list">
        <Interiorlist />
      </div>

       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}