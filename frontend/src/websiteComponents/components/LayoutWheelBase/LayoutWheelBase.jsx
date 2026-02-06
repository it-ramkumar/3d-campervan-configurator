"use client";
import { useState, useEffect } from "react";
import { getByWheelBase } from "../../../api/portfolio/wheelBase";
import { useParams } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader"
import { Heading2, RichParagraph, Heading3, ImageWithSkeleton, WhiteButton, BlackButton } from '../Common/Common'

import { layoutByWheelbaseSchema } from "../../schema/layoutByWheelBase"

export default function CamperProjectsPage() {
  const { wheelbase } = useParams();

  const [layouts, setLayouts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({});

  // MAIN FILTER STATES (applied filters)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    model: "",
    sit: "",
    sleep: "",
    bedType: "",
    bathroomType: ""
  });

  // TEMP STATES (before Apply Filters)
  const [tempFilters, setTempFilters] = useState({
    search: "",
    model: "",
    sit: "",
    sleep: "",
    bedType: "",
    bathroomType: ""
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const data = await getByWheelBase(
          wheelbase,
          page,
          appliedFilters.search,
          appliedFilters.model,
          appliedFilters.sit,
          appliedFilters.sleep,
          appliedFilters.bedType,
          appliedFilters.bathroomType
        );

        if (data?.success) {
          setLayouts(data.data || []);
          setTotalPages(data.pages || 1);
          setFilters(data.filters || {});
        } else {
          console.error("Failed:", data?.message);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [wheelbase, page, appliedFilters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // APPLY FILTERS
  const handleApplyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setPage(1);
  };

  // CLEAR FILTERS
  const handleClearFilters = () => {
    const cleared = {
      search: "",
      model: "",
      sit: "",
      sleep: "",
      bedType: "",
      bathroomType: ""
    };
    setTempFilters(cleared);
    setAppliedFilters(cleared);
    setPage(1);
  };

  const heroImage =
    wheelbase === "144"
      ? "/heroSlider/144.jpg"
      : wheelbase === "148"
        ? "/heroSlider/148.jpg"
        : wheelbase === "159"
          ? "/heroSlider/159.jpg"
          : wheelbase === "136"
            ? "/heroSlider/136.jpg"
            : wheelbase === "170"
              ? "/heroSlider/170.png"
              : "/heroSlider/170";
  const newTitleText =
    wheelbase === "144"
      ? "Sprinter 144 Wheelbase"
      : wheelbase === "148"
        ? "Transit 148 Wheelbase"
        : wheelbase === "159"
          ? "Promaster 159 Wheelbase"
          : wheelbase === "136"
            ? "Promaster 136 Wheelbase"
            : wheelbase === "170"
              ? "Mercedes Sprinter 170 Wheelbase"
              : "";
  const newDescriptionText =
    wheelbase === "144"
      ? "Explore the versatility of the Sprinter 144 wheelbase. Ideal for a range of campervan layouts, offering ample space and comfort for your adventures."
      : wheelbase === "148"
        ? "Discover the spacious Transit 148 wheelbase. Perfect for custom campervan builds that prioritize roominess and functionality for all your travel needs."
        : wheelbase === "159"
          ? "Experience the expansive Promaster 159 wheelbase. Designed for those seeking maximum interior space and flexibility in their campervan lifestyle."
          : wheelbase === "136"
            ? "Uncover the compact efficiency of the Promaster 136 wheelbase. Great for agile campervan designs that don't compromise on comfort and utility."
            : wheelbase === "170"
              ? "Experience ultimate freedom with the Mercedes Sprinter 170 wheelbase. Designed for full-time van life, offering maximum living space, expansive layouts, and unparalleled comfort for long-distance adventures."
              : "";

  const filterConfig = [
    { key: "search", label: "Search", type: "text" },
    { key: "model", label: "Model", type: "select", options: filters?.models },
    { key: "sit", label: "Sits", type: "select", options: filters?.sits },
    { key: "sleep", label: "Sleeps", type: "select", options: filters?.sleeps },
    { key: "bedType", label: "Bed Type", type: "select", options: filters?.bedType },
    { key: "bathroomType", label: "Bathroom Type", type: "select", options: filters?.bathroomType }
  ];
  const pageTitle = newTitleText[wheelbase] || `${wheelbase} Wheelbase`;
  const pageKeywords = `${wheelbase} wheelbase layout, custom ${wheelbase} van build, ${wheelbase} sprinter conversion, camper van floor plans ${wheelbase}, big bear vans ${wheelbase}`;
  const pageDescription = newDescriptionText[wheelbase] || `Custom camper van layouts for ${wheelbase} wheelbase.`;
  const jsonLd = layoutByWheelbaseSchema(wheelbase, layouts)
  return (
    <>
      {/* ✅ SEO META TAGS */}
      <title>{`${pageTitle} Layouts | Big Bear Vans`}</title>
      <meta name="keywords" content={pageKeywords} />
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={`https://bigbearvans.com/wheelbase/${wheelbase}`} />

      {/* 🆕 ADDITIONAL IMPORTANT TAGS */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#f8fafc" /> {/* Aapke bigbear theme ke mutabiq */}

      {/* ✅ OPEN GRAPH (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${pageTitle} Layouts | Big Bear Vans`} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`https://bigbearvans.com/wheelbase/${wheelbase}`} />

      {/* ✅ TWITTER CARDS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${pageTitle} Layouts | Big Bear Vans`} />
      <meta name="twitter:description" content={pageDescription} />

      {/* ✅ JSON-LD SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Navbar />
      <div className="tour-hero">
        <HeroSection
          title={newTitleText}
          description={newDescriptionText}
          image={heroImage}
          showButton={false}
        />
      </div>

      <section className="bg-white font-serif py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* FILTER SECTION */}
          <div className="max-w-[1250px] mx-auto mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
            <Heading2 text="Filter Vans" />
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${filterConfig.length} gap-4 mb-4`}>
              {filterConfig.map((filter) => (
                <div key={filter.key}>
                  {/* label mein htmlFor add kiya */}
                  <label
                    htmlFor={`filter-${filter.key}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {filter.label}
                  </label>

                  {filter.type === "text" ? (
                    <input
                      id={`filter-${filter.key}`} // Yahan unique ID di
                      type="text"
                      placeholder={`Search ${filter.label.toLowerCase()}...`}
                      value={tempFilters[filter.key]}
                      onChange={(e) =>
                        setTempFilters({ ...tempFilters, [filter.key]: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                    />
                  ) : (
                    <select
                      id={`filter-${filter.key}`} // Yahan bhi unique ID di
                      value={tempFilters[filter.key]}
                      onChange={(e) =>
                        setTempFilters({ ...tempFilters, [filter.key]: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                    >
                      <option value="">All {filter.label}</option>
                      {filter.options?.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <BlackButton onClick={handleApplyFilters} label={"Apply Filters"} />
              <WhiteButton onClick={handleClearFilters} label={"Clear All"} />
            </div>
          </div>

          {/* RESULTS */}
          {loading ? (
            <Loader />
          ) : layouts.length === 0 ? (
            <div className="text-center py-20 text-lg text-gray-600">No vans found.</div>
          ) : (
            <div className="space-y-16">
              {layouts.map((project, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <div
                    key={project._id}
                    className={`group max-w-[1250px] mx-auto flex flex-row ${isReversed ? "flex-row-reverse" : ""
                      } items-center justify-between gap-4 lg:gap-12`}
                  >
                    {/* TEXT */}
                    <div className="flex flex-col text-black w-1/2 text-center lg:text-left">
                      <Heading2 text={project.van_listing?.title} />
                      <RichParagraph className="my-2">

                        {project.van_listing?.description}
                      </RichParagraph>

                      <BlackButton
                        label="View Details"
                        link={`/layout-detail/${project.slug}`}
                      />
                    </div>

                    {/* IMAGES */}
                    <div className="relative w-1/2 h-[350px] lg:h-[550px]">
                      <ImageWithSkeleton
                        alt={project.van_listing?.title || "Van Layout Image"}
                        src={project.gallery?.[0]}
                        className={`absolute top-0 w-[70%] h-full object-cover ${isReversed ? "left-0" : "right-0"
                          }`}
                      />

                      <ImageWithSkeleton
                        alt={project.van_listing?.title || "Van Layout Image"}
                        src={project.gallery?.[1]}
                        className={`absolute w-[50%] h-[55%] object-cover -bottom-2 ${isReversed ? "right-[5%]" : "left-[5%]"
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}
          {!loading && layouts.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-20">
              <BlackButton label={"Previous"} onClick={() => setPage(page - 1)}

                disabled={page === 1} />


              <span className="text-lg font-semibold text-gray-700">
                Page {page} of {totalPages}
              </span>

              <BlackButton
                label={"Next"}
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}

              />

            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
