"use client";
import { useState, useEffect } from "react";
import {getByWheelBase} from "../../../api/portfolio/wheelBase";
import BlackButton from "../Common/Button/BlackButton";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { useParams } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";

export default function CamperProjectsPage() {
  const { wheelbase } = useParams();
  const [layouts, setLayouts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetch = async () => {
    try {
      setLoading(true);

      const data = await getByWheelBase(wheelbase, page);

      if (data?.success) {
        setLayouts(data?.data || []);
        setTotalPages(data?.pages || 1);
      } else {
        console.error("Failed to fetch:", data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetch();
}, [wheelbase, page]);

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [page]);
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
const heroImage = "/heroSlider/custom_build.jpg";
const newTitleText = wheelbase === "144" ? "Sprinter 144 Wheelbase" :wheelbase === "148" ? "Transit 148 Wheelbase" : wheelbase === "159" ? "Promaster 159 Wheelbase" : wheelbase ==="136" ? "romaster 136 Wheelbase" : "";
const newDescriptionText = wheelbase === "144" ?
   "Explore the versatility of the Sprinter 144 wheelbase. Ideal for a range of campervan layouts, offering ample space and comfort for your adventures." : wheelbase === "148" ?
   "Discover the spacious Transit 148 wheelbase. Perfect for custom campervan builds that prioritize roominess and functionality for all your travel needs." : wheelbase === "159" ?
   "Experience the expansive Promaster 159 wheelbase. Designed for those seeking maximum interior space and flexibility in their campervan lifestyle." : wheelbase ==="136" ?
   "Uncover the compact efficiency of the Promaster 136 wheelbase. Great for agile campervan designs that don't compromise on comfort and utility." : "";
  "Design your dream campervan with our custom build options. Tailored layouts, features, and finishes for every traveler.";

  return (
    <>
 <Navbar />
      <div className="tour-hero">
        <HeroSection  title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />

      </div>
    <section className="bg-white font-serif py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {loading ? (
          <div className="text-center py-20 text-lg text-gray-600">
            Loading projects...
          </div>
        ) : (
          <div className="space-y-16">
            {layouts.map((project, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={project._id}
                  className={`group max-w-[1250px] mx-auto flex flex-row ${
                    isReversed ? "flex-row-reverse" : ""
                  } items-center justify-between gap-4 lg:gap-12 h-auto`}
                >
                  {/* LEFT SIDE (text) */}
                  <div className="flex flex-col text-black w-1/2 text-center lg:text-left">
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-[48px] leading-tight mb-4 lg:mb-6">
                      {project.van_listing?.title || "Untitled Van"}
                    </h2>

                    <p className="text-xs md:text-base lg:text-[20px] leading-normal mb-6 lg:mb-10">
                      {project.van_listing?.description ||
                        "No description available."}
                    </p>

                    <BlackButton
                      label={"View Details"}
                      link={`/layout-detail/${project.slug}`}
                    />
                  </div>

                  {/* RIGHT SIDE (images) */}
                  <div className="relative w-1/2 h-[200px] sm:h-[280px] md:h-[450px] lg:h-[550px] flex-shrink-0">
                    <ImageWithSkeleton
                      src={project.gallery?.[0] || "/fallback.jpg"}
                      alt={`${project.van_listing?.title || "Van"} large view`}

                      className={`absolute top-0 w-[70%] h-full  ${
                        isReversed ? "left-0" : "right-0"
                      }`}
                    />

                    <ImageWithSkeleton
                      src={
                        project.gallery?.[0]
                      }
                      alt={`${project.van_listing?.title || "Van"} small view`}

                      className={`absolute w-[50%] h-[55%] object-cover  -bottom-2 md:-bottom-4  ${
                        isReversed ? "right-[5%]" : "left-[5%]"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION BUTTONS */}
        <div className="flex justify-center items-center gap-4 mt-20">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md border text-sm md:text-base ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 transition"
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md border text-sm md:text-base ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 transition"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
