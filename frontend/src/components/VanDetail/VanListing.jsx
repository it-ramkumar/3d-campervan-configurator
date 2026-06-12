"use client";
import React, { useState } from "react";
import {
  Settings2,
  Zap,
  Droplets,
  ShieldCheck,
  Bed,
  ChefHat,
  ExternalLink,
} from "lucide-react";
import {
  Heading2,
  Heading3,
  Heading1,
  RichParagraph,
  SecondaryButton,
  ShareButton,
  Breadcrumb,
  PrimaryButton,
} from "../Common/Common";
import VanGallery from "./GallerySection";
import BackButton from "../Common/BackButton/BackButton";
import ContactForm from "@/components/Consultation/ContactForm";
import { contact } from "../../api/contact/contact";


const SvgCheckmark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 !text-hover flex-shrink-0 mt-1 mr-2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const HeroSpecItem = ({ label, value }) => (
  <div className="group py-2 border-b border-primary/10 transition-all duration-300 hover:border-hover">
    <RichParagraph className="uppercase mb-1 !text-xs">{label}</RichParagraph>
    <RichParagraph className="font-bold group-hover:!text-hover">
      {value}
    </RichParagraph>
  </div>
);

const VanPage = ({ vanDetail }) => {
  const blocks = vanDetail?.blocks || [];
  const gallery = vanDetail?.gallery || [];
  const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    try {
      if (
        !data.name?.trim() ||
        !data.email?.trim() ||
        !data.phone?.trim()
      ) {
        return;
      }

      setLoading(true);
      // API call
      const result = await contact(data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const specs = vanDetail?.van_listing?.specifications;
  const getFeatureIcon = (category) => {
    const icons = {
      "Insulation and Paneling": <ShieldCheck className="w-7 h-7" />,
      "Water System": <Droplets className="w-7 h-7" />,
      Electrics: <Zap className="w-7 h-7" />,
      "Seating and Sleeping": <Bed className="w-7 h-7" />,
      Kitchen: <ChefHat className="w-7 h-7" />,
      Exterior: <ExternalLink className="w-7 h-7" />,
    };
    return icons[category] || <Settings2 className="w-7 h-7" />;
  };

  const getEmbedUrl = (link) => {
    if (!link) return "";
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (
      link.includes("instagram.com/p/") ||
      link.includes("instagram.com/reel/")
    ) {
      let cleanUrl = link.split("?")[0];
      if (!cleanUrl.endsWith("/")) cleanUrl += "/";
      return `${cleanUrl}embed/`;
    }
    return link;
  };

  const uniqueMedia = [...new Set(vanDetail?.media || [])];

  return (
    <div className="bg-secondary font-body text-primary">
      <div className="flex justify-between items-center bg-secondary px-4 md:px-8 py-4 w-full border-b border-primary/5">
        {/* Left Side: Back Button without hardcoded positions */}
        <BackButton className="!static !mt-0" />
      </div>
      <div className="max-w-7xl mx-auto pt-4 pb-20 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: GALLERY (Ab ye Client Component hai) */}
          <div className="lg:col-span-7">
            <VanGallery
              gallery={gallery}
              title={vanDetail?.van_listing?.title}
            />
          </div>

          {/* RIGHT: STICKY INFO PANEL */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 h-fit space-y-8">
            {vanDetail?.delivery_date && (
              <marquee>✨ {vanDetail?.delivery_date}</marquee>
            )}

            <div>
              <Heading1
                text={vanDetail?.van_listing?.title}
                className="!text-primary mb-4 !text-5xl"
              />
              <RichParagraph className="italic">
                {vanDetail?.van_listing?.subtitle}
              </RichParagraph>
            </div>

            {vanDetail.status === "available" && (
              <div className="p-6 bg-white rounded-lg border border-primary/5 shadow-sm">
                <RichParagraph className="!text-hover uppercase font-bold">
                  Total Listing Price
                </RichParagraph>
                {Number(vanDetail.van_listing.price) > 99 ? (
                  <Heading3
                    text={`$${Number(vanDetail.van_listing.price).toLocaleString()}`}
                    className="font-bold text-primary mt-1"
                  />
                ) : (
                  <p className="font-bold text-primary mt-1">
                    Inquire for Price
                  </p>
                )}{" "}
              </div>
            )}

  {vanDetail?.slug && (
  <a
    href={`/camper-vans-for-sale/${vanDetail.slug}/configure`}
    className="relative inline-flex w-full items-center justify-center gap-4 rounded-lg bg-primary px-8 py-4 font-extrabold uppercase tracking-wide text-white shadow-[0_8px_0_#1d4ed8] transition-all duration-100 hover:bg-primary-200 active:translate-y-[8px] active:shadow-none group text-center overflow-hidden"
  >
    {/* Animated Pulse Icon */}
    <div className="relative flex h-6 w-6 items-center justify-center">
      {/* Wave 1 */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"></span>
      {/* Wave 2 */}
      <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-blue-300 opacity-20"></span>

      {/* Axis/Orbit Icon that spins on Hover */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="relative transition-transform duration-700 group-hover:rotate-[360deg]"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"></path>
        <path d="M12 3v18"></path>
        <path d="M3 12h18"></path>
      </svg>
    </div>

    <span className="drop-shadow-md">Launch 3D Configurator</span>
  </a>
)}
            <div className="grid grid-cols-2 gap-4">
              <HeroSpecItem label="Chassis" value={specs?.make_model} />
              <HeroSpecItem label="Wheelbase" value={specs?.wheelbase} />
              <HeroSpecItem label="Drivetrain" value={specs?.drivetrain} />
              {vanDetail.van_listing?.roof && (
                <HeroSpecItem
                  label="Roof"
                  value={vanDetail.van_listing?.roof}
                />
              )}
              <HeroSpecItem
                label="Capacity"
                value={`${specs?.capacity?.sleeps || "2"} Person`}
              />
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <div className="mt-auto flex gap-3">

                <PrimaryButton
                  label=" Get This Build"
                  onClick={() => { setIsFormOpen(true); setData(vanDetail) }}
                  className="w-full mt-4"
                />


              </div>
              <ShareButton title={vanDetail?.van_listing?.title} />
              <RichParagraph className="text-center !text-hover !text-xs uppercase font-bold">
                Limited 2026 Build Slots
              </RichParagraph>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS SECTION */}
      <div className="py-12 bg-white border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg text-primary">
              <Settings2 />
            </div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">
                Transmission
              </RichParagraph>
              <RichParagraph className="font-bold">
                {specs?.transmission || "Automatic"}
              </RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg text-primary">
              <Zap />
            </div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">
                Engine
              </RichParagraph>
              <RichParagraph className="font-bold">
                {specs?.engine || "Turbo Diesel"}
              </RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg border-4 border-secondary shadow-sm"
              style={{ backgroundColor: specs?.exterior_color || "#ccc" }}
            ></div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">
                Exterior
              </RichParagraph>
              <RichParagraph className="font-bold">
                Premium Finish
              </RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg border-4 border-secondary shadow-sm"
              style={{ backgroundColor: specs?.interior_color || "#333" }}
            ></div>
            <div>
              <RichParagraph className="font-bold !text-hover uppercase">
                Interior
              </RichParagraph>
              <RichParagraph className="font-bold">
                Custom Palette
              </RichParagraph>
            </div>
          </div>
        </div>
      </div>

      {vanDetail?.van_listing?.description && (
        <section className="py-20 px-6 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <div className="container mx-auto max-w-5xl text-center">
              <RichParagraph className="!text-hover uppercase !text-xs font-bold">
                The Design Philosophy
              </RichParagraph>

              <Heading2
                text="Build Overview"
                className="text-primary mt-4 mb-6"
              />

              <div className="w-20 h-1 bg-hover mx-auto rounded-full mb-10"></div>

              <RichParagraph className="text-primary/70 italic mt-10">
                "{vanDetail.van_listing.description}"
              </RichParagraph>
            </div>
          </div>
        </section>
      )}

      {/* BLOCKS SECTION */}
      {blocks.length > 0 && (
        <section className="py-24 max-w-5xl mx-auto px-6 space-y-24">
          {blocks
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((block, idx) => {
              if (!block) return null;
              return (
                <div key={idx} className="reveal-content">
                  {block.block_type === "heading" && block?.title && (
                    <div className="mb-8">
                      <Heading2 text={block?.title} className="text-primary" />
                      <div className="w-16 h-1 bg-hover mt-2 rounded-full"></div>
                    </div>
                  )}
                  {block.block_type === "paragraph" && block.content && (
                    <div className="bg-white p-10 rounded-lg shadow-sm border border-primary/5 leading-relaxed">
                      <RichParagraph>{block.content}</RichParagraph>
                    </div>
                  )}
                  {block.block_type === "list" &&
                    block.list_items?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.list_items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start p-5 bg-white rounded-lg border-l-4 border-hover shadow-sm"
                          >
                            <div className="text-primary mr-3 mt-1">
                              <SvgCheckmark />
                            </div>
                            <RichParagraph>{item.text}</RichParagraph>
                          </div>
                        ))}
                      </div>
                    )}
                  {block.block_type === "table" &&
                    block.table_data?.headers?.length > 0 && (
                      <div className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-lg">
                        <table className="w-full text-left font-body">
                          <thead className="bg-primary text-white uppercase">
                            <tr>
                              {block.table_data.headers.map((h, i) => (
                                <th key={i} className="px-8 py-5 font-black">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {block.table_data.rows?.map((row, ri) => (
                              <tr
                                key={ri}
                                className="hover:bg-[#F5F5F0] transition-colors"
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className="px-8 py-5 text-sm font-semibold text-primary"
                                  >
                                    {cell}
                                  </td>
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

      {/* FEATURES SECTION */}
      <section className="py-24 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <RichParagraph className="!text-hover uppercase font-bold !text-xs">
            Build Standards
          </RichParagraph>
          <Heading2
            text="Every Component Considered"
            className="text-secondary mt-4"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {vanDetail?.detailed_features
            ?.filter((f) => f.items?.length > 0)
            .map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="!text-hover mb-6 group-hover:scale-110 transition-transform">
                  {getFeatureIcon(feature.category)}
                </div>
                <Heading3
                  text={feature.category}
                  className="text-secondary py-4"
                />
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-secondary mr-2">•</span>
                      <RichParagraph className="text-secondary">
                        {item}
                      </RichParagraph>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      {/* MEDIA GALLERY */}
      {uniqueMedia.length > 0 && (
        <section className="py-24 px-4 bg-[#F5F5F0]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary">
              Media Gallery
            </h2>
            <div className="h-1 w-20 mx-auto mt-2 bg-primary"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto">
            {uniqueMedia.map((link, i) => (
              <div
                key={i}
                className={`w-full shadow-lg bg-white overflow-hidden border-2 border-primary rounded-[15px] ${link.includes("youtube") ? "max-w-[700px]" : "max-w-[350px]"}`}
              >
                <div
                  className="relative w-full"
                  style={{
                    paddingBottom: link.includes("youtube") ? "56.25%" : "140%",
                  }}
                >
                  <iframe
                    src={getEmbedUrl(link)}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
            {isFormOpen && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto">
                <div className="relative w-full max-w-2xl bg-white border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto pointer-events-auto">
                  {/* <button
                          onClick={() => setIsFormOpen(false)}
                          className="absolute top-5 right-5 text-primary z-30"
                        >
                          ✕
                        </button> */}
                  <button
                    onClick={() => setIsFormOpen(false)}
                    aria-label="Close form"
                    className="absolute top-5 right-5 z-30 text-primary cursor-pointer
                         transition-all duration-200
                         hover:text-hover hover:scale-110
                         active:scale-95"
                  >
                    ✕
                  </button>

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
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="py-24 bg-[#F5F5F0] text-center px-6 border-t border-primary/5">
        <div className="max-w-2xl mx-auto">
          <Heading2
            text="Build Your Legacy"
            className="font-bold mb-6 text-primary"
          />
          <RichParagraph className="mb-10 leading-relaxed italic">
            Limited build slots available for 2024. Connect with our design team
            to start your custom journey.
          </RichParagraph>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <SecondaryButton label="Book A Call" />
            <PrimaryButton label="View All Builds" link="/van-layouts" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VanPage;
