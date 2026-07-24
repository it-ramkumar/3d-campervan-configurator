// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import HeroSection from "../HeroSection/HeroSection";
// import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
// import {
//   Heading2,
//   Heading3,
//   RichParagraph,
//   PrimaryButton,
//   SecondaryButton
// } from '../Common/Common';

// // --- OPTIMIZED IMAGE COMPONENT ---
// const ProjectImages = ({ images, alt, slug }) => {
//   const hasMultiple = images?.length > 1;

//   return (
//     <div className="group relative w-full h-[300px] md:h-[450px] flex gap-2 p-2 overflow-hidden bbv-glass rounded-xl">
//       {/* Main Image Container */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className={`relative h-full overflow-hidden rounded-lg ${hasMultiple ? 'w-2/3' : 'w-full'}`}
//       >
//         <Image
//           src={images[0]}
//           alt={alt}
//           fill
//           priority
//           sizes="(max-width: 768px) 100vw, 50vw"
//           className="object-cover transition-transform duration-700 group-hover:scale-105"
//         />
//         {/* Amber bottom line accent on hover */}
//         <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </motion.div>

//       {/* Side Column (Grid) */}
//       {hasMultiple && (
//         <div className="w-1/3 flex flex-col gap-2 h-full">
//           {images.slice(1, 3).map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="relative flex-1 w-full overflow-hidden rounded-lg bg-primary/40"
//             >
//               <Image
//                 src={img}
//                 alt={`${alt} view ${i + 1}`}
//                 fill
//                 sizes="25vw"
//                 className="object-cover transition-transform duration-500 hover:scale-110"
//               />

//               {/* More Images Overlay */}
//               {i === 1 && images.length > 3 && (
//                 <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-secondary backdrop-blur-[2px]">
//                   <span className="text-xl font-bold">+{images.length - 3}</span>
//                   <span className="text-[10px] uppercase tracking-widest text-secondary/70">Photos</span>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Subtle Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
//     </div>
//   );
// };

// export default function CamperProjectsClient({ category, initialData, currentParams }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: layouts, pages: totalPages, filters: availableFilters } = initialData;
//   const currentPage = parseInt(currentParams.page) || 1;

//   const [searchTerm, setSearchTerm] = useState(currentParams.search || "");

//   const updateURL = (key, value) => {
//     const params = new URLSearchParams(currentParams);
//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }
//     if (key !== "page") params.set("page", "1");
//     router.push(`${pathname}?${params.toString()}`, { scroll: true });
//   };

//   const handleClearAll = () => {
//     setSearchTerm("");
//     router.push(pathname);
//   };

//   const formattedCategory = category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

//   return (
//     <main className="bg-primary min-h-screen">
//       <HeroSection
//         title={formattedCategory}
//         description={`Bespoke ${formattedCategory} configurations crafted for the ultimate journey.`}
//         image="/images2/family.webp"
//         showButton={false}
//       />

//       <section className="bbv-section-dark py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="bbv-dot-grid" />
//         <div className="container mx-auto max-w-[1300px] relative z-10">

//           {/* --- FILTER DASHBOARD --- */}
//           <div className="bbv-glass p-6 md:p-8 rounded-2xl mb-16">
//             <div className="flex items-center justify-between mb-8 pb-4 border-b border-secondary/10">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-hover/10 rounded-lg">
//                   <SlidersHorizontal size={20} className="text-hover" />
//                 </div>
//                 <Heading3 text="Refine Results" className="!mb-0 text-secondary tracking-tight font-display uppercase" />
//               </div>
//               {Object.keys(currentParams).length > 0 && (
//                 <button
//                   onClick={handleClearAll}
//                   className="text-xs font-semibold text-hover hover:underline flex items-center gap-1"
//                 >
//                   <X size={14} /> Reset Filters
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//               {/* Search Field */}
//               <div className="lg:col-span-1 space-y-2">
//                 <label className="text-hover text-[10px] font-bold uppercase tracking-widest ml-1">Search</label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Keywords..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && updateURL("search", searchTerm)}
//                     className="bbv-input w-full pl-10 pr-4 py-3 text-sm"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" size={16} />
//                 </div>
//               </div>

