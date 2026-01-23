"use client";
import React from "react";

export default function MapSection() {
  return (
    <div className="relative w-full rounded-[20px] overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.29039862544!2d-116.85188968472872!3d34.26077828269445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c4b5b94f396ad3%3A0xaad9ce8a9f148bf!2s320%20W%20Big%20Bear%20Blvd%2C%20Big%20Bear%20City%2C%20CA%2092314%2C%20USA!5e0!3m2!1sen!2s!4v169.jpg"
        title="Office Location Map" // Ye zaroori hai
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-[20px] w-full h-[400px] md:h-[500px]"
      ></iframe>

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
        <h3 className="font-serif text-lg font-bold text-gray-800">
          Big Bear Vans Location
        </h3>
        <p className="text-sm text-gray-600">
          320 W Big Bear Blvd, Big Bear City, CA 92314, USA
        </p>
      </div>
    </div>
  );
}
