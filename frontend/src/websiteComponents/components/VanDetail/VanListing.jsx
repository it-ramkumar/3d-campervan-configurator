"use client";

import React, { useRef, useState } from "react";

import {
  Settings2, Zap, Droplets, ShieldCheck,
  Bed, ChefHat, ExternalLink, ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Heading2, Heading3, Heading1, RichParagraph, ImageWithSkeleton, SecondaryButton, ShareButton, Breadcrumb, PrimaryButton } from '../Common/Common';
// import VanCanvas from "../Vansforsale/Models/VanCanvas"

// --- Theme Aware Icons ---
const SvgCheckmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 !text-hover flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const HeroSpecItem = ({ label, value }) => (
  <div className="group py-2 border-b border-primary/10 transition-all duration-300 hover:border-hover">
    <RichParagraph className="uppercase  mb-1 !text-xs">{label}</RichParagraph>
    <RichParagraph className="font-bold  group-hover:!text-hover ">{value}</RichParagraph>
  </div>
);

const VanPage = ({ vanDetail, onConsultationClick }) => {
  const [activeImage, setActiveImage] = useState(0);

  const blocks = vanDetail?.blocks || [];
  const gallery = vanDetail?.gallery || [];
  const specs = vanDetail?.van_listing?.specifications;
  const getFeatureIcon = (category) => {
    const icons = {
      "Insulation and Paneling": <ShieldCheck className="w-7 h-7" />,
      "Water System": <Droplets className="w-7 h-7" />,
      "Electrics": <Zap className="w-7 h-7" />,
      "Seating and Sleeping": <Bed className="w-7 h-7" />,
      "Kitchen": <ChefHat className="w-7 h-7" />,
      "Exterior": <ExternalLink className="w-7 h-7" />,
    };
    return icons[category] || <Settings2 className="w-7 h-7" />;
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
// Helper function: Links ko embed format mein convert karne ke liye
  const getEmbedUrl = (link) => {
    if (!link) return "";

    // YouTube Logic
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Instagram Logic (Post aur Reel dono ke liye)
    if (link.includes("instagram.com/p/") || link.includes("instagram.com/reel/")) {
      let cleanUrl = link.split("?")[0]; // Query params hataye
      if (!cleanUrl.endsWith('/')) cleanUrl += '/'; // Slash check
      return `${cleanUrl}embed/`;
    }

    return link;
  };

  // Duplicate content check: Sirf unique links render honge
  const uniqueMedia = [...new Set(vanDetail.media)];
  return (
    <div className="bg-secondary font-body text-primary">
      <Breadcrumb
        customItems={[
          { name: "vans for sale ", href: "/vans-for-sale" },
          { name: vanDetail?.van_listing?.title }
        ]}
      />

      {/* ================= TOP SECTION: GALLERY & MAIN INFO ================= */}
      <div className="max-w-7xl mx-auto pt-10 pb-20 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: MAIN GALLERY CAROUSEL */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white">
              <ImageWithSkeleton
                src={gallery[activeImage]}
                alt={vanDetail.van_listing.title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-primary shadow-md transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-primary shadow-md transition-all">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-5 gap-3">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#ED985F]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: STICKY INFO PANEL */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 h-fit space-y-8">
            <div>
              <Heading1 text={vanDetail.van_listing.title} className="!text-primary mb-4 !text-5xl" />
              <RichParagraph className=" italic  ">
                {vanDetail.van_listing.subtitle}
              </RichParagraph>
            </div>

            {vanDetail.status === "available" && (
              <div className="p-6 bg-white rounded-lg border border-primary/5 shadow-sm">
                <RichParagraph className=" !text-hover uppercase font-bold">Total Listing Price</RichParagraph>
                <Heading3 text={`$${Number(vanDetail.van_listing.price).toLocaleString()}`} className="font-bold text-primary mt-1 " />
              </div>
            )}

            {/* Essential Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <HeroSpecItem label="Chassis" value={specs?.make_model} />
              <HeroSpecItem label="Wheelbase" value={specs?.wheelbase} />
              <HeroSpecItem label="Drivetrain" value={specs?.drivetrain} />
              {vanDetail.van_listing?.roof && <HeroSpecItem label="Roof" value={vanDetail.van_listing?.roof} />}
              {/* <HeroSpecItem label="Size" value={vanDetail.van_listing?.size}  /> */}


              <HeroSpecItem label="Capacity" value={`${specs?.capacity?.sleeps || "2"} Person`} />
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <SecondaryButton
                label="Secure This Build"
                onClick={onConsultationClick}
              />
              <ShareButton
                title={vanDetail?.van_listing?.title}
              />
              <RichParagraph className="text-center  !text-hover !text-xs uppercase  font-bold">Limited 2026 Build Slots</RichParagraph>
            </div>
          </div>
        </div>
      </div>

      {/* ============================ */}
      <div className="py-12 bg-white border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg text-primary"><Settings2 /></div>
            <div>
              <RichParagraph className=" font-bold !text-hover uppercase ">Transmission</RichParagraph>
              <RichParagraph className="font-bold">{specs?.transmission || "Automatic"}</RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg text-primary"><Zap /></div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">Engine</RichParagraph>
              <RichParagraph className="font-bold">{specs?.engine || "Turbo Diesel"}</RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border-4 border-secondary shadow-sm" style={{ backgroundColor: specs?.exterior_color || '#ccc' }}></div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">Exterior</RichParagraph>
              <RichParagraph className="font-bold">Premium Finish</RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border-4 border-secondary shadow-sm" style={{ backgroundColor: specs?.interior_color || '#333' }}></div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase ">Interior</RichParagraph>
              <RichParagraph className="font-bold">Custom Palette</RichParagraph>
            </div>
          </div>
        </div>
      </div>

      {/* ============================ */}
      {blocks && blocks.length > 0 && (
        <section className="py-24 max-w-5xl mx-auto px-6 space-y-24">
          {blocks.sort((a, b) => (a.order || 0) - (b.order || 0)).map((block, idx) => {
            if (!block) return null;
            return (
              <div key={idx} className="reveal-content">
                {block.block_type === 'heading' && block.title && (
                  <div className="mb-8">
                    <Heading2 text={block.title} className=" text-primary" />
                    <div className="w-16 h-1 bg-hover mt-2 rounded-full"></div>
                  </div>
                )}
                {block.block_type === 'paragraph' && block.content && (
                  <div className="bg-white p-10 rounded-lg shadow-sm border border-primary/5 leading-relaxed">
                    <RichParagraph className="">{block.content}</RichParagraph>
                  </div>
                )}
                {block.block_type === 'list' && block.list_items?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.list_items.map((item, i) => (
                      <div key={i} className="flex items-start p-5 bg-white rounded-lg border-l-4 border-hover shadow-sm">
                        <div className="text-primary mr-3 mt-1"><SvgCheckmark /></div>
                        <RichParagraph>{item.text}</RichParagraph>
                      </div>
                    ))}
                  </div>
                )}
                {block.block_type === 'table' && block.table_data?.headers?.length > 0 && (
                  <div className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-lg">
                    <table className="w-full text-left">
                      <thead className="bg-primary text-white  uppercase ">
                        <tr>
                          {block.table_data.headers.map((h, i) => (
                            <th key={i} className="px-8 py-5 font-black font-body">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {block.table_data.rows?.map((row, ri) => (
                          <tr key={ri} className="hover:bg-[#F5F5F0] transition-colors">
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-8 py-5 text-sm font-semibold text-primary font-body">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* ============================ */}
      <section className="py-24 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <RichParagraph className="!text-hover uppercase font-bold !text-xs">Build Standards</RichParagraph>
            <Heading2 text="Every Component Considered" className="text-secondary mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vanDetail?.detailed_features?.filter(f => f.items?.length > 0).map((feature, index) => (
              <div key={index} className="p-8 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
                <div className="!text-hover mb-6 group-hover:scale-110 transition-transform">
                  {getFeatureIcon(feature.category)}
                </div>
                <Heading3 text={feature.category} className="text-secondary py-4" />
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm ">
                      <span className="text-secondary mr-2">•</span>
                      <RichParagraph className="text-secondary">{item}</RichParagraph>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ */}
       {uniqueMedia.length > 0 ? (
        <section className="py-12 px-4 flex flex-col items-center" style={{ backgroundColor: '#F5F5F0' }}>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold uppercase tracking-tighter" style={{ color: '#001F3D' }}>
          Media Gallery
        </h2>
        <div className="h-1 w-20 mx-auto mt-2" style={{ backgroundColor: '#001F3D' }}></div>
      </div>

      {/* Grid: Isme humne flex-wrap use kiya hai taaki boxes center rahein */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {uniqueMedia.map((link, i) => {
          const isYouTube = link.includes("youtube");

          return (
            <div
              key={i}
              className={`w-full shadow-lg bg-white transition-all duration-300 ${
                isYouTube ? 'max-w-[700px]' : 'max-w-[350px]'
              }`}
              style={{
                borderRadius: '15px', // Normal Rounded Borders
                border: '2px solid #001F3D',
                overflow: 'hidden'
              }}
            >
              <div className="relative w-full" style={{
                // YouTube wide hai, Instagram lamba hai lekin ab width limited hai
                paddingBottom: isYouTube ? '56.25%' : '140%',
                height: 0
              }}>
                <iframe
                  src={getEmbedUrl(link)}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </section>
      ):""}



    {/*Model  */}
    {/* <VanCanvas/> */}
      {/* ============================ */}
      <section className="py-24 bg-[#F5F5F0] text-center px-6 border-t border-primary/5">
        <div className="max-w-2xl mx-auto">
          <Heading2 text="Build Your Legacy" className=" font-bold mb-6 text-primary" />
          <RichParagraph className=" mb-10 leading-relaxed italic font-body">Limited build slots available for 2024. Connect with our design team to start your custom journey.</RichParagraph>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <SecondaryButton label="Book A Call" onClick={onConsultationClick} />
            <PrimaryButton label={"View All Builds"} link={"/van-layouts"} />


          </div>
        </div>
      </section>
    </div>
  );
};

export default VanPage;