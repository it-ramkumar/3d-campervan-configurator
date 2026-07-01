"use client";
import React, { useState, useCallback } from "react";
import {
  Settings2,
  Zap,
  Droplets,
  ShieldCheck,
  Bed,
  ChefHat,
  ExternalLink,
  Calendar,
} from "lucide-react";
import {
  Heading2,
  Heading3,
  Heading4,
  Heading1,
  RichParagraph,
  SecondaryButton,
  ShareButton,
  SpanTag,
  PrimaryButton,
} from "../Common/Common";
import VanGallery from "./GallerySection";
import BackButton from "../Common/BackButton/BackButton";
import ContactForm from "@/components/Consultation/ContactForm";
import { contact } from "../../api/contact/contact";


/* ── Cinematic feature-grid block ── */
const FeatureGridBlock = ({ block }) => {
  const [activeImg, setActiveImg] = useState(0);

  const layout = block.layout || "left";
  const imageRight = layout !== "right";

  const galleryImages = [
    ...(block.items || []).map(it => it.media).filter(Boolean),
    ...(block.block_media || []).filter(m => m.type === "image" && m.url).map(m => m.url),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

      {/* IMAGE PANEL */}
      {galleryImages.length > 0 && (
        <div
          className={`relative overflow-hidden ${imageRight ? "lg:order-2" : "lg:order-1"} h-[320px] lg:h-auto`}
          style={{ minHeight: "420px" }}
        >
          <img
            src={galleryImages[activeImg]}
            alt={block.title || "feature"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />

          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar z-10">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all duration-200 ${
                    i === activeImg ? "border-hover scale-95" : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-hover" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hover/30" />
        </div>
      )}

      {/* CONTENT PANEL */}
      <div className={`flex flex-col justify-center px-8 py-14 lg:px-12 lg:py-16 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
        {(block.title || block.subtitle) && (
          <div className="mb-10">
            {block.subtitle && <SpanTag text={block.subtitle} className="mb-4" />}
            {block.title && (
              <Heading2 text={block.title} className="!text-secondary mt-3 leading-[0.95]" />
            )}
            <div className="w-12 h-0.5 bg-hover mt-5" />
          </div>
        )}

        <div className="divide-y divide-white/8">
          {(block.items || []).map((item, i) => (
            <div key={i} className="group flex items-start gap-5 py-5 cursor-default">
              {/* <span className="font-display font-black text-3xl text-hover/22 leading-none mt-0.5 shrink-0 w-10 text-right group-hover:text-hover/55 transition-colors duration-300 select-none">
                {String(i + 1).padStart(2, "0") +}
              </span> */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {item.icon && <span className="text-xl shrink-0">{item.icon}</span>}
                  {item.title && <Heading4 text={item.title} className="!text-secondary !text-base leading-tight" />}
                </div>
                {item.value && <p className="font-display font-black text-2xl text-hover mb-1">{item.value}</p>}
                {item.description && (
                  <RichParagraph className="!text-secondary/50 leading-relaxed">{item.description}</RichParagraph>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

/* ── Inline gallery for feature-grid image column ── */
// const FeatureGallery = ({ images = [], isDark = false }) => {
//   const [active, setActive] = useState(0);
//   const [fullscreen, setFullscreen] = useState(false);

//   const prev = useCallback(() => setActive(i => (i - 1 + images.length) % images.length), [images.length]);
//   const next = useCallback(() => setActive(i => (i + 1) % images.length), [images.length]);

//   if (!images.length) return null;

//   return (
//     <>
//       <div className="space-y-3">
//         {/* Main image — taller aspect for impact */}
//         <div
//           className="relative overflow-hidden rounded-lg cursor-zoom-in group"
//           style={{ aspectRatio: "4/3" }}
//           onClick={() => setFullscreen(true)}
//         >
//           <img
//             src={images[active]}
//             alt={`feature-${active}`}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
//           />
//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
//           <div className="bbv-amber-line" />
//           {images.length > 1 && (
//             <>
//               <button type="button" onClick={e => { e.stopPropagation(); prev(); }}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/70 backdrop-blur-sm text-white hover:bg-primary transition-colors z-10 opacity-0 group-hover:opacity-100 duration-200">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
//               </button>
//               <button type="button" onClick={e => { e.stopPropagation(); next(); }}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/70 backdrop-blur-sm text-white hover:bg-primary transition-colors z-10 opacity-0 group-hover:opacity-100 duration-200">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
//               </button>
//               <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 font-ui">
//                 {active + 1} / {images.length}
//               </span>
//             </>
//           )}
//         </div>

//         {/* Thumbnails */}
//         {images.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
//             {images.map((img, i) => (
//               <button key={i} type="button" onClick={() => setActive(i)}
//                 className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
//                   i === active ? "border-hover" : "border-transparent opacity-50 hover:opacity-90"
//                 }`}>
//                 <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Fullscreen lightbox */}
//       {fullscreen && (
//         <div className="fixed inset-0 bg-canvas/95 z-[9999] flex items-center justify-center backdrop-blur-sm" onClick={() => setFullscreen(false)}>
//           <img src={images[active]} alt="fullscreen" className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
//           <button type="button" onClick={() => setFullscreen(false)} className="absolute top-5 right-5 text-secondary text-3xl hover:text-hover transition-colors">✕</button>
//           {images.length > 1 && (
//             <>
//               <button type="button" onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
//               </button>
//               <button type="button" onClick={e => { e.stopPropagation(); next(); }} className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

const SvgCheck = ({ small = false }) => (
  <svg className={`${small ? "w-3 h-3" : "w-4 h-4"} shrink-0`} style={{ color: "#ED985F" }}
    fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HeroSpecItem = ({ label, value }) => (
  <div className="group py-3 border-b border-primary/10 hover:border-hover/50 transition-all duration-200">
    <SpanTag text={label} className=" uppercase tracking-[0.3em] font-semibold text-primary/45 mb-1 "/>
    <RichParagraph className="font-display font-bold  text-primary group-hover:text-hover transition-colors">
      {value}
    </RichParagraph>
  </div>
);

const VanPage = ({ vanDetail }) => {
  const blocks = vanDetail?.blocks || [];
  const gallery = vanDetail?.gallery || [];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim()) return;
      setLoading(true);
      await contact(data);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const specs = vanDetail?.van_listing?.specifications;

  const getFeatureIcon = (category) => {
    const icons = {
      "Insulation and Paneling": <ShieldCheck className="w-5 h-5" />,
      "Water System": <Droplets className="w-5 h-5" />,
      Electrics: <Zap className="w-5 h-5" />,
      "Seating and Sleeping": <Bed className="w-5 h-5" />,
      Kitchen: <ChefHat className="w-5 h-5" />,
      Exterior: <ExternalLink className="w-5 h-5" />,
    };
    return icons[category] || <Settings2 className="w-5 h-5" />;
  };

  const getEmbedUrl = (link) => {
    if (!link) return "";
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (link.includes("instagram.com/p/") || link.includes("instagram.com/reel/")) {
      let cleanUrl = link.split("?")[0];
      if (!cleanUrl.endsWith("/")) cleanUrl += "/";
      return `${cleanUrl}embed/`;
    }
    return link;
  };

  const uniqueMedia = [...new Set(vanDetail?.media || [])];
  const activeBlocks = blocks
    .filter(b => b.is_active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="font-body text-primary antialiased">

      {/* ── TOP NAV BAR ── */}
      <div className="relative bbv-section-light border-b border-primary/8">
        <div className="bbv-amber-line-top" />
        <div className="flex items-center px-4 md:px-8 py-4">
          <BackButton className="!static !mt-0" />
        </div>
      </div>

      {/* ── HERO — light ── */}
      <section className="bbv-section-light relative">
        <div className="bbv-dot-grid-light" />
        <div className="relative max-w-7xl mx-auto pt-8 pb-16 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: GALLERY */}
            <div className="lg:col-span-7">
              <VanGallery gallery={gallery} title={vanDetail?.van_listing?.title} />
            </div>

            {/* RIGHT: INFO PANEL */}
            <div className="lg:col-span-5 lg:sticky lg:top-10 h-fit space-y-6">

              {/* Delivery date badge */}
              {vanDetail?.delivery_date && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hover/10 border border-hover/25">
                  <Calendar className="w-3 h-3 text-hover" />
                  <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-hover font-ui">{vanDetail.delivery_date}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <Heading1 text={vanDetail?.van_listing?.title} className="!text-primary !text-6xl mb-2 leading-[0.9]" />
                {vanDetail?.van_listing?.subtitle && (
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-0.5 bg-hover shrink-0" />
                    <RichParagraph className="italic !text-primary/55">{vanDetail.van_listing.subtitle}</RichParagraph>
                  </div>
                )}
              </div>

              {/* Price card */}
              {vanDetail.status === "available" && (
                <div className="relative bbv-card p-6 overflow-hidden">
                  <div className="bbv-amber-line-top" />
                  <RichParagraph className="mb-3 font-bold !text-primary" >Total Listing Price</RichParagraph>
                  {Number(vanDetail.van_listing.price) > 99 ? (
                    <Heading2
                      text={`$${Number(vanDetail.van_listing.price).toLocaleString()}`}
                      className="!text-hover !text-4xl"
                    />
                  ) : (
                    <RichParagraph className="font-display font-bold text-primary">Inquire for Price</RichParagraph>
                  )}
                </div>
              )}

              {/* 3D Configurator CTA */}
              {vanDetail?.glbFile && (
                <a
                  href={`/camper-vans-for-sale/${vanDetail.slug}/configure`}
                  className="relative inline-flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 font-extrabold uppercase text-white transition-all duration-150 hover:bg-navy-mid active:translate-y-[2px] group overflow-hidden"
                >
                  <div className="bbv-amber-line" />
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-lg bg-white opacity-25" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative transition-transform duration-700 group-hover:rotate-[360deg]">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
                      <path d="M12 3v18" /><path d="M3 12h18" />
                    </svg>
                  </div>
                  <span className="font-ui font-extrabold text-xs tracking-[0.2em] animate-pulse">Launch 3D Configurator</span>
                </a>
              )}

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-x-8">
                <HeroSpecItem label="Chassis" value={specs?.make_model} />
                <HeroSpecItem label="Wheelbase" value={specs?.wheelbase} />
                <HeroSpecItem label="Drivetrain" value={specs?.drivetrain} />
                {vanDetail.van_listing?.roof && (
                  <HeroSpecItem label="Roof" value={vanDetail.van_listing?.roof} />
                )}
                <HeroSpecItem label="Capacity" value={`${specs?.capacity?.sleeps || "2"} Person`} />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <PrimaryButton
                  label="Get This Build"
                  onClick={() => { setIsFormOpen(true); setData(vanDetail); }}
                  className="w-full"
                />
                <ShareButton title={vanDetail?.van_listing?.title} />
                <p className="text-center font-ui text-[9px] uppercase tracking-[0.3em] font-bold text-hover">
                  Limited 2026 Build Slots
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── BUILD OVERVIEW — light alt ── */}
      {vanDetail?.van_listing?.description && (
        <section className="bbv-section-light-alt relative py-20 px-6">
          <div className="bbv-dot-grid-light" />
          <div className="relative max-w-4xl mx-auto text-center">
            <SpanTag text="The Design Philosophy" className="justify-center mb-5" />
            <Heading2 text="Build Overview" className="text-primary mt-4" />
            <div className="bbv-divider mx-auto mt-5 mb-10" />
            <RichParagraph className="text-primary/60 italic leading-relaxed">
              "{vanDetail.van_listing.description}"
            </RichParagraph>
          </div>
        </section>
      )}

      {/* ── BLOCKS — alternating light / dark ── */}
      {activeBlocks.length > 0 && activeBlocks.map((block, idx) => {
        if (!block) return null;

        const isFeatureGrid = block.block_type === "feature-grid";
        const isDark = isFeatureGrid ? true : idx % 2 === 1;
        const layout = block.layout || "left";
        const alignClass = layout === "center" ? "text-center items-center" : layout === "right" ? "text-right items-end" : "text-left items-start";

        const titleCls = isDark ? "!text-secondary" : "!text-primary";
        const subCls   = isDark ? "text-secondary/60" : "text-primary/60";
        const cardCls  = isDark ? "bbv-glass-light" : "bbv-card";

        return (
          <section
            key={idx}
            className={`relative ${
              isFeatureGrid
                ? "bg-primary overflow-hidden"
                : `py-20 px-6 ${isDark ? "bbv-section-navy" : "bbv-section-light"}`
            }`}
          >
            {isDark ? <div className="bbv-dot-grid" /> : <div className="bbv-dot-grid-light" />}
            <div className={`relative ${isFeatureGrid ? "max-w-7xl mx-auto" : "max-w-5xl mx-auto"}`}>

              {/* HEADING */}
              {block.block_type === "heading" && block.title && (
                <div className={`flex flex-col gap-3 ${alignClass}`}>
                  <Heading2 text={block.title} className={titleCls} />
                  <div className={`w-12 h-0.5 bg-hover rounded-full ${layout === "center" ? "mx-auto" : layout === "right" ? "ml-auto" : ""}`} />
                  {block.subtitle && <RichParagraph className={subCls}>{block.subtitle}</RichParagraph>}
                </div>
              )}

              {/* SUBHEADING */}
              {block.block_type === "subheading" && block.title && (
                <div className={`flex flex-col gap-1 ${alignClass}`}>
                  <Heading3 text={block.title} className={`${titleCls} opacity-85`} />
                </div>
              )}

              {/* PARAGRAPH */}
              {block.block_type === "paragraph" && block.content && (
                <div className={`p-8 md:p-10 rounded-lg leading-relaxed ${cardCls}`}>
                  <RichParagraph className={isDark ? "!text-secondary/80" : "!text-primary/80"}>{block.content}</RichParagraph>
                </div>
              )}

              {/* LIST */}
              {block.block_type === "list" && block.list_items?.length > 0 && (
                <div>
                  {block.title && <Heading3 text={block.title} className={`${titleCls} mb-6`} />}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.list_items.map((item, i) => (
                      <div key={i} className={`flex flex-col p-5 rounded-lg border-l-4 border-hover ${cardCls}`}>
                        <div className="flex items-start gap-2">
                          <SvgCheck />
                          <RichParagraph className={`font-semibold leading-snug ${isDark ? "!text-secondary" : "!text-primary"}`}>{item.text}</RichParagraph>
                        </div>
                        {item.sub_items?.filter(s => s).length > 0 && (
                          <ul className="mt-2 ml-6 space-y-1">
                            {item.sub_items.filter(s => s).map((sub, si) => (
                              <li key={si} className={`flex items-start gap-2 text-sm ${subCls}`}>
                                <span className="mt-0.5">└</span><span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TABLE */}
              {block.block_type === "table" && block.table_data?.headers?.length > 0 && (
                <div>
                  {block.title && <Heading3 text={block.title} className={`${titleCls} mb-6`} />}
                  <div className={`overflow-x-auto rounded-lg border ${isDark ? "border-white/10" : "border-primary/10"}`}>
                    <table className="w-full text-left font-ui">
                      <thead className={isDark ? "bg-white/10" : "bg-primary"}>
                        <tr>
                          {block.table_data.headers.map((h, i) => (
                            <th key={i} className={`px-6 py-4 text-[10px] uppercase tracking-[0.22em] font-bold ${isDark ? "text-secondary/80" : "text-white"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? "divide-white/8" : "divide-primary/8"}`}>
                        {block.table_data.rows?.map((row, ri) => (
                          <tr key={ri} className={`transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-primary/3"}`}>
                            {row.map((cell, ci) => (
                              <td key={ci} className={`px-6 py-4 text-sm font-semibold ${isDark ? "text-secondary/75" : "text-primary"}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* MEDIA */}
              {block.block_type === "media" && block.block_media?.length > 0 && (
                <div className={`flex flex-wrap gap-6 ${layout === "center" ? "justify-center" : layout === "right" ? "justify-end" : "justify-start"}`}>
                  {block.block_media.map((m, i) => (
                    <div key={i} className="w-full max-w-2xl">
                      {m.type === "image" && m.url && (
                        <figure>
                          <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                            <img src={m.url} alt={m.alt || ""} className="w-full h-full object-cover" />
                            <div className="bbv-amber-line" />
                          </div>
                          {m.caption && <figcaption className={`text-center text-xs mt-2 italic ${subCls}`}>{m.caption}</figcaption>}
                        </figure>
                      )}
                      {(m.type === "video" || m.type === "iframe") && m.url && (
                        <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                          <iframe src={m.url} className="absolute inset-0 w-full h-full" frameBorder="0" allowFullScreen title={m.alt || `media-${i}`} />
                        </div>
                      )}
                      {m.type === "pdf" && m.url && (
                        <a href={m.url} target="_blank" rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-4 rounded-lg transition-opacity hover:opacity-80 ${cardCls}`}>
                          <span className="text-2xl">📄</span>
                          <span className={`font-semibold font-ui text-sm ${isDark ? "text-secondary" : "text-primary"}`}>{m.alt || "View PDF"}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* FEATURE-GRID — cinematic dark panel */}
              {block.block_type === "feature-grid" && <FeatureGridBlock block={block} />}

              {/* STATS */}
              {block.block_type === "stats" && (
                <div>
                  {(block.title || block.subtitle) && (
                    <div className={`mb-10 flex flex-col gap-3 ${alignClass}`}>
                      {block.title && <Heading2 text={block.title} className={titleCls} />}
                      {block.title && <div className={`w-12 h-0.5 bg-hover rounded-full ${layout === "center" ? "mx-auto" : ""}`} />}
                      {block.subtitle && <RichParagraph className={subCls}>{block.subtitle}</RichParagraph>}
                    </div>
                  )}
                  {(block.items || []).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                      {block.items.map((item, i) => (
                        <div key={i} className={`p-6 rounded-lg text-center ${cardCls}`}>
                          {item.value && <p className="text-3xl font-black text-hover mb-1 font-display leading-tight">{item.value}</p>}
                          {item.title && <p className={`font-ui text-[11px] uppercase tracking-[0.22em] font-bold ${subCls}`}>{item.title}</p>}
                          {item.description && <RichParagraph className={` mt-1 ${subCls}`}>{item.description}</RichParagraph>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* QUOTE */}
              {block.block_type === "quote" && block.content && (
                <blockquote className={`flex flex-col gap-4 ${alignClass}`}>
                  <div className="text-6xl text-hover/25 leading-none font-serif select-none">"</div>
                  <RichParagraph className={`text-xl italic leading-relaxed ${isDark ? "!text-secondary/80" : "!text-primary/75"}`}>
                    {block.content}
                  </RichParagraph>
                  {block.title && (
                    <cite className="font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-hover not-italic">
                      — {block.title}
                    </cite>
                  )}
                </blockquote>
              )}

              {/* CTA */}
              {block.block_type === "cta" && (
                <div className={`relative rounded-lg p-10 md:p-14 text-center space-y-5 overflow-hidden ${isDark ? "bbv-glass-light" : "bg-primary"}`}>
                  <div className="bbv-amber-line-top" />
                  {block.title && <Heading2 text={block.title} className="!text-secondary" />}
                  {block.subtitle && <RichParagraph className="!text-secondary/60 italic">{block.subtitle}</RichParagraph>}
                  {block.content && <RichParagraph className="!text-secondary/50 max-w-xl mx-auto">{block.content}</RichParagraph>}
                  {block.button?.label && block.button?.url && (
                    <a
                      href={block.button.url}
                      target={block.button.target === "blank" ? "_blank" : "_self"}
                      rel={block.button.target === "blank" ? "noopener noreferrer" : undefined}
                      className="inline-block px-8 py-3 bg-hover text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:opacity-90 transition-opacity font-ui"
                    >
                      {block.button.label}
                    </a>
                  )}
                </div>
              )}

            </div>
          </section>
        );
      })}

      {/* ── FEATURES ACCORDION — light ── */}
      {vanDetail?.detailed_features?.filter(f => f.items?.length > 0).length > 0 && (
        <section className="bbv-section-light-alt relative py-20">
          <div className="bbv-dot-grid-light" />
          <div className="relative max-w-6xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-12">
              <SpanTag text="Build Standards" className="justify-center mb-5" />
              <Heading2 text="Every Component Considered" className="!text-primary mt-4" />
              <div className="bbv-divider mx-auto mt-5" />
            </div>

            {/* Accordion — light cards */}
            <div className="space-y-3">
              {vanDetail.detailed_features
                .filter(f => f.items?.length > 0)
                .map((feature, i) => {
                  const isOpen = activeFeature === i;
                  return (
                    <div
                      key={i}
                      className={`bbv-card overflow-hidden transition-all duration-200 ${isOpen ? "border-hover/35" : "hover:border-primary/20"}`}
                      style={{ borderWidth: "1px", borderStyle: "solid" }}
                    >
                      {/* Row header */}
                      <button
                        type="button"
                        onClick={() => setActiveFeature(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen ? "bg-hover text-white" : "bg-primary/8 text-primary/60 group-hover:bg-hover/15 group-hover:text-hover"}`}>
                            {getFeatureIcon(feature.category)}
                          </div>
                          <span className={`font-display font-bold text-base leading-tight transition-colors duration-200 ${isOpen ? "text-primary" : "text-primary/80 group-hover:text-primary"}`}>
                            {feature.category}
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-200 ${isOpen ? "bg-hover text-white rotate-45" : "bg-primary/8 text-primary/50"}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
                          </svg>
                        </div>
                      </button>

                      {/* Expanded content */}
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-primary/8">
                          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                            {feature.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2.5 py-1.5">
                                <SvgCheck small />
                                <span className="font-body text-sm text-primary/75 leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

          </div>
        </section>
      )}
   {/* ── QUICK STATS — dark navy ── */}
      <div className="bbv-section-navy relative">
        <div className="bbv-dot-grid" />
        <div className="bbv-amber-line-top" />
        <div className="relative max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center text-hover shrink-0">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <SpanTag className="font-ui uppercase tracking-[0.28em] font-semibold !text-hover mb-0.5" text={"Transmission"}/>
              <RichParagraph className="font-display font-bold text-secondary leading-tight">{specs?.transmission || "Automatic"}</RichParagraph>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center text-hover shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <SpanTag className="font-ui uppercase tracking-[0.28em] font-semibold !text-hover mb-0.5" text={"Engine"}/>
              <RichParagraph className="font-display font-bold text-secondary leading-tight">{specs?.engine || "Turbo Diesel"}</RichParagraph>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg border-2 border-white/15 shrink-0"
              style={{ backgroundColor: specs?.exterior_color || "#4a5568" }} />
            <div>
              <SpanTag className="font-ui uppercase tracking-[0.28em] font-semibold !text-hover mb-0.5" text={"Exterior"}/>
              <RichParagraph className="font-display font-bold text-secondary leading-tight">Premium Finish</RichParagraph>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg border-2 border-white/15 shrink-0"
              style={{ backgroundColor: specs?.interior_color || "#2d3748" }} />
            <div>
              <SpanTag className="font-ui uppercase tracking-[0.28em] font-semibold !text-hover mb-0.5" text={"Interior"}/>
              <RichParagraph className="font-display font-bold text-secondary leading-tight">Custom Palette</RichParagraph>
            </div>
          </div>

        </div>
      </div>

      {/* ── MEDIA GALLERY — light ── */}
      {uniqueMedia.length > 0 && (
        <section className="bbv-section-light relative py-20 px-4">
          <div className="bbv-dot-grid-light" />
          <div className="relative">
            <div className="text-center mb-12">
              <SpanTag text="See It In Motion" className="justify-center mb-5" />
              <Heading2 text="Media Gallery" className="!text-primary mt-4" />
              <div className="bbv-divider mx-auto mt-5" />
            </div>
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
              {uniqueMedia.map((link, i) => (
                <div key={i} className={`w-full bbv-card overflow-hidden ${link.includes("youtube") ? "max-w-[700px]" : "max-w-[350px]"}`}>
                  <div className="relative w-full" style={{ paddingBottom: link.includes("youtube") ? "56.25%" : "140%" }}>
                    <iframe src={getEmbedUrl(link)} className="absolute top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA — dark navy ── */}
      <section className="bbv-section-navy relative py-24 px-6">
        <div className="bbv-dot-grid" />
        <div className="bbv-amber-line-top" />
        <div className="relative max-w-2xl mx-auto text-center">
          <SpanTag text="Ready to Begin?" className="justify-center mb-5" />
          <Heading2 text="Build Your Legacy" className="!text-secondary mt-4" />
          <div className="bbv-divider mx-auto mt-5 mb-10" />
          <RichParagraph className="!text-secondary/55 italic leading-relaxed mb-10">
            Limited build slots available for 2026. Connect with our design team to start your custom journey.
          </RichParagraph>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SecondaryButton label="Book A Call" />
            <PrimaryButton label="View All Builds" link="/van-layouts" />
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM MODAL ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-canvas/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bbv-card max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-primary hover:text-hover transition-colors cursor-pointer z-30 text-xl font-bold"
            >✕</button>
            <ContactForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              initialVans={data}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VanPage;