//               {/* Dynamic Selects */}
//               {[
//                 { label: "Seating", key: "sit", options: availableFilters?.sits },
//                 { label: "Sleeping", key: "sleep", options: availableFilters?.sleeps },
//               ].map((f) => (
//                 <div key={f.key} className="space-y-2">
//                   <label className="text-hover text-[10px] font-bold uppercase tracking-widest ml-1">{f.label}</label>
//                   <select
//                     value={currentParams[f.key] || ""}
//                     onChange={(e) => updateURL(f.key, e.target.value)}
//                     className="bbv-input w-full px-4 py-3 text-sm font-medium cursor-pointer appearance-none"
//                   >
//                     <option value="">All</option>
//                     {f.options && [...new Set(f.options.map(opt => opt.trim()))].map((opt, i) => (
//                       <option key={i} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* --- RESULTS GRID --- */}
//           <AnimatePresence mode="wait">
//             {layouts.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                 className="text-center py-32 bbv-glass rounded-3xl border-2 border-dashed border-secondary/10"
//               >
//                 <Search size={48} className="mx-auto text-secondary/20 mb-4" />
//                 <Heading3 text="No matching builds found." className="text-secondary/40" />
//                 <button onClick={handleClearAll} className="mt-4 text-hover font-medium">Clear search and try again</button>
//               </motion.div>
//             ) : (
//               <div className="space-y-20 md:space-y-32">
//                 {layouts.map((project, index) => {
//                   const isReversed = index % 2 !== 0;
//                   return (
//                     <motion.div
//                       key={project._id}
//                       initial={{ opacity: 0, y: 40 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true, margin: "-100px" }}
//                       transition={{ duration: 0.8, ease: "easeOut" }}
//                       className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
//                     >
//                       {/* Content Side */}
//                       <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
//                         <div className="inline-block px-3 py-1 bg-hover/10 rounded-full">
//                           <p className="text-hover uppercase text-[11px] tracking-[0.2em] font-bold mb-0">
//                             Big Bear Signature
//                           </p>
//                         </div>
//                         <Heading2 text={project.van_listing?.title} className="!text-3xl md:!text-4xl text-secondary font-display uppercase tracking-wide" />
//                         <RichParagraph className="text-secondary/60 leading-relaxed line-clamp-3 md:line-clamp-none">
//                           {project.van_listing?.description}
//                         </RichParagraph>
//                         <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                           <SecondaryButton
//                             label="Explore Configuration"
//                             link={`/layout-detail/${project.slug}`}
//                             className="group"
//                           />
//                         </div>
//                       </div>

//                       {/* Visual Side */}
//                       <div className="w-full lg:w-7/12">
//                         <ProjectImages images={project.gallery} alt={project.van_listing?.title} slug={project.slug} />
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             )}
//           </AnimatePresence>

//           {/* --- PAGINATION --- */}
//           {layouts.length > 0 && (
//             <div className="flex justify-center items-center gap-8 mt-32 pt-10 border-t border-secondary/10">
//               <button
//                 onClick={() => updateURL("page", currentPage - 1)}
//                 disabled={currentPage <= 1}
//                 className="p-3 rounded-full border border-secondary/20 disabled:opacity-30 hover:border-hover hover:text-hover text-secondary/70 transition-all"
//               >
//                 <ArrowRight className="rotate-180" size={20} />
//               </button>

//               <span className="text-sm font-bold tracking-widest text-secondary">
//                 PAGE {currentPage} <span className="text-secondary/30 mx-2">/</span> {totalPages}
//               </span>

//               <button
//                 onClick={() => updateURL("page", currentPage + 1)}
//                 disabled={currentPage >= totalPages}
//                 className="p-3 rounded-full border border-secondary/20 disabled:opacity-30 hover:border-hover hover:text-hover text-secondary/70 transition-all"
//               >
//                 <ArrowRight size={20} />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }
