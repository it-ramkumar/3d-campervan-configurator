"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading2, Heading3, Heading4, RichParagraph } from "../Common/Common";
// Register ScrollTrigger for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// --- PLACEHOLDER IMAGES ---
const bgImageTechSafety = "/sprinter/image22.webp";
const bgImagePackages = "/sprinter/pp.webp";
const bgImageeSprinter = "/sprinter/pp1.webp";

// --- CONTENT STRUCTURE DEFINITIONS (No Change) ---
const techSafetyContent = [
    {
        title: "MBUX Multimedia System",
        description: [
            "10.25-inch display with faster processing power.",
            "Upgraded menu navigation for improved user experience.",
            "More intelligent voice assistant: Can execute commands without saying 'Hey Mercedes.'",
            "Wireless Apple CarPlay and Android Auto integration.",
            "Supports over-the-air (OTA) software updates.",
        ],
        col: 1,
    },
    {
        title: "Active Brake Assist (Enhanced Functions)",
        description: [
            "Intersection Function: Active up to 37 mph to avoid intersection collisions.",
            "Dangerous Overtaking Warning: Active up to 43 mph.",
            "Emergency Turning Assist: Active up to 25 mph for safer lane changes.",
        ],
        col: 1,
    },
    {
        title: "Steering Wheel",
        description: [
            "Features capacitive sensors to detect hand presence.",
            "Enhances driver safety and engagement.",
        ],
        col: 1,
    },
    {
        title: "Sideguard Assist",
        description: [
            "LED flash and acoustic alerts for vehicles on passenger side.",
        ],
        col: 2,
    },
    {
        title: "Moving-off Information Assist",
        description: [
            "Detects vehicles within 12 feet front / 19.6 inches side.",
            "Active up to 6 mph with audio-visual collision warnings.",
        ],
        col: 2,
    },
    {
        title: "Active Lane Keeping Assist",
        description: [
            "Improved with new front camera for better accuracy and response.",
        ],
        col: 2,
    },
    {
        title: "Digital Interior Mirror",
        description: [
            "Roof-mounted HDR camera provides rear visibility regardless of window presence.",
            "Clear view in all lighting conditions.",
        ],
        col: 2,
    },
    {
        title: "Rear-View Camera Integration",
        description: [
            "Hatched safety zone shown on central display for safe door opening.",
        ],
        col: 2,
    },
];

const packagesContent = [
    {
        title: "Winter Package Plus",
        description: [
            "Heated front seats and steering wheel.",
            "Wet wiper system for better cold-weather performance.",
        ],
        col: 1,
    },
    {
        title: "Standard Equipment",
        description: [
            "Tire pressure monitoring (front and rear for dual-wheel models).",
            "Rain sensor for automatic wiper activation.",
            "Entry handles on front doors.",
            "Passive child detection in crew and passenger models.",
        ],
        col: 1,
    },
    {
        title: "Mercedes me connect App:",
        description: [
            "Free maintenance, accident/breakdown support.",
            "Remote locking/unlocking.",
            "Satellite view and trailer navigation support.",
        ],
        col: 2,
    },
    {
        title: "Drive Assist Package",
        description: [
            "Includes multiple driver assistance features.",
            "360-degree camera system for full vehicle visibility.",
        ],
        col: 2,
    },
];

const eSprinterContent = [
    {
        title: "Battery Options",
        description: [
            "New high-capacity battery options for extended range.",
            "Faster charging capabilities (DC and AC).",
            "Battery position optimized for chassis stability.",
        ],
        col: 1,
    },
    {
        title: "Cargo and Payload",
        description: [
            "144-inch wheelbase:",
            "319 cubic feet cargo space.",
            "Payload: 3,516 lbs.",
            "170-inch wheelbase, high-roof:",
            "488 cubic feet cargo space.",
            "Payload: 3,120 lbs.",
        ],
        col: 2,
    },
    {
        title: "Gross Vehicle Weight",
        description: [
            "Up to 9,370 lbs across all eSprinter variants.",
        ],
        col: 3,
    },
];

// --- SIMPLIFIED ANIMATED GRAPHICS COMPONENTS (No Change) ---

const PulseWave = ({ color = "#10b981" }) => {
    return (
        <div className="relative w-2 h-2 mr-1.5 mt-0.5 flex-shrink-0">
            <div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: color }}
            />
            <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

const AnimatedProgressBar = ({ percentage = 100, color = "#3b82f6" }) => {
    return (
        <div className="relative w-3 h-0.5 mr-1.5 mt-1 bg-gray-600 rounded-full overflow-hidden flex-shrink-0">
            <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                }}
            />
        </div>
    );
};

const FloatingOrb = ({ color = "#ec4899" }) => {
    return (
        <div className="relative mr-1.5 mt-0.5 flex-shrink-0">
            <div
                className="rounded-full w-2 h-2"
                style={{
                    backgroundColor: color,
                }}
            />
        </div>
    );
};

