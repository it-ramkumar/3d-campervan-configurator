import ExteriorHero from "./Exteriorhero"
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import RoofOptions from "../Roofoptions/Roofoptions";


import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function Exteriorpage() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <ExteriorHero />
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