import { useState, useEffect, useRef } from "react";
import SantaMonica from "./VanListing";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation"
import { useParams } from "react-router-dom";
import { getBySlug } from "../../../api/van/getBySlug";
import Loader from "../Loader/Loader"
import { generateVanSchema } from "../../schema/vanDetail"; // Add this
import { Helmet } from "react-helmet-async";




export default function Layouts() {
  const { slug } = useParams();
  const [van, setVan] = useState(null);

  // 👇 Consultation section ka ref
  const consultationRef = useRef(null);

  const scrollToConsultation = () => {
    consultationRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  useEffect(() => {
    const fetchVan = async () => {
      const result = await getBySlug(slug);
      setVan(result.data);
    };
    fetchVan();
  }, [slug]);

  if (!van) return <Loader />;
  const cleanUrl = `https://bigbearvans.com/van-detail/${slug}`;
  const vanImage = van.heroImage || van.gallery?.[0] || "https://bigbearvans.com/default-van.jpg";
  const pageTitle = `${van.van_listing.title} Campervan Layout | Big Bear Vans`;
  const pageDesc = van.van_listing.description?.substring(0, 160) || `Check out the ${van.name} custom van build. Fully equipped for off-grid adventures.`;

  return (
    <>
     <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={cleanUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" /> {/* Product/Article behtar hai detail page ke liye */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={vanImage} />
        <meta property="og:url" content={cleanUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={vanImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateVanSchema(van))}
        </script>
      </Helmet>
      <Navbar />
      <div className="tour-santa">
        <SantaMonica vanDetail={van} onConsultationClick={scrollToConsultation} />
      </div>
      <div ref={consultationRef} className="tour-consultation">
        <Consultation />
      </div>

      <Footer />
    </>
  );
}