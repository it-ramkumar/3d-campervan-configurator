// import { useEffect, useState } from "react";
// import { FaSnowflake } from "react-icons/fa";
// import santaImage from "/images/santa.webp"; // path to your Santa image

// export default function FullScreenBanner() {
//   const [visible, setVisible] = useState(true);
//   const [flakes, setFlakes] = useState([]);

//   useEffect(() => {
//     // Show banner for 5 seconds then hide
//     const timer = setTimeout(() => setVisible(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     // Generate snowflakes
//     const totalFlakes = 80;
//     const colors = ["white", "#ff4d4d"];
//     const newFlakes = [];

//     for (let i = 0; i < totalFlakes; i++) {
//       newFlakes.push({
//         id: i,
//         size: Math.random() * 20 + 10,
//         left: Math.random() * 100,
//         duration: Math.random() * 5 + 3,
//         delay: Math.random() * 5,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       });
//     }

//     setFlakes(newFlakes);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-gradient-to-br from-red-900 via-red-800 to-red-700">
//       {/* Full screen overlay with dark tint */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

//       {/* Snowfall */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         {flakes.map((flake) => (
//           <FaSnowflake
//             key={flake.id}
//             style={{
//               color: flake.color,
//               fontSize: `${flake.size}px`,
//               left: `${flake.left}%`,
//               animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`,
//             }}
//             className="absolute top-0 animate-pulse"
//           />
//         ))}
//       </div>

//       {/* Center Banner */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//         <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-8 rounded-2xl shadow-2xl border-4 border-yellow-300 border-opacity-50 animate-fade-in scale-110">
//           <div className="flex items-center justify-center">
//             <Image
//               src={santaImage}
//               alt="Santa"
//               className="w-24 h-24 md:w-32 md:h-32 animate-bounce"
//             />
//           </div>
//           <div className="flex flex-col text-center md:text-left">
//             <span className="text-4xl md:text-5xl font-bold mb-2 text-yellow-200 drop-shadow-lg">
//               Merry Christmas!
//             </span>
//             <span className="text-xl md:text-2xl text-white/90">
//               Wishing you joy & happiness this holiday season!
//             </span>
//             <span className="text-lg text-yellow-100 mt-4 animate-pulse">
//               🎄 🎅 🎁
//             </span>
//           </div>
//         </div>

//         {/* Optional: Close button */}
//         <button
//           onClick={() => setVisible(false)}
//           className="mt-8 mx-auto block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
//         >
//           Continue to Site
//         </button>
//       </div>

//       {/* Add CSS for animations */}
//       <style jsx>{`
//         @keyframes fall {
//           0% {
//             top: -10%;
//             transform: translateX(0) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             top: 100%;
//             transform: translateX(20px) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         @keyframes fade-in {
//           0% {
//             opacity: 0;
//             transform: scale(0.8);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }