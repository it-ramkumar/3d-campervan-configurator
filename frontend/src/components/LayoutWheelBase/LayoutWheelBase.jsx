// "use client";
// import React, { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import HeroSection from "../HeroSection/HeroSection";
// import { Search, SlidersHorizontal } from "lucide-react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
// import {
//   Heading2,
//   Heading3,
//   RichParagraph,
//   ImageWithSkeleton,
//   PrimaryButton,
//   SecondaryButton
// } from '../Common/Common';

// // Swiper Styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';

// export default function CamperProjectsClient({ category, initialData, currentParams }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { data: layouts, pages: totalPages, filters: availableFilters } = initialData;
//   const currentPage = parseInt(currentParams.page) || 1;

//   // Local state for search input taake user type kar sake bina foran filter apply huye
//   const [searchTerm, setSearchTerm] = useState(currentParams.search || "");

//   const updateURL = (key, value) => {
//     // 1. Current URL ke saare params pakdein
//     const params = new URLSearchParams(currentParams);

//     // 2. Naya value set karein (Chahe wo page ho ya filter)
//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }

//     // 3. URL update karein
//     // { scroll: true } rakhein taake user page ke top par chala jaye
//     router.push(`${pathname}?${params.toString()}`, { scroll: true });
//   };

//   const handleClearAll = () => {
//     setSearchTerm("");
//     router.push(pathname);
//   };

//   const formattedCategory = category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

//   return (
//     <main className="bg-secondary min-h-screen">
//       <HeroSection
//         title={formattedCategory}
//         description={`Bespoke ${formattedCategory} configurations crafted for the ultimate journey.`}
//         image="/images2/family.webp" // Isay aap category logic ke hisab se change kar sakte hain
//         showButton={false}
//       />

//       <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto max-w-[1300px]">

//           {/* --- FILTER DASHBOARD (Your Original Design) --- */}
//           <div className="bg-white p-8 rounded-lg shadow-sm border border-primary/5 mb-16">
//             <div className="flex items-center gap-4 mb-8 pb-4 border-b border-secondary">
//               <SlidersHorizontal size={20} className="text-hover" />
//               <Heading3 text="Filter Collection" className="!mb-0 !text-primary" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Search */}
//               <div className="space-y-2">
//                 <RichParagraph className="text-primary/40 uppercase !text-xs">Keywords</RichParagraph>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search and press Enter..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && updateURL("search", searchTerm)}
//                     className="w-full pl-10 pr-4 py-3 bg-secondary border-none rounded-md text-sm text-primary focus:ring-2 focus:ring-hover"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
//                 </div>
//               </div>

//               {/* Dynamic Selects from Backend Filters */}
//               {[
//                 { label: "Base Model", key: "model", options: availableFilters?.models },
//                 { label: "Seating", key: "sit", options: availableFilters?.sits },
//                 { label: "Sleeping", key: "sleep", options: availableFilters?.sleeps },
//                 { label: "Bed Setup", key: "bedType", options: availableFilters?.bedType },
//                 { label: "Sanitation", key: "bathroomType", options: availableFilters?.bathroomType },
//               ].map((f) => (
//                 <div key={f.key} className="space-y-2">
//                   <RichParagraph className="text-primary/40 uppercase !text-xs">{f.label}</RichParagraph>
//                   <select
//                     value={currentParams[f.key] || ""}
//                     onChange={(e) => updateURL(f.key, e.target.value)}
//                     className="w-full px-4 py-3 bg-secondary border-none rounded-md text-sm text-primary font-medium cursor-pointer focus:ring-2 focus:ring-hover"
//                   >
//                     <option value="">All {f.label}s</option>
//                     {f.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-4 mt-10 pt-6 border-t border-secondary">
//               <PrimaryButton label="Clear All" onClick={handleClearAll} />
//             </div>
//           </div>

//           {/* --- RESULTS GRID (Your Original Premium Design) --- */}
//           {layouts.length === 0 ? (
//             <div className="text-center py-32 bg-white rounded-lg border border-dashed border-primary/10">
//               <Search size={48} className="mx-auto text-primary/10 mb-4" />
//               <Heading3 text="No builds found matching your criteria." className="!text-primary/40" />
//             </div>
//           ) : (
//             <div className="space-y-24">
//               {layouts.map((project, index) => {
//                 const isReversed = index % 2 !== 0;
//                 return (
//                   <div key={project._id} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-24`}>

//                     {/* Content Side */}
//                     <div className="w-full lg:w-1/2 space-y-6">
//                       <RichParagraph className="!text-hover uppercase !text-sm tracking-wider font-bold">Big Bear Signature</RichParagraph>
//                       <Heading2 text={project.van_listing?.title} />
//                       <RichParagraph>{project.van_listing?.description}</RichParagraph>
//                       <div className="pt-4">
//                         <SecondaryButton label="Explore Configuration" link={`/layout-detail/${project.slug}`} />
//                       </div>
//                     </div>

//                     {/* Swiper Visual Side */}
//                     <div className="w-full lg:w-1/2 relative group">
//                       <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg shadow-2xl border border-primary/5 bg-secondary">
//                         <Swiper
//                           modules={[Autoplay, EffectFade, Pagination]}
//                           effect={'fade'}
//                           speed={1000}
//                           autoplay={{ delay: 3000, disableOnInteraction: false }}
//                           pagination={{ clickable: true, dynamicBullets: true }}
//                           className="w-full h-full"
//                         >
//                           {project.gallery?.map((img, i) => (
//                             <SwiperSlide key={i}>
//                               <ImageWithSkeleton
//                                 src={img}
//                                 alt={project.van_listing?.title}
//                                 className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
//                               />
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                         <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none z-10"></div>
//                       </div>
//                       <div className={`absolute -z-10 w-full h-full -bottom-4 ${isReversed ? "-left-4" : "-right-4"} border-2 border-hover/20 rounded-lg hidden lg:block`}></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* --- PAGINATION (Standard Dynamic) --- */}
//           {layouts.length > 0 && (
//             <div className="flex justify-center items-center gap-12 mt-40 pt-12 border-t border-primary/10">
//               {/* Prev Button */}
//               <SecondaryButton
//                 label="Prev"
//                 onClick={() => updateURL("page", currentPage - 1)}
//                 disabled={currentPage <= 1}
//               />

//               {/* Next Button */}
//               <SecondaryButton
//                 label="Next"
//                 onClick={() => updateURL("page", currentPage + 1)}
//                 disabled={currentPage >= totalPages}
//               />
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Swiper Dots Custom CSS */}
//       <style dangerouslySetInnerHTML={{
//         __html: `
//         .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
//         .swiper-pagination-bullet-active { background: #ED3500 !important; opacity: 1; width: 12px; border-radius: 4px; }
//       `}} />
//     </main>
//   );
// }