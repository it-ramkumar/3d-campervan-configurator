// C:\Users\PMYLS\3d-campervan-configurator\frontend\src\websiteComponents\components\SantaMonica\Santa.jsx

import SantaMonica from "./DetailListing";
// CORRECTED PATH: Only go up one level to the 'components' directory
import Navbar from "../Navbar/Navbar";
// CORRECTED PATH: The Footer component has the same issue
import Footer from "../Footer/Footer";
// import ConsultationPage from "../Layouts/Consultationlayout/Consultationlayout";
import Consultation from "../Consultation/Consultation"
import { useParams } from "react-router-dom";
import { getBySlug } from "../../../api/van/getBySlug";
import { useState, useEffect } from "react";
export default function Layouts() {
  const { slug } = useParams();
  const [van, setVan] = useState(null);

  useEffect(() => {
    const   fetchVan = async () => {
      const result = await getBySlug(slug);
      setVan(result.data);
    };
    fetchVan();
  }, [slug]);

  if (!van) return <p>Loading...</p>;
  console.log(van,"van")

  return (
    <>
      {/* Page Sections */}
      <Navbar />
      <div className="tour-santa">
        <SantaMonica vanDetail={van} />
      </div>
      <div className="tour-consultation">
        <Consultation />
      </div>

      <Footer/>
    </>
  );
}