import React from "react";
import {
  Heading2,
  Heading3,
  Heading1,
  ShareButton,
  Breadcrumb,
  RichParagraph,
  SecondaryButton
} from "../Common/Common";
import {
  Zap,
  Droplets,
  ShieldCheck,
  Layout as LayoutIcon,
  Maximize,
  Users,

} from "lucide-react";
import VanGallery from "../VanDetail/GallerySection";
import FeatureGridBlock from "../VanDetail/BlockFeatureCard";

const SvgCheck = () => (
  <svg className="w-4 h-4 shrink-0" style={{ color: "#ED985F" }}
    fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HeroSpecItem = ({ icon: Icon, label, value }) => (
  <div className="group py-3 border-b border-primary/10 transition-all duration-300 hover:border-hover">
    <div className="flex items-center gap-2 mb-1">
      <RichParagraph className="uppercase  text-primary/50 !text-xs ">
        {label}
      </RichParagraph>
    </div>
    <RichParagraph className=" text-primary group-hover:!text-hover transition-colors">
      {value || "N/A"}
    </RichParagraph>
  </div>
);

export default function LayoutDetail({ van, initialView }) {

  // console.log(initialView, "ye initialView hai jo server se aaya");
  const getFeatureIcon = (cat) => {
    if (cat.includes("Electric")) return <Zap size={24} />;
    if (cat.includes("Water")) return <Droplets size={24} />;
    if (cat.includes("Insulation")) return <ShieldCheck size={24} />;
    return <LayoutIcon size={24} />;
  };

  // JSON-LD Schema for Google Rich Results
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
  const uniqueMedia = [...new Set(van?.media)];
  const activeBlocks = (van?.blocks || [])
    .filter((b) => b.is_active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <>

      <Breadcrumb
        customItems={[
          { name: "Layouts", href: "/van-layouts" },
          { name: van?.van_listing.title },
        ]}
      />
      <main className="bg-secondary font-body">

        {/* TOP SECTION */}
        <div className="max-w-[1440px] mx-auto pt-10 pb-20 px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Gallery */}
            <div className="lg:col-span-7">
              {initialView === "floorplan" ? (
                // Agar view floorplan hai toh rendering array bhejenge (agar rendering khali ho toh fallback gallery)
                <VanGallery
                  gallery={van.rendering}
                  title={`${van?.van_listing?.title} Blueprint`}
                />
              ) : (
                // Default real photos gallery
                <VanGallery gallery={van.gallery} title={van?.van_listing?.title} />
              )}
            </div>
            {/* Info Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-8">

              <div>
                <RichParagraph className="!text-hover uppercase !text-xs font-bold">
                  Signature Layout
                </RichParagraph>


                <Heading1 text={van?.van_listing.title} className="!text-primary mb-4 !text-5xl" />


                <RichParagraph className="mt-6 text-primary/60  italic border-l-2 border-hover pl-6">
                  {van?.van_listing.subtitle}
                </RichParagraph>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <HeroSpecItem
                  icon={Maximize}
                  label="Wheelbase"
                  value={van?.van_listing?.specifications?.wheelbase}
                />
                <HeroSpecItem
                  icon={Users}
                  label="Sits / Sleeps"
                  value={`${van?.van_listing?.specifications?.capacity?.sits} / ${van?.van_listing?.specifications?.capacity?.sleeps}`}
                />
                <HeroSpecItem
                  icon={Zap}
                  label="Drivetrain"
                  value={van?.van_listing?.specifications?.drivetrain}
                />
                <HeroSpecItem
                  icon={ShieldCheck}
                  label="Base Vehicle"
                  value={van?.van_listing?.specifications?.make_model}
                />
                {van?.van_listing?.specifications?.size && <HeroSpecItem
                  icon={Maximize}
                  label="Roof"
                  value={van?.van_listing?.specifications?.roof}
                />}

                {van?.van_listing?.specifications?.size && <HeroSpecItem
                  icon={Maximize}
                  label="Size"
                  value={van?.van_listing?.specifications?.size}
                />}

              </div>

              <div className="flex flex-col gap-4 pt-4">
                <SecondaryButton
                  label="Build One Like This"
                  link={"/contact"}
                  className="!w-full" />
                <ShareButton
                  title={van?.van_listing?.title}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BUILD OVERVIEW */}
        <section className="py-20 px-4 bg-white rounded-t-lg shadow-2xl relative z-20">
          <div className="container mx-auto max-w-5xl text-center">
            <RichParagraph className="!text-hover uppercase !text-xs font-bold">
              The Design Philosophy
            </RichParagraph>

            <Heading2 text="Build Overview" className="mt-4" />

            <div className="h-1.5 w-24 bg-hover mx-auto mt-6 rounded-full" />

            <RichParagraph className=" text-primary/70 italic mt-10">
              "{van?.van_listing.description}"
            </RichParagraph>
          </div>
        </section>

        {/* ── DYNAMIC CONTENT BLOCKS — alternating light / dark ── */}
        {activeBlocks.length > 0 && activeBlocks.map((block, idx) => {
          if (!block) return null;

          const isFeatureGrid = block.block_type === "feature-grid";
          const isDark = isFeatureGrid ? true : idx % 2 === 1;
          const layout = block.layout || "left";
          const alignClass = layout === "center" ? "text-center items-center" : layout === "right" ? "text-right items-end" : "text-left items-start";

          const titleCls = isDark ? "!text-secondary" : "!text-primary";
          const subCls = isDark ? "text-secondary/60" : "text-primary/60";
          const cardCls = isDark ? "bbv-glass-light" : "bbv-card";

          return (
            <section
              key={idx}
              className={`relative ${isFeatureGrid
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
                            <RichParagraph className={`leading-snug ${isDark ? "!text-secondary" : "!text-primary"}`}>{item.text}</RichParagraph>
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

        {/* FEATURES */}
        <section className="py-16 px-4 bg-secondary text-primary">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <Heading2 text="Standard Features" className="" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {van?.detailed_features?.filter(f => f.items?.length > 0)?.map((feature, index) => (
                <div key={index} className="p-8 bg-white/5 rounded-lg border  hover:bg-white transition-all group">
                  <div className="!text-hover mb-6 group-hover:scale-110 transition-transform">
                    {getFeatureIcon(feature.category)}
                  </div>
                  <Heading3 text={feature.category} className="mb-6" />
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-primary">
                        <span className="!text-hover mr-2">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* {videos} */}
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
                    className={`w-full shadow-lg bg-white transition-all duration-300 ${isYouTube ? 'max-w-[700px]' : 'max-w-[350px]'
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
        ) : ""}
      </main>



    </>
  );
}