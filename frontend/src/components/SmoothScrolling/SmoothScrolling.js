"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  // ⚡ FRAMER MOTION & HIGH-FPS TICKER SYNC
  // Yeh block browser ke hardware acceleration ko direct target karta hai
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Har frame par Lenis ko refresh karega bina main thread ko heavy kiye
    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const lenisOptions = {
    // 🧠 PREMIUM EXPERIENCES INTEGRATION
    duration: 1.4, // Thoda sa duration badhaya taaki premium aura mile
    smoothWheel: true,
    wheelMultiplier: 1.1, // Scroll velocity balance karne ke liye
    touchMultiplier: 1.5,

    // 🎨 CUBIC EASING FUNCTION: Isse scroll shuru makkhan jaisa hoga aur dhiime se rukega
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    // 🛡️ AUTO-DETECT INNER SCROLLABLE DIVS (NO FREEZE)
    prevent: (node) => {
      // Inputs ya textareas par normal behavior rakhein
      if (node.nodeName === 'TEXTAREA' || node.nodeName === 'INPUT' || node.isContentEditable) {
        return true;
      }

      let currentElement = node;
      while (currentElement && currentElement !== document.body) {
        if (currentElement.classList && currentElement.classList.contains('lenis-prevent')) {
          return true;
        }

        const hasOverflow = window.getComputedStyle(currentElement).overflowY;
        const isScrollable = hasOverflow === 'auto' || hasOverflow === 'scroll';

        if (isScrollable && currentElement.scrollHeight > currentElement.clientHeight) {
          return true; // Div ka scroll block nahi hoga
        }
        currentElement = currentElement.parentElement;
      }
      return false;
    }
  };

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}