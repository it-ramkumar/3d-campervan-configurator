import HeroSection from "../HeroSection/HeroSection";
import ShortVanListing from "./ShortVanListing"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function FamilyLayout() {
const heroImage = "/heroSlider/short_van.jpg";
const newTitleText = "Campervan Layouts — Short Van";
const newDescriptionText =
  "Check out our compact short van campervan layouts, perfect for couples or small families. Ideal for 2 or more travelers.";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
      <div className="tour-familylayoutlist">
        <ShortVanListing />
      </div>

      <Footer/>
    </>
  );
}