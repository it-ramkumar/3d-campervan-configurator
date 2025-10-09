import ProcessHero from "./Processhero"
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import Processlist from "../ProcessList/Processlist";

import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function OurProcess() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <ProcessHero />
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