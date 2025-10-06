// C:\Users\PMYLS\3d-campervan-configurator\frontend\src\websiteComponents\components\SantaMonica\Santa.jsx

import SantaMonica from "./SantaMonica";
// CORRECTED PATH: Only go up one level to the 'components' directory
import Navbar from "../Navbar/Navbar";
// CORRECTED PATH: The Footer component has the same issue
import Footer from "../Footer/Footer";
import ConsultationPage from "../Layouts/Consultationlayout/Consultationlayout";


export default function Layouts() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-santa">
        <SantaMonica />
      </div>
      <div className="tour-consultation">
        <ConsultationPage />
      </div>

      <Footer/>
    </>
  );
}