const RotatingGear = ({ color = "#f59e0b" }) => {
    return (
        <div className="relative w-2.5 h-2.5 mr-1.5 mt-0.5 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M12 2V4M12 20V22M22 12H20M4 12H2M19.071 19.071L17.656 17.656M6.343 6.343L4.929 4.929M19.071 4.929L17.656 6.343M6.343 17.656L4.929 19.071"
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

const RadarSweep = ({ color = "#10b981" }) => {
    return (
        <div className="relative w-2.5 h-2.5 mr-1.5 mt-0.5 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: color, borderWidth: '1px' }} />
            <div className="absolute left-1/2 top-0 w-0.5 h-1/2 origin-bottom" style={{ backgroundColor: color }} />
            <div className="absolute left-1/2 top-1/2 w-0.5 h-0.5 -ml-0.25 -mt-0.25 rounded-full" style={{ backgroundColor: color }} />
        </div>
    );
};

const BatteryCharge = ({ level = 100, color = "#10b981" }) => {
    return (
        <div className="relative w-2 h-2 mr-1.5 mt-0.5 border rounded flex-shrink-0" style={{ borderColor: color, borderWidth: '1px' }}>
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                    height: `${level}%`,
                    backgroundColor: color
                }}
            />
            <div className="absolute -right-0.5 top-1/2 w-0.5 h-1 -mt-0.5 rounded-sm" style={{ backgroundColor: color }} />
        </div>
    );
};

