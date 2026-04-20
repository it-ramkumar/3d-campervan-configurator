"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithSkeleton, RichParagraph } from "../Common/Common"; // Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
import { Heading2, Heading3, Heading4 } from "../Common/Common";

const packagesData = [
  {
    id: "X55PKG",
    title: "X55PKG All Wheel Drive Package",
    description:
      'Optional AWD package for enhanced traction. With "Torque On Demand" system, up to 50% axle power split.',
    features: [
      "Auto AWD activation, reverts to RWD when not needed.",
      "Maintains clearance, angles for winter/off-road use.",
      "Paired with 211 hp turbodiesel, 9-speed transmission.",
    ],
    availability: [
      "For models like Sprinter 2500, 3500XD Cargo Vans.",
      "~$6,750 add-on (e.g., 2500 Cargo 144 WB).",
    ],
    benefits: [
      "Better grip in snow, ice, or rough terrain.",
      "Supports towing (5,000-7,500 lbs) with stability.",
    ],
    image: "/sprinter/Rectangle 161.webp",
  },
  {
    id: "COOPKG",
    title: "COOPKG COO-Basic Comfort Package",
    description:
      "Boosts driver/passenger comfort affordably. Ideal for daily commercial or personal use in Sprinter vans.",
    features: [
      "Comfort seats with lumbar support, adjustable head restraints.",
      "Comfort overhead control panel for easy lighting/settings access.",
      "Armrests for driver/co-driver, enhancing long-drive comfort.",
      "Ergonomic design to reduce fatigue.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$500-$1,000 add-on.",
    ],
    benefits: [
      "Reduces fatigue on long hauls.",
      "Factory-integrated, safety-compliant.",
      "Cost-effective vs. premium options.",
    ],
    image: "/sprinter/Rectangle 161 (1).webp",
  },
  {
    id: "C01PKG",
    title: "C01PKG C01-Driver Convenience Package",
    description:
      "Enhances driver comfort and usability. Designed for efficiency during daily operations or long drives.",
    features: [
      "Blind Spot Assist for safer lane changes.",
      "Cruise control for relaxed long-distance driving.",
      "Multifunction steering wheel with intuitive controls.",
      "Storage compartment with hinged lid to secure dash items.",
      "Rearview camera pre-wiring for easy upgrades.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$500-$1,200 add-on.",
    ],
    benefits: [
      "Boosts safety with monitoring systems.",
      "Simplifies driving tasks, reduces fatigue.",
      "Cost-effective upgrade for convenience.",
    ],
    image: "/sprinter/Rectangle 161 (2)(1).webp",
  },
  {
    id: "C03PKG",
    title: "C03PKG C03-Premium Plus Package",
    description:
      "Enhances technology and comfort for a premium driving experience. Tailored for drivers seeking advanced connectivity and safety features.",
    features: [
      "10.25-inch MBUX touchscreen with navigation, wireless Apple CarPlay/Android Auto.",
      "Wireless phone charging for convenience.",
      "Traffic Sign Assist for real-time road sign recognition.",
      "Leather steering wheel for added luxury.",
      "Active Lane Keeping Assist to maintain lane discipline.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$1,500-$2,500 add-on.",
    ],
    benefits: [
      "Seamless connectivity via MBUX.",
      "Enhanced safety and luxury.",
      "Comfortable for long drives.",
    ],
    image: "/sprinter/Rectangle 161 (3)(1).webp",
  },
  {
    id: "COSPKG",
    title: "COSPKG COS-Comfort Package (Seats)",
    description:
      "Upgrades seating for enhanced driver and passenger comfort. Focuses on ergonomic support for long drives or frequent use.",
    features: [
      "Comfort driver/co-driver seats with 4-way lumbar support, adjustable height, and inclination.",
      "Meets German AGR healthy spine criteria for reduced fatigue.",
      "Comfort head restraints for added neck support.",
      "Optional armrests for both seats, improving relaxation.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$600-$1,000 add-on.",
    ],
    benefits: [
      "Boosts comfort for extended trips or commercial use.",
      "Seamless factory integration, maintains safety standards.",
      "Affordable ergonomic upgrade for daily driving.",
    ],
    image: "/sprinter/Rectangle 161 (4)(1).webp",
  },
  {
    id: "CA2PKG",
    title: "CA2PKG CA2-C02 Package (in Combination with C03)",
    description:
      "Enhances safety and comfort, designed to complement the C03-Premium Plus Package. Adds targeted features for improved driving experience when paired with C03's advanced tech.",
    features: [
      "Leather steering wheel for premium feel and grip.",
      "Wet wiper system for better visibility in adverse weather.",
      "Active Lane Keeping Assist to maintain lane discipline.",
      "Integrates with C03's 10.25-inch MBUX, wireless charging, and Traffic Sign Assist.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$300-$700 add-on.",
    ],
    benefits: [
      "Improves safety with lane assist.",
      "Adds comfort with premium steering.",
      "Seamless C03 integration.",
    ],
    image: "/sprinter/Rectangle 161 (5).webp",
  },
  {
    id: "X13PKG",
    title: "X13PKG X13-Exterior Package",
    description:
      "Enhances the Sprinter's exterior aesthetics and functionality. Focuses on premium lighting and visibility for safety and style.",
    features: [
      "LED high-performance headlights for brighter, energy-efficient illumination.",
      "Partial LED tail lights for improved rear visibility.",
      "Fog lamps with cornering light function for better low-visibility driving.",
      "High Beam Assist for automatic headlight adjustment.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$1,800-$2,000 add-on.",
    ],
    benefits: [
      "Enhances safety with better lighting.",
      "Modernizes look, boosts confidence.",
    ],
    image: "/sprinter/Rectangle 161 (6).webp",
  },
  {
    id: "X4ZPKG",
    title: "X4ZPKG X4Z-Interior Trim Upgrade Package",
    description:
      "Enhances cabin aesthetics and functionality. Upgrades standard interior with premium materials for a refined look.",
    features: [
      "Deluxe lower wall panels with improved finish over standard plastic.",
      "Suitable as a base for fabric or custom upholstery in van conversions.",
      "Enhanced interior trim for a more polished, professional appearance.",
      "Integrates with factory design, maintaining safety and ergonomics.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$800-$1,500 add-on.",
    ],
    benefits: [
      "Boosts comfort, resale value.",
      "Ideal for van conversions.",
      "Durable, factory-integrated.",
    ],
    image: "/sprinter/Rectangle 161 (7).webp",
  },
  {
    id: "X67PKG",
    title: "X67PKG X67-Chrome Plus Package",
    description:
      "Enhances exterior aesthetics with premium chrome accents. Adds a polished, upscale look to the Sprinter's front grille.",
    features: [
      "Chrome-plated radiator grille for a sleek, professional appearance.",
      "Radiator grille frame in body color, blending style with vehicle design.",
      "Optional chrome trim accents for a cohesive, refined look.",
    ],
    availability: [
      "For Cargo, Crew, Passenger Vans (2500, 3500).",
      "Optional, ~$300-$400 add-on.",
    ],
    benefits: [
      "Boosts branding or personal style.",
      "Durable, weather-resistant finish.",
      "Pairs well with X13PKG.",
    ],
    image: "/sprinter/Rectangle 161 (8).webp",
  },
];

