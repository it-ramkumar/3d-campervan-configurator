import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

const NotFound = () => {
  useEffect(() => {
    // 1. Meta tag create karein
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.id = "noindex-tag"; // ID takay remove karna asan ho
    document.head.appendChild(meta);

    // 2. Cleanup function: Jab user 404 page se kisi aur page par jaye
    return () => {
      const tagToRemove = document.getElementById("noindex-tag");
      if (tagToRemove) {
        document.head.removeChild(tagToRemove);
      }
    };
  }, []);

  return (
    <>
      <Navbar/>
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
      <Footer/>
    </>
  );
};

export default NotFound;