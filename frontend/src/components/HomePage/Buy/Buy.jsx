"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import {
  Heading2,
  Heading3,
  RichParagraph,
  PrimaryButton,
  SecondaryButton,
  CustomLink,
} from "../../Common/Common";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import "swiper/css";
import Image from "next/image";
import ContactForm from "@/components/Consultation/ContactForm";
import { contact } from "../../../api/contact/contact";

export default function Buy({ initialVans = [] }) {
  const [swiper, setSwiper] = useState(null);
  const [data,setData] = useState([])
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
    if (
      !data.name?.trim() ||
      !data.email?.trim() ||
      !data.phone?.trim()
    ) {
      return;
    }

    setLoading(true);

    console.log("Received data:", data);

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

  return (
    <section className="bg-secondary py-20 antialiased overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- Header Section --- */}
        <div className="text-center mb-4">
          <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase mb-3">
            Premium Builds
          </RichParagraph>
          <Heading2 text="Premium Camper Vans Ready for Adventure" />
          <RichParagraph className="mt-4 max-w-3xl mx-auto">
            Fully built premium camper vans available now — skip the wait and
            start your adventure today.
          </RichParagraph>
        </div>

        {/* --- Slider Section --- */}
        <div className="relative ml-12 md:ml-18">
          <div className="flex items-center justify-between mb-5 border-b border-primary/10 pb-4">
            <CustomLink
              href="/camper-vans-for-sale"
              text={
                <span className="flex items-center gap-2">
                  Browse Full Inventory{" "}
                  <span className="text-lg leading-none">→</span>
                </span>
              }
            />
            <div className="flex gap-2">
              <SecondaryButton
                label={<ArrowBigLeftDash />}
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous slide"
                className=" !px-3 !py-2"
              />
              <PrimaryButton
                label={<ArrowBigRightDash />}
                onClick={() => swiper?.slideNext()}
                aria-label="Next slide"
                className=" !px-3 !py-2"
              />
            </div>
          </div>

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
                  <div className="bg-white rounded-lg overflow-hidden border border-primary/5 shadow-sm group h-full flex flex-col transition-all duration-500 hover:shadow-xl">
                    {/* Image Container */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-primary/5">
                      {/* --- Available for Sale Tag --- */}
                      <div className="absolute top-4 left-4 z-10 bg-primary/90 border border-white/10 backdrop-blur-sm text-hover text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded shadow-md pointer-events-none transition-transform duration-300 group-hover:scale-105">
                        Available for Sale
                      </div>

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
                      <RichParagraph className="mt-2 mb-6 line-clamp-2 h-12">
                        {van?.subtitle ||
                          "High-end craftsmanship meeting rugged durability."}
                      </RichParagraph>

                      <div className="mt-auto flex gap-3">
                        <Link
                          href={`/van-detail/${van?.slug}`}
                          className="flex-1 py-3 bg-secondary text-primary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all duration-300 border border-primary/10"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => {  setIsFormOpen(true); setData(van)}}
                          className="flex-1 py-3 bg-primary text-secondary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-hover transition-all duration-300 shadow-lg shadow-primary/10"
                        >
                          Get This Build
                        </button>
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
      </div>
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
    </section>
  );
}
