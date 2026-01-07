"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { airportData } from "../../DataUseInComp/AirportData";
import Heading2 from "../Common/Headings/Heading2";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import Heading4 from "../Common/Headings/Heading4";
const AirportCard = ({ airport, code, time, description, isPrivate = false, index }) => (
  <motion.div
    className="group relative bg-gradient-to-br from-gray-900 to-black p-4 md:p-5 rounded-xl md:rounded-2xl border border-gray-800 shadow-lg md:shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden w-full max-w-xs mx-auto md:max-w-none"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Top section with airport info */}
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <div className="p-1 md:p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors shrink-0">
            <AirportIcon />
          </div>
          <div className="min-w-0 flex-1">
            <Heading4 text={airport} />

            {code && (
              <p className="font-serif text-gray-400 text-xs mt-0.5">{code}</p>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-gray-600 whitespace-nowrap ml-2 shrink-0">
          {time}
        </div>
      </div>

      {/* Description */}
      <RichParagraph textColor="text-white">
 {description}
      </RichParagraph>


      {/* Private Jet Badge */}
      {isPrivate && (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 px-2 py-1 rounded-full text-xs font-medium border border-amber-500">
          <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse"></span>
          Private Jet
        </div>
      )}
    </div>

    {/* Bottom border accent */}
    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${isPrivate ? 'from-amber-500 to-amber-600' : 'from-gray-600 to-gray-700'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
  </motion.div>
);
const AirportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
  </svg>
);
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export default function AirService() {

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-20 md:mt-28 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full opacity-10 blur-xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full opacity-10 blur-xl"></div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <LocationIcon />
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
<Heading2 text="How to Get Here?"/>

    <RichParagraph className="max-w-2xl mx-auto mt-4">
            We're easy to reach and can even pick you up
          </RichParagraph>
        </motion.div>

        {/* Airport Cards Grid */}
        <div className="space-y-6 md:space-y-8">
          {/* First 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
            {airportData.slice(0, 3).map((airport, index) => (
              <AirportCard key={index} {...airport} index={index} />
            ))}
          </div>

          {/* Last 2 cards centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-md md:max-w-2xl justify-items-center">
              {airportData.slice(3, 5).map((airport, index) => (
                <AirportCard key={index + 3} {...airport} index={index + 3} />
              ))}
            </div>
          </div>
        </div>

        {/* Premium Pickup Service Card */}
        <motion.div
          className="mt-12 md:mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-gray-800 relative overflow-hidden max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-gray-400 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-tr from-gray-400 to-transparent rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl md:rounded-2xl border border-gray-600">
                  <CarIcon />
                </div>
                <div className="text-left">
                  <Heading4 text="Complimentary Pickup" />
                  <RichParagraph textColor="text-white">
                    We'll greet you at the airport and bring you to our facility
                  </RichParagraph>
                </div>
              </div>

              <Link to="/contact">
                <motion.div
                  className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full border border-gray-500 cursor-pointer shrink-0 whitespace-nowrap"
                  whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="font-serif font-medium text-white text-sm md:text-base">
                    Schedule Pickup
                  </span>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
