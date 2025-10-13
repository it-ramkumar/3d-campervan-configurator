import ShowroomHero from "./showroomhero"
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import Visitshowroom from "../Visitshowroom/Visitshowroom";
import Virtualroom from "../virtualroom/virtualroom";


import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function Showroom() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <ShowroomHero />
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