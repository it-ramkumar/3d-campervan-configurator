"use client";

import React, { useState } from 'react';

import { FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp, FaInstagram, FaCopy } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ConsultationC() {
  const [date, setDate] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async (textToCopy, type) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed');
        setTimeout(() => setCopySuccess(''), 2000);
    }
  };


  return (
    <div className="bg-white min-h-screen py-8 px-4 md:py-16 md:px-24">
      {/* --- Section 1: Consultation Scheduler --- */}
      <div className="flex flex-col items-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-black text-center mb-4">
          Schedule a FREE Consultation Call
        </h2>
        <p className="font-serif text-lg md:text-xl text-black opacity-70 text-center max-w-3xl mb-8 md:mb-12">
          Book a FREE consultation call now. We’re here to answer all your questions about our vans for sale, custom vans, campervan layouts (pre-built), or van accessories.
        </p>
        <div className="w-full max-w-4xl bg-black rounded-[30px] p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between animate-fade-in-up transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-white p-4">
            {/* MODIFICATION: One more nudge down, from -mt-8 to -mt-6 */}
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
                  style={{ objectFit: "contain" }}
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

       {/* Other sections are unchanged... */}
       <div className="flex flex-col items-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-black text-center mb-4">
          Contact Us For a Custom Quote
        </h2>
        <p className="font-serif text-lg md:text-xl text-black opacity-70 text-center max-w-4xl mb-8 md:mb-12">
          Prefer to get started with email? Fill out the form below to receive a custom quote for your Sprinter van conversion or Ford Transit build.
          <br />
          Our team will respond promptly to discuss pricing, financing, our availability, and address any questions you may have about our campervan building process.
        </p>
        <div className="w-full max-w-4xl">
          <h3 className="font-serif font-semibold text-xl md:text-2xl text-black mb-4 md:mb-6">Get In Touch</h3>
          <form className="space-y-6 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-6 text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD] h-20"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-6 text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD] h-20"
            />
            <div className="relative">
              <span className="absolute top-2 right-2 text-black opacity-75 text-sm font-sans">(Optional)</span>
              <input
                type="tel"
                placeholder="Your Phone Number"
                className="w-full p-6 text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD] h-20"
              />
            </div>
            <div className="relative">
              <span className="absolute top-2 right-2 text-black opacity-75 text-sm font-sans">(Optional)</span>
              <textarea
                placeholder="Your Message"
                className="w-full p-6 text-lg rounded-xl bg-[#CFCFCF] placeholder:text-black placeholder:opacity-75 font-sans text-black opacity-75 focus:outline-none focus:ring-2 focus:ring-[#2761FD] h-[220px] resize-none"
              ></textarea>
            </div>
          </form>
          <div className="w-full flex justify-center mt-8 md:mt-12">
            <button className="px-6 py-3 rounded-md bg-[#2761FD] text-white font-sans font-bold text-sm hover:bg-[#1a4ab9] transform hover:scale-105 transition-all duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-black mb-4">
          Our Van Conversion Shop in Big Bear City
        </h2>
        <p className="font-serif text-lg md:text-xl text-black opacity-70 max-w-4xl mb-8">
          Visit our van conversion shop right here in Big Bear City, CA. We serve clients from all over California and the USA, and we welcome you to stop by to discuss your dream camper van build.
        </p>
        <div className="font-serif text-lg md:text-xl text-black space-y-3 relative">
            <p>
                <a href="https://www.google.com/maps/place/Big+Bear+Vans/@34.2608325,-116.8526491,17z/data=!4m6!3m5!1s0x80c4b5b94f396ad3:0xaad9ce8a9f148bf!8m2!3d34.2607783!4d-116.8496969!16s%2Fg%2F11q9rn15c6?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D...keep" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2761FD]">
                320 W Big Bear Blvd, Big Bear City, California, 92314, USA
                </a>
            </p>
            <div className="flex items-center justify-center gap-2">
                <a href="tel:+19514419719" className="hover:text-[#2761FD]">Office: +1 (951) 441-9719</a>
                <FaCopy onClick={() => handleCopy('+19514419719', 'Phone')} className="cursor-pointer hover:text-[#2761FD]" />
                {copySuccess === 'Phone' && <span className="text-sm text-green-500 absolute -right-20">Copied!</span>}
            </div>
            <p>Monday - Saturday: 9 AM - 6 PM</p>
            <p>Sunday: Appointments only</p>
            <div className="flex items-center justify-center gap-2">
                <a href="mailto:bigbearvans@gmail.com" className="underline hover:text-[#2761FD]">
                bigbearvans@gmail.com
                </a>
                  <FaCopy onClick={() => handleCopy('bigbearvans@gmail.com', 'Email')} className="cursor-pointer hover:text-[#2761FD]" />
                  {copySuccess === 'Email' && <span className="text-sm text-green-500 absolute -right-20">Copied!</span>}
            </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-12 md:mb-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.897378332152!2d-116.85108868478229!3d34.25265498057969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c4b5f0d3683229%3A0x5a2d6739a4b5952b!2s320%20W%20Big%20Bear%20Blvd%2C%20Big%20Bear%20City%2C%20CA%2092314%2C%20USA!5e0!3m2!1sen!2s!4v1668615335193!5m2!1sen!2s"
            width="100%"
            className="border-0 rounded-[30px] max-w-7xl h-[400px] md:h-[650px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-sans font-bold text-2xl md:text-3xl text-black mb-6">
          Follow Us
        </h3>
        <div className="flex space-x-4 md:space-x-8">
            <FaTwitter className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300 h-8 w-8 md:h-12 md:w-12" />
            <FaYoutube className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300 h-8 w-8 md:h-12 md:w-12" />
            <FaLinkedin className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300 h-8 w-8 md:h-12 md:w-12" />
            <FaWhatsapp className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300 h-8 w-8 md:h-12 md:w-12" />
            <FaInstagram className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300 h-8 w-8 md:h-12 md:w-12" />
        </div>
      </div>


      <style jsx global>{`
        /* --- Styles are unchanged --- */
        @import "tailwindcss";

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
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
        .custom-calendar .react-calendar__tile--disabled {
          background-color: transparent !important;
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </div>
  );
}