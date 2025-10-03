"use client";

// Import the icons for the social media section
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

// MODIFIED: The project list has been completely replaced with your new data.
// NOTE: You must update the `largeImage` and `smallImage` paths for each project.
const projects = [
    {
        id: 1,
        name: "Oregon Campervan",
        description: "Oregon is our 170 AWD Sprinter campervan, designed for 2 people. It features a spacious rear bathroom with storage cabinets, a dinette bed system, a fully functional kitchen featuring a double induction cooktop, refrigerator, & microwave, and an upgraded exterior with a cargo carrier and a storage box.",
        largeImage: "/CoupleLayout/CL1.jpg", // UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL2.jpg"  // UPDATE THIS IMAGE PATH
    },
    {
        id: 2,
        name: "Calabasas Campervan",
        description: "Explore a custom 144 Sprinter van built for our client, who is an interior designer. Featuring a stationary bed, a full kitchen, a rear shower, a roll-out toilet, storage cabinets, and a large under-the-bed garage.",
        largeImage: "/CoupleLayout/CL3.jpg", // UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL4.jpg"  // UPDATE THIS IMAGE PATH
    },
    {
        id: 3,
        name: "Santa Barbara",
        description: "With a European layout, Santa Barbara is a 170 AWD Sprinter built for a pet owner. The van has a stationary bed, a spacious kitchen, and a real tile bathroom with a pull-out toilet & a tiny sink. It also has an extra bench that can be converted to an extra sleeping space.",
        largeImage: "/CoupleLayout/CL5.jpg", // UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL6.jpg"  // UPDATE THIS IMAGE PATH
    },
    {
        id: 4,
        name: "San Diego Van",
        description: "San Diego is our 159 FWD Ram ProMaster campervan, which we designed for a young architect who wanted to use it as a residence and workspace. The van has an ocean theme, a queen-size stationary bed, a closet, a spacious bathroom & kitchen, and a workdesk with swivel seats.",
        largeImage: "/CoupleLayout/CL7.jpg", // UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL8.jpg"  // UPDATE THIS IMAGE PATH
    },
    {
        id: 5,
        name: "Manchester Campervan",
        description: "For the first time, we worked with black cabinets set against bright natural wood in our Manchester van. Built for two people, the van has a comfy queen mattress, a roll-out portable toilet, off-grid power, a workstation, and a bike rack.",
        largeImage: "/CoupleLayout/CL9.jpg", // UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL10.jpg" // UPDATE THIS IMAGE PATH
    },
    {
        id: 6,
        name: "Milan Campervan",
        description: "Milan is our Ram ProMaster 159 FWD campervan, designed for 2 people. Equipped with a stationary bed, a real tile bathroom, a spacious kitchen with a gas oven, and premium off-grid power, this van is the dream of every van lover.",
        largeImage: "/CoupleLayout/CL11.jpg",// UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL12.jpg" // UPDATE THIS IMAGE PATH
    },
    {
        id: 7,
        name: "Phoenix",
        description: "Phoenix, a 144 Sprinter built for 2 people, has a stationary bed, a spacious kitchen, a rooftop hammock, and swivel seats. The unique thing in our short van is a retractable shower underneath the bed and a retractable toilet that wraps everything in foil automatically.",
        largeImage: "/CoupleLayout/CL13.jpg",// UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL14.jpg" // UPDATE THIS IMAGE PATH
    },
    {
        id: 8,
        name: "Baja",
        description: "Baja is a 159 FWD Promaster campervan with a corner to sit, a stationary bed, a large number of drawers, and a spacious kitchen with two propane burners, designed for living or traveling. It features a seating area in the corner (dinette) for comfortable sitting and dining, which can also transform into a daybed.",
        largeImage: "/CoupleLayout/CL15.png",// UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL16.jpg" // UPDATE THIS IMAGE PATH
    },
    {
        id: 9,
        name: "Sacramento Van",
        description: "Sacramento is our long ProMaster campervan, designed for two people. The van has 12V AC, 300Ah lithium batteries, a DC-DC charger, and a 2000W inverter so you can stay off-grid as long as you want. Featuring a stationary bed with an under-the-bed garage, a spacious kitchen, and a bathroom to give you home-like comfort on the road.",
        largeImage: "/CoupleLayout/CL17.png",// UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL18.png" // UPDATE THIS IMAGE PATH
    },
    {
        id: 10,
        name: "Porto Campervan",
        description: "Porto is a 144 AWD Mercedes-Benz Sprinter, designed for 2 people. Featuring a stationary bed & a bench, a spacious bathroom, and a functional kitchen. This van is perfect for those who want a spacious under-the-bed garage for storage.",
        largeImage: "/CoupleLayout/CL19.jpg",// UPDATE THIS IMAGE PATH
        smallImage: "/CoupleLayout/CL20.jpg" // UPDATE THIS IMAGE PATH
    },
];


export default function CamperProjectsPage() {
  return (
    <section className="bg-white font-serif py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className={`group max-w-[1250px] mx-auto flex flex-row ${isReversed ? 'flex-row-reverse' : ''} items-center justify-between gap-4 lg:gap-12 h-auto`}
              >
                <div className={`flex flex-col text-black w-1/2 text-center lg:text-left`}>
                  <h2 className="font-bold text-2xl md:text-3xl lg:text-[48px] leading-tight mb-4 lg:mb-6">
                    {project.name}
                  </h2>
                  {/* MODIFIED: This now displays the unique description for each van */}
                  <p className="text-xs md:text-base lg:text-[20px] leading-normal mb-6 lg:mb-10">
                    {project.description}
                  </p>
                  <button className="bg-[#2761FD] text-white font-sans font-bold text-[10px] md:text-[14px] rounded-md lg:rounded-[5px] w-24 h-8 md:w-[126px] md:h-[39px] flex items-center justify-center self-center lg:self-start transition-all duration-300 ease-in-out shadow-lg lg:group-hover:scale-110 lg:group-hover:bg-blue-700 lg:group-hover:shadow-xl lg:group-hover:-translate-y-1">
                    View Details
                  </button>
                </div>

                <div className="relative w-1/2 h-[200px] sm:h-[280px] md:h-[450px] lg:h-[550px] flex-shrink-0">
                  <img
                    src={project.largeImage}
                    alt={`${project.name} large view`}
                    loading="lazy"
                    className={`absolute top-0 w-[70%] h-full object-cover rounded-md lg:rounded-[10px] scale-x-[-1] transition-all duration-500 ease-in-out lg:group-hover:scale-110 lg:group-hover:brightness-105 ${isReversed ? 'left-0' : 'right-0'}`}
                  />
                  <img
                    src={project.smallImage}
                    alt={`${project.name} small view`}
                    loading="lazy"
                    className={`absolute w-[50%] h-[55%] object-cover rounded-md lg:rounded-[10px] shadow-2xl -bottom-2 md:-bottom-4 border-2 md:border-4 border-white transition-all duration-500 ease-in-out lg:group-hover:scale-115 lg:group-hover:shadow-2xl ${isReversed ? 'right-[5%]' : 'left-[5%]'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ADDED: Logo and Social Media Icons Section */}
        <div className="text-center pt-16 pb-0 flex flex-col items-center space-y-4">
          <img
            src="/images/logoo.png"
            alt="Big Bear Vans Logo"
            width={200}
            height={70}
            style={{ objectFit: 'contain' }}
            loading="lazy"
          />
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/bigbearvans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://www.facebook.com/bigbearvans" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fbigbearvans_" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube size={30} className="text-black cursor-pointer transform hover:scale-125 transition-transform duration-300" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}