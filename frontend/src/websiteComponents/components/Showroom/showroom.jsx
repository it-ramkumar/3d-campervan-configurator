
import Consultation from "../Consultation/Consultation";
import Visitshowroom from "./Visitshowroom/Visitshowroom";
import Virtualroom from "./virtualroom/virtualroom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Showroom() {

  const heroImage = "/heroSlider/Showroomhero.webp";
const newTitleText = "Visit Our Showroom in Big Bear California";
const newDescriptionText ="Want us to customize your van? The best way to get started is by visiting our van workshop in Big Bear City, California..";
  return (
    <>
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