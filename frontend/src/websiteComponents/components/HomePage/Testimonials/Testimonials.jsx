"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const reviews = [
  {
    id: 1,
    name: "Danora Ramsey",
    text: "Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. I went to about three different conversion companies, and I was only given certain planned layouts and certain colours. Not at Big Bear Vans, they accommodated my every wish. They are also extremely knowledgeable. I came back for a couple of upgrades, and they gladly accommodated me. I highly suggest Big Bear Vans for your conversion!",
    rating: 5,
  },
  {
    id: 2,
    name: "Erik Christy",
    text: "Big Bear Vans built an amazing custom campervan for me. They have a really nice team to work with, and I was able to really work closely with them on getting exactly what I wanted in my design. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. I've gotten so many compliments on my buildout and couldn't be happier with how it turned out. Highly recommend Big Bear Vans if you're looking to buy a camper van.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aleksandr Penkin",
    text: "They built my Sprinter camper van. These guys did amazing work! I'm so in love with my van, and for sure I'll recommend it to everyone! I only used to come once, as I accidentally broke my Maxx Air fan, and they replaced it for me. Thanks to these amazing builders. I will come soon as they move to the new shop!",
    rating: 5,
  },
  {
    id: 4,
    name: "Cathy & Ben",
    text: "We love our camper van. We probably looked at 10 or 12 different kinds of Sprinter layouts and couldn't find exactly what we wanted till we found Big Bear Vans. One of the big reasons why we decided to go with a van was that we have four dogs, and it's a challenge to find something for your dog to sit on when you want to go on a trip. But these people make it possible for us to go on vacation with our dogs.",
    rating: 5,
  },
  {
    id: 5,
    name: "Owners of Lake Tahoe Van",
    text: "I think why we ended up going with Big Bear Vans was because these people had the design layout that we wanted for a family, and they're family-focused. They did a wonderful job bringing our ideas to fruition.",
    rating: 5,
  },
  {
    id: 6,
    name: "Owners of Vermont Van",
    text: "We love it. It works great. We love the storage and how open everything is. And it just feels so homey. We did do a lot of looking around and searching, and Big Bear Vans just seemed to be the ones that really adapted to more than two travellers.",
    rating: 5,
  },
];

// Star rating component
const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  ));

// Copy icon SVG
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-transform duration-200 hover:scale-110"
  >
    <path d="M7.5 4.5V19.5H19.5V4.5H7.5ZM6 3H21V21H6V3ZM4.5 6H3V22.5H18V24H3C2.17 24 1.5 23.33 1.5 22.5V6H4.5Z" />
  </svg>
);

export default function Testimonials() {
  const vanBgImageUrl = "/images/review.jpg";
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);

  const openModal = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (selectedReview?.text) {
      navigator.clipboard.writeText(selectedReview.text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
      });
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalOpen]);

  return (
    <section className="w-full  bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight font-serif">
            See Why Our Customers Love Us
          </h2>
        </div>

  <Swiper
  effect={'coverflow'}
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={'auto'}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: false,
  }}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
    pauseOnMouseEnter: true,
  }}
  speed={5000}
  modules={[EffectCoverflow, Autoplay]}
  className="w-full"
>
  {reviews.map((review) => {
    const isExpanded = expandedReview === review.id;
    const shortText = review.text.slice(0, 120); // jitna text chhota dikhana hai

    return (
      <SwiperSlide
        key={review.id}
        className="!w-[300px] sm:!w-[400px] !h-[300px] sm:!h-[400px] transition-all duration-1000 ease-out"
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden group transform transition-transform duration-700 hover:scale-105 cursor-pointer"
          onClick={() => openModal(review)}
        >
          {/* Background Image */}
          <img
            src={vanBgImageUrl}
            alt="Van Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#000000a6] transition-opacity duration-300 group-hover:bg-[#000000b9]"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8 space-y-4 transition-transform duration-300 group-hover:scale-105">
            <h3 className="font-serif font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl leading-tight">
              {review.name}
            </h3>

            <div className="flex gap-1 text-[#FFEF5E]">
              {renderStars(review.rating)}
            </div>

            <p className="font-serif text-sm sm:text-base font-normal max-w-xl">
              {isExpanded ? review.text : shortText}
              {review.text.length > 120 && (
                <button
                  className="ml-2 text-yellow-400 underline text-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // modal open na ho click pe
                  openModal(review)
                  }}
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </p>
          </div>
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>
      </div>

      {modalOpen && selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModal}
        >
          <div
            className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-3xl w-full mx-4 shadow-2xl overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Copy icon */}
            <div className="absolute top-4 left-4" onClick={handleCopy}>
              <CopyIcon />
              {isCopied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-white bg-green-500 rounded px-2 py-1 transition-opacity duration-300 animate-slide-up-fade">
                  Copied!
                </span>
              )}
            </div>

            {/* Modal content */}
            <div className="flex flex-col items-center text-center space-y-6">
              <h3 className="font-serif font-bold text-4xl text-white">
                {selectedReview.name}
              </h3>
              <div className="flex gap-1 text-[#FFEF5E]">
                {renderStars(selectedReview.rating)}
              </div>
              <p className="font-serif text-base text-gray-300">
                {selectedReview.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for smooth overlapping transitions and animations */}
      <style>{`
        .swiper-slide {
          transition: transform 0.7s ease-out, opacity 0.7s ease-out;
        }

        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.7;
          transform: scale(0.85);
        }

        .swiper-slide-prev {
          transform: scale(0.85) translateX(20px) !important;
        }

        .swiper-slide-next {
          transform: scale(0.85) translateX(-20px) !important;
        }

        .swiper-slide-active {
          z-index: 10;
          transform: scale(1) !important;
          opacity: 1;
        }

        .review-slider {
          padding: 50px 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slide-up-fade {
          animation: slideUpFade 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}