import HeroSection from "../HeroSection/HeroSection";
import CustomVan from "./CustomBuildListing"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function FamilyLayout() {


const heroImage = "/heroSlider/CampervansLayoutforFamilyhero.webp";
const newTitleText = "Custom Campervan Builds";
const newDescriptionText =
  "Design your dream campervan with our custom build options. Tailored layouts, features, and finishes for every traveler.";

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
      <div className="tour-familylayoutlist">
        <CustomVan />
      </div>

      <Footer/>
    </>
  );
}