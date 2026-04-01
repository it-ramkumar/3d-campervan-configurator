"use client";
import React from "react";

export default function MapSection() {
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-xl border-4 border-white">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.1234!2d-116.8612!3d34.2585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDE1JzMwLjYiTiAxMTbCsDUxJzQwLjMiVw!5e0!3m2!1sen!2sus!4v123456789"
        title="Office Location Map"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[400px] md:h-[550px] grayscale-[20%] contrast-[1.1]"
      ></iframe>

      <div className="absolute top-6 left-6 bg-primary text-white p-6 rounded-lg shadow-2xl max-w-xs border-b-4 border-hover">
        <h3 className="font-sans text-lg font-bold mb-1">
          Big Bear Vans Location
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          320 W Big Bear Blvd, Big Bear City, CA 92314, USA
        </p>
      </div>
    </div>
  );
}