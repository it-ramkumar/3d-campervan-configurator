
import Hero from "./heroc/HeroC";

import Consultation from "../Consultation/Consultation";
import Portfolio from "../HomePage/Portfolio/Portfolio";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Contact() {
  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <Hero />
      </div>
      <div className="tour-consultation-page">
        <Consultation />
      </div>
       <div className="tour-portfolioc">
        <Portfolio />
      </div>
      <Footer/>
    </>
  );
}