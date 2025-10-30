"use client";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Premium Custom Icons for Accessories ---
const SwingIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3C12 3 7 7 7 12C7 15.5 9.5 18 12 18C14.5 18 17 15.5 17 12C17 7 12 3 12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const SurfboardIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 16L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 14C4 14 6 12 8 12C10 12 12 14 12 14" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 10C16 10 18 8 20 8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const LightIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9 21H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 3V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 14C19.7614 14 22 11.7614 22 9C22 6.23858 19.7614 4 17 4C14.2386 4 12 6.23858 12 9C12 11.7614 14.2386 14 17 14Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ShowerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M17 17H7C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M17 17V21H7V17" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 12V7C12 5.34315 13.3431 4 15 4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const CameraIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 12H1M12 1V3M23 12H21M12 23V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PatioIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 6V4M17 6V4M12 18V21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SuspensionIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 17H4V12C4 7 7 6 12 6C17 6 20 7 20 12V17H16" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const TireIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 4V2M12 22V20M20 12H22M2 12H4M19.07 4.93L20.5 3.5M3.5 20.5L4.93 19.07M19.07 19.07L20.5 20.5M3.5 3.5L4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LadderIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5 21V3M19 21V3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 12H19M5 7H19M5 17H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PowerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="9" r="1" fill="currentColor"/>
  </svg>
);

const WaterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M17 15V21H7V15C7 12 9 9 12 9C15 9 17 12 17 15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 5V3M12 9V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FreshWaterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M18 13C18 10 15 7 12 7C9 7 6 10 6 13C6 16 12 20 12 20C12 20 18 16 18 13Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 10V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="13" r="1" fill="currentColor"/>
  </svg>
);

// --- Graphic Mapping Functions ---
const getGraphicForDescription = (text, index) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('aluminum') || lowerText.includes('material') || lowerText.includes('fabric')) return SwingIcon;
  if (lowerText.includes('design') || lowerText.includes('aesthetic') || lowerText.includes('style')) return SurfboardIcon;
  if (lowerText.includes('quality') || lowerText.includes('premium') || lowerText.includes('high-grade')) return LightIcon;
  if (lowerText.includes('custom') || lowerText.includes('choose') || lowerText.includes('preferred')) return ShowerIcon;
  if (lowerText.includes('lightweight') || lowerText.includes('efficient') || lowerText.includes('fuel')) return CameraIcon;
  if (lowerText.includes('space') || lowerText.includes('room') || lowerText.includes('storage')) return PatioIcon;
  if (lowerText.includes('comfort') || lowerText.includes('insulation') || lowerText.includes('privacy')) return SuspensionIcon;
  if (lowerText.includes('technology') || lowerText.includes('electric') || lowerText.includes('automatic')) return TireIcon;
  if (lowerText.includes('durable') || lowerText.includes('strong') || lowerText.includes('resistant')) return LadderIcon;
  if (lowerText.includes('secure') || lowerText.includes('safe') || lowerText.includes('protection')) return PowerIcon;
  if (lowerText.includes('innovative') || lowerText.includes('modern') || lowerText.includes('advanced')) return WaterIcon;

  const defaultIcons = [SwingIcon, SurfboardIcon, LightIcon, ShowerIcon];
  return defaultIcons[index % defaultIcons.length];
};

// --- Accessory Icon Mapping ---
const getAccessoryIcon = (title) => {
  const iconMap = {
    "Saucer Swing": SwingIcon,
    "Surfboard Rack": SurfboardIcon,
    "Exterior Van Lights": LightIcon,
    "Outdoor Van Shower": ShowerIcon,
    "360° Camera": CameraIcon,
    "Rear Foldable Patio": PatioIcon,
    "Van Suspension System": SuspensionIcon,
    "Tires & Wheels": TireIcon,
    "Side Ladder": LadderIcon,
    "30A Shore Power Inlet": PowerIcon,
    "Dump Valve": WaterIcon,
    "Freshwater Inlet": FreshWaterIcon
  };
  return iconMap[title] || SwingIcon;
};

