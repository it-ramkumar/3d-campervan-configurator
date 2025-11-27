
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import Fhero from "./Fhero";
 import Flist from "../Flist/Flist";



import Navbar from "../../Navbar/Navbar";
import Footer from  "../../Footer/Footer";


export default function Sprinterpage() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Fhero />
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