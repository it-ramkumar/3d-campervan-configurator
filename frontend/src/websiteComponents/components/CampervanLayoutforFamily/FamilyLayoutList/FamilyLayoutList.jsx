"use client";

// MODIFIED: Added FaFacebook to the import
import { FaTwitter, FaYoutube, FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

// Data for all 24 camper van projects remains the same...
const projects = [
    { id: 1, name: "Montreal", largeImage: "/FamilyLayout/FL1.jpg", smallImage: "/FamilyLayout/FL2.png", description: "Our Montreal 170 AWD Sprinter is a thoroughly insulated and winter-ready campervan, designed for 4-5 people. The van features a fully off-grid electrical system, a water-air diesel heater, a spacious indoor bathroom with a hidden pantry, and storage cabinets, making it an ideal home on wheels for you." },
    { id: 2, name: "Santa Cruz", largeImage: "/FamilyLayout/FL3.jpg", smallImage: "/FamilyLayout/FL4.jpg", description: "Explore our Santa Cruz van, a 144 AWD Sprinter, designed for 2-4 people. It features an elevator & dinette bed system, a spacious kitchen, a powder-coated aluminum bathroom, and off-grid power with a 400Ah Lithium battery, 400W solar panel, and a 3000W inverter." },
    { id: 3, name: "Santa Monica", largeImage: "/FamilyLayout/FL5.jpg", smallImage: "/FamilyLayout/FL6.jpg", description: "Santa Monica is a 144 AWD Sprinter van, built for 4-5 people. It’s a one-of-a-kind short van that has a fully off-grid electrical setup, a spacious kitchen, an elevator & dinette bed system, and double swivel seats that convert into another bed. The van showcases our signature component: a bathroom with a hidden pantry." },
    { id: 4, name: "Lake Tahoe", largeImage: "/FamilyLayout/FL7.jpg", smallImage: "/FamilyLayout/FL8.jpg", description: "Check out our Lake Tahoe van, a 144 AWD Sprinter, built for a family of four. The couple chooses us because of our family layouts that feature an elevator & dinette bed system, storage cabinets, a spacious kitchen with a bamboo countertop, and a premium electrical system." },
    { id: 5, name: "Carlsbad", largeImage: "/FamilyLayout/FL9.jpg", smallImage: "/FamilyLayout/FL10.png", description: "Have a look at our Carlsbad van, a 144 AWD Sprinter for 4 people. Equipped with an aluminium bathroom, elevator & dinette bed system, full kitchen, a premium electrical system, double swivel seats, insulated awning-style windows, and a big projector screen." },
    { id: 6, name: "Vermont", largeImage: "/FamilyLayout/FL11.jpg", smallImage: "/FamilyLayout/FL12.png", description: "Explore Vermont, our 170 AWD Sprinter campervan, built for a couple and their grandchildren. It has off-grid power, a fully functional kitchen, a small closet, two storage boxes, and a power lift for bicycles on the exterior. Vermont van features one of our signature components, a bathroom with a hidden pantry." },
    { id: 7, name: "Cusco", largeImage: "/FamilyLayout/FL13.jpg", smallImage: "/FamilyLayout/FL14.jpg", description: "Designed for a pet owner, Cusco is a 170 AWD Sprinter for 4-5 people. Equipped with an elevator & dinette bed system and a full kitchen with a three-cooktop stove & an oven. The van also has a dog couch with a built-in refrigerator for dog food and two water bowls." },
    { id: 8, name: "Calavera", largeImage: "/FamilyLayout/FL15.jpg", smallImage: "/FamilyLayout/FL16.jpg", description: "Calavera is our 170 AWD Sprinter campervan, built for 4 people. The van has an elevator & dinette bed system and a full kitchen with a propane cooktop & a large refrigerator. Calavera is off-grid ready with a 40A DC-DC battery charger, 800Ah batteries, 350W solar panel, 2000W inverter, and 12V AC." },
    { id: 9, name: "San Clemente", largeImage: "/FamilyLayout/FL17.jpg", smallImage: "/FamilyLayout/FL18.jpg", description: "Check out our 170 AWD Sprinter campervan, designed for 4 people. Equipped with an aluminum bathroom and a portable toilet, a fully functional kitchen with a spacious countertop, and a premium electrical system. The van’s exterior features a Sherpa carrier, bike tubes, an expedition box, and a storage box." },
    { id: 10, name: "Mont Fort", largeImage: "/FamilyLayout/FL19.jpg", smallImage: "/FamilyLayout/FL20.jpg", description: "Check out our Mont Fort van, a 170 AWD Sprinter, designed for 4-5 people. Our van features an elevator & dinette bed system along with a double swivel seat for 5 people, an aluminium shower, and a premium electrical system for off-grid freedom." },
    { id: 11, name: "Santa Monica American Oak", largeImage: "/FamilyLayout/FL21.jpg", smallImage: "/FamilyLayout/FL22.jpg", description: "Our Santa Monica van is a 144 AWD Sprinter built for 4 people. The van is fully off-grid ready, featuring 12V AC, 600Ah lithium batteries, solar panels, and a water-air diesel heater. Click to check out." },
    { id: 12, name: "Santa Monica Black", largeImage: "/FamilyLayout/FL23.jpg", smallImage: "/FamilyLayout/FL24.jpg", description: "Our 144 AWD Sprinter is designed for a family of five, featuring 12V AC, 600Ah lithium batteries, an aluminium shower with a separate toilet, elevator bed, dinette benches, and double swivel seats that convert into a bed." },
    { id: 13, name: "Santa Monica Gray", largeImage: "/FamilyLayout/FL25.jpg", smallImage: "/FamilyLayout/FL26.jpg", description: "Our Santa Monica Grey is a 144 AWD Sprinter designed for 4 people. This custom van has a fully functional kitchen featuring a 3.2 cu ft fridge, an induction cooktop & a microwave, a deep sink, and many storage cabinets & drawers. The exterior has a large storage box to store all your gear accessories." },
    { id: 14, name: "Paris", largeImage: "/FamilyLayout/FL27.jpg", smallImage: "/FamilyLayout/FL28.jpg", description: "Paris is our family-friendly Sprinter van, offering seating and sleeping accommodations for up to four people. The van is equipped with an elevator & dinette bed system, a premium electrical system for off-grid stays, and swivel seats with a recline feature." },
    { id: 15, name: "Montreal", largeImage: "/FamilyLayout/FL29.jpg", smallImage: "/FamilyLayout/FL30.jpg", description: "Montreal is our 170 AWD Sprinter, built to accommodate a family of five. In our van, one can comfortably sit and sleep on its elevator bed, dinette benches, and double swivel seat that transforms into a bed. A functional kitchen, real tile bathroom, and off-grid power are ready to use to make trips easier and unforgettable." },
    { id: 16, name: "Lagos", largeImage: "/FamilyLayout/FL31.jpg", smallImage: "/FamilyLayout/FL32.jpg", description: "Lagos is our short Sprinter campervan for a family with children, featuring a premium electrical setup, an elevator & dinette bed system, and extra seats, along with a swivel table that caters to both the second-row seats and the driver upfront. The van also features a rear outdoor shower and an inside toilet with a curtain." },
    { id: 17, name: "Palermo", largeImage: "/FamilyLayout/FL33.jpg", smallImage: "/FamilyLayout/FL34.jpg", description: "Built for a well-known traveling YouTuber couple, Palermo campervan boasts a stunning ‘Boho style’ design in the rear section, featuring an elegant combination of white and natural wood. It is equipped with off-grid power, a spacious kitchen, an elevator & dinette bed system, a large number of drawers, and a hidden fold-away indoor metal shower." },
    { id: 18, name: "Amsterdam", largeImage: "/FamilyLayout/FL35.jpg", smallImage: "/FamilyLayout/FL36.jpg", description: "Amsterdam is our 148 AWD Transit campervan, designed to comfortably seat 8 people and provide sleeping arrangements for four. The highlight of this project is the spacious rear bathroom with a toilet, a shower, and a sink, and it also has L-tracks to store your gear." },
    { id: 19, name: "Big Bear", largeImage: "/FamilyLayout/FL37.jpg", smallImage: "/FamilyLayout/FL38.jpg", description: "Our Big Bear van was for a family of five. There were three children, five sets of skis, and five bicycles, and we managed to fit all in this 170 AWD Sprinter. Along with the elevator & dinette bed system, the van also has a rooftop tent for guests. The most unique thing in this van is the pull-out kitchen, which has a steel sink, stove, and a chopping board." },
    { id: 20, name: "Sugarloaf", largeImage: "/FamilyLayout/FL39.jpg", smallImage: "/FamilyLayout/FL40.jpg", description: "From a passenger van with many windows to a stunning campervan, we designed the Sugarloaf van for a grandmother and her three grandchildren and a dog. The van has a big projector screen, an elevator & dinette bed system, a spacious bathroom & kitchen with a large-size fridge, and double foldable seats to accommodate a dog, kids, and their grandma." },
    { id: 21, name: "Motovan", largeImage: "/FamilyLayout/FL41.jpg", smallImage: "/FamilyLayout/FL42.jpg", description: "Our 170 AWD Moto Van is an adventurer van. We’re the first ones who have succeeded in creating a separate garage for three motorcycles with a car wash, a shower, and storage for all equipment. Additionally, there is a separate living space for five people with a full kitchen, a loft bed, and seats that can be converted into another bed." },
    { id: 22, name: "Portland", largeImage: "/FamilyLayout/FL43.jpg", smallImage: "/FamilyLayout/FL44.jpg", description: "Our AWD short is built for four people. Portland has all you want in a van, including a closet, a large number of storage drawers, off-grid power, a spacious kitchen with a deep sink & single induction cooktop, a projector screen, and an elevator & dinette bed system." },
    { id: 23, name: "Madrid", largeImage: "/FamilyLayout/FL45.jpg", smallImage: "/FamilyLayout/FL46.jpg", description: "Madrid, a 148 AWD Transit, is designed to accommodate 4 people since it has an elevator bed and dinette benches that transform into another bed. For the first time, we cleverly hide the shower and cassette toilet inside a bench with a pull-out curtain to maximize the functionality of every part of the van." },
    { id: 24, name: "Blue Whale", largeImage: "/FamilyLayout/FL47.jpg", smallImage: "/FamilyLayout/FL48.jpg", description: "Blue Whale van is our one-of-a-kind family van in history among short vans that can accommodate and sleep six people with a kitchen, an electric bed, a bathroom, a retractable balcony, a rooftop hammock, air conditioning, and basically everything one could imagine." },
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
        
        {/* MODIFIED: Reduced top padding and spacing between logo and icons */}
        <div className="text-center pt-16 pb-0 flex flex-col items-center space-y-4">
          <img
            src="/images/logoo.png"
            alt="Big Bear Vans Logo"
            width={200}
            height={70}
            style={{ objectFit: 'contain' }}
            loading="lazy"
          />

          {/* MODIFIED: Updated links and icons */}
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