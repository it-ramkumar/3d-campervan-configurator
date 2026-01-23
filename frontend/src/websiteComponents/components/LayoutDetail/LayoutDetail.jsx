import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { generateLayoutSchema } from "../../schema/layoutDetail"; // Path check karlein

// --- SVG Icons (Copied from reference for Key Features section) ---
const SvgInsulation = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 16H15M9 8H15M12 5V19"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgElectric = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgWater = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 4 12 4C12 4 6 10 6 14Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgInterior = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 8H3M21 12H3M21 16H3M7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgSeating = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 16H7C5.89543 16 5 15.1046 5 14V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16ZM12 6V10M12 10H17M12 10H7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgExterior = () => (
  <svg
    className="w-8 h-8 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 12H21M12 3V21M7 7L17 17M7 17L17 7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Reusable Hero Spec Component (from reference) ---
const HeroSpecItem = ({ label, value }) => (
  <div className="group py-2 cursor-pointer transition duration-300 hover:text-[#2761FD] border-b-2 border-transparent hover:border-[#2761FD]">
    <p className="text-xs md:text-sm opacity-80 uppercase tracking-wider">{label}</p>
    <p className="font-bold text-base md:text-lg mt-1 whitespace-nowrap">
      {value || "N/A"}
    </p>
  </div>
);

// --- Custom Checkmark Icon for Feature List ---
const SvgCheckmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#2761FD] flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);


export default function LayoutDetail() {
  const { slug } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const heroRef = useRef(null); // Ref for the Hero GSAP animation

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

  // GSAP animation for content fade-in (on van data change)
  useEffect(() => {
    if (van && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".fade-in"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }

    // GSAP animation for image zoom (from reference)
    if (van && heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".bg-image",
          { scale: 1 },
          { scale: 1.1, duration: 15, ease: "none", repeat: -1, yoyo: true }
        );
      }, heroRef);
      return () => ctx.revert();
    }
  }, [van]);

  if (loading) return <Loader />;
  if (!van)
    return <div className="text-center py-20 text-red-500 text-xl">Layout not found</div>;

  // --- Data Preparation (for easier rendering) ---
  const { van_listing, detailed_features } = van;

  // Map features to include SVG icons
  const mappedFeatures = detailed_features?.map((feature) => {
    const icons = {
      "Insulation and Paneling": <SvgInsulation />,
      "Water System": <SvgWater />,
      Electrics: <SvgElectric />,
      "Seating and Sleeping": <SvgSeating />,
      Kitchen: <SvgInterior />,
      Exterior: <SvgExterior />,
    };
    return {
      icon: icons[feature.category] || <SvgExterior />,
      category: feature.category,
      items: feature.items || [],
    };
  }) || [];

