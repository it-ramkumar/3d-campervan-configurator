// C:\...\FamilyLayoutHero\FamilyLayout.jsx

import FamilyLayoutHero from "./FamilyLayoutHero";
import FamilyLayoutList from "../FamilyLayoutList/FamilyLayoutList";

// ✅ CORRECTED PATHS: Must go up TWO levels to reach the 'components' directory.
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


export default function FamilyLayout() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <FamilyLayoutHero />
      </div>
      <div className="tour-familylayoutlist">
        <FamilyLayoutList />
      </div>

      <Footer/>
    </>
  );
}