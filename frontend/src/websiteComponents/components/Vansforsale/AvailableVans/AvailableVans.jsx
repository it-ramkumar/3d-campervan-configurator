"use client";
import { useRef } from 'react';
import { Link } from "react-router-dom"
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import BlackButton from '../../Common/Button/BlackButton';
import Heading2 from '../../Common/Headings/Heading2';
import Heading3 from '../../Common/Headings/Heading3';
import RichParagraph from '../../Common/Paragraph/RichParagraph';
import WhiteButton from "../../Common/Button/WhiteButton"

// --- Icons remain same ---
const PowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
const BathroomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18M3 7.5h18M4.5 12H6m13.5 0h-1.5M4.5 16.5h15" />
  </svg>
);
const KitchenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
const VanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-14 md:w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 16.5a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM17.625 16.5a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 17.25h17.25c.621 0 1.125-.504 1.125-1.125V9.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v6.375c0 .621.504 1.125 1.125 1.125zM9 8.625V6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 12h17.25" />
  </svg>
);

const FEATURES = [
  { text: "Exceptional off-grid power", icon: <PowerIcon />, textFirst: true },
  { text: "Fully-equipped bathroom with hot water", icon: <BathroomIcon />, textFirst: true },
  { text: "Kitchen with microwave & refrigerator", icon: <KitchenIcon />, textFirst: false },
  { text: "Space-saving elevator & dinette bed", icon: <BedIcon />, textFirst: false },
];

// --- New Upcoming Data ---
const UPCOMING_VANS = [
  { name: "Lowroof Poptop", desc: "Compact versatility meets rooftop comfort." },
  { name: "Montreal AWD 170", desc: "Stone Gray powerhouse for rugged terrains." },
  { name: "Santa Monica (Matte Gray)", desc: "Ford Transit build with premium sleek finish." },
  { name: "Santa Monica Edition", desc: "Another Ford Transit masterpiece in production." },
  { name: "Ford Transit Demo Van", desc: "Featuring our signature double bed layout." },
];

export default function AvailableVans({ availableVans }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresSectionRef = useRef(null);
  const featureItemsRef = useRef([]);
  const centralIconRef = useRef(null);
  const circularPathRef = useRef(null);

  return (
    <>
      <section ref={sectionRef} className="bg-white overflow-hidden mt-10 md:mt-24">
        <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-6 px-4 md:px-8 lg:px-16">
          <Heading2 text='In-Stock & Ready to Roll Vans For Sale' />
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto text-black md:mb-20 px-4 md:px-8 lg:px-16 ">
          <RichParagraph>At Big Bear Vans, our Class BRVs for sale are truly turn-key solutions. Each van has premium features, including:</RichParagraph>

          <div ref={featuresSectionRef} className="relative flex justify-center items-center my-8 md:my-12 h-60 md:h-72">
            <div className="gradient-glow absolute w-56 h-56 md:w-64 md:h-64 rounded-full"></div>
            <svg ref={circularPathRef} className="circular-path absolute w-56 h-56 md:w-64 md:h-64 cursor-pointer" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b7280" />
                  <stop offset="50%" stopColor="#4b5563" />
                  <stop offset="100%" stopColor="#374151" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#pathGradient)" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.8" />
            </svg>
            {/* Connection lines and Icons logic remains same as your original */}
            <div ref={centralIconRef} className="central-icon floating absolute flex justify-center items-center w-20 h-20 md:w-24 md:h-24 bg-gray-800 rounded-full shadow-lg border border-gray-700">
              <VanIcon />
            </div>

            {/* Feature Mapping (Simplified for brevity, same as yours) */}
            {FEATURES.map((f, i) => (
              <div key={i} ref={el => featureItemsRef.current[i] = el} className={`feature-item absolute flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group ${i === 0 ? '-translate-x-28 -translate-y-20 md:-translate-x-32 md:-translate-y-24' : i === 1 ? 'translate-x-28 -translate-y-20 md:translate-x-32 md:-translate-y-24' : i === 2 ? '-translate-x-28 translate-y-20 md:-translate-x-32 md:translate-y-24' : 'translate-x-28 translate-y-20 md:translate-x-32 md:translate-y-24'}`}>
                {i < 2 && <RichParagraph>{f.text}</RichParagraph>}
                <div className="feature-icon bg-gray-800 rounded-full p-2 shadow-lg border border-gray-700 transition-all duration-300">
                  {f.icon}
                </div>
                {i >= 2 && <RichParagraph>{f.text}</RichParagraph>}
              </div>
            ))}
          </div>

          <RichParagraph>Everything is set up for you. Skip the stress of a long DIY build or waiting months for a custom conversion and check out our vans for sale.</RichParagraph>
        </div>

        <div className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

            {availableVans && availableVans.length > 0 ? (
              // Case 1: Display Live Inventory
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {availableVans?.length > 0 ? (
              availableVans.map((van) => (
                <div
                  key={van._id}
                  className="group relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
                >
                  <Link to={`/van-detail/${van.slug}`}>
                    <div className="relative w-full h-full">
                      <ImageWithSkeleton
                        src={van?.gallery?.[0] || "/images/default-placeholder.jpg"}
                        alt={van?.van_listing?.title || "Sold camper van"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* SOLD Stamp (Modernized) */}
                      {status === "sold" && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="transform -rotate-12 bg-red-600 text-white font-black text-xl md:text-2xl px-8 py-2 rounded-lg shadow-2xl border-2 border-white/40 backdrop-blur-sm">
                          SOLD
                        </div>
                      </div>}

                      {/* Gradient & Content Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-30">
                        <Heading3 text={van?.van_listing?.title || "Custom Build"} />

                        <RichParagraph>

                        </RichParagraph>
                        <p className="text-white/60 text-xs mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100 hidden md:block">
                          View Details →
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-lg">No sold vans found.</p>
              </div>
            )}
          </div>

            ) : (
              // Case 2: Display Coming Soon Grid
              <div className="w-full">
                <div className="text-center mb-10">
                  <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Pipeline</span>
                  <Heading2 text="Upcoming Builds In Progress" className="mt-2" />
                  <RichParagraph>Our workshop is busy! Here are the next builds hitting the floor soon.</RichParagraph>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {UPCOMING_VANS.map((van, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center hover:border-sky-400 transition-colors group">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-50 transition-colors">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{van.name}</h4>
                      <p className="text-gray-500 text-sm mb-6">{van.desc}</p>
                      <div className="mt-auto">
                        <span className="text-xs font-semibold text-sky-600 uppercase tracking-tighter italic">Status: Under Construction</span>
                      </div>
                    </div>
                  ))}

                  {/* Contact CTA Card */}
                  <div className="bg-slate-900 p-8 rounded-[2rem] flex flex-col items-center text-center text-white justify-center">
                    <Heading3 text="Want a custom build?" className="text-white mb-4" />
                    <RichParagraph className="text-gray-300 mb-6">Don't wait for these to finish. Secure your spot now.</RichParagraph>
                    <WhiteButton label="Inquire Now" link="/inquiry" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}