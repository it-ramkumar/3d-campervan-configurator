"use client";

import React, { useState, useEffect } from 'react';
import { FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './Consultationlayout.css'; // Import the external CSS file

export default function ConsultationPage() {
  const [date, setDate] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {}, []);

  const handleZoomIn = () => {
    setMapZoom(prevZoom => Math.min(prevZoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setMapZoom(prevZoom => Math.max(prevZoom - 0.5, 1));
  };

  return (
    <div className="bg-white min-h-screen pt-0 pb-5 px-4 md:px-24">
      {/* ... (The top part of your component remains unchanged) ... */}
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
          {/* ... (The black card with calendar remains unchanged) ... */}
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
                  style={{ objectFit: 'contain' }}
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
              {/* ... (form inputs remain unchanged) ... */}
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

            {/* CHANGED: Mobile button width reduced and centered */}
            <button className="mt-8 w-auto self-center px-8 py-3 rounded-md bg-[#2761FD] text-white font-bold text-lg hover:bg-[#1a4ab9] transform hover:scale-105 transition-all duration-300 lg:hidden">
              Submit
            </button>

          </div>

          <div className="w-full lg:w-[550px] flex flex-col items-center lg:items-start">
            {/* ... (Social Icons and Map remain unchanged) ... */}
            <div className="flex flex-col items-center w-full mb-8">
                <img src="/images/logoo.png" alt="Big Bear Vans Logo" width={242} height={44} className="mb-4" />
                <div className="flex space-x-4">
                   <Link to="https://x.com/bigbearvans_" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaTwitter size={30} className="" />
                   </Link>
                   <Link to="https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaYoutube size={30} className="" />
                   </Link>
                   <Link to="https://www.linkedin.com/company/big-bear-vans" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaLinkedin size={30} className="" />
                   </Link>
                   {/* <Link to="#" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaWhatsapp size={30} className="text-black" />
                   </Link> */}
                   <Link to="https://www.instagram.com/bigbearvans/?hl=en" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaInstagram size={30} className="" />
                   </Link>
                </div>
              </div>
              <div className="relative w-full rounded-[20px] overflow-hidden group">
                <div className="absolute inset-0 z-10 p-4 md:p-8 flex items-start">

                </div>
                <iframe
                  src={`https://maps.google.com/maps?q=Big+Bear,+California&z=${mapZoom}&output=embed`}
                  width="100%"
                  height="380"
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

        {/* Desktop submit button (unchanged) */}
        <button className="hidden lg:block mt-8 md:mt-12 px-6 md:px-8 py-2 md:py-3 rounded-md bg-[#2761FD] text-white font-bold text-lg md:text-xl hover:bg-[#1a4ab9] transform hover:scale-105 transition-all duration-300">
          Submit
        </button>
      </div>
    </div>
  );
}