"use client";
import { useState, useEffect } from "react";
import { getByCategory } from "../../../api/portfolio/getByCategory";
import { useParams, useSearchParams } from "react-router-dom"; // useSearchParams add kiya
import HeroSection from "../HeroSection/HeroSection";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import { generateCategorizedLayoutsSchema } from "../../schema/layoutByCategorySchema"
import {
  Heading2,
  Heading3,
  RichParagraph,
  ImageWithSkeleton,
  PrimaryButton,
  SecondaryButton
} from '../Common/Common';
import { Search, SlidersHorizontal } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Swiper styles import karna mat bhooliyega (usually main App.js ya index.js mein)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


export default function CamperProjectsPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // URL params ke liye
console.log(category)
  const [layouts, setLayouts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // URL se page number get karo, default 1
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [appliedFilters, setAppliedFilters] = useState({
    search: searchParams.get('search') || "",
    model: searchParams.get('model') || "",
    sit: searchParams.get('sit') || "",
    sleep: searchParams.get('sleep') || "",
    bedType: searchParams.get('bedType') || "",
    bathroomType: searchParams.get('bathroomType') || ""
  });

  const [tempFilters, setTempFilters] = useState({
    search: searchParams.get('search') || "",
    model: searchParams.get('model') || "",
    sit: searchParams.get('sit') || "",
    sleep: searchParams.get('sleep') || "",
    bedType: searchParams.get('bedType') || "",
    bathroomType: searchParams.get('bathroomType') || ""
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getByCategory(
          category, currentPage, appliedFilters.search, appliedFilters.model,
          appliedFilters.sit, appliedFilters.sleep, appliedFilters.bedType, appliedFilters.bathroomType
        );
        if (data?.success) {
          setLayouts(data.data || []);
          setTotalPages(data.pages || 1);
          setFilters(data.filters || {});
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [category, currentPage, appliedFilters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // URL update karne ka function
  const updateURL = (newFilters, page = 1) => {
    const params = new URLSearchParams();

    // Page add karo (agar 1 nahi hai toh)
    if (page > 1) {
      params.set('page', page.toString());
    }

    // Filters add karo (agar empty nahi hai toh)
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    updateURL(tempFilters, 1); // Page 1 pe reset karo
  };

  const handleClearFilters = () => {
    const cleared = { search: "", model: "", sit: "", sleep: "", bedType: "", bathroomType: "" };
    setTempFilters(cleared);
    setAppliedFilters(cleared);
    updateURL(cleared, 1);
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      updateURL(appliedFilters, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      updateURL(appliedFilters, currentPage + 1);
    }
  };

  const formattedCategory = category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : "";
  const pageTitle = `${formattedCategory} Custom Van Layouts${pageSuffix} | Big Bear Vans`;
  const pageDesc = `Browse our ${formattedCategory} configurations. Custom built for comfort and adventure. ${pageSuffix}`;
  const canonicalUrl = `https://bigbearvans.com${location.pathname}${currentPage > 1 ? `?page=${currentPage}` : ""}`;
  const image = formattedCategory === "Flagship Long Van — Montreal" ? "/images2/couple.webp" :
  formattedCategory === "Flagship Short Van — Santa Monica" ? "/images2/flag-santa.webp" :
  formattedCategory === "Layouts for Families (3–9 People)" ? "/images2/couple.webp" : formattedCategory === "Layouts for Solo & Couple Travelers" ? "/images2/contact.webp" :formattedCategory === "Portfolio of Custom Builds" ? "/images2/family.webp":""
  console.log(formattedCategory,"")
  return (
    <>
      <Helmet>
        {/* ✅ 1. Standard SEO Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* ✅ 2. Search/Filter Logic (Expertly Handled) */}
        {(searchParams.get('model') || searchParams.get('search')) ? (
          <meta name="robots" content="noindex, follow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}

        {/* ✅ 3. Open Graph (Facebook/WhatsApp/LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        {/* Yahan ek generic layouts image ya hero image ka link dein */}
        <meta property="og:image" content="https://bigbearvans.com/images/p2.webp" />

        {/* ✅ 4. Twitter Card Tags (Added Missing Tags) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bigbearvans" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content="https://bigbearvans.com/images/p2.webp" />

        {/* ✅ 5. Missing JSON-LD (Zaroori for Layouts/Galleries) */}
        <script type="application/ld+json">
          {JSON.stringify(generateCategorizedLayoutsSchema(layouts, category, currentPage))}
        </script>
      </Helmet>
      <Navbar />
      <main className="bg-secondary min-h-screen">

        <HeroSection
          title={formattedCategory}
          description={`Bespoke ${formattedCategory} configurations crafted for the ultimate journey.`}
          image={image}
          showButton={false}
        />

        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-[1300px]">

            {/* --- FILTER DASHBOARD --- */}
            <div className="bg-white p-8 rounded-[var(--radius-md)] shadow-sm border border-primary/5 mb-16">
              <div className="flex items-center gap-[var(--gap-sm)] mb-8 pb-4 border-b border-secondary">
                <SlidersHorizontal size={20} className="!text-hover" />
                <Heading3 text="Filter Collection" className="!mb-0 !text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
                {/* Search Input */}
                <div className="space-y-2">
                  <RichParagraph className="text-primary/40 uppercase !text-xs">Keywords</RichParagraph>
                  <div className="relative">
                    <input
                      type="text" placeholder="Search builds..." value={tempFilters.search}
                      onChange={(e) => setTempFilters({ ...tempFilters, search: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-secondary border-none rounded-[var(--radius-md)] focus:ring-2 focus:ring-hover text-sm text-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
                  </div>
                </div>

                {/* Dynamic Selects */}
                {[
                  { label: "Base Model", key: "model", options: filters?.models },
                  { label: "Seating", key: "sit", options: filters?.sits },
                  { label: "Sleeping", key: "sleep", options: filters?.sleeps },
                  { label: "Bed Setup", key: "bedType", options: filters?.bedType },
                  { label: "Sanitation", key: "bathroomType", options: filters?.bathroomType },
                ].map((f) => (
                  <div key={f.key} className="space-y-2">
                    <RichParagraph className=" text-primary/40 uppercase !text-xs">{f.label}</RichParagraph>
                    <select
                      value={tempFilters[f.key]}
                      onChange={(e) => setTempFilters({ ...tempFilters, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border-none rounded-[var(--radius-md)] focus:ring-2 focus:ring-hover text-sm text-primary font-medium appearance-none cursor-pointer"
                    >
                      <option value="">All {f.label}s</option>
                      {f.options?.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-[var(--gap-md)] mt-10 pt-6 border-t border-secondary">
                <SecondaryButton label="Apply Filters" onClick={handleApplyFilters} />
                <PrimaryButton label="Clear All" onClick={handleClearFilters} />
              </div>
            </div>

            {/* --- RESULTS GRID --- */}
            {loading ? <Loader /> : layouts.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[var(--radius-md)] border border-dashed border-primary/10">
                <Search size={48} className="mx-auto text-primary/10 mb-4" />
                <Heading3 text="No builds found matching your criteria." className="!text-primary/40" />
              </div>
            ) : (
              <div className="space-y-[var(--gap-2xl)]">
                {layouts.map((project, index) => {
                  const isReversed = index % 2 !== 0;
                  return (
                    <div key={project._id} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-[var(--gap-xl)] lg:gap-[var(--gap-2xl)]`}>

                      {/* Content Side */}
                      <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-2">
                          <RichParagraph className="!text-hover uppercase !text-sm tracking-wider font-bold">Big Bear Signature</RichParagraph>
                          <Heading2 text={project.van_listing?.title} />
                        </div>
                        <RichParagraph >
                          {project.van_listing?.description}
                        </RichParagraph>
                        <div className="pt-4">
                          <SecondaryButton label="Explore Configuration" link={`/layout-detail/${project.slug}`} />
                        </div>
                      </div>

                      {/* Visual Side - Automatic Image Crossfade Loop */}
                      <div className="w-full lg:w-1/2 relative group">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg shadow-2xl border border-primary/5 bg-secondary">

                          <Swiper
                            modules={[Autoplay, EffectFade, Pagination]}
                            effect={'fade'} // Smooth fade transition
                            speed={1000}    // Transition speed
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                              dynamicBullets: true, // Chote dots premium lagte hain
                            }}
                            className="w-full h-full mySwiper"
                          >
                            {project.gallery?.map((img, i) => (
                              <SwiperSlide key={i}>
                                <div className="relative w-full h-full overflow-hidden">
                                  <ImageWithSkeleton
                                    src={img}
                                    alt={`${project.van_listing?.title} view ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                                  />

                                  {/* Overlay for better text visibility if needed */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none"></div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          {/* Custom CSS for Swiper Pagination Dots (Tailwind v4 compatible) */}
                          <style dangerouslySetInnerHTML={{
                            __html: `
      .swiper-pagination-bullet {
        background: var(--color-secondary) !important;
        opacity: 0.5;
      }
      .swiper-pagination-bullet-active {
        background: var(--color-hover) !important;
        opacity: 1;
        width: 12px;
        border-radius: 4px;
      }
    `}} />
                        </div>

                        {/* Theme Decorative Border (Using your --color-hover) */}
                        <div className={`absolute -z-10 w-full h-full -bottom-4 ${isReversed ? "-left-4" : "-right-4"} border-2 border-hover/20 rounded-lg hidden lg:block`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {!loading && layouts.length > 0 && (
              <div className="flex justify-center items-center gap-12 mt-40 pt-12 border-t border-primary/10">
                <SecondaryButton
                  label="Prev"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="!py-2 !px-6"
                />

                <div className="text-center">
                  <RichParagraph className=" text-primary/30 uppercase  mb-1">Page</RichParagraph>
                  <Heading3 text={`${currentPage} of ${totalPages}`} className="!mb-0 !text-primary" />
                </div>

                <SecondaryButton
                  label="Next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="!py-2 !px-6"
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}