"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  const lenisOptions = {
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,

    // 👑 Yeh function har scroll event par automatically check karega
    prevent: (node) => {
      // 1. Agar input fields ya textareas hain toh scroll block na ho
      if (node.nodeName === 'TEXTAREA' || node.nodeName === 'INPUT' || node.isContentEditable) {
        return true;
      }

      // 2. Automatically detect nested scrollable divs
      let currentElement = node;
      while (currentElement && currentElement !== document.body) {
        // Check karein kya element ke paas vertical scrollbar hai (overflow)
        const hasOverflow = window.getComputedStyle(currentElement).overflowY;
        const isScrollable = hasOverflow === 'auto' || hasOverflow === 'scroll';

        // Agar element scrollable hai aur uska content height se zyada hai
        if (isScrollable && currentElement.scrollHeight > currentElement.clientHeight) {
          return true; // Lenis ko bol do ki is div ko block MAT kare
        }

        // Upar parent element par jao check karne
        currentElement = currentElement.parentElement;
      }

      return false; // Baki normal page par Lenis chalega
    }
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}