"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import {
  Heading2,
  Heading3,
  RichParagraph,
  PrimaryButton,
  CustomLink,
  WatermarkText,
  SecondaryButton,
} from "../../Common/Common";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import "swiper/css";
import Image from "next/image";
import ContactForm from "@/components/Consultation/ContactForm";
import { contact } from "../../../api/contact/contact";

export default function Buy({ initialVans = [] }) {
  const [swiper, setSwiper] = useState(null);
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim()) return;
      setLoading(true);
      console.log("Received data:", data);
      await contact(data);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
// console.log(initialVans,"vam")
  return (
    <section className=" py-20 antialiased overflow-hidden relative rounded-2xl mx-4 md:mx-8">

      {/* Ghost background text */}
      <div className="absolute right-4 -top-90 inset-y-0 flex items-center pointer-events-none select-none overflow-hidden">
        <span className="text-[220px] font-black text-primary/[0.025] leading-none pr-4">VANS</span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <WatermarkText className="w-8 h-px bg-hover" />
            <WatermarkText text={"Premium Builds"}/>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Heading2
              textColor="text-primary"
            >
              Premium Camper Vans<br />
              <span className="text-hover">Ready for Adventure</span>
            </Heading2>
            <RichParagraph className="max-w-xs md:text-right flex-shrink-0">
              Fully built premium camper vans available now — skip the wait and
              start your adventure today.
            </RichParagraph>
          </div>
        </div>

        {/* ── CONTROLS BAR ── */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-5">
          <CustomLink
            href="/camper-vans-for-sale"
            text={<>
                Browse Full Inventory
                <span className="text-base leading-none">→</span>
            </>
            }
          />
          <div className="flex gap-2">
            <button
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-secondary/60 hover:border-hover hover:text-hover transition-all"
            >
              <ArrowBigLeftDash size={18} />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              aria-label="Next slide"
              className="w-10 h-10 rounded-lg bg-hover flex items-center justify-center text-white hover:bg-hover/80 transition-all"
            >
              <ArrowBigRightDash size={18} />
            </button>
          </div>
        </div>

        {/* ── SWIPER ── */}
      <Swiper
  onSwiper={setSwiper}
  spaceBetween={16}
  slidesPerView={1.1}
  breakpoints={{
    640: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.2 },
    1280: { slidesPerView: 3.2 },
  }}
  className="!overflow-visible"
>
  {initialVans
    .filter(
      (van) =>
        van?.title !== "Santa Monica White" &&
        van?.title !== "Ford Transit T-350 2026..",
    )
    .map((van, i) => (
      <SwiperSlide key={i} className="h-auto">
        <div className="bg-secondary rounded-lg overflow-hidden group h-full flex flex-col transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1">

          {/* Image */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-primary/10">
          <WatermarkText text={"Available for Sale"} className="absolute top-4 left-4 z-10 bg-hover text-white  px-3 py-1.5 rounded-lg pointer-events-none "/>
            
            {van?.image ? (
              <Image
                src={van.image}
                alt={van?.title || "Van"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={800}
                height={600}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/20 italic text-xs">
                Coming Soon
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <Heading3
              text={van?.title || "New Build"}
              className="truncate block"
            />
            <RichParagraph className="mt-2 mb-4 line-clamp-2 h-12">
              {van?.subtitle || "High-end craftsmanship meeting rugged durability."}
            </RichParagraph>

            {/* Price Tag Segment */}
            <div className="mb-6 flex items-baseline gap-1">
              {van?.price ? (
                <>
                  <WatermarkText text={"From"} className="font-semibold text-primary/60 uppercase tracking-wider" />
                  <WatermarkText text={typeof van?.price === 'number'
                      ? `$${van?.price.toLocaleString()}`
                      : van?.price} className="text-xl font-extrabold text-primary tracking-tight"/>
                </>
              ) : (
                <WatermarkText text={"Pricing upon request"} className="text-primary/40 italic"/>


              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <SecondaryButton label={"Details"} link={`/van-detail/${van?.slug}`} className="w-full !px-4"/>
          <PrimaryButton label={"Get This Build"} onClick={() => { setIsFormOpen(true); setData(van); }} className="w-full !px-4"/>

            </div>
            {van?.slug && (
              <PrimaryButton
                label="Explore in 3D"
                link={`/camper-vans-for-sale/${van.slug}/configure`}
                className="w-full mt-4"
              />
            )}
          </div>
        </div>
      </SwiperSlide>
    ))}
</Swiper>
      </div>

      {/* ── MODAL ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto">
          <div className="relative w-full max-w-2xl bg-white border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto pointer-events-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
              className="absolute top-5 right-5 z-30 text-primary cursor-pointer transition-all duration-200 hover:text-hover hover:scale-110 active:scale-95"
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
    </section>
  );
}
