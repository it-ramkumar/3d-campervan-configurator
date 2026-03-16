"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { availableVans } from '../../../../api/van/availableVans';
import Loader from '../../Loader/Loader';
import { Link } from 'react-router-dom';
import { Heading2, Heading3,Heading4, RichParagraph, PrimaryButton, SecondaryButton, CustomLink } from '../../Common/Common';
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import 'swiper/css';

export default function Buy() {
  const [readyToGoVans, setReadyToGoVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const fetchReadyToGoVans = async () => {
      try {
        const response = await availableVans();
        setReadyToGoVans(response.data || []);
      } catch (error) {
        console.error("Error fetching vans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReadyToGoVans();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="bg-secondary py-20 antialiased overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* ── TOP HEADER: full-width, centered ── */}
        <div className="text-center mb-4">
          <RichParagraph className="text-hover font-bold !text-sm tracking-wider uppercase mb-3">
            Premium Builds
          </RichParagraph>
          <Heading2 text="Build or Buy Your Dream Van" />
        </div>

        {/* ── INFO CARDS ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { title: "Custom Builds", desc: "4-5 months lead time. Full 3D/CAD design control.", iconBg: "bg-primary" },
            { title: "Ready-To-Go", desc: "Skip the wait. In-stock units ready for adventure.", iconBg: "bg-hover" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-primary/5 flex gap-4 items-start">
              <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center text-secondary shrink-0 shadow-lg`}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <div>
                <Heading3 text={item.title}/>
                <RichParagraph className="mt-1">{item.desc}</RichParagraph>
              </div>
            </div>
          ))}

          {/* Quote card — 3rd column */}
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 flex items-center">

            <RichParagraph
            
            className="!italic !mb-0">
              "Our mission is to create highly functional, beautiful mobile spaces for the modern explorer."
            </RichParagraph>
          </div>
        </div>

        {/* ── SLIDER: full width, with nav in header row ── */}
        <div className="relative">

          {/* Slider top bar: label + arrows */}
          <div className="flex items-center justify-between mb-5 border-b border-primary/10 pb-4">
            <CustomLink
              to="/vans-for-sale"
              text={
                <span className="flex items-center gap-2">
                  Browse Full Inventory <span className="text-lg leading-none">→</span>
                </span>
              }
            />
            <div className="flex gap-2">
              <SecondaryButton
                label={<ArrowBigLeftDash />}
                onClick={() => swiper?.slidePrev()}
                className="!rounded-lg !px-3 !py-2"
              />
              <PrimaryButton
                label={<ArrowBigRightDash />}
                onClick={() => swiper?.slideNext()}
                className="!rounded-lg !px-3 !py-2"
              />
            </div>
          </div>

          <Swiper
            onSwiper={setSwiper}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {readyToGoVans?.map((van, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="bg-white rounded-lg overflow-hidden border border-primary/5 shadow-sm group h-full flex flex-col transition-all duration-500 hover:shadow-xl">

                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-primary/5">
                    {van?.gallery?.[0] ? (
                      <img
                        src={van.gallery[0]}
                        alt="Van"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/20">
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <Heading3
                      text={van?.van_listing?.title || "New Build"}

                      className="truncate block"
                    />
                    <RichParagraph className="mt-2 mb-6 line-clamp-2 h-12">
                      {van?.van_listing?.description || "High-end craftsmanship meeting rugged durability."}
                    </RichParagraph>

                    <div className="mt-auto flex gap-3">
                      <Link
                        to={`/van-detail/${van?.slug}`}
                        className="flex-1 py-3 bg-secondary text-primary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all duration-300 border border-primary/10"
                      >
                        Details
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 py-3 bg-primary text-secondary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-hover transition-all duration-300 shadow-lg shadow-primary/10"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}