"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Settings2 } from "lucide-react"; // Icons install karlein: npm install lucide-react
import SeeMore from "../Common/SeeMore/SeeMore";
import Heading1 from "../Common/Headings/Heading1";
import { Heading2, RichParagraph,Heading3,ImageWithSkeleton, BlackButton } from '../Common/Common'


// --- SVG Icons ---
const SvgInsulation = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M9 16H15M9 8H15M12 5V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgElectric = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgWater = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 4 12 4C12 4 6 10 6 14Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgInterior = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M21 8H3M21 12H3M21 16H3M7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgSeating = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M17 16H7C5.89543 16 5 15.1046 5 14V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16ZM12 6V10M12 10H17M12 10H7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgExterior = ({ className }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M3 12H21M12 3V21M7 7L17 17M7 17L17 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgCheckmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#2761FD] flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const HeroSpecItem = ({ label, value }) => (
  <div className="group py-2 cursor-pointer transition duration-300 hover:text-[#2761FD] border-b-2 border-transparent hover:border-[#2761FD]">
    <RichParagraph white={true}>{label}</RichParagraph>
    <RichParagraph white={true}>{value}</RichParagraph>
  </div>
);

const VanPage = ({ vanDetail, onConsultationClick }) => {
  const heroRef = useRef(null);

  // Data processing
  const blocks = vanDetail?.blocks || [];
  const gallery = vanDetail?.gallery || [];
  const detailedFeatures = vanDetail?.detailed_features?.map((feature) => {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1 },
        { scale: 1.1, duration: 15, ease: "none", repeat: -1, yoyo: true }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-100 font-noto-serif">
      {/* ================= HERO SECTION ================= */}
      <div ref={heroRef} className="relative w-full h-[70vh] md:h-[500px] overflow-hidden text-white">
        <ImageWithSkeleton
          src={gallery[0]}
          alt={`${vanDetail.van_listing.title} custom van`}
          className="bg-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0.1)_0.33%,#000000_106.96%)]"></div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl">
            <Heading1 text={vanDetail.van_listing.title} className="text-left" />
            <RichParagraph white={true}>{vanDetail.van_listing.subtitle}</RichParagraph>
            <div className="flex flex-wrap justify-start gap-x-8 gap-y-2 mt-6 mb-4 border-t border-b border-gray-600 py-3">
              <HeroSpecItem label="Make & Model" value={vanDetail?.van_listing.specifications?.make_model} />
              <HeroSpecItem label="Wheelbase" value={vanDetail?.van_listing.specifications?.wheelbase} />
              <HeroSpecItem label="Drivetrain" value={vanDetail?.van_listing.specifications?.drivetrain} />
          {vanDetail?.van_listing?.roof && <HeroSpecItem label="Roof" value={vanDetail?.van_listing?.roof} />}
              <HeroSpecItem label="Sit & Sleep" value={`${vanDetail?.van_listing.specifications?.capacity?.sits || "0"} - ${vanDetail?.van_listing.specifications?.capacity?.sleeps || "0"}`} />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <BlackButton label="Book A Call Now" onClick={onConsultationClick} />
              {vanDetail.status === "available" &&
                Number(vanDetail.van_listing.price) >= 100 && (
                  <Heading3
                    text={`$${Number(vanDetail.van_listing.price).toLocaleString()}`}
                  />
                )
              }




            </div>
          </div>
        </div>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-4 bg-slate-50 rounded-2xl border border-gray-100">

  {/* Transmission Block */}
  <div className="flex flex-col items-center gap-2 group">
    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition-colors">
      <Settings2 className="w-6 h-6 text-blue-600" />
    </div>
    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Transmission</span>
    <p className="text-sm font-semibold text-gray-800">
      {vanDetail.van_listing.specifications.transmission || "Manual"}
    </p>
  </div>

  {/* Exterior Color Block */}
  <div className="flex flex-col items-center gap-2 group">
    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-green-50 transition-colors">
      <div
        className="w-6 h-6 rounded-full border border-gray-200 shadow-inner"
        style={{ backgroundColor: vanDetail.van_listing.specifications.exterior_color || '#ccc' }}
      />
    </div>
    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Exterior</span>

  </div>

  {/* Interior Color Block */}
  <div className="flex flex-col items-center gap-2 group">
    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-amber-50 transition-colors">
      <div
        className="w-6 h-6 rounded-full border border-gray-200 shadow-inner"
        style={{ backgroundColor: vanDetail.van_listing.specifications.interior_color || '#333' }}
      />
    </div>
    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Interior</span>

  </div>

</div>
      {blocks.length > 0 && (
        <div className="px-6 py-20 bg-[#f8fafc] border-t border-gray-100"> {/* bigbeartheme background */}
          <div className="w-full max-w-5xl mx-auto space-y-16">
            {blocks
              .sort((a, b) => a.order - b.order)
              .map((block, idx) => (
                <div
                  key={block._id || idx}
                  className="animate-fade-in transition-all duration-300"
                >
                  {/* --- HEADING BLOCK --- */}
                  {block.block_type === 'heading' && (
                    <div className="relative mb-10">
                      <Heading2 text={block.title} className="text-left" textColor="text-gray-900" />
                      <div className="absolute -bottom-2 left-0 w-20 h-1 bg-[#2761FD] rounded-full"></div>
                    </div>
                  )}

                  {/* --- SUBHEADING BLOCK --- */}
                  {block.block_type === 'subheading' && (
                    <Heading3
                      text={block.title}
                      className="mb-6 opacity-80 uppercase tracking-widest text-sm font-bold"
                      textColor="text-blue-600"
                    />
                  )}

                  {/* --- PARAGRAPH BLOCK --- */}
                  {block.block_type === 'paragraph' && (
                    <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed">
                      <RichParagraph className="text-lg text-gray-700">{block.content}</RichParagraph>
                    </div>
                  )}

                  {/* --- LIST BLOCK (Feature Highlight Style) --- */}
                  {block.block_type === 'list' && (
                    <div className="mt-4 max-w-4xl bg-white p-8 rounded-3xl shadow-md border-l-4 border-l-[#2761FD]">
                      {block.title && (
                        <h4 className="font-extrabold text-black text-2xl mb-6 flex items-center gap-2">
                          <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                          {block.title}
                        </h4>
                      )}
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.list_items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                          >
                            <div className="mr-4 text-blue-500 group-hover:scale-125 transition-transform">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* --- TABLE BLOCK (Modern Specs Table) --- */}
                  {block.block_type === 'table' && block.table_data && (
                    <div className="mt-8 max-w-5xl overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white">
                      {block.title && (
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                          <h4 className="font-bold text-white text-xl tracking-wide">{block.title}</h4>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                            <tr>
                              {block.table_data.headers.map((h, i) => (
                                <th key={i} className="px-8 py-5 text-xs uppercase tracking-widest">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {block.table_data.rows.map((row, ri) => (
                              <tr key={ri} className="hover:bg-blue-50/50 transition-colors group">
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-8 py-5 text-sm text-gray-800 font-semibold group-hover:text-[#2761FD]">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ================= COMPREHENSIVE FEATURES ================= */}
      <div className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {detailedFeatures.length > 0 && <Heading2 text="Comprehensive Build Features" className="text-center my-8" />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedFeatures
              ?.filter(feature => Array.isArray(feature?.items) && feature.items.length > 0)
              .map((feature, index) => (
                <div
                  key={index}
                  className="group w-full max-w-[400px] min-h-[400px] mx-auto bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#2761FD]"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-[#2761FD] mb-4">
                    {feature.icon}
                  </div>

                  <Heading3
                    text={feature.category}
                    textColor="text-black"
                    className="my-4"
                  />

                  <div className="w-full flex-grow text-left">
                    <ul className="space-y-2 font-medium text-sm text-gray-700">
                      {feature.items.map((item, i) => (
                        <li
                          key={`item-${i}`}
                          className="flex items-start transition-colors duration-300 group-hover:text-black"
                        >
                          <SvgCheckmark />
                          <RichParagraph>{item}</RichParagraph>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>



      {/* ================= DYNAMIC BLOCKS SECTION ================= */}

      {/* ================= FLAGSHIP DESCRIPTION ================= */}
      <div className="px-6 md:px-16 bg-gray-50">
        <div className="max-w-3xl text-left py-12">
          <Heading2 text={vanDetail.van_listing.title} />
          <div className="my-6">
            <SeeMore text={vanDetail.van_listing.description} />
          </div>
          <BlackButton label="Book A Call Now" onClick={onConsultationClick} />
        </div>
      </div>
      {/* ================= GALLERY ================= */}
      <div className="p-6 md:p-12 bg-white">
        <Heading2 text="Gallery" className="text-center mb-10" />
        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img, i) => (
              <ImageWithSkeleton
                key={i}
                src={img}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-64 object-cover rounded-xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No gallery images available.</p>
        )}
      </div>

      {/* ================= VIDEO SECTION ================= */}
      {vanDetail.media && vanDetail.media.length > 0 && vanDetail.media[0] !== "" && (
        <div className="w-full bg-black py-16 px-4 md:px-12">
          <h2 className="text-center font-bold text-white text-4xl mb-12">Experience The Build</h2>
          <div className={`grid gap-8 ${vanDetail.media.length === 1 ? "grid-cols-1 max-w-4xl mx-auto" :
            vanDetail.media.length === 2 ? "grid-cols-1 md:grid-cols-2" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
            {vanDetail.media.map((videoUrl, index) => {
              if (!videoUrl) return null;
              let embedUrl = videoUrl.trim();
              if (embedUrl.includes("youtu.be/")) embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
              else if (embedUrl.includes("watch?v=")) embedUrl = embedUrl.replace("watch?v=", "embed/");
              else if (embedUrl.includes("youtube.com/shorts/")) embedUrl = embedUrl.replace("youtube.com/shorts/", "youtube.com/embed/");
              embedUrl = embedUrl.split("&")[0];
              const isShorts = videoUrl.includes("/shorts/");

              return (
                <div key={index} className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                  <div className={`relative w-full ${isShorts ? "aspect-[9/16] max-w-[320px] mx-auto" : "aspect-video"}`}>
                    <iframe
                      src={`${embedUrl}?rel=0&modestbranding=1`}
                      title={`video-${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VanPage;