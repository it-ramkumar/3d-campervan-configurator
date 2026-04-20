// Save this file as (e.g.,) SprinterFeatures.js
"use client";

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageWithSkeleton, RichParagraph } from '../Common/Common';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Heading2, Heading3, Heading4 } from '../Common/Common';
// import { Heading3 } from '../Common/Common';
// --- ICONS (Keeping for completeness) ---
const StepIcon = () => (
  <svg className="w-[45px] h-[45px] text-zinc-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12 3C8.686 3 6 5.686 6 9v6h2V9a4 4 0 018 0v6h2V9c0-3.314-2.686-6-6-6zM4 17h16v2H4v-2z" clipRule="evenodd" />
  </svg>
);

const HitchIcon = () => (
  <svg className="w-[45px] h-[45px] text-zinc-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-2-6a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
  </svg>
);

const TowingIcon = () => (
  <svg className="w-[45px] h-[45px] text-zinc-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H8zm0 2h8v10H8V6zm2 2h4v2h-4V8zm-2 4h8v2H8v-2zm0 4h8v2H8v-2z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// --- End ICONS ---

// --- Color Data (Keeping for completeness) ---
const colors = [
  {
    name: 'Arctic White',
    img: '/sprinter/Arctic White.webp',
    description: 'A pristine, brilliant white that reflects sunlight to keep the interior cooler. Perfect for hot climates and professional fleets.',
    features: ['Heat reflective', 'Easy maintenance', 'Professional appearance', 'High visibility']
  },
  {
    name: 'Pebble Grey',
    img: '/sprinter/pebblegrey.webp',
    description: 'A sophisticated light grey with subtle warm undertones. Hides minor scratches and dust exceptionally well.',
    features: ['Scratch masking', 'Elegant finish', 'Dust camouflage', 'Modern aesthetic']
  },
  {
    name: 'Obsidian Black',
    img: '/sprinter/obsidianblack.webp',
    description: 'Deep, luxurious black with a mirror-like finish. Creates a commanding presence on the road.',
    features: ['Premium gloss', 'Luxury appearance', 'Deep shine', 'Professional look']
  },
  {
    name: 'Tenorite Grey',
    img: '/sprinter/tenoritegrey.webp',
    description: 'A medium grey with cool blue undertones. Offers excellent dirt and water spot concealment.',
    features: ['Water spot hiding', 'Urban sophisticated', 'Easy cleaning', 'Contemporary style']
  },
  {
    name: 'Graphite Grey',
    img: '/sprinter/graphitegrey.webp',
    description: 'Dark charcoal grey that combines elegance with practicality. Ideal for both commercial and personal use.',
    features: ['All-purpose', 'Stain resistant', 'Timeless appeal', 'Versatile application']
  },
  {
    name: 'Jet Black',
    img: '/sprinter/jetblack.webp',
    description: 'The deepest black available with intense pigmentation. Creates a sleek, monolithic appearance.',
    features: ['Maximum depth', 'Ultimate sleekness', 'Rich color', 'Bold statement']
  },
  {
    name: 'Iridium Silver',
    img: '/sprinter/iridiumsilver.webp',
    description: 'Metallic silver with high reflectivity. Maintains its showroom appearance for years.',
    features: ['Long-lasting shine', 'Scratch resistant', 'Value retention', 'Modern metallic']
  },
  {
    name: 'Selenite Grey',
    img: '/sprinter/selenitegrey.webp',
    description: 'A light metallic grey with pearlescent qualities. Changes appearance in different lighting conditions.',
    features: ['Pearlescent effect', 'Light responsive', 'Premium metallic', 'Dynamic appearance']
  },
  {
    name: 'Black Blue',
    img: '/sprinter/blackblue.webp',
    description: 'A sophisticated dark blue that appears almost black in low light. Reveals rich blue tones in sunlight.',
    features: ['Color shifting', 'Sophisticated tone', 'Sunlight reactive', 'Executive style']
  },
  {
    name: 'Blue Grey',
    img: '/sprinter/bluegrey.webp',
    description: 'A unique blend of grey and blue that creates a calm, professional appearance suitable for any application.',
    features: ['Calming hue', 'Professional blend', 'Weather resistant', 'Universal appeal']
  },
];

// --- Color Definitions (Keeping for completeness) ---
const sectionBgLight = '#F3F4F6';
const cardBgDark = '#001F3D';
const cardBorderAccent = '#4A5064';
const iconBgLight = '#E0E0E0';
const veryDarkCharcoal = '#343A44';

// Modal Component (Slightly reduced font sizes/padding)
const ColorModal = ({ color, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl md:max-w-4xl h-auto max-h-[95vh] sm:max-h-[90vh] rounded-2xl overflow-hidden transform transition-all duration-500 scale-95 hover:scale-100"
        style={{
          backgroundColor: '#1a1d24',
          border: '2px solid #374151'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <CloseIcon />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto lg:overflow-y-hidden">
          {/* Image Section */}
          <div className="relative h-52 sm:h-60 lg:h-full min-h-[200px] lg:min-h-[400px]">
            <ImageWithSkeleton click={true}
              src={color.img}
              alt={color.name}
              className="w-full h-full object-cover"
              style={{ backgroundColor: '#f8fafc' }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:bg-gradient-to-r lg:from-black/50 lg:to-transparent" />

            {/* Color Name on Image - REDUCED LG FONT SIZE */}
            <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6">
              <Heading2 text={color.name} className='text-secondary!'/>
              
              <div className="w-12 h-1 bg-white/80 rounded-full lg:w-16"></div>
            </div>
          </div>

          {/* Content Section - REDUCED PADDING/FONT SIZES */}
          <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-center" style={{ backgroundColor: '#1a1d24' }}>
            <div className="space-y-4 sm:space-y-5">
              {/* Description */}
              <div>
                {/* REDUCED LG FONT SIZE */}
                <Heading4 text={"Color Description"} className='text-secondary! mb-2'/>
                
                {/* REDUCED LG FONT SIZE */}
                <RichParagraph className='text-secondary!'> {color.description}</RichParagraph>
                
              </div>

              {/* Features */}
              <div>
                {/* REDUCED LG FONT SIZE */}
                <Heading4 text={"Key Features"} className='text-secondary! mb-2'/>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {color.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: '#2d3748' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span className="text-gray-200 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-3 border-t border-gray-700">
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    <span>UV Protected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <span>Scratch Resistant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                    <span>Weather Resistant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExteriorColourChoices() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedColor(null), 300);
  };

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: sectionBgLight }}>

      {/* --- SECTION 1: KEY FEATURES (Light Section) --- */}
      {/* REDUCED VERTICAL PADDING: md:py-16 (from md:py-24) */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Main Title - REDUCED DESKTOP FONT SIZE */}
        <div className="text-center mb-4 sm:mb-5">
          <Heading2 text={"Key Features & Upgrades"}/>
          
        </div>

        {/* Subtitle - REDUCED MARGIN: mb-16 (from mb-24/mb-32) and REDUCED DESKTOP FONT SIZE */}
        <div className="text-center mb-24 md:mb-20">
          <Heading3 text={"Rear Steps, Hitch Options, & Towing Capacity"}/>
          
        </div>

        {/* Features Card Grid - REDUCED VERTICAL GAP: gap-y-16 (from gap-y-28/gap-y-24) */}
        {/* MODIFIED: Increased vertical gap for mobile: gap-y-24 (was gap-y-16) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-24 md:gap-y-16 max-w-5xl mx-auto">

          {/* Card 1: Rear Steps */}
          <div
            // REDUCED TOP PADDING FOR CARD CONTENT: pt-24 (from pt-32) on mobile, md:pt-16 (from md:pt-20) on desktop
            className="relative rounded-[15px] p-5 pt-24 md:pt-16 text-center text-white flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border-t-4"
            style={{
              backgroundColor: cardBgDark,
              borderColor: cardBorderAccent,
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* REDUCED ICON CLIP SIZE/POSITIONING */}
            <div
              className="absolute -top-16 md:-top-16 left-1/2 -translate-x-1/2 w-[90px] h-[95px] md:w-[100px] md:h-[105px] border-[4px] flex items-center justify-center shield-clip"
              style={{
                backgroundColor: iconBgLight,
                borderColor: cardBgDark,      
              }}
            >
              <StepIcon />
            </div>
            {/* REDUCED DESKTOP FONT SIZE */}
            <Heading4 text={"Rear Steps"} className='text-secondary!'/>
            {/* <h4 className="font-serif text-2xl sm:text-3xl md:text-2xl font-bold mb-3">Rear Steps</h4> */}
            <hr className="my-2 border-white/20" />
            {/* REDUCED DESKTOP FONT SIZE */}
            <div className="font-serif text-sm sm:text-base md:text-sm font-medium space-y-2 text-left">
              <RichParagraph className='text-secondary!'> Factory rear steps available on 2025 Sprinter models.</RichParagraph>
              <RichParagraph className='text-secondary!'> Step height ranges from <strong>21 to 25 inches</strong>, depending on model.</RichParagraph>
              <RichParagraph className='text-secondary!'> Example: Cargo Van 2500 and 3500 variants.</RichParagraph>
              <RichParagraph className='text-secondary! !mt-4 '> Aftermarket rear steps also available:</RichParagraph>
              
              {/* REDUCED DESKTOP FONT SIZE */}
              <ul className="text-xs sm:text-sm md:text-xs list-disc pl-5">
                <li><RichParagraph className='text-secondary! !text-[14px]'>Improve <strong>accessibility</strong>.</RichParagraph></li>
                <li><RichParagraph className='text-secondary! !text-[14px]'>Offer added convenience for cargo loading and unloading.</RichParagraph></li>
                {/* <li>Offer added convenience for cargo loading and unloading.</li> */}
              </ul>
            </div>
          </div>

          {/* Card 2: Hitch Options */}
          <div
            // REDUCED TOP PADDING FOR CARD CONTENT
            className="relative rounded-[15px] p-5 pt-24 md:pt-16 text-center text-white flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border-t-4"
            style={{
              backgroundColor: cardBgDark,
              borderColor: cardBorderAccent,
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* REDUCED ICON CLIP SIZE/POSITIONING */}
            <div
              className="absolute -top-16 md:-top-16 left-1/2 -translate-x-1/2 w-[90px] h-[95px] md:w-[100px] md:h-[105px] border-[4px] flex items-center justify-center shield-clip"
              style={{
                backgroundColor: iconBgLight,
                borderColor: cardBgDark,      
              }}
            >
              <HitchIcon />
            </div>
            {/* REDUCED DESKTOP FONT SIZE */}
            <Heading4 text={"Hitch Options"} className='text-secondary!'/>
                        <hr className="my-2 border-white/20" />
            {/* REDUCED DESKTOP FONT SIZE */}
            <div className="font-serif text-sm sm:text-base md:text-sm font-medium space-y-2 text-left">
              <RichParagraph className='text-secondary!'><strong>Class III Hitch</strong>:</RichParagraph>
              
              {/* REDUCED DESKTOP FONT SIZE */}
              <ul className="text-xs sm:text-sm md:text-xs list-disc pl-5">
                <li><RichParagraph className='text-secondary! !text-[14px]'>Available for Cargo Van 2500 models.</RichParagraph></li>
                <li><RichParagraph className='text-secondary! !text-[14px]'>Maximum tongue weight: <strong>500 lbs</strong>.</RichParagraph></li>
                
              </ul>
              <RichParagraph className='text-secondary! mt-3'><strong>Class IV Hitch</strong>:</RichParagraph>
              
              {/* REDUCED DESKTOP FONT SIZE */}
              <ul className="text-xs sm:text-sm md:text-xs list-disc pl-5">
                <li><RichParagraph className='text-secondary! !text-[14px]'>Available for 3500, 3500XD, and 4500 models.</RichParagraph></li>
                <li><RichParagraph className='text-secondary! !text-[14px]'>Maximum tongue weight: <strong>750 lbs</strong>.</RichParagraph></li>
                
              </ul>
            </div>
          </div>

          {/* Card 3: Towing Capacity */}
          <div
            // REDUCED TOP PADDING FOR CARD CONTENT
            className="relative rounded-[15px] p-5 pt-24 md:pt-16 text-center text-white flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border-t-4"
            style={{
              backgroundColor: cardBgDark,
              borderColor: cardBorderAccent,
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* REDUCED ICON CLIP SIZE/POSITIONING */}
            <div
              className="absolute -top-16 md:-top-16 left-1/2 -translate-x-1/2 w-[90px] h-[95px] md:w-[100px] md:h-[105px] border-[4px] flex items-center justify-center shield-clip"
              style={{
                backgroundColor: iconBgLight,
                borderColor: cardBgDark,      
              }}
            >
              <TowingIcon />
            </div>
            {/* REDUCED DESKTOP FONT SIZE */}
            <Heading4 text={"Towing Capacity"} className='text-secondary!'/>
            
            <hr className="my-2 border-white/20" />
            {/* REDUCED DESKTOP FONT SIZE */}
            <div className="font-serif text-sm sm:text-base md:text-sm font-medium space-y-2 text-left">
              <RichParagraph className='text-secondary! '><strong>Cargo Van 2500:</strong></RichParagraph>
              
              {/* REDUCED DESKTOP FONT SIZE */}
              <ul className="text-xs sm:text-sm md:text-xs list-disc pl-5">
                <li><RichParagraph className='text-secondary! !text-[14px]'>Towing capacity: Up to <strong>5,000 lbs</strong>.</RichParagraph></li>
                
              </ul>
              <RichParagraph className='text-secondary! mt-4'><strong>Cargo Van 3500, 3500XD, and 4500:</strong></RichParagraph>
             
              {/* REDUCED DESKTOP FONT SIZE */}
              <ul className="text-xs sm:text-sm md:text-xs list-disc pl-5">
                <li><RichParagraph className='text-secondary! !text-[14px]'>Towing capacity: Up to <strong>7,500 lbs</strong>.</RichParagraph></li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: EXTERIOR COLORS (Dark Showcase Section) --- */}
      {/* REDUCED VERTICAL PADDING: md:py-16 (from md:py-24) */}
      <div className="w-full py-12 md:py-16" style={{ backgroundColor: cardBgDark }}>
        <div className="container mx-auto px-4">
          {/* Section Title - REDUCED DESKTOP FONT SIZE */}
          <div className="text-center mb-8 sm:mb-10">
            <Heading2 text={"Exterior Color Choices"} className='text-secondary!'/>
            {/* <h2 className="font-serif text-3xl sm:text-4xl md:text-4xl font-bold text-white">
              Exterior Color Choices
            </h2> */}
          </div>

          {/* Color Swiper */}
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
            className="w-full color-swiper-fixed"
            style={{
              paddingBottom: '2rem',
              paddingTop: '1rem',
            }}
          >
            {colors.map((color) => (
              <SwiperSlide
                key={color.name}
                // REDUCED SLIDE WIDTH: !w-[250px] sm:!w-[300px] md:!w-[350px] (from 300/350/420px)
                className="!w-[250px] sm:!w-[300px] md:!w-[350px] transition-all duration-1000 ease-out cursor-pointer"
                onClick={() => handleColorClick(color)}
              >
                {/* Card Structure */}
                <div
                  className="rounded-xl overflow-hidden transform transition-all duration-700 hover:scale-105 group"
                  style={{
                    backgroundColor: veryDarkCharcoal,
                    border: `2px solid ${veryDarkCharcoal}`, // Reduced border size
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)', // Reduced shadow
                    margin: '0 8px' // Reduced margin
                  }}
                >
                  {/* Image part - REDUCED HEIGHT */}
                  <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-t-xl overflow-hidden">
                    <ImageWithSkeleton click={true}
                      src={color.img}
                      alt={color.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundColor: '#f0f0f0' }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white text-center">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 mx-3">
                          <span className="font-semibold text-sm">Click to View Details</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Text part - REDUCED PADDING/FONT SIZE */}
                  <div className="p-3 rounded-b-xl" style={{ backgroundColor: veryDarkCharcoal }}>
                    <Heading4 text={color.name} className='text-secondary! text-center'/>
                    {/* <h3 className="font-serif font-medium text-xl sm:text-2xl text-white text-center">
                      {color.name}
                    </h3> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Color Modal */}
      <ColorModal
        color={selectedColor}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Custom CSS (Keeping for completeness) */}
      <style>{`
        .swiper-slide {
          transition: transform 0.7s ease-out, opacity 0.7s ease-out;
        }

        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.7;
          transform: scale(0.85);
        }

        .swiper-slide-prev {
          transform: scale(0.85) translateX(10px) !important;
        }

        .swiper-slide-next {
          transform: scale(0.85) translateX(-10px) !important;
        }

        .swiper-slide-active {
          z-index: 10;
          transform: scale(1) !important;
          opacity: 1;
        }

        .color-swiper-fixed .swiper-wrapper {
          align-items: center;
        }

        .color-swiper-fixed .swiper-slide {
          isolation: isolate;
        }

        .shield-clip {
          clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
        }

        /* Smooth modal animations */
        .modal-enter {
          opacity: 0;
          transform: scale(0.9);
        }

        .modal-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
    </section>
  );
}