
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../Consultation/Consultation";
// import Fhero from "./Fhero";
 import Flist from "./Flist/Flist";
 import HeroSection from "../HeroSection/HeroSection"



import Navbar from "../Navbar/Navbar";
import Footer from  "../Footer/Footer";


export default function Sprinterpage() {


  const heroImage = "/heroSlider/limage2.webp";
  const newTitleText = "Financing For Your Campervan";
  const newDescriptionText =
    "Get flexible financing options and take home your dream campervan with ease.";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
   <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage}  />
      </div>
        <div className="tour-financing-list">
          <Flist />
        </div>

       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}