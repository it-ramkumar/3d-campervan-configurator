import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function LayoutDetail() {
  const { slug } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
// console.log(van,"layout")
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/${slug}`
        );
        setVan(res.data?.data);
      } catch (err) {
        console.error("Error fetching layout details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchLayout();
  }, [slug]);

  useEffect(() => {
    if (van && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".fade-in"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [van]);

  if (loading) return <div className="text-center py-20 text-gray-500 text-xl">Loading...</div>;
  if (!van)
    return <div className="text-center py-20 text-red-500 text-xl">Layout not found</div>;

  const { van_listing, gallery, category, detailed_features, formatted_price, media } = van;
// console.log(van_listing,gallery,category,detailed_features,formatted_price,media)
  return (
    <>
    <Navbar/>
 <div className="bg-gray-100 font-noto-serif">
      {/* ================= Hero Section ================= */}
      <div

        className="relative w-full h-[85vh] md:h-[485px] overflow-hidden text-white"
      >
        <img
          src={van.gallery[0]}
          alt={`${van.van_listing.title}`}
          className="bg-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0)_0.33%,#000000_106.96%)]"></div>

        <div className="relative z-10 h-full flex flex-col justify-start md:justify-center items-start text-left px-4 pt-64 md:pt-0 sm:px-8 md:px-16">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-[64px] leading-tight max-w-4xl">
            <span className="text-[#2761FD]">{van_listing.title}</span>{" "}
            {/* {van_listing.subtitle} */}
          </h1>
          <p className="text-lg md:text-2xl mt-4 max-w-2xl opacity-90">
            {van_listing.subtitle}
          </p>
<div className="flex flex-wrap justify-start gap-x-8 gap-y-6 mt-8 md:mt-12">
  {van_listing?.specifications &&
    Object.entries(van_listing.specifications).map(([key, value]) => {
      if (key === "_id" || key === "id") return null; // skip top-level IDs

      if (typeof value === "object") {
        // nested object (like capacity)
        return Object.entries(value).map(([subKey, subValue]) => {
          if (subKey === "_id" || subKey === "id") return null; // skip nested IDs
          return (
            <div key={subKey} className="group py-2 cursor-pointer">
              <div className="relative pb-2">
                <p className="text-xs md:text-sm opacity-80">{subKey}</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
              </div>
              <p className="font-bold text-base md:text-lg mt-1">{subValue}</p>
            </div>
          );
        });
      }

      return (
        <div key={key} className="group py-2 cursor-pointer">
          <div className="relative pb-2">
            <p className="text-xs md:text-sm opacity-80">{key}</p>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
          </div>
          <p className="font-bold text-base md:text-lg mt-1">{value}</p>
        </div>
      );
    })}
</div>
<Link to="/contact">
  <button className="mt-8 md:mt-12 w-[154px] h-[39px] px-[20px] py-[10px] bg-white text-black font-noto-sans font-bold text-sm rounded-[5px] transition-all duration-300 ease-in-out hover:bg-[#2761FD] hover:text-white hover:shadow-lg hover:-translate-y-1">
    Book A Call Now
  </button>
</Link>
        </div>
      </div>

      {/* ================= Key Features ================= */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-bold text-5xl text-black mb-16">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {detailed_features?.map((feature, index) => (
              <div
                key={index}
                className="group w-full max-w-[400px] min-h-[430px] mx-auto bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[10px_10px_18.8px_0px_rgba(0,0,0,0.25),-10px_-10px_22.6px_0px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:shadow-[10px_10px_25px_0px_rgba(0,0,0,0.3),-10px_-10px_30px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2"
              >
                {feature.icon}
                <h3 className="font-black text-2xl mt-4 mb-6">
                  {feature.category}
                </h3>
                <div className="w-full flex-grow text-left">
                  <ul className="space-y-2 font-normal text-base text-black">
                    {feature.items.map((item, i) => (
                      <li key={`item-${i}`} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mr-3 mt-[9px] group-hover:bg-[#2761FD] transition-colors duration-300"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
                 <button
  disabled={true}
  className={`px-5 py-2.5 font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out
    ${true ? "bg-gray-400 cursor-not-allowed text-gray-200" : "bg-[#2761FD] text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"}
  `}
>
  Buy Now
</button>
          </div>
        </div>
      </div>

      {/* ================= Flagship ================= */}
      <div className="px-8 md:pl-[132px] md:pr-16 bg-gray-50">
        <div className="max-w-3xl text-left py-8">
          <h2 className="font-bold text-4xl mb-6">{van_listing.title}</h2>
          <p className="text-xl font-normal leading-relaxed mb-8">
            {van_listing.description}
          </p>
         <button
  disabled={true}
  className={`px-5 py-2.5 font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out
    ${true ? "bg-gray-400 cursor-not-allowed text-gray-200" : "bg-[#2761FD] text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"}
  `}
>
  Book a call now
</button>

        </div>
      </div>

      {/* ================= Gallery ================= */}
      <div className="p-8 md:p-16 bg-white">
        {van.gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {van.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={img}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No gallery images available.</p>
        )}
      </div>
    </div>
<Footer/>
    </>
  );
}
