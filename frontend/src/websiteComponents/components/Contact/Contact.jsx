
import HeroSection from "../HeroSection/HeroSection"
import Consultation from "../Consultation/Consultation"
import Portfolio from "../HomePage/Portfolio/Portfolio";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Contact() {
  const heroImage = "/heroSlider/contact.webp";
  const newTitleText = "Contact Us | Custom Van Builders in Big Bear City,CA";
  const newDescriptionText = "Contact Big Bear Vans today for your custom van conversion. Our team of expert van builders in Big Bear City, California, is ready to help you begin your dream van life.";


  const CalenderHeading = "Schedule a FREE Consultation Call";
  const CalenderText = "Book a FREE consultation call now. We’re here to answer all your questions about our vans for sale, custom vans, campervan layouts (pre-built), or van accessories.";
  return (
    <>
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>
      <div className="tour-consultation-page">
        <Consultation CalenderHeading={CalenderHeading} CalenderText={CalenderText} />
      </div>
      <div className="tour-portfolioc">
        <Portfolio />
      </div>
      <Footer />
    </>
  );
}