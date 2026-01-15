import HeroSection from "../HeroSection/HeroSection";
import Family from "./All_Layout/All_Layout";
import Consultation from "../Consultation/Consultation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import All_Titles from "./All_Titles/All_Titles";
import { generateLayoutsSchema } from "../../schema/layoutPage"


export default function Layouts() {

  const heroImage = "heroSlider/layouthero.webp";
  const newTitleText = "Explore Layouts of Our Custom Vans";
  const newDescriptionText =
    "Discover the various layouts we offer for our custom vans.";
  const FamilyLayout = {
    title: "Campervans Layouts for Family (For 2+)",
    image1: "/images/limage1.webp",
    image2: "/images/limage2.webp",
    image3: "/images/limage3.webp",
    image4: "/images/limage4.webp",
    link: "/layout-by-category/Layouts for Families (3–9 People)",
  }
  const CoupleLayout = {
    title: "Campervans Layouts for Couples (For 2)",
    image1: "/images/image5l.webp",
    image2: "/images/image6l.webp",
    image3: "/images/image7l.webp",
    image4: "/images/image8l.webp",
    link: "/layout-by-category/Layouts for Solo & Couple Travelers",
  }
  const ShortVans = {
    title: "Campervans Layouts Short Vans",
    image1: "/shortVans/image1.jpg",
    image2: "/shortVans/image2.jpg",
    image3: "/shortVans/image3.jpg",
    image4: "/shortVans/image4.jpg",
    link: "/layout-by-category/Flagship Short Van — Santa Monica",
  }
  const LongVans = {
    title: "Campervans Layouts Long Vans",
    image1: "/longVans/image1.jpg",
    image2: "/longVans/image2.jpg",
    image3: "/longVans/image3.jpg",
    image4: "/longVans/image4.jpg",
    link: "/layout-by-category/Flagship Long Van — Montreal",
  }
  const CustomVans = {
    title: "Campervans Layouts Custom Vans",
    image2: "/customBuild/image2.jpg",
    image3: "/customBuild/image3.jpg",
    image1: "/customBuild/image1.jpg",
    image4: "/customBuild/image4.jpg",
    link: "/layout-by-category/Portfolio of Custom Builds",
  }
  const LayoutText = {
    text: "Have a look at our completed projects. We're honoured to serve clients from different states in the USA. We've built custom vans for families, couples, pet- owners, remote workers, surfers, bikers, etc, all while considering their specific needs.You can check them all here.",
    description: "Browse to find inspiration for your dream campervan and to see our craftsmanship in every detail.",
  }

  const layoutsSchema = generateLayoutsSchema();
  const pageTitle = "Custom Camper Van Layouts | 3D Designed Floor Plans | Big Bear Vans";
  const pageDesc = "Browse our custom van conversion layouts. From family-sized 9-seaters to solo traveler setups, discover the perfect floor plan for your Mercedes Sprinter or Ford Transit.";
  return (
    <>
    {/* React 19 Native Metadata */}
      <title>{pageTitle}</title>
      <meta name="keywords" content="camper van layouts, sprinter floor plans, family van conversion layouts, 3D van design" />
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href="https://bigbearvans.com/layouts" />

      {/* Social Media (OG & Twitter) */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content="https://bigbearvans.com/images/limage1.webp" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(layoutsSchema)}
      </script>
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>
      <div>
        <All_Titles />
      </div>
      <div className="tour-family">
        <Family layout={FamilyLayout} LayoutText={LayoutText} text={true} />
      </div>
      <div className="tour-couples">
        <Family layout={CoupleLayout} />
      </div>
      <div className="tour-santa-monica">
        <Family layout={ShortVans} />
      </div>
      <div className="tour-montreal">
        <Family layout={LongVans} />
      </div>
      <div className="tour-custom-build">
        <Family layout={CustomVans} />
      </div>
      <div className="tour-consultation">
        <Consultation vanForSale={true} />
      </div>
      <Footer />
    </>
  );
}