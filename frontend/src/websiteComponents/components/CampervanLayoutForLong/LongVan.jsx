import HeroSection from "../HeroSection/HeroSection";
import LongVan from "./LongVanListing"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function FamilyLayout() {

const heroImage = "/heroSlider/long_van.jpg";
const newTitleText = "Campervan Layouts — Long Van";
const newDescriptionText =
  "Discover our spacious long van campervan layouts. Ideal for families and groups, offering comfort and flexibility for 2 or more travelers.";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
      <div className="tour-familylayoutlist">
        <LongVan />
      </div>

      <Footer/>
    </>
  );
}