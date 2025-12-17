import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";



export default function AdditionalAccessories() {
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
 const accessories = [
        { title: "Saucer Swing", description: "Easy to set up and pack away. Lightweight and can be stowed without requiring extra storage space.", image: "/Exterior/Sucerswing.jpg" },
        { title: "Surfboard Rack", description: "Secure your surfboard to the roof or side of the van. The right rack depends on your van and board count.", image: "/Exterior/Surfboardrack.jpg" },
        { title: "Exterior Van Lights", description: "Custom placement at the front, rear, or passenger side awning for perfect campsite illumination.", image: "/Exterior/exteriorfrontendlight.jpg" },
        { title: "Outdoor Van Shower", description: "Connects to your van's water system for hot and cold water. Pair with a privacy curtain for convenience.", image: "/Exterior/Rearoutdoorshower.jpg" },
        { title: "360° Camera", description: "Get a complete surround view of your campervan for safer parking and navigating tight spots.", image: "/Exterior/360.jpg" },
        { title: "Rear Foldable Patio", description: "Adds up to 6 sq ft of functional outdoor space. Unfolds in seconds for chairs or cooking.", image: "/Exterior/Foldablerearpatio.jpg" },
        { title: "Van Suspension System", description: "Upgraded Falcon shocks, bump buddies, and leaf springs for a smooth ride on any terrain.", image: "/Exterior/suspension.jpg" },
        { title: "Tires & Wheels", description: "Black Rhino Arsenal wheels (16\"-17\") paired with severe-snow-rated BFGoodrich KO2 All-Terrain Tires.", image: "/Exterior/tiree.jpg" },
        { title: "Side Ladder", description: "Lightweight (18 lbs) ladder for easy roof access, typically on the driver's side or rear.", image: "/Exterior/Sideladder.jpg" },
        { title: "30A Shore Power Inlet", description: "Charge your campervan before traveling with an easy connection to campground power.", image: "/Exterior/30A.jpg" },
        { title: "Dump Valve", description: "For easy & hygienic removal of grey water, positioned for quick connection at disposal stations.", image: "/Exterior/Dumpvalve.jpg" },
        { title: "Freshwater Inlet", description: "Refill your freshwater tank with a secure, key-operated inlet to keep your water safe.", image: "/Exterior/Freshwateinlet.jpg" }
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
                    {accessories?.map((item, index) => {
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
                                    <ImageWithSkeleton
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-32 sm:h-40 md:h-48 object-cover "
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
