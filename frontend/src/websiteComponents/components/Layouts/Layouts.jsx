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
      title: "Campervans Layouts for Family (For 2+)",
      images: [
        "/images/limage1.webp", "/images/limage2.webp", "/images2/layout1.webp",
        "/images/limage4.webp", "/images/image5l.webp", "/images/image6l.webp",
        "/images/image7l.webp", "/images/image8l.webp"
      ],
      link: "/layout-by-category/Layouts for Families (3–9 People)",
      showIntro: true
    },
    {
      id: "couples",
      title: "Campervans Layouts for Couples (For 2)",
      images: ["/images/image5l.webp", "/images/image6l.webp", "/images/image7l.webp", "/images/image8l.webp"],
      link: "/layout-by-category/Layouts for Solo & Couple Travelers"
    },
    {
      id: "short-vans",
      title: "Campervans Layouts Short Vans",
      images: ["/shortVans/image1.jpg", "/shortVans/image2.jpg", "/shortVans/image3.jpg", "/shortVans/image4.jpg"],
      link: "/layout-by-category/Flagship Short Van — Santa Monica"
    },
    {
      id: "long-vans",
      title: "Campervans Layouts Long Vans",
      images: ["/longVans/image1.jpg", "/longVans/image2.jpg", "/longVans/image3.jpg", "/longVans/image4.jpg"],
      link: "/layout-by-category/Flagship Long Van — Montreal"
    },
    {
      id: "custom-build",
      title: "Campervans Layouts Custom Vans",
      images: ["/customBuild/image1.jpg", "/customBuild/image2.jpg", "/customBuild/image3.jpg", "/customBuild/image4.jpg"],
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