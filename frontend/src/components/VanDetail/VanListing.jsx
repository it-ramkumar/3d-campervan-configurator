"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
import FeatureGridBlock, { FaqFeatureBlocks, isFaqFeatureBlock } from "./BlockFeatureCard";
import FeatureItemText from "../Common/DetailFeature/FeatureItemText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function GalleryModelLoader({ progress, className = "" }) {
  const percentage = Number.isFinite(progress) ? Math.min(100, Math.max(0, Math.round(progress))) : null;
  const downloading = percentage !== null && percentage > 0 && percentage < 100;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div role="status" aria-live="polite" className="w-64 rounded-2xl border border-white/15 bg-[#020C18]/90 px-7 py-6 text-center text-white shadow-2xl backdrop-blur-md">
        <div aria-hidden="true" className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#ED985F]/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#ED985F] border-r-[#ED985F]/50 motion-reduce:animate-none" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="h-9 w-9 animate-pulse text-[#ED985F] motion-reduce:animate-none">
            <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
            <path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5" />
          </svg>
        </div>
        <p className="text-sm font-semibold tracking-wide">Preparing your van</p>
        <p className="mt-1 text-xs text-white/60">{downloading ? `Loading 3D assets · ${percentage}%` : "Setting up the 3D view..."}</p>
        <div role="progressbar" aria-label="3D assets loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={downloading ? percentage : undefined} className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className={`h-full rounded-full bg-[#ED985F] transition-[width] duration-300 ${downloading ? "" : "animate-pulse motion-reduce:animate-none"}`} style={{ width: downloading ? `${percentage}%` : "40%" }} />
        </div>
      </div>
    </div>
  );
}

// Load the 3D dependencies only when the model tab is opened.
const GalleryModel = dynamic(async () => {
  const [{ Canvas }, { OrbitControls, Html, Environment, useProgress }, { default: Model }, { default: PartModel }] = await Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei"),
    import("./Models/Model"),
    import("./Models/Parts"),
  ]);

  function ModelLoadingProgress() {
    const { progress } = useProgress();
    return <Html center><GalleryModelLoader progress={progress} /></Html>;
  }

  return function GalleryModelScene({ url, parts }) {
    return (
      <Canvas gl={{ alpha: true }} style={{ background: "transparent" }} camera={{ position: [15, 15, 15], fov: 50 }} fallback={<p className="p-6 text-white">Your browser does not support the 3D viewer.</p>}>
        <Suspense fallback={<ModelLoadingProgress />}>
          <OrbitControls makeDefault enableDamping minDistance={5} maxDistance={50} />
          <Model url={url} />
          {parts.filter(part => part?.model).map((part, index) => (
            <PartModel key={part._id || `${part.model}-${index}`} url={part.model} position={[0, -2, 0]} rotation={[0, 0, 0]} />
          ))}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    );
  };
}, { ssr: false, loading: () => <GalleryModelLoader className="absolute inset-0" /> });

class GalleryModelBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <p role="alert" className="p-6 text-white">The 3D model could not be loaded. Please switch tabs and try again.</p>;
    }
    return this.props.children;
  }
}

export const getGalleryVideo = (link) => {
  if (typeof link !== "string" || !link.trim()) return null;
  try {
    const url = new URL(link.trim());
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const host = url.hostname.replace(/^www\./, "");
    if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(url.pathname)) return { url: url.href, native: true };
    if (["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)) {
      const id = host === "youtu.be" ? url.pathname.split("/")[1] : url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
      return id && /^[\w-]+$/.test(id) ? { url: `https://www.youtube.com/embed/${id}`, portrait: url.pathname.startsWith("/shorts/") } : null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const match = url.pathname.match(/\/(?:video\/)?(\d+)(?:\/([\w]+))?/);
      if (!match) return null;
      const embed = new URL(`https://player.vimeo.com/video/${match[1]}`);
      const hash = url.searchParams.get("h") || match[2];
      if (hash) embed.searchParams.set("h", hash);
      return { url: embed.href };
    }
    if (host === "instagram.com" && /^\/(p|reel)\/[^/]+/.test(url.pathname)) {
      return { url: `https://www.instagram.com/${url.pathname.split("/").filter(Boolean).slice(0, 2).join("/")}/embed/`, portrait: true, instagram: true };
    }
    return null;
  } catch {
    return null;
  }
};