// Unique Icons for Features - Updated with charcoal/steel colors (Keeping original icons, adjusted text sizes below)
const AutoActivationIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
  </svg>
);

const ClearanceIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  </svg>
);

const TransmissionIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const LumbarSupportIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const ControlPanelIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const ArmrestIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
    />
  </svg>
);

const ErgonomicsIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    />
  </svg>
);

const BlindSpotIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CruiseControlIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const SteeringWheelIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
  </svg>
);

const StorageIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const CameraIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const TouchscreenIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const ChargingIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const TrafficSignIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const LaneAssistIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const HeadRestraintIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const LeatherWheelIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
  </svg>
);

const WiperIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
);

const HeadlightIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const TailLightIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const FogLightIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const HighBeamIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const InteriorIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const UpholsteryIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
  </svg>
);

const ChromeIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const GrilleIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const SpineIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const IntegrationIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

// Icon mapping for each specific feature line
const getFeatureIcon = (featureText, index) => {
  const text = featureText.toLowerCase();

  // X55PKG - AWD Package
  if (text.includes("auto awd activation")) return <AutoActivationIcon />;
  if (
    text.includes("maintains clearance") ||
    text.includes("winter") ||
    text.includes("off-road")
  )
    return <ClearanceIcon />;
  if (text.includes("turbodiesel") || text.includes("transmission"))
    return <TransmissionIcon />;

  // COOPKG - Comfort Package
  if (text.includes("lumbar support") || text.includes("comfort seats"))
    return <LumbarSupportIcon />;
  if (text.includes("control panel") || text.includes("overhead"))
    return <ControlPanelIcon />;
  if (text.includes("armrests")) return <ArmrestIcon />;
  if (text.includes("ergonomic") || text.includes("reduce fatigue"))
    return <ErgonomicsIcon />;

  // C01PKG - Driver Convenience
  if (text.includes("blind spot")) return <BlindSpotIcon />;
  if (text.includes("cruise control")) return <CruiseControlIcon />;
  if (text.includes("steering wheel") || text.includes("multifunction"))
    return <SteeringWheelIcon />;
  if (text.includes("storage compartment")) return <StorageIcon />;
  if (text.includes("camera") || text.includes("rearview"))
    return <CameraIcon />;

  // C03PKG - Premium Plus
  if (text.includes("touchscreen") || text.includes("mbux"))
    return <TouchscreenIcon />;
  if (text.includes("wireless charging")) return <ChargingIcon />;
  if (text.includes("traffic sign")) return <TrafficSignIcon />;
  if (text.includes("leather steering")) return <LeatherWheelIcon />;
  if (text.includes("lane keeping")) return <LaneAssistIcon />;

  // COSPKG - Comfort Seats
  if (text.includes("4-way lumbar") || text.includes("adjustable height"))
    return <LumbarSupportIcon />;
  if (text.includes("spine criteria") || text.includes("healthy spine"))
    return <SpineIcon />;
  if (text.includes("head restraints")) return <HeadRestraintIcon />;
  if (text.includes("optional armrests")) return <ArmrestIcon />;

  // CA2PKG - C02 Package
  if (text.includes("leather steering wheel")) return <LeatherWheelIcon />;
  if (text.includes("wet wiper")) return <WiperIcon />;
  if (text.includes("lane keeping assist")) return <LaneAssistIcon />;
  if (text.includes("integrates with c03")) return <IntegrationIcon />;

  // X13PKG - Exterior Package
  if (text.includes("headlights") || text.includes("led high-performance"))
    return <HeadlightIcon />;
  if (text.includes("tail lights")) return <TailLightIcon />;
  if (text.includes("fog lamps")) return <FogLightIcon />;
  if (text.includes("high beam assist")) return <HighBeamIcon />;

  // X4ZPKG - Interior Trim
  if (text.includes("wall panels") || text.includes("interior trim"))
    return <InteriorIcon />;
  if (text.includes("upholstery") || text.includes("fabric"))
    return <UpholsteryIcon />;
  if (text.includes("professional appearance")) return <InteriorIcon />;
  if (text.includes("factory design") || text.includes("integrates"))
    return <IntegrationIcon />;

  // X67PKG - Chrome Package
  if (text.includes("chrome") || text.includes("radiator grille"))
    return <ChromeIcon />;
  if (text.includes("grille frame") || text.includes("body color"))
    return <GrilleIcon />;
  if (text.includes("chrome trim")) return <ChromeIcon />;

  // Default unique icon for any unmatched features
  return (
    <svg
      className="w-5 h-5 text-[#ED985F] flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

// Unique icons for Availability section
const VanModelIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const PriceIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

// Unique icons for Benefits section
const GripIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const TowingIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const SafetyIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const CostEffectiveIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const ComfortIcon = () => (
  <svg
    className="w-5 h-5 text-[#ED985F] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    />
  </svg>
);

const getAvailabilityIcon = (availabilityText, index) => {
  const text = availabilityText.toLowerCase();
  if (
    text.includes("models") ||
    text.includes("cargo") ||
    text.includes("vans")
  )
    return <VanModelIcon />;
  if (text.includes("$") || text.includes("add-on") || text.includes("price"))
    return <PriceIcon />;
  return <VanModelIcon />;
};

const getBenefitIcon = (benefitText, index) => {
  const text = benefitText.toLowerCase();
  if (
    text.includes("grip") ||
    text.includes("snow") ||
    text.includes("ice") ||
    text.includes("terrain")
  )
    return <GripIcon />;
  if (text.includes("towing") || text.includes("stability"))
    return <TowingIcon />;
  if (
    text.includes("safety") ||
    text.includes("monitoring") ||
    text.includes("compliant")
  )
    return <SafetyIcon />;
  if (
    text.includes("cost") ||
    text.includes("affordable") ||
    text.includes("effective")
  )
    return <CostEffectiveIcon />;
  if (
    text.includes("comfort") ||
    text.includes("fatigue") ||
    text.includes("ergonomic")
  )
    return <ComfortIcon />;
  if (text.includes("integration") || text.includes("seamless"))
    return <IntegrationIcon />;
  return <SafetyIcon />;
};

// --- START: Collapse/Toggle Button Components ---

const ToggleButton = ({ isCollapsed, onClick, sectionName }) => (
  <button
    onClick={onClick}
    className="w-full mt-3 flex items-center justify-center p-2.5 text-base font-semibold rounded-xl text-gray-700 hover:bg-gray-200/50 transition-colors duration-300 border border-gray-200" // Reduced padding/margin
  >
    {isCollapsed ? `Show All ${sectionName}` : `Show Less ${sectionName}`}
    <svg
      className={`w-4 h-4 ml-2 transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
);

// --- END: Collapse/Toggle Button Components ---

export default function Speclist() {
  const containerRef = useRef(null);

  // State to manage the collapsed status for each package and section
  const [collapsedState, setCollapsedState] = useState({});

  // Function to toggle the collapsed state for a specific package ID and section
  const toggleCollapse = (packageId, section) => {
    setCollapsedState((prevState) => ({
      ...prevState,
      [`${packageId}-${section}`]: !prevState[`${packageId}-${section}`],
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".spec-section");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.fromTo(
        ".feature-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".spec-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Define the number of items to show when collapsed
  const collapsedItemCount = 2; // Show only the first 2 items by default

  return (
    // REDUCED VERTICAL PADDING
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-12 text-center">
        {" "}
        {/* Reduced margin */}
        <div className="inline-flex flex-col items-center mb-5">
          {" "}
          {/* Reduced margin */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#ED985F] to-[#f4a261]  rounded-full mb-2"></div>{" "}
          {/* Reduced size */}
          {/* <div className="w-14 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full opacity-80"></div> Reduced size */}
        </div>
        {/* REDUCED MAIN TITLE FONT SIZE */}
        <Heading2 text={"Packages & Codes: Decoding The Sprinter Spec List"} />
        <RichParagraph>
          {
            "Explore the comprehensive range of Mercedes-Benz Sprinter packages designed to enhance your driving experience"
          }
        </RichParagraph>
      </div>

      <div className="flex flex-col gap-16">
        {" "}
        {/* REDUCED GAP */}
        {packagesData.map((pkg, index) => {
          const isEven = index % 2 === 0;

          // Determine collapsed state for each section
          const isFeaturesCollapsed =
            pkg.features.length > collapsedItemCount &&
            !collapsedState[`${pkg.id}-features`];
          const isAvailabilityCollapsed =
            pkg.availability.length > collapsedItemCount &&
            !collapsedState[`${pkg.id}-availability`];
          const isBenefitsCollapsed =
            pkg.benefits.length > collapsedItemCount &&
            !collapsedState[`${pkg.id}-benefits`];

          // Filter items based on collapsed state
          const displayedFeatures = isFeaturesCollapsed
            ? pkg.features.slice(0, collapsedItemCount)
            : pkg.features;
          const displayedAvailability = isAvailabilityCollapsed
            ? pkg.availability.slice(0, collapsedItemCount)
            : pkg.availability;
          const displayedBenefits = isBenefitsCollapsed
            ? pkg.benefits.slice(0, collapsedItemCount)
            : pkg.benefits;

          return (
            <div
              key={pkg.id}
              className={`spec-section relative container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-10 md:gap-16 ${
                // REDUCED GAP
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Background Elements (Reduced blur/size) */}
              <div
                className={`absolute -z-10 w-[300px] h-[300px] rounded-full blur-2xl opacity-5 bg-gray-800 ${
                  isEven ? "-left-32 -top-24" : "-right-32 -top-24"
                }`}
              ></div>
              <div
                className={`absolute -z-10 w-[250px] h-[250px] rounded-full blur-2xl opacity-5 bg-gray-700 ${
                  isEven ? "-right-24 -bottom-24" : "-left-24 -bottom-24"
                }`}
              ></div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 text-gray-900 font-serif relative">
                {/* Package ID Badge (Reduced size) */}
                <div className="inline-flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm mb-6 group hover:shadow-md transition-all duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mr-2"></span>
                  <span className="font-mono text-xs font-semibold text-gray-700 tracking-wide">
                    {pkg.id}
                  </span>
                </div>

                {/* Package Title (REDUCED FONT SIZE) */}
                <Heading3 text={pkg.title} className="mb-2" />

                {/* Package Description (REDUCED FONT SIZE AND MARGIN) */}
                <div className="relative mb-8">
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full"></div>
                  <RichParagraph className="pl-4 py-1.5 bg-gradient-to-r from-gray-50/80 to-gray-100/50 rounded-r-xl border-l-2 border-transparent">
                    {pkg.description}
                  </RichParagraph>
                </div>

                {/* Features Grid */}
                <div className="space-y-6">
                  {" "}
                  {/* Reduced space */}
                  {/* Key Features */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
                    {" "}
                    {/* Reduced padding/roundedness/scale */}
                    <div className="flex items-center gap-3 mb-4">
                      {" "}
                      {/* Reduced gap/margin */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] rounded-lg flex items-center justify-center shadow-md">
                        {" "}
                        {/* Reduced size/roundedness/shadow */}
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <Heading4 text={"Key Features"} />
                      {/* Reduced font size */}
                    </div>
                    {/* Features List (REDUCED FONT SIZE) */}
                    <div className="space-y-3">
                      {" "}
                      {/* Reduced space */}
                      {displayedFeatures.map((feature, i) => (
                        <div
                          key={i}
                          className="feature-item flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-300"
                        >
                          {" "}
                          {/* Reduced padding/roundedness/gap */}
                          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 group-hover:scale-110 transition-transform duration-300">
                            {" "}
                            {/* Reduced size */}
                            {getFeatureIcon(feature, i)}
                          </div>
                          <RichParagraph className="pt-0.5">
                            {feature}
                          </RichParagraph>
                        </div>
                      ))}
                    </div>
                    {/* Toggle Button for Features */}
                    {pkg.features.length > collapsedItemCount && (
                      <ToggleButton
                        isCollapsed={isFeaturesCollapsed}
                        onClick={() => toggleCollapse(pkg.id, "features")}
                        sectionName="Features"
                      />
                    )}
                  </div>
                  {/* Availability & Pricing */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
                    {" "}
                    {/* Reduced padding/roundedness/scale */}
                    <div className="flex items-center gap-3 mb-4">
                      {" "}
                      {/* Reduced gap/margin */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] rounded-lg flex items-center justify-center shadow-md">
                        {" "}
                        {/* Reduced size/roundedness/shadow */}
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <Heading4 text={"Availability & Pricing"} />
                      {/* <h4 className="font-bold text-base md:text-lg text-gray-900">Availability & Pricing</h4> Reduced font size */}
                    </div>
                    {/* Availability List (REDUCED FONT SIZE) */}
                    <div className="space-y-3">
                      {" "}
                      {/* Reduced space */}
                      {displayedAvailability.map((item, i) => (
                        <div
                          key={i}
                          className="feature-item flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-300"
                        >
                          {" "}
                          {/* Reduced padding/roundedness/gap */}
                          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 group-hover:scale-110 transition-transform duration-300">
                            {" "}
                            {/* Reduced size */}
                            {getAvailabilityIcon(item, i)}
                          </div>
                          <RichParagraph className="pt-0.5">
                            {item}
                          </RichParagraph>
                          {/* <span className="text-sm md:text-base text-gray-700 leading-relaxed pt-0.5">{item}</span> Reduced font size */}
                        </div>
                      ))}
                    </div>
                    {/* Toggle Button for Availability */}
                    {pkg.availability.length > collapsedItemCount && (
                      <ToggleButton
                        isCollapsed={isAvailabilityCollapsed}
                        onClick={() => toggleCollapse(pkg.id, "availability")}
                        sectionName="Availability"
                      />
                    )}
                  </div>
                  {/* Key Benefits */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
                    {" "}
                    {/* Reduced padding/roundedness/scale */}
                    <div className="flex items-center gap-3 mb-4">
                      {" "}
                      {/* Reduced gap/margin */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] rounded-lg flex items-center justify-center shadow-md">
                        {" "}
                        {/* Reduced size/roundedness/shadow */}
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <Heading4 text={"Key Benefits"} />
                      {/* <h4 className="font-bold text-base md:text-lg text-gray-900">Key Benefits</h4> Reduced font size */}
                    </div>
                    {/* Benefits List (REDUCED FONT SIZE) */}
                    <div className="space-y-3">
                      {" "}
                      {/* Reduced space */}
                      {displayedBenefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="feature-item flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-300"
                        >
                          {" "}
                          {/* Reduced padding/roundedness/gap */}
                          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 group-hover:scale-110 transition-transform duration-300">
                            {" "}
                            {/* Reduced size */}
                            {getBenefitIcon(benefit, i)}
                          </div>
                          <RichParagraph className="pt-0.5">
                            {benefit}
                          </RichParagraph>
                          {/* <span className="text-sm md:text-base text-gray-700 leading-relaxed pt-0.5">{benefit}</span> Reduced font size */}
                        </div>
                      ))}
                    </div>
                    {/* Toggle Button for Benefits */}
                    {pkg.benefits.length > collapsedItemCount && (
                      <ToggleButton
                        isCollapsed={isBenefitsCollapsed}
                        onClick={() => toggleCollapse(pkg.id, "benefits")}
                        sectionName="Benefits"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-[60%] flex justify-center items-stretch">
                <div className="relative w-full max-w-[650px] group">
                  {" "}
                  {/* REDUCED MAX-WIDTH */}
                  {/* Glow Effect (Reduced size/blur/opacity) */}
                  <div
                    className={`absolute -inset-4 bg-gradient-to-r from-gray-700/15 via-gray-800/15 to-gray-700/15 rounded-[30px] opacity-30 blur-xl group-hover:opacity-50 transition-all duration-700 group-hover:scale-105`}
                  ></div>
                  {/* Main Image Container (Reduced roundedness/scale) */}
                  <div className="relative rounded-[20px] border border-white/30 overflow-hidden  h-[400px] lg:h-[500px] transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-xl backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/20 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/5 mix-blend-overlay z-10"></div>

                    <ImageWithSkeleton
                      src={pkg.image}
                      alt={`${pkg.title} details`}
                      className=" absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"></div>
                  </div>
                  {/* Corner Accents (Reduced size/margin) */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gray-600 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gray-700 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gray-600 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gray-700 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-16 md:mt-24 text-center">
        {" "}
        {/* Reduced margin */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#ED985F] to-[#f4a261]  rounded-full mx-auto mb-4"></div>{" "}
        {/* Reduced size */}
        <RichParagraph>
          {"Mercedes-Benz Sprinter Packages & Specifications"}
        </RichParagraph>
        {/* <p className="text-gray-500 text-xs font-medium tracking-wide">Mercedes-Benz Sprinter Packages & Specifications</p> Reduced text size */}
      </div>
    </section>
  );
}
