import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

export default function LayoutDetail() {
  const { slug } = useParams();
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/portfolio/${slug}`
        );
        setLayout(res.data?.data);
      } catch (err) {
        console.error("Error fetching layout details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchLayout();
  }, [slug]);

  useEffect(() => {
    if (layout && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".fade-in"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [layout]);

  if (loading) return <div className="text-center py-20 text-gray-500 text-xl">Loading...</div>;
  if (!layout)
    return <div className="text-center py-20 text-red-500 text-xl">Layout not found</div>;

  const { van_listing, gallery, category, detailed_features, formatted_price, media } = layout;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* 🌟 Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden fade-in">
        <img
          src={gallery?.[0]}
          alt={van_listing?.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-10 left-10 text-white max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">{van_listing?.title}</h1>
          <p className="text-lg mb-2">{van_listing?.subtitle}</p>
          <p className="text-xl font-semibold text-yellow-400">{formatted_price}</p>
          <p className="text-sm mt-2 opacity-80">{category}</p>
        </div>
      </section>

      {/* 💡 Overview Section */}
      <section className="container mx-auto py-16 px-6 fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{van_listing?.description}</p>
      </section>

      {/* ⚙️ Specifications */}
      <section className="container mx-auto py-12 px-6 grid md:grid-cols-2 gap-10 fade-in">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Specifications</h3>
          <ul className="space-y-3 text-gray-700">
            <li><b>Make & Model:</b> {van_listing?.specifications?.make_model}</li>
            <li><b>Wheelbase:</b> {van_listing?.specifications?.wheelbase}</li>
            <li><b>Drivetrain:</b> {van_listing?.specifications?.drivetrain}</li>
            <li><b>Sits:</b> {van_listing?.specifications?.capacity?.sits}</li>
            <li><b>Sleeps:</b> {van_listing?.specifications?.capacity?.sleeps}</li>
          </ul>
        </div>

        {/* 🎬 Video */}
        {media?.video?.title && (
          <div className="rounded-2xl overflow-hidden shadow-lg fade-in">
            <iframe
              width="100%"
              height="315"
              src={media.video.title.replace("watch?v=", "embed/")}
              title="Layout Video"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>
          </div>
        )}
      </section>

      {/* 🧩 Features Section */}
      {detailed_features?.length > 0 && (
        <section className="bg-gray-100 py-16 fade-in">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
              Detailed Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailed_features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <h4 className="text-xl font-bold mb-3 text-blue-600">
                    {feat.category}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {feat.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🖼️ Gallery */}
      <section className="container mx-auto py-16 px-6 fade-in">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Gallery</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
