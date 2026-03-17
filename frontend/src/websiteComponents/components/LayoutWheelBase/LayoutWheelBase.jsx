"use client";
import { useState, useEffect } from "react";
import { getByWheelBase } from "../../../api/portfolio/wheelBase";
import { useParams, useSearchParams } from "react-router-dom"; // useSearchParams add kiya
import HeroSection from "../HeroSection/HeroSection";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import {
  Heading2,
  RichParagraph,
  Heading3,
  ImageWithSkeleton,
  PrimaryButton,
  SecondaryButton
} from '../Common/Common';
import { Search, SlidersHorizontal } from "lucide-react";
import { generateWheelbaseLayoutsSchema } from "../../schema/layoutByWheelBase";

export default function CamperProjectsPage() {
  const { wheelbase } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // URL params ke liye

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
        const data = await getByWheelBase(
          wheelbase, currentPage, appliedFilters.search, appliedFilters.model,
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
  }, [wheelbase, currentPage, appliedFilters]);

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

  // Dynamic Content based on Wheelbase
  const contentMap = {
    "144": { title: "Sprinter 144 Wheelbase", img: "/images2/vfs2.webp", desc: "Explore the versatility of the Sprinter 144 wheelbase. Ideal for a range of campervan layouts." },
    "148": { title: "Transit 148 Wheelbase", img: "/images2/148.webp", desc: "Discover the spacious Transit 148 wheelbase. Perfect for custom campervan builds." },
    "159": { title: "Promaster 159 Wheelbase", img: "/images2/159.webp", desc: "Experience the expansive Promaster 159 wheelbase for maximum interior space." },
    "136": { title: "Promaster 136 Wheelbase", img: "/heroSlider/136.jpg", desc: "Uncover the compact efficiency of the Promaster 136 wheelbase." },
    "170": { title: "Mercedes Sprinter 170 Wheelbase", img: "/images2/vfs.webp", desc: "Experience ultimate freedom with the Mercedes Sprinter 170 wheelbase." }
  };

  const currentContent = contentMap[wheelbase] || { title: `${wheelbase} Wheelbase`, img: "/images2/vfs2.webp", desc: `Custom camper van layouts for ${wheelbase} wheelbase.` };
  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : "";
  const activeModel = searchParams.get('model');
  const modelSuffix = activeModel ? ` for ${activeModel}` : "";
  const pageTitle = `${currentContent.title}${modelSuffix} Layouts${pageSuffix} | Big Bear Vans`;
  const jsonLd = generateWheelbaseLayoutsSchema(layouts, wheelbase, currentPage);
const canonicalUrl = `https://bigbearvans.com${location.pathname}${currentPage > 1 ? `?page=${currentPage}` : ""}`;
  return (
    <>
    <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>{pageTitle}</title>
  <meta name="description" content={`${currentContent.desc}${pageSuffix}`} />
  <link rel="canonical" href={canonicalUrl} />

  {/* Robots Logic (Expertly handled, keep it!) */}
  {(currentPage > 1 || searchParams.toString()) ? (
    <meta name="robots" content="noindex, follow" />
  ) : (
    <meta name="robots" content="index, follow" />
  )}

  {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={`${currentContent.desc}${pageSuffix}`} />
  <meta property="og:url" content={`https://bigbearvans.com${location.pathname}${location.search}`} />
  {/* Yahan inventory ki sabse best van ki image ka link dein */}
  <meta property="og:image" content="https://bigbearvans.com/images/limage1.webp" />

  {/* ✅ 3. Twitter Card Tags (Added specific Title/Description/Image) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@bigbearvans" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={`${currentContent.desc}${pageSuffix}`} />
  <meta name="twitter:image" content="https://bigbearvans.com/images/limage1.webp" />

  {/* ✅ 4. JSON-LD Schema */}
  <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
</Helmet>
      <Navbar />

      <main className="bg-secondary min-h-screen">
        <HeroSection
          title={currentContent.title}
          description={currentContent.desc}
          image={currentContent.img}
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
                {/* Search */}
                <div className="space-y-2">
                  <RichParagraph className=" text-primary/40 uppercase !text-xs">Keywords</RichParagraph>
                  <div className="relative">
                    <input
                      type="text" placeholder="Search builds..." value={tempFilters.search}
                      onChange={(e) => setTempFilters({ ...tempFilters, search: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-secondary border-none rounded-[var(--radius-md)] focus:ring-2 focus:ring-hover text-sm text-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
                  </div>
                </div>

                {/* Select Filters */}
                {[
                  { label: "Model", key: "model", options: filters?.models },
                  { label: "Seating", key: "sit", options: filters?.sits },
                  { label: "Sleeping", key: "sleep", options: filters?.sleeps },
                  { label: "Bed Type", key: "bedType", options: filters?.bedType },
                  { label: "Bathroom", key: "bathroomType", options: filters?.bathroomType },
                ].map((f) => (
                  <div key={f.key} className="space-y-2">
                    <RichParagraph className=" text-primary/40 uppercase !text-xs">{f.label}</RichParagraph>
                    <select
                      value={tempFilters[f.key]}
                      onChange={(e) => setTempFilters({ ...tempFilters, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border-none rounded-[var(--radius-md)] focus:ring-2 focus:ring-hover text-sm text-primary font-medium appearance-none cursor-pointer"
                    >
                      <option value="">All {f.label}s</option>
                      {f.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-[var(--gap-md)] mt-10 pt-6 border-t border-secondary">
                <SecondaryButton label="Apply Filters" onClick={handleApplyFilters} />
                <PrimaryButton label="Clear All" onClick={handleClearFilters} />
              </div>
            </div>

            {/* --- RESULTS --- */}
            {loading ? <Loader /> : layouts.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[var(--radius-md)] border border-dashed border-primary/10">
                <Search size={48} className="mx-auto text-primary/10 mb-4" />
                <Heading3 text="No builds found for this wheelbase." className="!text-primary/40" />
              </div>
            ) : (
              <div className="space-y-[var(--gap-2xl)]">
                {layouts.map((project, index) => {
                  const isReversed = index % 2 !== 0;
                  return (
                    <div key={project._id} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-[var(--gap-xl)] lg:gap-[var(--gap-2xl)]`}>

                      <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-2">
                          <RichParagraph className="!text-hover uppercase !text-sm tracking-wider font-bold">Big Bear Classic</RichParagraph>
                          <Heading2 text={project.van_listing?.title} className="!text-left !text-primary !leading-tight" />
                        </div>
                        <RichParagraph className="!text-left !text-primary/80">
                          {project.van_listing?.description}
                        </RichParagraph>
                        <div className="pt-4">
                          <SecondaryButton label="View Details" link={`/layout-detail/${project.slug}`} />
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] shadow-2xl border border-primary/5">
                          <ImageWithSkeleton
                            src={project.gallery?.[0]}
                            alt={project.van_listing?.title}
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                          />
                        </div>
                        <div className={`absolute -bottom-10 w-1/2 aspect-square hidden md:block rounded-[var(--radius-lg)] overflow-hidden border-[10px] border-white shadow-2xl ${isReversed ? "-left-10" : "-right-10"}`}>
                          <ImageWithSkeleton src={project.gallery?.[1]} alt="Interior View" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {!loading && layouts.length > 0 && (
              <div className="flex justify-center items-center gap-[var(--gap-xl)] mt-32 pt-12 border-t border-primary/10">
                <SecondaryButton
                  label="Previous"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="!py-2 !px-6"
                />
                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-1">Page</p>
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