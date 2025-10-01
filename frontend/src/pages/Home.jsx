import Navbar from "../websiteComponents/components/Navbar/Navbar";
import Hero from "../websiteComponents/components/HomePage/Hero/Hero";
import Buy from "../websiteComponents/components/HomePage/Buy/Buy";
import Customize from "../websiteComponents/components/HomePage/Customize/Cutomize";
import Portfolio from "../websiteComponents/components/HomePage/Portfolio/Portfolio";
import WhyChoose from "../websiteComponents/components/HomePage/Whychoose/WhyChoose";
import OurProcess from "../websiteComponents/components/HomePage/Ourprocess/OurProcess";
import Testimonials from "../websiteComponents/components/HomePage/Testimonials/Testimonials";
import Blog from "../websiteComponents/components/HomePage/Blog/Blog";
import Consultation from "../websiteComponents/components/Consultation/Consultation";
import FAQs from "../websiteComponents/components/Faqs/Faqs";
import Footer from "../websiteComponents/components/Footer/Footer";

const Home = () => {
  return (
   <div className="">
      <div className="navbar">
        <Navbar />
      </div>
      {/* Page Sections */}
      <div className="tour-hero">
        <Hero />
      </div>
      <div className="tour-buy">
        <Buy />
      </div>
      <div className="tour-customizer">
        <Customize />
      </div>
  <div className="tour-portfolio">
        <Portfolio />
      </div>
          <div className="tour-whychoose">
        <WhyChoose/>
      </div>
    <div className="tour-our-process">
        <OurProcess />
      </div>
      <div className="tour-testimonials">
        <Testimonials/>
      </div>
       <div className="tour-blog">
        <Blog />
      </div>
      <div className="tour-consultation">
        <Consultation />
      </div>
      <div className="tour-Faqs">
        <FAQs />
      </div>
       <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
