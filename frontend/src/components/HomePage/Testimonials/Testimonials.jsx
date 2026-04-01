"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, X, Copy, Check } from 'lucide-react';
import { Heading2, RichParagraph, Heading3 } from '../../Common/Common'
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  { id: 1, name: "Danora Ramsey", text: "Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. They accommodated my every wish. Highly suggest Big Bear Vans!", rating: 5, initial: "DR" },
  { id: 2, name: "Erik Christy", text: "Big Bear Vans built an amazing custom campervan for me. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. Highly recommend Big Bear Vans!", rating: 5, initial: "EC" },
  { id: 3, name: "Aleksandr Penkin", text: "They built my Sprinter camper van. These guys did amazing work! I'm so in love with my van, and for sure I'll recommend it to everyone! Thanks to these amazing builders.", rating: 5, initial: "AP" },
  { id: 4, name: "Cathy & Ben", text: "We probably looked at 10 or 12 different kinds of Sprinter layouts and couldn't find exactly what we wanted till we found Big Bear Vans. They made it possible for us to go on vacation with our four dogs.", rating: 5, initial: "CB" },
  { id: 5, name: "Lake Tahoe Owners", text: "We ended up going with Big Bear Vans because they had the design layout that we wanted for a family, and they're family-focused. They did a wonderful job bringing our ideas to fruition.", rating: 5, initial: "LT" },
  { id: 6, name: "Vermont Van Owners", text: "We love it. It works great. We love the storage and how open everything is. Big Bear Vans just seemed to be the ones that really adapted to more than two travellers.", rating: 5, initial: "VV" },
];

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const openModal = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsCopied(false);
  };

const handleCopy = (e) => {
  e.stopPropagation();
  // Safe access check
  if (!selectedReview?.text) return;

  navigator.clipboard.writeText(selectedReview.text).then(() => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  });
};
  return (
    <section className="w-full py-20 bg-secondary overflow-hidden antialiased">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- Header --- */}
        <div className="text-center mb-16 md:mb-24">
          <RichParagraph className="!text-hover uppercase font-bold !text-sm tracking-wider mb-4">Testimonials</RichParagraph>
          <Heading2 text={"Voices of the Van Life"} />
          <div className="w-20 h-1.5 bg-hover mx-auto rounded-lg mt-6"></div>
        </div>

        {/* --- Swiper Section --- */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          centeredSlides={false}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-16"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                onClick={() => openModal(review)}
                className="group relative bg-white p-8 md:p-10 rounded-lg border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col"
              >
                {/* Quote Icon Decoration */}
                <div className="absolute top-8 right-8 text-primary/5 group-hover:!text-hover/20 transition-colors">
                  <Quote size={40} fill="currentColor" />
                </div>

                {/* Stars */}
                <div className="flex gap-sm !text-hover mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <RichParagraph className="mb-8 flex-grow italic">
                  "{review?.text.length > 140 ? review?.text.substring(0, 140) + '...' : review?.text}"
                </RichParagraph>

                {/* User Info */}
                <div className="flex items-center gap-[var(--gap-sm)] border-t border-primary/5 pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-secondary font-black text-xs tracking-tighter shadow-md shadow-primary/10">
                    {review?.initial}
                  </div>
                  <div>
                    <RichParagraph className="font-bold text-primary">{review?.name}</RichParagraph>
                    <RichParagraph className='!text-hover'>Verified Owner</RichParagraph>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

{/* --- Modal --- */}
{modalOpen && selectedReview && ( // 'selectedReview' ka check bhi yahan laga dein
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-in fade-in duration-300">
    <div
      className="bg-white rounded-lg p-8 md:p-12 max-w-2xl w-full relative shadow-2xl animate-in zoom-in-95 duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
        <X size={24} />
      </button>

      <div className="flex flex-col items-center text-center">
        {/* Yahan Optional Chaining '?' lagayein */}
        <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-secondary font-black text-xl mb-6 shadow-lg shadow-primary/20">
          {selectedReview?.initial}
        </div>

        <Heading3 text={selectedReview?.name} className="mb-2 text-primary" />

        <div className="flex gap-[var(--gap-sm)] !text-hover mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <RichParagraph className="leading-relaxed italic mb-10">
          "{selectedReview?.text}"
        </RichParagraph>

        <button
          onClick={handleCopy}
          className="flex items-center gap-sm text-xs font-black uppercase tracking-widest text-primary/40 hover:!text-hover transition-colors"
        >
          {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {isCopied ? "Review Copied" : "Copy Feedback"}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Custom Styles for Swiper Pagination dots */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #ED985F !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
}