"use client";

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { getAllVans } from "../../../../api/van/getAllVans";
import Loader from "../../Loader/Loader";
export default function SoldVans( ) {
  const [soldVans, setSoldVans] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 8;
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchVans = async () => {
      if (isFetching.current) return; // prevent double call
      isFetching.current = true;
      setLoading(true);

      try {
        const result = await getAllVans(page, limit);
        if (result.success) {
          const newSoldVans = result.data.filter((v) => v.status === "sold");

          // ✅ Merge + remove duplicates
          setSoldVans((prev) => {
            const combined = [...prev, ...newSoldVans];
            return combined.filter(
              (v, i, arr) => arr.findIndex((x) => x._id === v._id) === i
            );
          });

          setHasMore(result.data.length === limit);

        }
      } catch (err) {
        console.error("Error fetching vans:", err);
      }

      setLoading(false);
      isFetching.current = false;
    };

    fetchVans();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };
if(loading){
  return <Loader/>
}
  return (
    <section className="bg-white pt-0 pb-12 px-4 md:px-8 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-black leading-tight">
            A Showcase of our Sold Camper Vans
          </h2>
          <p className="max-w-4xl mx-auto mt-4 font-serif text-lg md:text-xl text-black opacity-70 leading-relaxed">
            The camper vans below have already found their happy owners. We’ve
            proudly built over 105 camper vans, with a consistent five-star
            rating and a reputation for quality. <br /> These builds show the
            craftsmanship we invest in every project. Check our past builds to
            get inspired for your custom van.
          </p>
        </div>

        {/* Vans Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {soldVans?.length > 0 ? (
            soldVans.map((van) => (
              <div
                key={van._id}
                className="relative w-full aspect-[4/3] p-0.5 rounded-[18px] shadow-lg shadow-gray-700/50 animated-border-wrap transition-transform duration-300 ease-in-out transform hover:scale-110 hover:z-10"
              >
                <Link to={`/van-detail/${van.slug}`}>
                  <div className="relative w-full h-full rounded-[17.5px] overflow-hidden group">
                    <ImageWithSkeleton
                      src={van?.gallery?.[0] || "/images/default-placeholder.jpg"}
                      alt={van?.van_listing?.title || "Sold camper van"}
                      className="w-full h-full object-cover border border-gray-200 rounded-md transition-all duration-300 hover:scale-105"
                    />

                    {/* SOLD Stamp */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute transform rotate-[-30deg] bg-red-600/80 text-white font-extrabold text-xl sm:text-3xl px-10 py-2 rounded-md shadow-lg border-2 border-white">
                        SOLD
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:from-black/80"></div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h3 className="font-serif text-base sm:text-2xl font-semibold text-white leading-tight transform transition-all duration-300 ease-in-out sm:translate-y-8 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        {van?.van_listing?.title || "Unnamed Model"}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No sold vans found.
            </p>
          )}
        </div>

        {/* ✅ Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
