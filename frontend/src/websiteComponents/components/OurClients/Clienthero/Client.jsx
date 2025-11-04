import Clienthero from "./Clienthero"
import Clientdetail from "../Clientdetail/Clientdetail";
import Consultation from "../../Consultation/Consultation";



import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function OurClients() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Clienthero />
      </div>
      <div className="tour-details">
        <Clientdetail />
      </div>
       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}