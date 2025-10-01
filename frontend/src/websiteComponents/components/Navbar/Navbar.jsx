"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // GSAP animation for mega menu
  useEffect(() => {
    if (megaMenuRef.current) {
      if (activeMenu) {
        gsap.fromTo(
          megaMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.to(megaMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [activeMenu]);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "100vh",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  const handleMenuHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuContent = {
    "vans-for-sale": {
      title: "Vans For Sale",
      sections: [
        { title: "New & Custom Builds", items: ["Sprinter Vans", "Ford Transit Vans", "Promaster Vans", "Volkswagen"] },
        { title: "Pre-Owned Vans", items: ["Ready to Ship", "In-Progress", "Previous Builds"] }
      ]
    },
    layouts: {
      title: "Explore Layouts",
      sections: [
        { title: "Layout Types", items: ["Family-Friendly", "Solo & Couple", "Off-Grid Ready"] },
        { title: "Layout Features", items: ["Elevator Bed", "Full Bathroom", "Swivel Seats", "Dinette"] }
      ]
    },
    "3d-van-builder": {
      title: "Build Your Dream Van",
      sections: [
        { title: "Customization Options", items: ["Choose Van Model", "Interior Layouts", "Exterior Features", "Electrical Systems"] },
        { title: "Design Gallery", items: ["Popular Builds", "Customer Creations", "Inspiration", "Color Palettes"] }
      ]
    },
    discover: {
      title: "Discover Big Bear Vans",
      sections: [
        { title: "Company", items: ["Our Story", "Team", "Testimonials", "Awards & Press"] },
        { title: "Resources", items: ["Blog", "FAQs", "Video Tours", "Partners"] }
      ]
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 w-full px-6 py-4 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <div className="z-10">
            <Link to="/" className="text-2xl font-bold text-blackish">
              <img src="/images/logoo.png" width={150} height={100} alt="BBV logo" />
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-blackish tracking-wide font-medium font-sans text-base">
            <a href="/vans-for-sale" onMouseEnter={() => handleMenuHover("vans-for-sale")} onMouseLeave={handleMenuLeave}>Vans For Sale</a>
            <a href="#" onMouseEnter={() => handleMenuHover("layouts")} onMouseLeave={handleMenuLeave}>Layouts</a>
            <a href="/van" onMouseEnter={() => handleMenuHover("3d-van-builder")} onMouseLeave={handleMenuLeave}>3D Van Builder</a>
            <Link to="/contact" onMouseEnter={() => handleMenuHover("contact-us")} onMouseLeave={handleMenuLeave}>Contact</Link>
            <a href="#" onMouseEnter={() => handleMenuHover("discover")} onMouseLeave={handleMenuLeave}>Discover</a>
          </div>

          {/* Right Spacer */}
          <div className="hidden md:block w-[150px]"></div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 z-10" onClick={toggleMobileMenu}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Desktop Mega Menu (absolute under navbar, not fixed) */}
      {activeMenu && menuContent[activeMenu] && (
        <div
          ref={megaMenuRef}
          className="absolute left-0 w-full bg-white shadow-xl z-40 overflow-hidden"
          style={{ top: "76px", height: "0" }}
          onMouseEnter={() => handleMenuHover(activeMenu)}
          onMouseLeave={handleMenuLeave}
        >
          <div className="max-w-7xl mx-auto px-6 py-8 h-full">
            <h2 className="text-3xl font-bold text-blackish mb-8">
              {menuContent[activeMenu].title}
            </h2>
            <div className="flex h-auto">
              {/* Left Section */}
              <div className="w-1/2 pr-6 border-r border-gray-200">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">{menuContent[activeMenu].sections[0].title}</h3>
                <ul className="space-y-3">
                  {menuContent[activeMenu].sections[0].items.map((item, index) => (
                    <li key={index}><a href="#" className="text-gray-700 hover:text-indigo-600">{item}</a></li>
                  ))}
                </ul>
              </div>
              {/* Right Section */}
              <div className="w-1/2 pl-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">{menuContent[activeMenu].sections[1].title}</h3>
                <ul className="space-y-3">
                  {menuContent[activeMenu].sections[1].items.map((item, index) => (
                    <li key={index}><a href="#" className="text-gray-700 hover:text-indigo-600">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-[76px] left-0 w-full bg-white shadow-lg z-40 overflow-hidden"
        style={{ height: "0" }}
      >
        <div className="flex flex-col items-center py-8">
          <a href="/vans-for-sale" className="text-xl font-semibold text-blackish py-3">Vans For Sale</a>
          <a href="#" className="text-xl font-semibold text-blackish py-3">Layouts</a>
          <a href="/van" className="text-xl font-semibold text-blackish py-3">3D Van Builder</a>
          <a href="/contact" className="text-xl font-semibold text-blackish py-3">Contact</a>
          <a href="/discover" className="text-xl font-semibold text-blackish py-3">Discover</a>
        </div>
      </div>
    </>
  );
}
