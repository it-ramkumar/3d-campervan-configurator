import Hero from "./layouthero"
import Family from "../Family/Family";
import Couples from "../Couples/Couples";
// import Consultationlayout from "../Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";

import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function Layouts() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Hero />
      </div>
      <div className="tour-family">
        <Family />
      </div>
       <div className="tour-couples">
        <Couples />
      </div>
       <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>
      <Footer/>
    </>
  );
}