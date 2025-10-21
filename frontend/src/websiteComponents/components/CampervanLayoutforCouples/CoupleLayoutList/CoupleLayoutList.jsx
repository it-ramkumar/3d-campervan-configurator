"use client";
import { useState, useEffect } from "react";
import { getByCategory } from "../../../../api/portfolio/getByCategory";
import BlackButton from "../../Common/Button/BlackButton";

export default function CamperProjectsPage() {
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getByCategory("Layouts for Solo & Couple Travelers");
      if (data?.success) {
        setLayouts(data?.data?.portfolios || []);
      } else {
        console.error("Failed to fetch:", data?.error);
      }
    };
    fetch();
  }, []);

  return (
    <section className="bg-white font-serif py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
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
                    {project.van_listing?.description || "No description available."}
                  </p>

                  <BlackButton
                    label={"View Details"}
                    link={`/layout-detail/${project.slug}`}
                  />
                </div>

                {/* RIGHT SIDE (images) */}
                <div className="relative w-1/2 h-[200px] sm:h-[280px] md:h-[450px] lg:h-[550px] flex-shrink-0">
                  <img
                    src={project.gallery?.[0] || "/fallback.jpg"}
                    alt={`${project.van_listing?.title || "Van"} large view`}
                    loading="lazy"
                    className={`absolute top-0 w-[70%] h-full object-cover rounded-md lg:rounded-[10px] scale-x-[-1] transition-all duration-500 ease-in-out lg:group-hover:scale-110 lg:group-hover:brightness-105 ${
                      isReversed ? "left-0" : "right-0"
                    }`}
                  />

                  {/* Optional: second image or thumbnail fallback */}
                  <img
                    src={
                      project.blocks?.[0]?.image ||
                      project.gallery?.[0] ||
                      "/fallback.jpg"
                    }
                    alt={`${project.van_listing?.title || "Van"} small view`}
                    loading="lazy"
                    className={`absolute w-[50%] h-[55%] object-cover rounded-md lg:rounded-[10px] shadow-2xl -bottom-2 md:-bottom-4 border-2 md:border-4 border-white transition-all duration-500 ease-in-out lg:group-hover:scale-115 lg:group-hover:shadow-2xl ${
                      isReversed ? "right-[5%]" : "left-[5%]"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
