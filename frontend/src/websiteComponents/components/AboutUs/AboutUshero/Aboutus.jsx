import AboutusHero from "./AboutUshero"
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import Mission from "../Mission/Mission";
import Adventure from "../Adventure/Adventure";

import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function AboutUs() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <AboutusHero />
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