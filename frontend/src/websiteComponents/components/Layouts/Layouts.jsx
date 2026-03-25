import HeroSection from "../HeroSection/HeroSection";
import Family from "./All_Layout/All_Layout";
import Consultation from "../Consultation/Consultation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import All_Titles from "./All_Titles/All_Titles";
import { Helmet } from "react-helmet-async";
import { generateLayoutsSchema } from "../../schema/layoutPage";
import { vanLayoutsData } from "../../DataUseInComp/LayouData";

export default function Layouts() {
  const heroImage = "/images2/layout2.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText = "Discover the various layouts we offer for our custom vans.";

  // Single JSON structure for all layouts


  const LayoutText = {
    text: "Have a look at our completed projects...",
    description: "Browse to find inspiration for your dream campervan and to see our craftsmanship in every detail.",
  };

  const layoutsSchema = generateLayoutsSchema();
  const pageTitle = "Custom Camper Van Layouts | 3D Designed Floor Plans | Big Bear Vans";
  const pageDesc = "Browse our custom van conversion layouts...";
  const currentUrl = "https://bigbearvans.com/van-layouts";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json">{JSON.stringify(layoutsSchema)}</script>
      </Helmet>

      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>
      <All_Titles />

      {/* Dynamic Rendering using Map */}
      {vanLayoutsData.map((item) => (
        <div key={item.id} className={`tour-${item.id}`}>
          <Family
            layout={item}
            LayoutText={LayoutText}
            text={item.showIntro || false}
          />
        </div>
      ))}

      <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>
      <Footer />
    </>
  );
}