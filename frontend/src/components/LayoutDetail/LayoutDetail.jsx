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

export default function LayoutDetail({van}) {


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
  return (
    <>

      <Breadcrumb
        customItems={[
          { name: "Layouts", href: "/van-layouts" },
          { name: van?.van_listing.title },
        ]}
      />
<main  className="bg-secondary font-body">

          {/* TOP SECTION */}
          <div className="max-w-[1440px] mx-auto pt-10 pb-20 px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Gallery */}
               <div className="lg:col-span-7">
            <VanGallery gallery={van.gallery} title={van?.van_listing?.title} />
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
                    label="ORDER THIS BUILD"
                    link={"/contact"}
                    className="!w-full"/>
                  <ShareButton
                    title={van?.van_listing?.title}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUILD OVERVIEW */}
          <section className="py-24 px-6 bg-white rounded-t-lg shadow-2xl relative z-20">
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

          {/* FEATURES */}
          <section className="py-24 px-6 bg-secondary text-primary">
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