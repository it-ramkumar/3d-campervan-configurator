import React, { useEffect } from "react";
import Link from "next/link";
import { Helmet } from "react-helmet";
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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 p-4">
        <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
        <h2 className="text-2xl md:text-3xl mb-4">Oops! Page Not Found</h2>
        <p className="mb-6 text-center max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;