// --- DATA DEFINITIONS ---
const roofOptionsData = [
  { id: 'hammock', title: 'Foldable Hammock', description: ['Folds flat against the roof when not in use.', 'Sets up in seconds for on-the-go lounging.', 'Made with weather-resistant fabric.', 'Comes in different colors.'], image: "/Exterior/hammock.webp" },
  { id: 'deck', title: 'Roof Deck', description: ['We install high-quality wooden planks on the roof.', 'You can also choose your preferred wood type and finish for your roof deck.'], image: "/Exterior/roofdeckk.webp" },
  { id: 'rack', title: 'Van Roof Rack', description: ['Maximizes cargo space for bikes, kayaks, or additional gear.', 'Features twin tube construction for durability.'], image: "/Exterior/Roof rack.webp" },
  { id: 'skylight', title: 'Van Skylight', description: ['Weather-resistant and insulated to keep your van\'s interior comfortable.', 'Also has a blackout screen for privacy.', 'You can choose different sizes of skylights for your van.'], image: "/Exterior/skylight.webp" },
  { id: 'tent', title: 'Rooftop Tent', description: ['Serves as an extra sleeping option.', 'Weatherproof and can handle off-grid terrain.', 'Lightweight and can be set up in seconds.'], image: "/Exterior/rooftop tent.webp" },
  { id: 'lightbar', title: 'Light Bar', description: ['It can be installed at the front, rear, or both sides.', 'Waterproof & corrosion-resistant.', 'Available in different sizes.'], image: "/Exterior/lightbars.webp" },
  { id: 'weboost', title: 'WeBoost Antenna', description: ['Boost your mobile connectivity on the road.', 'Enhance cell phone signals in off-grid areas with weak signals.', 'Perfect for digital nomads and travelers.'], image: "/Exterior/WeBoostAntenna.webp" },
  { id: 'starlink', title: 'Starlink Maritime', description: ['Offers high-speed internet access in remote locations.', 'Easy to set up and use.'], image: "/Exterior/Maritimestarlink.webp" },
];

