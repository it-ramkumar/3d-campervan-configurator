"use client";
import React, { useState } from "react";
import Image from "next/image";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.1234!2d-116.8612!3d34.2585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDE1JzMwLjYiTiAxMTbCsDUxJzQwLjMiVw!5e0!3m2!1sen!2sus!4v123456789";

const STATIC_MAP =
  "https://maps.googleapis.com/maps/api/staticmap?center=34.2585,-116.8612&zoom=15&size=800x400&maptype=roadmap&markers=color:red%7C34.2585,-116.8612&key=AIzaSyCmL18misQw9KdwqGaw3zHkitj8vG6QF2Y";

export default function MapSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-xl border border-primary/20">
      {loaded ? (
        <iframe
          src={MAP_SRC}
          title="Office Location Map"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[400px] md:h-[550px] grayscale-[20%] contrast-[1.1]"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="relative w-full h-[400px] md:h-[550px] block group cursor-pointer"
          aria-label="Load interactive map"
        >
          <Image
            src={STATIC_MAP}
            alt="Big Bear Vans office location map"
            fill
            className="object-cover grayscale-[20%] contrast-[1.1]"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="bg-white text-primary font-semibold text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Click to Open Interactive Map
            </div>
          </div>
        </button>
      )}

      <div className="absolute top-6 left-6 bg-primary text-white p-6 rounded-lg shadow-2xl max-w-xs border-b-4 border-hover">
        <h3 className="font-sans text-lg font-bold mb-1">Big Bear Vans Location</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          320 W Big Bear Blvd, Big Bear City, CA 92314, USA
        </p>
      </div>
    </div>
  );
}
