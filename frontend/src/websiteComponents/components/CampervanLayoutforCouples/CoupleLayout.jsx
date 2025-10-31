import HeroSection from "../HeroSection/HeroSection";
import CoupleLayoutList from "./CoupleLayoutList/CoupleLayoutList";

// ✅ CORRECTED PATHS: Must go up TWO levels to reach the 'components' directory.
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function CoupleLayout() {

  const heroImage = "/heroSlider/CampervansLayoutforCouples.webp";
const newTitleText = " Campervans Layouts for Couples (For 2)";
const newDescriptionText =
  "Explore our exclusive campervan layouts designed for couples. Perfect for 2 travelers.";


  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
            <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
      <div className="tour-familylayoutlist">
        <CoupleLayoutList />
      </div>

      <Footer/>
    </>
  );
}