const rearStorageData = [
    { id: 'tire_carrier', title: 'Van Tire Carrier', description: ['Built from aluminum and powder-coated for longevity.', 'Requires 180° Hinges.', 'Frees up interior space by relocating the water tank underneath.', 'Keeps your spare wheel secure yet easily accessible.'], image: "/Exterior/Tirecarrier.webp" },
    { id: 'monster_box', title: 'Monster XL Box 40', description: ['Offers a massive 8.8 cubic feet of cargo space.', 'Lightweight and built entirely from aluminum.', 'Features locking latches to secure all your gear.', 'Fold-down door creates a usable workstation.'], image: "/Exterior/Monsterbox.webp" },
    { id: 'expedition_box', title: 'Expedition Box', description: ['Lightweight at only 46 lb.', 'Built to mount on a B2 carrier.', 'Has a 75 lb load capacity.', 'Dual locking handle to secure your campervan gear.'], image: "/Exterior/Expeditionbox.webp" },
    { id: 'slim_box', title: 'Rear Storage Box-Slim', description: ['Offers over 3.25 cubic feet of storage space.', 'Weighs 50lbs and has locking latches with adjustable compression.', 'Features load panels for mounting items.', 'Bottom door has a down-stay rod for built-in counter space.'], image: "/Exterior/boxslim.webp" },
    { id: 'cabinet_box', title: 'Aluminum Cabinet Box', description: ['Designed to be lightweight and built out of .125" aluminum.', 'Can hold the weight of items like a generator, gear, etc.', 'Comes with mounting flanges, a gas strut, and an adjustable shelf.'], image: "/Exterior/aluminiumcabinet.webp" },
    { id: 'split_door_box', title: 'Split Door Storage Box', description: ['Has a split door design for easy access to your gear.', 'L-tracks are added for mounting additional accessories.', 'Back and side walls are built from carbon fiber for efficiency and durability.'], image: "/Exterior/splitdoor2.webp" },
    { id: 'b2_pro_carrier', title: 'B2 Pro Box Carrier', description: ['Perfect for mounting your gear and bikes.', 'Lightweight yet strong, with a 200 lb weight capacity.', 'Mount monster boxes, bike racks, a gear basket, shovels, etc.'], image: "/Exterior/B2ProBoxCarrier.webp" },
  { id: 'sherpa_carrier', title: 'Sherpa Cargo Carrier', description: ['Has a load capacity of about 100 lb.', 'CNC-machined for direct mounting to van hinges and doors.', 'You can mount gear such as bikes, generators, cargo boxes, etc.'], image: "/Exterior/Sherpacargo.webp" },
    { id: 'rear_door_carrier', title: 'Rear Door Carrier', description: ['Has a load capacity of 200lbs.', 'Designed to mount to 180° hinges.', 'Sturdy design with an aluminum round plate and mounting plate.', 'Mount cargo boxes, bikes, skis, etc.'], image: "/Exterior/reardoorcarrier.webp" },
    { id: 'aluminum_gear_rack', title: 'Aluminum Gear Rack', description: ['Built from lightweight aluminum with 70% less weight.', 'Designed to handle bikes, fuel tanks, generators, etc.', 'L-tracks and slotted rails make gear mounting easier.'], image: "/Exterior/aluminiumgearrack.webp" },
    { id: 'sprinter_rear_rack', title: 'Sprinter Rear Rack', description: ['nVader rear rack fits 2019+ Mercedes-Benz Sprinter.', 'Requires 180-degree hinges on the rear doors.', 'Includes both the passenger and driver side racks.'], image: "/Exterior/sprinterrearrack.webp" },
    { id: 'tire_bucket', title: 'Tire Bucket', description: ['Accepts OEM and aftermarket wheels (16"-18") with a 6x130 bolt pattern.', 'Hardware is stainless steel with a black powder-coated finish.', 'Adds a bucket for quick access to the spare tire.'], image: "/Exterior/tirebucket2.webp" },
    { id: 'horizontal_bike_mount', title: 'B2 Horizontal Bike Mount', description: ['Carry your bikes horizontally.', 'Lightweight yet strong enough for heavy use.', 'Ideal for full-time van lifers and mountain bikers.'], image: "/Exterior/B2Horizontal.webp" },
    { id: 'powerlift_bike_rack', title: 'Powerlift Bike Rack', description: ['Raise and lower your bikes with a power-assisted lift.', 'Motorized upper tray capacity is 155 lb; static lower tray is 100 lb.', 'Includes an upper safety latch for secure transportation.'], image: "/Exterior/powerliftbike.webp" },
];

const windowOptionsData = [
    { id: 'flat_double_pane', title: 'Flat Double Pane Acrylic', description: ['Dual acrylic layers for improved insulation and soundproofing.', 'Features a mosquito net and light-blocking screen.', 'Available in different sizes.', 'Opens outward (awning style) for ventilation while keeping out rain.'], image: "/Exterior/flatstyle.webp" },
    { id: 'bubble_double_pane', title: 'Bubble-Style Double Pane', description: ['Similar to flat-style windows, but with a slightly different design.', 'Features a mosquito net and light-blocking screen.', 'Available in different sizes.', 'Awning-style outward opening for ventilation.'], image: "/Exterior/bubblestyle.webp" },
    { id: 'sliding_window', title: 'Sliding Camper Van Window', description: ['Slides horizontally to open without extending outward.', 'Available in different sizes.', 'Features a mosquito net and light-blocking screen.', 'Allows partial or full opening to control airflow.'], image: "/Exterior/sliding2.webp"},
    { id: 'solid_glass', title: 'Solid Glass Factory Window', description: ['A factory-made, solid glass window that covers the entire window space.', 'Can be used with magnetic covers for better privacy and insulation.'], image: "/Exterior/solidglass.webp" },
];

