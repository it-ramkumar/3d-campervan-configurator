import { useState, useEffect,useRef } from "react";
import SantaMonica from "./VanListing";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation"
import { useParams } from "react-router-dom";
import { getBySlug } from "../../../api/van/getBySlug";
import Loader from "../Loader/Loader"




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


  return (
    <>
      {/* Page Sections */}
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