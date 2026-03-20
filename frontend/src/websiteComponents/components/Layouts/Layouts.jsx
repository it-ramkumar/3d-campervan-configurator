import HeroSection from "../HeroSection/HeroSection";
import Family from "./All_Layout/All_Layout";
import Consultation from "../Consultation/Consultation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import All_Titles from "./All_Titles/All_Titles";
import { Helmet } from "react-helmet-async";
import { generateLayoutsSchema } from "../../schema/layoutPage";

export default function Layouts() {
  const heroImage = "/images2/layout2.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText = "Discover the various layouts we offer for our custom vans.";

  // Single JSON structure for all layouts
  const vanLayoutsData = [
    {
      id: "family",
      title: "Campervan Layouts for Family (For 2+)",
      images: [
"/layout/1(1).webp","/layout/1(2).webp","/layout/1(3).webp","/layout/1(4).webp","/layout/1(5).webp","/layout/1(6).webp","/layout/1(7).webp","/layout/1(8).webp","/layout/1(9).webp"
      ],
      link: "/layout-by-category/Layouts for Families (3–9 People)",
      showIntro: true
    },
    {
      id: "couples",
      title: "Campervan Layouts for Couples (For 2)",
      images: ["/layout/1(10).webp","/layout/1(11).webp","/layout/1(12).webp","/layout/1(13).webp","/layout/1(15).webp"],
      link: "/layout-by-category/Layouts for Solo & Couple Travelers"
    },
    {
      id: "short-vans",
      title: "Short Campervan Layouts ",
      images: ["/layout/1(16).webp","/layout/1(17).webp","/layout/1(18).webp","/layout/1(1).webp","/layout/1(2).webp","/layout/1(3).webp"],
      link: "/layout-by-category/Flagship Short Van — Santa Monica"
    },
    {
      id: "long-vans",
      title: "Long Campervan Layouts ",
      images: ["/layout/1(4).webp","/layout/1(5).webp","/layout/1(6).webp","/layout/1(7).webp","/layout/1(8).webp"],
      link: "/layout-by-category/Flagship Long Van — Montreal"
    },
    {
      id: "custom-build",
      title: "Custom Campervan Layouts ",
      images: ["/layout/1(9).webp","/layout/1(10).webp","/layout/1(11).webp","/layout/1(12).webp","/layout/1(13).webp","/layout/1(15).webp"],
      link: "/layout-by-category/Portfolio of Custom Builds"
    }
  ];

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