const bodyExtensionData = [
    {
        id: 'carbon_flares',
        title: 'Carbon Fibre Flares',
        description: ['Lighter than traditional bump-outs, improving fuel efficiency.', 'Perfect for creating more room inside your van.', 'Sleek, modern aesthetic for your van build.'],
        image: "/Exterior/carbon.webp"
    },
    {
        id: 'raptor_bumpouts',
        title: 'Raptor Coated Bump-outs',
        description: ['Maximize interior space by expanding van depth by 3"-3.5".', 'Raptor coating protects from scratches, UV damage, and corrosion.', 'Gives a rugged, off-road look to the van.'],
        image: 'https://placehold.co/600x450/cccccc/000000?text=Raptor+Bump-outs',
        subOptions: [
            {
                id: 'bumpouts_with_windows',
                title: 'Bump-outs with Windows',
                description: ['Install a window in the bump-out for better ventilation and light.', 'Flat, bubble, or sliding windows fit easily in bump-outs.', 'Enjoy panoramic views from your sleeping area.'],
                image: "/Exterior/bumpwithwindow.webp"
            },
            {
                id: 'bumpouts_without_windows',
                title: 'Bump-outs without Windows',
                description: ['Choose no window for maximum privacy and insulation.', 'Provides a solid, secure, and uninterrupted interior wall.', 'Ideal for those prioritizing a stealth camping look.'],
                image: "/Exterior/bumpwithoutwindow.webp"
            }
        ]
    }
];

const otherOptionsData = [
    { sectionTitle: 'Camper Van Awning', sectionDescription: 'Get instant protection from the sun and expand your exterior sitting space.', options: [
        { id: 'electric_awning', title: 'Electric Awning', description: ['Operated by a button for quick protection from rain or sun.', 'Vibration detector automatically retracts it in windy conditions.', 'Extends up to 8 feet with a beautiful wavy fabric pattern.'], image: "/Exterior/Electric awning.webp" },
        { id: 'manual_awning', title: 'Manual Awning', description: ['Controlled by hand, typically using a crank.', 'Robust and reliable with no electricity or regular maintenance required.'], image: "/Exterior/Manual awning.webp" }
    ]},
    { sectionTitle: 'Van Entry Step Choices', sectionDescription: 'For easy and safe entry into your van.', options: [
        { id: 'electric_steps', title: 'AMP Electric Steps', description: ['Automatically extends/retracts when the door is opened/closed.', 'Built from high-grade Aluminium with a non-slip surface.', 'Weather-resistant and perfect for off-grid adventures.'], image: "/Exterior/electricsteps.webp" },
        { id: 'running_boards', title: 'Running Boards', description: ['About 6" deep with a non-slip surface for safe entrance.', 'Helps prevent road debris from hitting the van\'s lower parts.'], image: "/Exterior/solidglass.webp" }
    ]},
    { sectionTitle: 'Campervan Door Upgrades', sectionDescription: 'Choose from rear and sliding door options to fit your needs.', options: [
        { id: 'electric_sliding', title: 'Electric Sliding Door', description: ['Opens/closes with the push of a button.', 'Best for people with mobility challenges and families.', 'Has tighter seals than a manual door for better insulation.'], image: "/Exterior/electricslidingdoor.webp" },
        { id: 'manual_sliding', title: 'Manual Sliding Door', description: ['Opens and closes manually along a track.', 'Weighs less, which helps improve fuel efficiency.'], image: "/Exterior/ManualSlidingdoor.webp" },
        { id: 'rear_with_windows', title: 'Rear Door with Windows', description: ['Brings natural light and opens up the space.', 'We also offer privacy magnet covers for windows.'], image: "/Exterior/Reardoorwithwindows.webp" },
      { id: 'rear_without_windows', title: 'Rear Door without Windows', description: ['Gives you free space for mounting shelves or gear.', 'Offers more privacy and better insulation.', 'Provides an overall more finished and clean look.'], image: "/Exterior/Reardoorwithoutwindows.webp" }
    ]},
];