const schemaData = generateLayoutSchema(van);
  const pageTitle = `${van_listing.title} | Custom Van Conversion Portfolio`;
  const pageDesc = van_listing.description?.substring(0, 160) || van_listing.subtitle;
  return (
    <>
    {/* Standard Meta Tags */}
          <title>{pageTitle}</title>
          <meta name="description" content={pageDesc} />
          <link rel="canonical" href={window.location.href} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDesc} />
          <meta property="og:image" content={van.gallery?.[0]} />
          <meta property="og:url" content={window.location.href} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDesc} />
          <meta name="twitter:image" content={van.gallery?.[0]} />

          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
      <Navbar />
      <div className="bg-gray-100 font-noto-serif" ref={containerRef}>

        {/* ================= HERO SECTION (IMPROVED DESIGN) ================= */}
        <div
          ref={heroRef}
          className="relative w-full h-[70vh] md:h-[500px] overflow-hidden text-white"
        >
          {/* Background Image with Zoom Effect */}
          <ImageWithSkeleton
            src={van.gallery[0]}
            alt={`${van_listing.title} custom van`}
            className="bg-image absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay with Stronger Gradient */}
          <div className="absolute inset-0 bg-black opacity-0"></div>
          <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0.2)_0.23%,#000000_106.96%)]"></div>

          {/* Content Area - Adjusted to justify-center for a higher position */}
          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl pt-16 pb-8 fade-in">

              {/* 🗺️ Breadcrumb/Navigation - CORRECTED LINK */}
              <div className="text-sm font-medium tracking-wide mb-3 opacity-70">
                <Link to="/" className="hover:text-[#2761FD]">Home</Link>
                <span className="mx-2">/</span>
                {/* Changed link from /portfolio to /layout */}
                <Link to="/van-layouts" className="hover:text-[#2761FD]">Portfolio</Link>
                <span className="mx-2">/</span>
                <span className="text-[#2761FD]">{van_listing.title.split(' ')[0]}</span>
              </div>

              {/* Title Block */}
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-[56px] leading-tight mb-3 tracking-tight drop-shadow-lg">
                {van_listing.title}
              </h1>
              <p className="text-lg md:text-xl max-w-3xl font-light opacity-90">
                {van_listing.subtitle}
              </p>

              {/* Specifications Grid */}
              <div className="flex flex-wrap justify-start gap-x-10 gap-y-3 mt-8 mb-6 border-t border-b border-gray-600/50 py-4">

                <HeroSpecItem
                  label="Make & Model"
                  value={van_listing?.specifications?.make_model}
                />

                <HeroSpecItem
                  label="Wheelbase"
                  value={van_listing?.specifications?.wheelbase}
                />

                <HeroSpecItem
                  label="Drivetrain"
                  value={van_listing?.specifications?.drivetrain}
                />
                     <HeroSpecItem
                  label="Van Size"
                  value={van_listing?.size}
                />


                <HeroSpecItem
                  label="Sit & Sleep"
                  value={`${van_listing?.specifications?.capacity?.sits || "0"} / ${van_listing?.specifications?.capacity?.sleeps || "0"}`}
                />
              </div>

              {/* Price & CTA Block */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                {/* Call To Action Button */}
                <Link to="/contact">
                  <button
                    className="cursor-pointer px-8 py-3 bg-[#2761FD] text-white font-bold text-lg rounded-full transition-all duration-300 ease-in-out shadow-xl hover:bg-white hover:text-[#2761FD] hover:shadow-[0_0_40px_rgba(39,97,253,0.9)] w-full sm:w-auto"
                  >
                    Book a call now &rarr;
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* ================= KEY FEATURES SECTION (IMPROVED DESIGN) ================= */}
        <div className="py-16 px-4 sm:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center font-extrabold text-4xl text-black mb-12 tracking-tight fade-in">
              Comprehensive Build Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mappedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group w-full max-w-[400px] min-h-[400px] mx-auto bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-100 transition-all duration-500 ease-in-out transform hover:shadow-xl hover:scale-[1.02] hover:border-[#2761FD] fade-in"
                >
                  {/* Icon Container */}
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-[#2761FD] mb-4">
                    {feature.icon}
                  </div>

                  <h3 className="font-black text-xl mt-1 mb-4 text-black tracking-tight">
                    {feature.category}
                  </h3>

                  {/* Feature List */}
                  <div className="w-full flex-grow text-left">
                    <ul className="space-y-2 font-medium text-sm text-gray-700">
                      {feature.items.map((item, i) => ( // Display up to 5 items
                        <li key={`item-${i}`} className="flex items-start transition-colors duration-300 group-hover:text-black">
                          <SvgCheckmark />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                      {/* {feature.items.length > 5 && (
                        <li className="text-xs text-gray-500 italic mt-1">
                          + {feature.items.length - 5} more features...
                        </li>
                      )} */}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- */}

        {/* ================= Flagship ================= */}
        <div className="px-6 md:pl-16 md:pr-16 bg-gray-50 py-16">
          <div className="max-w-3xl text-left">
            <h2 className="font-bold text-3xl mb-4 fade-in">{van_listing.title}</h2>
            <p className="text-lg font-normal leading-relaxed mb-6 fade-in">
              {van_listing.description}
            </p>
            <Link to="/contact">
              <button
                className="px-4 py-2 bg-[#2761FD] cursor-pointer text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 fade-in"
              >
                Book a call now
              </button>
            </Link>
          </div>
        </div>

        {/* --- */}

        {/* ================= Gallery ================= */}
        <div className="p-6 md:p-12 bg-white">
          <h2 className="text-center font-extrabold text-4xl text-black mb-12 tracking-tight fade-in">
            Gallery
          </h2>
          {van.gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {van.gallery.map((img, i) => (
                <ImageWithSkeleton
                  key={i}
                  src={img}
                  alt={`Gallery image ${i + 1} of ${van_listing.title}`}
                  className="w-full h-56 object-cover rounded-lg shadow-md fade-in"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 fade-in">No gallery images available.</p>
          )}
        </div>

        {/* --- */}

        {/* ================= Video Section ================= */}
        {van.media && van.media.length > 0 && (
          <div className="w-full bg-black py-12 px-4 md:px-12">
            <h2 className="text-center font-bold text-white text-3xl mb-8 fade-in">
              Watch Video
            </h2>

            <div
              className={`grid gap-6 max-w-7xl mx-auto ${van.media.length === 1
                ? "grid-cols-1"
                : van.media.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
            >
              {van.media.map((videoUrl, index) => {
                let embedUrl = videoUrl.trim();

                // Logic to convert various YouTube links to embed format
                if (embedUrl.includes("youtu.be/")) {
                  embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
                }
                else if (embedUrl.includes("watch?v=")) {
                  embedUrl = embedUrl.replace("watch?v=", "embed/");
                }
                else if (embedUrl.includes("youtube.com/shorts/")) {
                  const shortsId = embedUrl.split("/").pop().split("?")[0];
                  embedUrl = `https://www.youtube.com/embed/${shortsId}`;
                }

                embedUrl = embedUrl.split("&")[0];

                const isShorts = videoUrl.includes("/shorts/");

                return (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-[1.01] fade-in"
                  >
                    <div
                      className={`relative w-full ${isShorts
                        ? "aspect-[9/16] max-w-[300px] mx-auto" // 🎥 Tall for Shorts
                        : "aspect-video" // 📺 Normal landscape video
                        }`}
                    >
                      <iframe
                        src={`${embedUrl}?rel=0&modestbranding=1`}
                        title="Product Showcase Video" // descriptive title dein
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
                      ></iframe>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}