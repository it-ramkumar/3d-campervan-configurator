"use client";
import React, { useState } from "react";

export default function ImageWithSkeleton({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = error ? "/no-image.png" : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={`
        ${className}
        border border-gray-300 rounded-md
        object-cover
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-md
        ${!loaded ? "bg-gray-200 animate-pulse" : ""}
        ${loaded ? "opacity-100" : "opacity-80"}
      `}
    />
  );
}