// --- Premium Feature Item with Enhanced Graphics ---
const FeatureItem = ({ text, index }) => {
  const GraphicComponent = getGraphicForDescription(text, index);

  return (
    <motion.div
      className="flex items-start gap-4 sm:gap-6 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg border border-gray-700">
          <GraphicComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10"></div>
      </div>
      <p className="font-sans text-base sm:text-xl text-gray-800 leading-relaxed pt-1 sm:pt-2 group-hover:text-gray-900 transition-colors duration-300 flex-1">
        {text}
      </p>
    </motion.div>
  );
};

// --- Premium Section Header Component ---
const PremiumSectionHeader = ({ title, description }) => (
  <motion.div
    className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 px-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    {/* Premium decorative element */}
    <div className="flex justify-center mb-3 sm:mb-4">
      <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-full shadow-lg"></div>
    </div>

    <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl leading-tight mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-sm px-2">
      {title}
    </h2>

    {/* Premium description with elegant border */}
    <div className="relative">
      <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg sm:rounded-xl opacity-80 border border-gray-200 shadow-sm"></div>
      <p className="font-sans text-sm sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto relative z-10 px-4 sm:px-6 py-3 sm:py-4">
        {description}
      </p>
    </div>
  </motion.div>
);

// --- PREMIUM Interactive Section Component ---
function InteractiveSection({
  sectionTitle,
  sectionDescription,
  optionsData,
  reverseLayout = false,
  bgColor = "bg-white"
}) {
  const [activeOption, setActiveOption] = useState(optionsData[0].id);
  const selectedOptionData = optionsData.find(option => option.id === activeOption);

  return (
    <section className={`py-8 sm:py-12 md:py-16 ${bgColor} text-gray-900 relative overflow-hidden`}>
      {/* Premium background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/60"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gray-900/5 to-gray-800/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-gray-800/5 to-gray-900/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <PremiumSectionHeader title={sectionTitle} description={sectionDescription} />

        {/* Premium Navigation Tabs with Dark Borders - Mobile Optimized */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {optionsData.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveOption(option.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-500 ease-out
                          font-sans font-semibold text-xs sm:text-base relative overflow-hidden group
                          min-w-[100px] sm:min-w-[140px] backdrop-blur-sm border-2
                          ${activeOption === option.id
                            ? 'text-white shadow-xl border-gray-900 bg-gradient-to-r from-gray-900 to-gray-800 shadow-gray-900/30'
                            : 'text-gray-700 bg-white/90 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg shadow-md'
                          }`}
            >
              <span className="relative z-10 whitespace-nowrap text-xs sm:text-sm">{option.title}</span>

              {activeOption !== option.id && (
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              )}

              {activeOption === option.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 -z-10 shadow-inner"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Premium Content Area */}
        <div className="mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOptionData ? selectedOptionData.id : 'empty'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {selectedOptionData?.subOptions ? (
                <div>
                  <motion.div
                    className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="font-serif font-bold text-xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {selectedOptionData.title}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {selectedOptionData.description.map((item, index) => (
                        <FeatureItem key={index} text={item} index={index} />
                      ))}
                    </div>
                  </motion.div>

                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-4">
                    {selectedOptionData.subOptions.map((subOption, index) => (
                      <motion.div
                        key={subOption.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.4 } }}
                        className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500"
                      >
                        <div className="relative z-10 h-full flex flex-col">
                          <div className="overflow-hidden flex-1">
                            <img
                              src={subOption.image}
                              alt={subOption.title}
                              className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          <div className="p-4 sm:p-6 flex-1 flex flex-col">
                            <h4 className="font-serif font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                              {subOption.title}
                            </h4>
                            <div className="space-y-2 sm:space-y-3 flex-1">
                              {subOption.description.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 mt-1.5 sm:mt-2 flex-shrink-0 shadow-sm"></div>
                                  <p className="font-sans text-gray-700 text-xs sm:text-sm leading-relaxed">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Enhanced border effect */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent bg-gradient-to-br from-gray-900/10 to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${reverseLayout ? 'lg:grid-flow-dense' : ''} px-4`}>
                  <motion.div
                    className={`space-y-4 sm:space-y-6 md:space-y-8 ${reverseLayout ? 'lg:col-start-2 lg:pl-12' : 'lg:pr-12'}`}
                    initial={{ opacity: 0, x: reverseLayout ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                      {selectedOptionData?.title}
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {selectedOptionData?.description.map((item, index) => (
                        <FeatureItem key={index} text={item} index={index} />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className={`relative ${reverseLayout ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    initial={{ opacity: 0, x: reverseLayout ? -60 : 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Enhanced frame effects */}
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-2 transition-transform duration-700 blur-sm"></div>
                      <div className="absolute -inset-1 sm:-inset-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md sm:rounded-xl transform rotate-2 opacity-10 group-hover:rotate-1 transition-transform duration-500"></div>

                      <img
                        src={selectedOptionData?.image}
                        alt={selectedOptionData?.title}
                        className="relative w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl aspect-[4/3] transform group-hover:scale-[1.02] sm:group-hover:scale-[1.03] transition-transform duration-700 border-2 border-gray-800/20"
                      />

                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- PREMIUM Additional Accessories Component ---
function AdditionalAccessories() {
    const accessories = [
        { title: "Saucer Swing", description: "Easy to set up and pack away. Lightweight and can be stowed without requiring extra storage space.", image: "/Exterior/Sucerswing.webp" },
        { title: "Surfboard Rack", description: "Secure your surfboard to the roof or side of the van. The right rack depends on your van and board count.", image: "/Exterior/Surfboardrack.webp" },
        { title: "Exterior Van Lights", description: "Custom placement at the front, rear, or passenger side awning for perfect campsite illumination.", image: "/Exterior/exteriorfrontendlight.webp" },
        { title: "Outdoor Van Shower", description: "Connects to your van's water system for hot and cold water. Pair with a privacy curtain for convenience.", image: "/Exterior/Rearoutdoorshower.webp" },
        { title: "360° Camera", description: "Get a complete surround view of your campervan for safer parking and navigating tight spots.", image: "/Exterior/360.webp" },
        { title: "Rear Foldable Patio", description: "Adds up to 6 sq ft of functional outdoor space. Unfolds in seconds for chairs or cooking.", image: "/Exterior/Foldablerearpatio.webp" },
        { title: "Van Suspension System", description: "Upgraded Falcon shocks, bump buddies, and leaf springs for a smooth ride on any terrain.", image: "/Exterior/suspension.webp" },
        { title: "Tires & Wheels", description: "Black Rhino Arsenal wheels (16\"-17\") paired with severe-snow-rated BFGoodrich KO2 All-Terrain Tires.", image: "/Exterior/tire.webp" },
        { title: "Side Ladder", description: "Lightweight (18 lbs) ladder for easy roof access, typically on the driver's side or rear.", image: "/Exterior/Sideladder.webp" },
        { title: "30A Shore Power Inlet", description: "Charge your campervan before traveling with an easy connection to campground power.", image: "/Exterior/30A.webp" },
        { title: "Dump Valve", description: "For easy & hygienic removal of grey water, positioned for quick connection at disposal stations.", image: "/Exterior/Dumpvalve.webp" },
        { title: "Freshwater Inlet", description: "Refill your freshwater tank with a secure, key-operated inlet to keep your water safe.", image: "/Exterior/Freshwateinlet.webp" }
    ];

    return (
        <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black relative overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 to-white/40"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Enhanced background elements */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-br from-gray-900/5 to-gray-800/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gray-800/5 to-gray-900/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-3 sm:px-4 relative z-10">
                <PremiumSectionHeader
                    title="Additional Exterior Accessories"
                    description="Besides the options above, we offer other accessories to complete your campervan's exterior. Choose from these or bring your own ideas."
                />

                {/* Changed to 2 columns on mobile, 3 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
                    {accessories.map((item, index) => {
                        const IconComponent = getAccessoryIcon(item.title);

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.4 } }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg cursor-pointer bg-white border border-gray-300 hover:border-gray-900 transition-all duration-500"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-white/90 p-1 sm:p-1.5 rounded-md backdrop-blur-sm shadow-md border border-white/20 group-hover:bg-white transition-colors duration-300">
                                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                                    </div>
                                    {/* Enhanced overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="p-2 sm:p-3 md:p-4">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-md">
                                            <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                        </div>
                                        <h3 className="font-serif font-bold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-gray-800 transition-colors leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    {/* Always show description on mobile, show on hover for desktop */}
                                    <div className="block sm:max-h-0 sm:opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20 sm:group-hover:max-h-24 md:group-hover:max-h-32 group-hover:opacity-100">
                                        <p className="font-sans text-gray-700 text-[10px] sm:text-xs leading-relaxed border-l-2 border-gray-800 pl-1.5 sm:pl-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Enhanced border effect */}
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-900/10 to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-900/5 to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// --- PREMIUM CTA Component ---
function GalleryAndCTA() {
    return (
        <section className="relative py-8 sm:py-10 md:py-12 bg-gradient-to-br from-gray-50 to-white text-white overflow-hidden">
            {/* Enhanced background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/90"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="font-serif font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-white drop-shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Ready to Build Your Dream Van?
                    </motion.h3>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="inline-block"
                    >
                        <Link to="/contact">
                            <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-sans font-semibold text-sm py-2 px-6 rounded-lg transition-all duration-300 ease-out
                                           hover:shadow-xl hover:from-gray-900 hover:to-black shadow-lg border-2 border-gray-700/50 hover:border-gray-600
                                           transform hover:translate-y-[-2px]">
                                Start Your Build Journey
                            </button>
                        </Link>
                    </motion.div>

                    <motion.p
                        className="text-gray-300 font-sans text-sm sm:text-base mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Transform your van into the ultimate adventure companion with our premium exterior upgrades.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function ExteriorUpgradesPage() {
  return (
    <div className="bg-white">
      <div className="pt-12"></div>

      <InteractiveSection
        sectionTitle="Campervan Roof Options"
        sectionDescription="The area of your roof depends on the number of solar panels you install. The following are the choices we offer to customize your roof deck."
        optionsData={roofOptionsData}
        bgColor="bg-white"
      />

      <InteractiveSection
        sectionTitle="Rear Storage Options"
        sectionDescription="To maximize your campervan's storage, we offer different rear storage options. You can choose from the following or suggest your own."
        optionsData={rearStorageData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      <InteractiveSection
        sectionTitle="Campervan Window Options"
        sectionDescription="For insulated windows, we offer four main options. You can choose any according to your style and budget."
        optionsData={windowOptionsData}
        bgColor="bg-white"
      />

      <InteractiveSection
        sectionTitle="Van Body Extensions & Flares"
        sectionDescription="For a spacious interior and a rugged look, you can choose between carbon fibre flares and bump-outs."
        optionsData={bodyExtensionData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      {otherOptionsData.map((section, index) => (
         <InteractiveSection
           key={section.sectionTitle}
           sectionTitle={section.sectionTitle}
           sectionDescription={section.sectionDescription}
           optionsData={section.options}
           reverseLayout={index % 2 !== 0}
           bgColor={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
         />
      ))}

      <AdditionalAccessories />
      <GalleryAndCTA />
    </div>
  );
}