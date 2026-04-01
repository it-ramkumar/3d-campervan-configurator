import React, { useState, useEffect } from "react";

export default function BigBearLoader({ onFinished }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Example: Agar aap chahte hain 2 seconds baad khud disappear ho jaye
    // Wese aap ise 'loading' prop se bhi control kar sakte hain
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinished) setTimeout(onFinished, 500); // Animation ke baad parent ko bataye
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible scale-105"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div className="absolute w-20 h-20 border-4 border-hover/20 border-t-hover rounded-full animate-spin"></div>

        {/* Inner Pulsing Core */}
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-secondary font-bold text-xl">B</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-primary font-heading tracking-[0.2em] uppercase text-xs font-bold">
          Big Bear Vans
        </p>

        <div className="mt-3 w-32 h-1 bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-hover w-1/2 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}} />
    </div>
  );
}