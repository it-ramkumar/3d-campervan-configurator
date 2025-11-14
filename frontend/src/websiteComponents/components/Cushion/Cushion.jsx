import HeroSection from "../HeroSection/HeroSection"
import Consultation from "../Consultation/Consultation";
import Cushiondetail from "./Cushiondetail/Cushiondetail";


import Navbar from "../Navbar/Navbar";
import Footer from  "../Footer/Footer";


export default function Cushionpage() {

    const heroImage = "Interior Choices/Dinette cushions/1.jpg";
  const newTitleText = "Cushion Color & Fabric Catalog";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
      <HeroSection title={newTitleText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={false} />
      </div>
      <div className="tour-detail">
        <Cushiondetail />
      </div>


       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}