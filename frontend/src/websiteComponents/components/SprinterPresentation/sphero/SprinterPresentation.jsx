import Sphero from "./sphero"
// import ConsultationPage from "../../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../../Consultation/Consultation";
import Vanconfig from "../vanconfig/vanconfig";
 import Table from "../table/table";
 import Exteriorcolourchoices from "../exteriorcolourchoices/exteriorcolourchoices";
 import SeatOptions from "../seatoption/seatoption";
import SprinterUpgrade from "../SprinterUpgrade/sprinterupgrade";
 import Conveniencetech from "../conveniencetech/conveniencetech";
 import Speclist from "../speclist/speclist";
import DecisionFactorsPage from "../decisionfactors/decisionfactors";
 import Custombuild from "../custombuild/custombuild";



import Navbar from "../../Navbar/Navbar";
import Footer from  "../../Footer/Footer";


export default function Sprinterpage() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Sphero />
      </div>
       <div className="tour-van-config">
        <Vanconfig />
      </div>
      <div className="tour-table">  
        <Table />
      </div>
      <div className="tour-exterior-colour-choices">
        <Exteriorcolourchoices />
      </div>
      <div className="tour-seat-options">
        <SeatOptions />
      </div>  
      <div className="tour-sprinter-upgrade">
        <SprinterUpgrade />
      </div> 
      <div className="tour-convenience-tech">
        <Conveniencetech />
      </div>
      <div className="tour-spec-list">
        <Speclist />
      </div>
      <div className="tour-decision-factors">
        <DecisionFactorsPage />
      </div>
      <div className="tour-custom-build">
        <Custombuild />
      </div>
  
       <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer/>
    </>
  );
}