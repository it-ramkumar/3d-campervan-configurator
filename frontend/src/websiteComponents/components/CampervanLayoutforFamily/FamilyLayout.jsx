import HeroSection from "../HeroSection/HeroSection";
import FamilyLayoutList from "./FamilyLayoutList/FamilyLayoutList";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function FamilyLayout() {


const heroImage = "/heroSlider/CampervansLayoutforFamilyhero.webp";
const newTitleText = "Campervans Layouts for Family (For 2+)";
const newDescriptionText =
  "Explore our exclusive campervan layouts designed for families. Perfect for 2 or more travelers.";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
      <div className="tour-familylayoutlist">
        <FamilyLayoutList />
      </div>

      <Footer/>
    </>
  );
}