import Clientdetail from "./Clientdetail/Clientdetail";
import Consultation from "../Consultation/Consultation";
import HeroSection from "../HeroSection/HeroSection"
import { generateClientStoriesSchema, getClientStoriesMetaTags } from "../../schema/ourClient";



import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function OurClients() {


  const heroImage = "/OurClients/client.png";
  const newTitleText = "Our Clients at Big Bear Vans";

const schemaData = generateClientStoriesSchema();
  const meta = getClientStoriesMetaTags();
  return (
    <>
    <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={meta.url} />

        {/* Schema Script */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
             <HeroSection  title={newTitleText} image={heroImage}  showButton={false} />
      </div>
      <div className="tour-details">
        <Clientdetail />
      </div>
      <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer />
    </>
  );
}