function GalleryVideoPlayer({ video, title }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Keep Instagram's full embed viewport, but clip its footer outside the
  // visible area. This crop matches the header + reel preview in our gallery.
  const frameWidth = video.instagram ? 400 : video.portrait ? 360 : 960;
  const frameHeight = video.instagram ? 800 : video.portrait ? 640 : 540;
  const visibleHeight = video.instagram ? 556 : frameHeight;
  const scale = Math.min(size.width / frameWidth, size.height / visibleHeight);
  const playerUrl = new URL(video.url);
  // Only the selected gallery video is mounted. Removing it on a tab or
  // video change stops playback; Instagram has no supported autoplay option.
  if (!video.native && !video.instagram) {
    playerUrl.searchParams.set("autoplay", "1");
    playerUrl.searchParams.set("playsinline", "1");
    playerUrl.searchParams.set(playerUrl.hostname === "player.vimeo.com" ? "muted" : "mute", "1");
  }

  return (
    <div ref={containerRef} className="relative flex aspect-square max-h-[600px] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
      {video.native ? (
        <video key={video.url} src={video.url} controls autoPlay muted playsInline preload="metadata" aria-label={title} className="absolute inset-0 h-full w-full object-contain" />
      ) : (
        <div className="relative shrink-0 overflow-hidden" style={{ width: frameWidth * scale, height: visibleHeight * scale }}>
          <iframe key={video.url} src={playerUrl.href} title={title} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen
            className="absolute left-0 top-0 max-w-none origin-top-left border-0"
            style={{ width: frameWidth, height: frameHeight, transform: `scale(${scale})`, visibility: scale > 0 ? "visible" : "hidden" }} />
        </div>
      )}
    </div>
  );
}

