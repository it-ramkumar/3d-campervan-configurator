
import HeroSection from "../HeroSection/HeroSection"
import Portfolio from "../HomePage/Portfolio/Portfolio";
export default function Contact() {
  const heroImage = "/heroSlider/bloghero.webp";
  const newTitleText = "Contact Us | Custom Van Builders in Big Bear City,CA";
  const newDescriptionText = "Contact Big Bear Vans today for your custom van conversion. Our team of expert van builders in Big Bear City, California, is ready to help you begin your dream van life.";

  return (
    <>

      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>

      <div className="tour-portfolioc">
        <Portfolio />
      </div>
    </>
  );
}