"use client";
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Lenis initialize karna
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Animation frame handle karna
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}