const SignalBars = ({ strength = 4, color = "#3b82f6" }) => {
    const bars = [1, 2, 3, 4];

    return (
        <div className="flex items-end gap-0.5 mr-1.5 mt-0.5 h-2 flex-shrink-0">
            {bars.map((height, index) => (
                <div
                    key={index}
                    className={`w-0.5 rounded-t transition-all duration-300 ${
                        index < strength ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                        height: `${height * 1.5}px`,
                        backgroundColor: index < strength ? color : '#6b7280'
                    }}
                />
            ))}
        </div>
    );
};

const HeatWave = ({ color = "#ef4444" }) => {
    return (
        <div className="relative w-2 h-2 mr-1.5 mt-0.5 flex-shrink-0">
            <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

// Smart graphic mapping based on content (No Change)
const getGraphicForContent = (content) => {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('display') || lowerContent.includes('screen') || lowerContent.includes('processing'))
        return <SignalBars strength={4} color="#3b82f6" />;

    if (lowerContent.includes('voice') || lowerContent.includes('assistant') || lowerContent.includes('command'))
        return <PulseWave color="#ec4899" />;

    if (lowerContent.includes('update') || lowerContent.includes('ota') || lowerContent.includes('software'))
        return <RotatingGear color="#8b5cf6" />;

    if (lowerContent.includes('brake') || lowerContent.includes('collision') || lowerContent.includes('emergency'))
        return <RadarSweep color="#ef4444" />;

    if (lowerContent.includes('steering') || lowerContent.includes('wheel') || lowerContent.includes('sensor'))
        return <RotatingGear color="#f59e0b" />;

    if (lowerContent.includes('camera') || lowerContent.includes('mirror') || lowerContent.includes('view'))
        return <SignalBars strength={3} color="#8b5cf6" />;

    if (lowerContent.includes('battery') || lowerContent.includes('charging') || lowerContent.includes('electric'))
        return <BatteryCharge level={85} color="#10b981" />;

    if (lowerContent.includes('weight') || lowerContent.includes('payload') || lowerContent.includes('gross'))
        return <AnimatedProgressBar percentage={90} color="#6b7280" />;

    if (lowerContent.includes('heated') || lowerContent.includes('heat') || lowerContent.includes('warm'))
        return <HeatWave color="#ef4444" />;

    if (lowerContent.includes('tire') || lowerContent.includes('pressure') || lowerContent.includes('monitoring'))
        return <PulseWave color="#f59e0b" />;

    if (lowerContent.includes('space') || lowerContent.includes('cargo') || lowerContent.includes('capacity'))
        return <AnimatedProgressBar percentage={75} color="#10b981" />;

    return <FloatingOrb color="#6b7280" />;
};

// Individual Feature Card Component (Mobile Optimized - No Change)
const FeatureCard = ({ title, description }) => {
    return (
        <div className="group relative bg-black/20 backdrop-blur-lg rounded-lg p-2.5 border border-white/25 hover:border-white/30 transition-all duration-300 hover:shadow-lg">
            {/* Content */}
            <div className="relative z-10">
                <Heading4 text={title} className="!text-white !text-base"/>
                {/* <h3 className="font-serif font-semibold text-xs text-white mb-1.5 group-hover:text-emerald-100 transition-colors duration-300 leading-tight line-clamp-2">
                    {title}
                </h3> */}

                <ul className="space-y-1">
                    {description.map((line, lineIndex) => (
                        <li
                            key={lineIndex}
                            className="flex items-start gap-2 text-white/90 group-hover:text-gray-100 transition-colors duration-300 group/item p-1 rounded hover:bg-white/5 transition-all duration-200"
                        >
                            <div className="content-graphic flex-shrink-0 mt-[2px]">
                                {getGraphicForContent(line)}
                            </div>
                            <RichParagraph className="text-secondary! !text-xs">{line}</RichParagraph>
                            {/* <span className="flex-1 leading-relaxed font-serif text-[10px]">
                                {line}
                            </span> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function SprinterUpgrade() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only keep essential animations for titles
            gsap.utils.toArray(".section-title").forEach((title) => {
                gsap.from(title, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
                gsap.from(subtitle, {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: subtitle,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // Background image parallax (light version)
            gsap.utils.toArray(".bg-image-parallax").forEach((image) => {
                gsap.to(image, {
                    y: (i, target) => -(target.offsetHeight * 0.1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: image,
                        scrub: 0.5,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Updated helper function to render content with compact cards (No Change)
    const renderContent = (contentItems, columns = 2) => {
        const col1Content = contentItems.filter(item => item.col === 1);
        const col2Content = contentItems.filter(item => item.col === 2);
        const col3Content = contentItems.filter(item => item.col === 3);

        const columnClass = columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

        return (
            <div className={`grid ${columnClass} gap-2.5 px-3 max-w-7xl mx-auto z-10 relative`}>
                <div className="space-y-2.5">
                    {col1Content.map((item, index) => (
                        <FeatureCard
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

                <div className="space-y-2.5">
                    {col2Content.map((item, index) => (
                        <FeatureCard
                            key={index + col1Content.length}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

                {columns === 3 && (
                    <div className="space-y-2.5">
                        {col3Content.map((item, index) => (
                            <FeatureCard
                                key={index + col1Content.length + col2Content.length}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Compact Section Title component - REDUCED DESKTOP TITLE SIZE
    const SectionTitle = ({ title, subtitle, className = "" }) => (
        <div className={`text-center max-w-4xl mx-auto mb-4 px-3 ${className}`}>
            {/* Reduced title font size: md:text-2xl (from md:text-3xl) */}
            <Heading3 text={title} className="text-secondary!"/>
            {/* <h2 className="section-title font-serif font-bold text-lg md:text-2xl text-white leading-snug mb-1.5">
                {title}
            </h2> */}
            <RichParagraph className="text-secondary!">{subtitle}</RichParagraph>
            {/* <p className="section-subtitle font-serif font-normal text-xs md:text-sm text-white/80 leading-relaxed px-2">
                {subtitle}
            </p> */}
        </div>
    );

    return (
        <div ref={containerRef} className="bg-white min-h-screen relative">

            {/* Section 1: Technology, Safety, and Electric Options */}
            {/* MODIFIED: Increased mobile min-h and desktop min-h */}
            <section className="relative w-full min-h-[1100px] md:min-h-[700px] overflow-hidden py-10 md:py-12 mb-12 md:mb-16">
                <div
                    className="bg-image-parallax absolute inset-0 w-full h-full"
                    style={{ backgroundImage: `url(${bgImageTechSafety})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 pt-4 md:pt-6"> {/* Reduced top padding */}
                    <SectionTitle
                        title="2025 Sprinter Updates"
                        subtitle="2025 Mercedes-Benz Sprinter has updates in technology, safety, and electric options"
                    />

                    <div className="max-w-7xl mx-auto">
                        {renderContent(techSafetyContent)}
                    </div>
                </div>
            </section>

            {/* Section 2: Upgraded Packages and Standard Equipment */}
            {/* MODIFIED: Increased mobile min-h and desktop min-h */}
            <section className="relative w-full min-h-[550px] md:min-h-[500px] overflow-hidden py-10 md:py-12 mb-12 md:mb-16">
                <div
                    className="bg-image-parallax absolute inset-0 w-full h-full"
                    style={{ backgroundImage: `url(${bgImagePackages})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 pt-4 md:pt-6"> {/* Reduced top padding */}
                    <SectionTitle
                        title="2025 Sprinter Packages"
                        subtitle="Upgraded Packages and Standard Equipment"
                    />

                    <div className="max-w-7xl mx-auto">
                        {renderContent(packagesContent)}
                    </div>
                </div>
            </section>

            {/* Section 3: eSprinter Specific Updates */}
            {/* MODIFIED: Increased mobile min-h and desktop min-h */}
            <section className="relative w-full min-h-[450px] md:min-h-[400px] overflow-hidden py-10 md:py-12">
                <div
                    className="bg-image-parallax absolute inset-0 w-full h-full"
                    style={{ backgroundImage: `url(${bgImageeSprinter})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                   <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 pt-4 md:pt-6"> {/* Reduced top padding */}
                    <SectionTitle
                        title="2025 eSprinter Updates"
                        subtitle="Electric Vehicle Specific Changes"
                    />

                    <div className="max-w-7xl mx-auto">
                        {renderContent(eSprinterContent, 3)}
                    </div>
                </div>
            </section>
        </div>
    );
}