export function VanMediaGallery({ gallery = [], media = [], modelUrl, variants = [], title }) {
  const [selectedMode, setSelectedMode] = useState("gallery");
  const [videoIndex, setVideoIndex] = useState(0);
  const [variantId, setVariantId] = useState("");
  const videos = [...new Map(media.map(getGalleryVideo).filter(Boolean).map(video => [video.url, video])).values()];
  const modes = [
    ...(gallery.length ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(videos.length ? [{ id: "video", label: "Videos" }] : []),
    ...(modelUrl ? [{ id: "model", label: "3D Model" }] : []),
  ];
  const mode = modes.find(item => item.id === selectedMode)?.id || modes[0]?.id;
  const video = videos[videoIndex] || videos[0];
  const variant = variants.find(item => item._id === variantId) || variants[0];

  return (
    <div>
      {modes.length > 1 && (
        <div role="group" aria-label="Van media" className="mb-4 flex flex-wrap gap-2">
          {modes.map(item => (
            <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => setSelectedMode(item.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hover ${mode === item.id ? "border-hover bg-hover text-primary" : "border-primary/20 text-primary hover:bg-hover/10"}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
      {(!mode || mode === "gallery") && <VanGallery gallery={gallery} title={title} />}
      {mode === "video" && video && (
        <div>
          <GalleryVideoPlayer video={video} title={`${title || "Van"} video ${videoIndex + 1}`} />
          {videos.length > 1 && (
            <div role="group" aria-label="Choose video" className="mt-3 flex flex-wrap gap-2">
              {videos.map((item, index) => (
                <button key={item.url} type="button" onClick={() => setVideoIndex(index)} aria-pressed={item.url === video.url}
                  className={`rounded-lg border px-4 py-2 text-sm ${item.url === video.url ? "border-hover bg-hover/15" : "border-primary/20"}`}>
                  Video {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {mode === "model" && (
        <div>
          {variants.length > 0 && (
            <label className="mb-3 flex flex-wrap items-center gap-3 text-sm font-semibold">
              Variant
              <select value={variant?._id || ""} onChange={event => setVariantId(event.target.value)} className="min-w-0 max-w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-primary">
                {variants.map((item, index) => <option key={item._id} value={item._id}>{item.name || `Variant ${index + 1}`}</option>)}
              </select>
            </label>
          )}
          <div className="relative isolate h-[360px] overflow-hidden rounded-xl bg-[#020C18] sm:h-[480px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url("/images/logooFooter.webp")', backgroundSize: "80% auto" }} />
            <GalleryModelBoundary key={`${modelUrl}-${variant?._id || "base"}`}>
              <GalleryModel url={modelUrl} parts={variant?.parts || []} />
            </GalleryModelBoundary>
          </div>
          <p className="mt-3 text-sm text-primary/60">Drag to rotate. Scroll or pinch to zoom.</p>
        </div>
      )}
    </div>
  );
}



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

const VanPage = ({ vanDetail,variants }) => {
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

  const galleryVideos = [...new Map(
    (vanDetail?.media || []).map(getGalleryVideo).filter(Boolean).map(video => [video.url, video])
  ).values()];
  const activeBlocks = blocks
    .filter(b => b.is_active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="font-body text-primary antialiased">

      {/* ── TOP NAV BAR ── */}
      <div className="relative bbv-section-light border-b border-primary/8">
        <div className="bbv-amber-line-top" />
        <div className="flex items-center px-4 md:px-8 py-3">
          <BackButton className="!static !mt-0" />
        </div>
      </div>

      {/* ── HERO — light ── */}
      <section className="bbv-section-light relative">
        <div className="bbv-dot-grid-light" />
        <div className="relative max-w-9xl mx-auto md:pt-4 pb-16 px-6 ">

          {/* Mobile-only heading: shown above the gallery on small screens.
              Hidden on lg+ where the title renders inside the info panel instead. */}
          <div className="lg:hidden mb-5 space-y-3">
            <Heading1 text={vanDetail?.van_listing?.title} className="!text-primary !text-4xl sm:!text-5xl leading-[0.95]" />
            {vanDetail?.van_listing?.subtitle && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-hover shrink-0" />
                <RichParagraph className="italic !text-primary/55">{vanDetail.van_listing.subtitle}</RichParagraph>
              </div>
            )}
            {vanDetail?.delivery_date && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hover/10 border border-hover/25">
                <Calendar className="w-3 h-3 text-hover" />
                <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-hover font-ui">{vanDetail.delivery_date}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT: GALLERY */}
            <div className="lg:col-span-7">
              <VanMediaGallery
                key={vanDetail?.slug || vanDetail?._id}
                gallery={gallery}
                media={vanDetail?.media || []}
                modelUrl={vanDetail?.glbFile}
                variants={variants || []}
                title={vanDetail?.van_listing?.title}
              />
            </div>

            {/* RIGHT: INFO PANEL */}
            <div className="lg:col-span-5 lg:sticky lg:top-10 h-fit space-y-6">

              {/* Delivery date badge (desktop only — mobile shows it above the gallery instead) */}
              {vanDetail?.delivery_date && (
                <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hover/10 border border-hover/25">
                  <Calendar className="w-3 h-3 text-hover" />
                  <span className="text-[9px] uppercase tracking-[0.28em] font-semibold text-hover font-ui">{vanDetail.delivery_date}</span>
                </div>
              )}

             
              <div>
                <Heading1 as="div" text={vanDetail?.van_listing?.title} className="hidden lg:block !text-primary !text-6xl mb-2 leading-[0.9]" />
                {vanDetail?.van_listing?.subtitle && (
                  <div className="hidden lg:flex items-center gap-3 mt-4">
                    <div className="w-8 h-0.5 bg-hover shrink-0" />
                    <RichParagraph className="italic !text-primary/55">{vanDetail.van_listing.subtitle}</RichParagraph>
                  </div>
                )}
              </div>


{/* Price card */}
{vanDetail.status === "available" && (
  <div className="relative bbv-card p-6 overflow-hidden">
    <div className="bbv-amber-line-top" />

    <RichParagraph className="mb-2 font-bold !text-primary">
      Total Listing Price
    </RichParagraph>

    {Number(vanDetail.van_listing.price) > 99 ? (
      <Heading2
        text={`$${Number(vanDetail.van_listing.price).toLocaleString()}`}
        className="!text-hover !text-4xl"
      />
    ) : (
      <RichParagraph className="font-display font-bold text-primary">
        Inquire for Price
      </RichParagraph>
    )}
  </div>
)}



              {/* 3D Configurator CTA */}
              {vanDetail?.glbFile && (
                <div className="relative">
                  <span className="absolute -top-3 -right-3 z-20 rounded-full bg-primary px-2 py-1 text-[10px] font-black uppercase text-secondary shadow-md animate-bounce pointer-events-none">
                    New · 3D
                  </span>
                  <a
                    href={`/camper-vans-for-sale/${vanDetail.slug}/configure`}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-hover to-hover/70 px-8 py-4 font-extrabold uppercase text-primary shadow-[0_0_0_0_rgba(237,152,95,0.6)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_6px_rgba(237,152,95,0.55)] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-lg bg-primary/25" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 transition-transform duration-700 group-hover:rotate-[360deg]">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
                        <path d="M12 3v18" /><path d="M3 12h18" />
                      </svg>
                    </div>
                    <span className="relative z-10 font-ui font-extrabold text-xs tracking-[0.2em]">Launch 3D Configurator</span>
                  </a>
                </div>
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
      {activeBlocks.filter(block => !isFaqFeatureBlock(block)).map((block, idx) => {
        if (!block) return null;

        const isFeatureGrid = block.block_type === "feature-grid";
        const isDark = isFeatureGrid || idx % 2 === 0;
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
                          <RichParagraph className={` leading-snug ${isDark ? "!text-secondary" : "!text-primary"}`}>{item.text}</RichParagraph>
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
                            <table className="w-full border-collapse">
           <thead className={isDark ? "bg-white/10" : "bg-primary"}>
             <tr>
               {block.table_data.headers.map((h, i) => (
                 <th
                   key={i}
                   className={`px-6 py-4 text-[10px] uppercase tracking-[0.22em] font-bold border ${
                     isDark
                       ? "border-white/10 text-secondary/80"
                       : "border-primary/10 text-white"
                   }`}
                 >
                   {h}
                 </th>
               ))}
             </tr>
           </thead>

           <tbody>
             {block.table_data.rows?.map((row, ri) => (
               <tr key={ri}>
                 {row.map((cell, ci) => (
                   <td
                     key={ci}
                     className={`px-6 py-4 text-sm ${
                       ci === 0 ? "font-bold" : "font-normal"
                     } ${
                       isDark
                         ? "border border-white/10 text-secondary/75"
                         : "border border-primary/10 text-primary"
                     }`}
                   >
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
                                <span className="font-body text-sm text-primary/75 leading-snug"><FeatureItemText text={item} /></span>
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
      <FaqFeatureBlocks blocks={activeBlocks} />

      {galleryVideos.length > 0 && (
        <section className="bbv-section-light relative py-20 px-4">
          <div className="bbv-dot-grid-light" />
          <div className="relative">
            <div className="text-center mb-12">
              <SpanTag text="See It In Motion" className="justify-center mb-5" />
              <Heading2 text="Media Gallery" className="!text-primary mt-4" />
              <div className="bbv-divider mx-auto mt-5" />
            </div>
            {/* 3 or fewer videos: plain row, no slider needed. More than 3: swipeable slider. */}
            {galleryVideos.length <= 3 ? (
              <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                {galleryVideos.map((video) => (
                  <div key={video.url} className={`w-full bbv-card overflow-hidden ${video.portrait ? "max-w-[350px]" : "max-w-[700px]"}`}>
                    <div className="relative w-full" style={{ paddingBottom: video.portrait ? "140%" : "56.25%" }}>
                      {video.native ? (
                        <video src={video.url} controls className="absolute top-0 left-0 w-full h-full object-cover" />
                      ) : (
                        <iframe src={video.url} className="absolute top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="media-gallery-swiper max-w-7xl mx-auto !pb-12"
                >
                  {galleryVideos.map((video) => (
                    <SwiperSlide key={video.url} className="!h-[300px] bbv-card overflow-hidden">
                      <div className="relative h-full w-full">
                        {video.native ? (
                          <video src={video.url} controls className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <iframe src={video.url} className="absolute inset-0 h-full w-full" frameBorder="0" allowFullScreen />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <style>{`
                  .media-gallery-swiper .swiper-button-next,
                  .media-gallery-swiper .swiper-button-prev {
                    color: #ED985F;
                    background: rgba(2,12,24,0.72);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                  }
                  .media-gallery-swiper .swiper-button-next::after,
                  .media-gallery-swiper .swiper-button-prev::after {
                    font-size: 16px;
                    font-weight: 900;
                  }
                  .media-gallery-swiper .swiper-pagination-bullet-active {
                    background: #ED985F !important;
                  }
                `}</style>
              </>
            )}
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
              className="absolute top-4 right-4 text-primary  transition-colors cursor-pointer z-30 text-xl font-bold"
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
