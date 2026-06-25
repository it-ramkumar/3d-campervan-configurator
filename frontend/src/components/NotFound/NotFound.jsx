import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const NotFound = () => {
  useEffect(() => {
    // Analytics tracking (optional - agar Google Analytics hai)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 Not Found',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <>
      <title>404 - Page Not Found | BigBear Vans</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="prerender-status-code" content="404" />
      <meta name="description" content="The page you are looking for does not exist or has been moved." />

      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-canvas relative p-4">
        {/* Dot grid */}
        <div className="bbv-dot-grid" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Big 404 */}
          <h1 className="font-display text-[10rem] md:text-[14rem] font-bold leading-none text-hover select-none"
            style={{ textShadow: "0 0 80px rgba(237,152,95,0.25)" }}>
            404
          </h1>

          {/* Divider */}
          <div className="bbv-divider mb-6 mx-auto" />

          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
            Page Not Found
          </p>

          <h2 className="font-display text-secondary text-3xl md:text-4xl uppercase tracking-wide mb-4">
            Oops! Lost in the Wild
          </h2>

          <p className="text-secondary/60 max-w-md mb-10 leading-relaxed">
            The page you are looking for does not exist or has been moved. Let's get you back on the road.
          </p>

          <Link
            href="/"
            className="bg-hover text-primary font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-opacity hover:opacity-90"
          >
            Go Back Home
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
