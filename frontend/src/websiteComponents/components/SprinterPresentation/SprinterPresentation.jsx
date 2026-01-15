import HeroSection from "../HeroSection/HeroSection"
import Consultation from "../Consultation/Consultation";
import Vanconfig from "./vanconfig/vanconfig";
import Table from "./table/table";
import Exteriorcolourchoices from "./exteriorcolourchoices/exteriorcolourchoices";
import SeatOptions from "./seatoption/seatoption";
import SprinterUpgrade from "./SprinterUpgrade/sprinterupgrade";
import Conveniencetech from "./conveniencetech/conveniencetech";
import Speclist from "./speclist/speclist";
import DecisionFactorsPage from "./decisionfactors/decisionfactors";
import Custombuild from "./custombuild/custombuild";
import { generateSprinterGuideSchema, getSprinterGuideMetaTags } from "../../schema/sprinterGuide";



import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Sprinterpage() {

  const heroImage = "/sprinter/sphero.jpg";
  const newTitleText = "  Choosing The Right Sprinter Van For Custom Conversion";
  const newDescriptionText =
    "Learn how to choose the ideal Sprinter van model and features to create your dream custom conversion.";

const schemaData = generateSprinterGuideSchema();
  const meta = getSprinterGuideMetaTags();

  return (
    <>
    <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={meta.url} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} />
      </div>
      <div className="tour-van-config">
        <Vanconfig />
      </div>
      <div className="tour-table">
        <Table />
      </div>
      <div className="tour-exterior-colour-choices">
        <Exteriorcolourchoices />
      </div>
      <div className="tour-seat-options">
        <SeatOptions />
      </div>
      <div className="tour-sprinter-upgrade">
        <SprinterUpgrade />
      </div>
      <div className="tour-convenience-tech">
        <Conveniencetech />
      </div>
      <div className="tour-spec-list">
        <Speclist />
      </div>
      <div className="tour-decision-factors">
        <DecisionFactorsPage />
      </div>
      <div className="tour-custom-build">
        <Custombuild />
      </div>

      <div className="tour-consultation">
        <Consultation vanForSale={false} />
      </div>

      <Footer />
    </>
  );
}