"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function BlackFridayLabel() {
  const labelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      labelRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        repeat: -1,
        yoyo: true,
      }
    );
  }, []);

  return (
    <div
      ref={labelRef}
      className="fixed top-[70px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold text-lg px-5 py-2 rounded-full shadow-md z-[9999]"
    >
     <Link to={"/vans-for-sale"}>
      🎉 Black Friday Sale — Santa Monica Golden Brown 4x4 Sprinter!</Link>
    </div>
  );
}
