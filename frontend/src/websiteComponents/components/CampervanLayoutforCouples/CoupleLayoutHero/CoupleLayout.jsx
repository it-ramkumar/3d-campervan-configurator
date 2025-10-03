// C:\...\FamilyLayoutHero\FamilyLayout.jsx

import CoupleLayoutHero from "./CoupleLayoutHero";
import CoupleLayoutList from "../CoupleLayoutList/CoupleLayoutList";

// ✅ CORRECTED PATHS: Must go up TWO levels to reach the 'components' directory.
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function CoupleLayout() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <CoupleLayoutHero />
      </div>
      <div className="tour-familylayoutlist">
        <CoupleLayoutList />
      </div>

      <Footer/>
    </>
  );
}