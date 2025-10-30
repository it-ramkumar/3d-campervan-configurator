"use client";
import React from "react";

// --- SVG Icons ---
const WalkthroughIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 flex-shrink-0 transition-colors duration-300 group-hover:text-black" fill="currentColor">
    <path fillOpacity=".3" d="M12 3L4 9v12h16V9l-8-6zm-2.25 8.5H7.5v-2h2.25v2zm0 4.5H7.5v-2h2.25v2zm4.5 0h-2.25v-2h2.25v2zm0-4.5h-2.25v-2h2.25v2z"/>
    <path d="M10 10.5h2v2h-2zM10 15h2v2h-2zM14.5 10.5h2v2h-2zM14.5 15h2v2h-2z"/>
  </svg>
);

const MaterialsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 flex-shrink-0 transition-colors duration-300 group-hover:text-black" fill="currentColor">
    <path fillOpacity=".3" d="M17.5 2.5c-2.48 0-4.5 2.02-4.5 4.5 0 .88.26 1.69.72 2.39L4 19.13V22h2.87l9.75-9.75c.7.46 1.51.72 2.38.72 2.48 0 4.5-2.02 4.5-4.5S19.98 2.5 17.5 2.5zM7 20H5v-2h2v2z"/>
    <path d="M17.5 4C18.88 4 20 5.12 20 6.5s-1.12 2.5-2.5 2.5S15 7.88 15 6.5 16.12 4 17.5 4z"/>
  </svg>
);

const TeamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 flex-shrink-0 transition-colors duration-300 group-hover:text-black" fill="currentColor">
    <path fillOpacity=".3" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    <path d="M8 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm8 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-8 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

export default function ShowroomAndTours() {
  return (
    <div className="bg-slate-50 text-blackish font-sans">

      {/* --- HERO / SHOWROOM SECTION --- */}
      <section className="relative w-full h-[250px] overflow-hidden group">
        <img
          src="/images/virtuaal1.webp"
          alt="Big Bear Lake and mountains"
          className="absolute inset-0 w-full h-full object-cover origin-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center h-full p-6 text-center">
          <p className="text-white text-xl md:text-xl font-serif font-medium max-w-4xl leading-relaxed animate-fadeInUp [text-shadow:0px_2px_10px_rgba(0,0,0,0.5)]">
            Visiting our showroom isn’t just about vans. Big Bear itself is a destination worth the trip. Surrounded by mountains, a beautiful lake, and two ski resorts, you’ll enjoy your time here as much as your visit with us.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-6 text-slate-900 animate-fadeInUp">
          Virtual Tours For Distant Clients
        </h2>

        <p className="text-xl md:text-xl font-serif text-slate-700 text-center max-w-4xl mx-auto mb-16 px-4 animate-fadeInUp delay-200">
          If you’re out of State, no problem. We’ll bring the showroom to you.
          Jump on a video call with us via FaceTime or Zoom. We’ll give you a
          full virtual tour of our workshop, just like you’re here in person.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Image */}
          <div className="w-full md:w-7/12 lg:w-1/2 group relative animate-fadeInUp">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-slate-400 to-slate-700 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative aspect-[700/500] bg-gray-200 overflow-hidden rounded-xl border-2 border-slate-800/80 shadow-2xl">
              <img
                src="/images/virtuaal2.webp"
                alt="Laptop showing virtual tour"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-5/12 lg:w-1/2 text-lg font-serif text-slate-700 space-y-6 animate-fadeInUp delay-300">
            <p>Via Zoom calls, you’ll be able to:</p>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="group relative rounded-xl p-5 backdrop-blur-lg bg-white/60 hover:bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-slate-400 rounded-l-xl transition-all duration-300 group-hover:bg-black"></div>
                <div className="flex items-center gap-x-5 pl-4">
                  <div className="bg-slate-200/70 p-2 rounded-full transition-colors duration-300 group-hover:bg-slate-200">
                    <WalkthroughIcon />
                  </div>
                  <p className="font-semibold text-slate-900">
                    Walk through our finished builds and ongoing projects.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group relative rounded-xl p-5 backdrop-blur-lg bg-white/60 hover:bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-slate-400 rounded-l-xl transition-all duration-300 group-hover:bg-black"></div>
                <div className="flex items-center gap-x-5 pl-4">
                  <div className="bg-slate-200/70 p-2 rounded-full transition-colors duration-300 group-hover:bg-slate-200">
                    <MaterialsIcon />
                  </div>
                  <p className="font-semibold text-slate-900">
                    See materials, layouts, and design options up close.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="group relative rounded-xl p-5 backdrop-blur-lg bg-white/60 hover:bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-slate-400 rounded-l-xl transition-all duration-300 group-hover:bg-black"></div>
                <div className="flex items-center gap-x-5 pl-4">
                  <div className="bg-slate-200/70 p-2 rounded-full transition-colors duration-300 group-hover:bg-slate-200">
                    <TeamIcon />
                  </div>
                  <p className="font-semibold text-slate-900">
                    Meet with our project manager, engineering, and design teams.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Many of our clients complete the entire design process virtually
              and only visit once to pick up their finished van.
            </p>

            <p>
              Whether you meet us in person or online, you’ll get the same
              hands-on design experience and access to our team.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
