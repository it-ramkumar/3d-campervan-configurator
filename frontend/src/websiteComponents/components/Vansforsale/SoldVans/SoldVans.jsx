"use client";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { getAllVans } from "../../../../api/van/getAllVans";
import Loader from "../../Loader/Loader";
import RichParagraph from "../../Common/Paragraph/RichParagraph";
import Heading2 from "../../Common/Headings/Heading2";
import Heading3 from "../../Common/Headings/Heading3";
import BlackButton from "../../Common/Button/BlackButton";

export default function SoldVans() {
  const [soldVans, setSoldVans] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const limit = 8;
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchVans = async () => {
      if (isFetching.current) return;
      isFetching.current = true;

      // Pehli dafa full loader, baad mein sirf button loader
      if (page === 1) setInitialLoading(true);
      else setBtnLoading(true);

      try {
        const result = await getAllVans(page, limit);
        if (result.success) {
          const newSoldVans = result.data.filter((v) => v.status === "sold");

          setSoldVans((prev) => {
            const combined = [...prev, ...newSoldVans];
            // Remove duplicates efficiently
            return combined.filter(
              (v, i, arr) => arr.findIndex((x) => x._id === v._id) === i
            );
          });

          setHasMore(result.data.length === limit);
        }
      } catch (err) {
        console.error("Error fetching vans:", err);
      } finally {
        setInitialLoading(false);
        setBtnLoading(false);
        isFetching.current = false;
      }
    };

    fetchVans();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !btnLoading) setPage((prev) => prev + 1);
  };

  if (initialLoading) return <Loader />;

  return (
    <section className="bg-white md:mt-24 mt-10 py-10 px-4 md:px-8 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-10 md:mb-16">
          <Heading2 text="A Showcase of our Sold Camper Vans" />
          <RichParagraph className="max-w-2xl mx-auto">
            The camper vans below have already found their happy owners. We’ve
            proudly built over 105 camper vans with a reputation for quality.
            Check our past builds to get inspired for your custom van.
          </RichParagraph>

        </div>

        {/* Vans Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {soldVans?.length > 0 ? (
            soldVans.map((van) => (
              <div
                key={van._id}
                className="group relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
              >
                <Link to={`/van-detail/${van.slug}`}>
                  <div className="relative w-full h-full">
                    <ImageWithSkeleton
                      src={van?.gallery?.[0] || "/images/default-placeholder.jpg"}
                      alt={van?.van_listing?.title || "Sold camper van"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* SOLD Stamp (Modernized) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="transform -rotate-12 bg-red-600 text-white font-black text-xl md:text-2xl px-8 py-2 rounded-lg shadow-2xl border-2 border-white/40 backdrop-blur-sm">
                        SOLD
                      </div>
                    </div>

                    {/* Gradient & Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-30">
                      <Heading3 text={van?.van_listing?.title || "Custom Build"}/>

                     <RichParagraph>

                     </RichParagraph>
                      <p className="text-white/60 text-xs mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100 hidden md:block">
                        View Details →
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg">No sold vans found.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <BlackButton     onClick={handleLoadMore}
              disabled={btnLoading}
              label={btnLoading ? "Fetching..." : "Load More Builds"}
              />

          </div>
        )}
      </div>
    </section>
  );
}