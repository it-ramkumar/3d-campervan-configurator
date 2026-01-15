import { useState, useEffect,useRef } from "react";
import SantaMonica from "./VanListing";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation"
import { useParams } from "react-router-dom";
import { getBySlug } from "../../../api/van/getBySlug";
import Loader from "../Loader/Loader"
import { generateVanSchema } from "../../schema/vanDetail"; // Add this





export default function Layouts() {
  const { slug } = useParams();
  const [van, setVan] = useState(null);

    // 👇 Consultation section ka ref
  const consultationRef = useRef(null);

  const scrollToConsultation = () => {
    consultationRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  useEffect(() => {
    const   fetchVan = async () => {
      const result = await getBySlug(slug);
      setVan(result.data);
    };
    fetchVan();
  }, [slug]);

  if (!van) return <Loader />;

// SEO dynamic data
  const pageTitle = `${van.van_listing.title} Campervan Layout | Big Bear Vans`;
  const pageDesc = van.van_listing.description?.substring(0, 160) || `Check out the ${van.name} custom van build. Fully equipped for off-grid adventures.`;
  const schemaData = generateVanSchema(van);
  return (
    <>
      {/* Page Sections */}
      {/* Basic SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph (Facebook/Instagram) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={van.heroImage || van.gallery?.[0]} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={van.heroImage || van.gallery?.[0]} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      <Navbar />
      <div className="tour-santa">
      <SantaMonica vanDetail={van} onConsultationClick={scrollToConsultation} />
      </div>
      <div ref={consultationRef} className="tour-consultation">
        <Consultation  />
      </div>

      <Footer/>
    </>
  );
}