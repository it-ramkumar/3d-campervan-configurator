"use client";
import { useState, useEffect } from "react";
import { getByCategory } from "../../../api/portfolio/getByCategory";
import BlackButton from "../Common/Button/BlackButton";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { useParams } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader"

export default function CamperProjectsPage() {
  const { category } = useParams();

  const [layouts, setLayouts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({});

  // MAIN FILTER STATES (applied filters)
  const [search, setSearch] = useState("");
  const [model, setModel] = useState("");
  const [sit, setSit] = useState("");
  const [sleep, setSleep] = useState("");
  const [bedType, setBedType] = useState("");
  const [bathroomType, setBathroomType] = useState("");

  // TEMP STATES (before Apply Filters)
  const [tempSearch, setTempSearch] = useState("");
  const [tempModel, setTempModel] = useState("");
  const [tempSit, setTempSit] = useState("");
  const [tempSleep, setTempSleep] = useState("");
  const [tempBedType, setTempBedType] = useState("");
  const [tempBathroomType, setTempBathroomType] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const data = await getByCategory(
          category,
          page,
          search,
          model,
          sit,
          sleep,
          bedType,
          bathroomType
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
  }, [category, page, search, model, sit, sleep, bedType, bathroomType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // APPLY FILTERS
  const handleApplyFilters = () => {
    setSearch(tempSearch);
    setModel(tempModel);
    setSit(tempSit);
    setSleep(tempSleep);
    setBedType(tempBedType);
    setBathroomType(tempBathroomType);
    setPage(1);
  };

  // CLEAR FILTERS
  const handleClearFilters = () => {
    setTempSearch("");
    setTempModel("");
    setTempSit("");
    setTempSleep("");
    setTempBedType("");
    setTempBathroomType("");

    setSearch("");
    setModel("");
    setSit("");
    setSleep("");
    setBedType("");
    setBathroomType("");

    setPage(1);
  };

  const heroImage = "/heroSlider/custom_build.jpg";
  const newTitleText = category;
  const newDescriptionText = category;

  return (
    <>
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
            <h3 className="text-xl font-bold mb-4 text-gray-800">Filter Vans</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-4">

              {/* SEARCH */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search vans..."
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                />
              </div>

              {/* MODEL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <select
                  value={tempModel}
                  onChange={(e) => setTempModel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="">All Models</option>
                  {filters?.models?.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* SIT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sits</label>
                <select
                  value={tempSit}
                  onChange={(e) => setTempSit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="">All Sits</option>
                  {filters?.sits?.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* SLEEP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleeps</label>
                <select
                  value={tempSleep}
                  onChange={(e) => setTempSleep(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="">All Sleeps</option>
                  {filters?.sleeps?.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* BED TYPE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bed Type</label>
                <select
                  value={tempBedType}
                  onChange={(e) => setTempBedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="">All Bed Types</option>
                  {[...new Set(filters?.bedType || [])].map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* BATHROOM TYPE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathroom Type</label>
                <select
                  value={tempBathroomType}
                  onChange={(e) => setTempBathroomType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                >
                  <option value="">All Bathroom Types</option>
                  {[...new Set(filters?.bathroomType || [])].map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>

              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {loading ? (
           <Loader />
          ) : layouts.length === 0 ? (
            <div className="text-center py-20 text-lg text-gray-600">
              No vans found.
            </div>
          ) : (
            <div className="space-y-16">
              {layouts.map((project, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <div
                    key={project._id}
                    className={`group max-w-[1250px] mx-auto flex flex-row ${isReversed ? "flex-row-reverse" : ""} items-center justify-between gap-4 lg:gap-12`}
                  >
                    {/* TEXT */}
                    <div className="flex flex-col text-black w-1/2 text-center lg:text-left">
                      <h2 className="font-bold text-2xl lg:text-[40px] leading-tight mb-4">
                        {project.van_listing?.title}
                      </h2>

                      <p className="text-sm lg:text-[18px] mb-6">
                        {project.van_listing?.description}
                      </p>

                      <BlackButton
                        label="View Details"
                        link={`/layout-detail/${project.slug}`}
                      />
                    </div>

                    {/* IMAGES */}
                    <div className="relative w-1/2 h-[350px] lg:h-[550px]">
                      <ImageWithSkeleton
                        src={project.gallery?.[0]}
                        className={`absolute top-0 w-[70%] h-full object-cover ${isReversed ? "left-0" : "right-0"}`}
                      />

                      <ImageWithSkeleton
                        src={project.gallery?.[0]}
                        className={`absolute w-[50%] h-[55%] object-cover -bottom-2 ${isReversed ? "right-[5%]" : "left-[5%]"}`}
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
              <BlackButton
label={"Previous"}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}

              />


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
    </>
  );
}
