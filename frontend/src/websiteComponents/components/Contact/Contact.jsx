
import Hero from "./Heroc/HeroC";

import Consultation from "./Consultationc/ConsultationC";
import Portfolio from "../HomePage/Portfolio/Portfolio";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Contact() {
   const CalenderHeading = "Schedule a FREE Consultation Call";
   const CalenderText = "Book a FREE consultation call now. We’re here to answer all your questions about our vans for sale, custom vans, campervan layouts (pre-built), or van accessories.";
   const ContantHeading = "Contact Us For a Custom Quote";
   const ContantText = "Prefer to get started with email? Fill out the form below to receive a custom quote for your Sprinter van conversion or Ford Transit build.";
     const ContantText1 = "Our team will respond promptly to discuss pricing, financing, our availability, and address any questions you may have about our campervan building process.";
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Hero />
      </div>
      <div className="tour-consultation-page">
        <Consultation CalenderHeading={CalenderHeading} CalenderText={CalenderText} />
      </div>
       <div className="tour-portfolioc">
        <Portfolio />
      </div>
      <Footer/>
    </>
  );
}