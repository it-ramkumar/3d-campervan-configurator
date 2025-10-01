"use client";

import React, { useState, useEffect } from 'react';

import { FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ConsultationV() {
  const [date, setDate] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    // This effect can be used for any initial map setup if needed
  }, []);

  const handleZoomIn = () => {
    setMapZoom(prevZoom => Math.min(prevZoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setMapZoom(prevZoom => Math.max(prevZoom - 0.5, 1));
  };

  return (
    // --- REMOVED ALL BOTTOM PADDING HERE (pb-8 md:pb-16 changed to pb-0) ---
    <div className="bg-white min-h-screen pt-0 pb-0 px-4 md:px-24">
      <div className="flex flex-col items-center mb-12 md:mb-16">
        <h2 className="text-5xl font-bold font-serif text-black text-center mb-6 leading-tight">
          Ready to Buy Your Van for Sale?
        </h2>

        <div className="w-full max-w-4xl text-left font-serif text-xl text-black/70 leading-tight mb-10 px-4 mr-auto">
          <p className="font-semibold">Still have questions? We’re here to help:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Confused about cost? Book a FREE Consultation Call.</li>
            <li>Want to drive it first? Schedule a test drive.</li>
            <li>Have a question? Send us an Email.</li>
          </ul>
        </div>

        <h3 className="text-2xl md:text-[28px] font-semibold font-serif text-black text-center mb-3">
          Schedule a Free Consultation Call Today
        </h3>
        <p className="max-w-2xl text-black/70 font-serif text-lg md:text-xl text-center">
          Talk with our experts in Big Bear, California, about financing, test drives, and personalized upgrades.
        </p>
      </div>

      <div className="flex flex-col items-center mb-12 md:mb-16">
        <div className="w-full max-w-4xl bg-black rounded-[30px] p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between animate-fade-in-up transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-white p-4">

            <div className="relative w-28 h-28 mb-4 md:mb-8 -mt-4 lg:-mt-11" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
              <img
                src="/images/circlelogo.jpg"
                alt="Company Logo Background"
                width={112}
                height={112}
                className="rounded-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[1%] w-[200px] h-[70px]">
                <img
                  src="/images/logo-nw.png"
                  alt="Big Bear Vans Logo"
                  width={200}
                  height={70}
                  objectFit="contain"
                />
              </div>
            </div>

            <div className="text-white mt-12 md:mt-16 lg:mt-28">
              <h3 className="font-serif font-semibold text-xl md:text-2xl mb-2 text-center lg:text-left">
                Plan your Customvan Build!
              </h3>
              <p className="font-serif font-semibold text-sm md:text-lg leading-snug opacity-70 text-center lg:text-left">
                If you have more query, contact the host number below.<br />
                Host - +1 951-441-9748
              </p>
            </div>
          </div>
          <div className="hidden lg:block w-[3px] bg-white mx-8 rotate-0 self-stretch animate-line-grow"></div>
          <div className="w-full lg:w-1/2 flex flex-col items-center p-4 mt-8 lg:mt-0">
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-8 text-center">
              Select a Date & Time
            </h3>
            <div
              className="w-full h-full bg-[#EAFBFF40] rounded-[30px] p-4 md:p-8 flex flex-col items-center animate-slide-in-right hover:scale-[1.02] transition-transform duration-500"
              style={{
                backdropFilter: 'blur(15.7px)',
                boxShadow: '5px 8px 12.3px 0px rgba(0,0,0,0.25), -9px -8px 27.7px -4px rgba(0,0,0,0.25)'
              }}
            >
              <Calendar
                onChange={setDate}
                value={date}
                className="w-full text-black rounded-lg p-2 custom-calendar"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-0">
        <h2 className="text-[28px] font-semibold font-serif text-black text-center mb-8 md:mb-12 leading-tight">
            Prefer Email? Send us your questions, and we’ll get back to you ASAP!
        </h2>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-between items-start space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:flex-1 flex flex-col">
            <h3 className="font-serif font-semibold text-xl md:text-2xl text-black mb-4 md:mb-6">Get In Touch</h3>
            <form className="space-y-4 md:space-y-6 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 md:p-6 text-base md:text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD]"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 md:p-6 text-base md:text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD]"
                />
              </div>
              <div className="relative">
                <span className="absolute top-2 right-2 text-black opacity-75 text-xs md:text-sm font-sans">(Optional)</span>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full p-4 md:p-6 text-base md:text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD]"
                />
              </div>
              <div className="relative">
                <span className="absolute top-2 right-2 text-black opacity-75 text-xs md:text-sm font-sans">(Optional)</span>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-4 md:p-6 text-base md:text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD]"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-[550px] flex flex-col items-center lg:items-start">
            <div className="flex flex-col items-center w-full mb-8">
              <img src="/images/logoo.png" alt="Big Bear Vans Logo" width={242} height={44} className="mb-4" />
              <div className="flex space-x-4">
                <FaTwitter size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
                <FaYoutube size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
                <FaLinkedin size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
                <FaWhatsapp size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
                <FaInstagram size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
              </div>
            </div>
            <div className="relative w-full rounded-[20px] overflow-hidden group">
              <div className="absolute inset-0 z-10 p-4 md:p-8 flex items-start">
                <h3 className="font-serif font-bold text-2xl md:text-4xl text-black">MAP</h3>
              </div>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2842426992224!2d144.96316281531776!3d-37.81725067975175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b9af02e08b%3A0x6b2b62e4f0c4a45a!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619623049187!5m2!1sen!2sau?zoom=${mapZoom}`}
                width="100%"
                height="390"
                className="rounded-[20px] border-0 map-iframe transition-transform duration-300 transform group-hover:scale-110"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
                <button
                  onClick={handleZoomIn}
                  className="bg-white p-2 rounded-full shadow-lg text-black font-bold transition-transform duration-200 transform hover:scale-110"
                >
                  +
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-white p-2 rounded-full shadow-lg text-black font-bold transition-transform duration-200 transform hover:scale-110"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-8 md:mt-12 px-6 md:px-8 py-2 md:py-3 rounded-md bg-[#2761FD] text-white font-bold text-lg md:text-xl hover:bg-[#1a4ab9] transform hover:scale-105 transition-all duration-300">
          Submit
        </button>
      </div>
      <style jsx global>{`
        @import "tailwindcss";

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes lineGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-line-grow {
          animation: lineGrow 0.8s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        body {
          @apply antialiased;
        }

        @font-face {
          font-family: "Noto Serif";
          src: url("/fonts/NotoSerif-ExtraBold.woff2") format("woff2");
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Noto Serif";
          src: url("/fonts/NotoSerif-Regular.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: "Noto Sans";
          src: url("/fonts/NotoSans-Bold.woff2") format("woff2");
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @theme {
          --color-brand: #4F46E5;
          --color-blackish: #171a20;
          --color-whito: #fff;
          --color-accent: #f97316;
          --color-grarish: #5c5e62;
          --font-sans: "Noto Sans", system-ui, sans-serif;
          --font-serif: "Noto Serif", serif;
          --text-h1: 4rem;
          --font-weight-h1: 800;
          --text-h2: 3rem;
          --font-weight-h2: 600;
          --text-h3: 2rem;
          --font-weight-h3: 600;
          --text-body: 1.25rem;
          --font-weight-body: 400;
          --text-small: 0.875rem;
          --font-weight-small: 700;
        }

        .swiper-pagination-bullet {
          @apply w-3 h-3 bg-white opacity-50 rounded-full transition-all;
        }

        .swiper-pagination-bullet-active {
          @apply w-8 h-3 bg-white opacity-100 rounded-lg;
        }

        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .custom-calendar {
          border: none !important;
          background-color: transparent !important;
          font-family: 'serif';
        }

        .custom-calendar .react-calendar__navigation {
          background-color: transparent;
          margin-bottom: 0.5rem;
        }

        .custom-calendar .react-calendar__navigation__arrow,
        .custom-calendar .react-calendar__navigation__label {
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          background-color: transparent;
          transition: color 0.3s ease-in-out;
        }

        .custom-calendar .react-calendar__navigation__arrow:hover,
        .custom-calendar .react-calendar__navigation__label:hover {
          color: #2761FD;
        }

        .custom-calendar .react-calendar__month-view__weekdays {
          color: #FFFFFF;
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          justify-content: space-around;
        }

        .custom-calendar .react-calendar__month-view__weekdays__weekday {
            flex-grow: 1;
            text-align: center;
        }

        .custom-calendar .react-calendar__month-view__days {
            display: grid !important;
            grid-template-columns: repeat(7, 1fr) !important;
            grid-gap: 0.3rem !important;
        }

        .custom-calendar .react-calendar__tile {
          background-color: transparent;
          color: white;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.4rem;
          transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
          text-align: center;
        }

        .custom-calendar .react-calendar__tile:hover {
          background-color: #ffffff33;
          transform: scale(1.05);
        }

        .custom-calendar .react-calendar__tile--now {
          background-color: transparent !important;
          color: white !important;
        }

        .custom-calendar .react-calendar__tile--now:hover {
          background-color: #ffffff33 !important;
        }

        .custom-calendar .react-calendar__tile--active {
          background-color: #1a4ab9 !important;
          color: white !important;
          border-radius: 9999px !important;
        }

        .custom-calendar .react-calendar__tile--range,
        .custom-calendar .react-calendar__tile--rangeStart,
        .custom-calendar .react-calendar__tile--rangeEnd {
          background-color: #2761FD !important;
          color: white !important;
        }

        .custom-calendar .react-calendar__tile--disabled {
          background-color: transparent !important;
          color: rgba(255, 255, 255, 0.3) !important;
        }

        .custom-calendar .react-calendar {
          border: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}