import { useState, useEffect } from "react";
import SantaMonica from "./DetailListing";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation"
import { useParams } from "react-router-dom";
import { getBySlug } from "../../../api/van/getBySlug";
import Loader from "../Loader/Loader"




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

  if (!van) return <Loader />;
  // console.log(van,"van")

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