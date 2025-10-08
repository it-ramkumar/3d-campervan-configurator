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
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // GSAP animations
  useEffect(() => {
    if (!megaMenuRef.current) return;
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
  }, [activeMenu]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    gsap.to(mobileMenuRef.current, {
      height: isMobileMenuOpen ? "100vh" : 0,
      opacity: isMobileMenuOpen ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isMobileMenuOpen]);

  const handleMenuHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // ✅ FIXED MENU CONTENT
  const menuContent = {
    // "vans-for-sale": {
    //   title: "Vans For Sale",
    //   sections: [
    //     {
    //       title: "New & Custom Builds",
    //       items: [
    //         { label: "Sprinter Vans", link: "/vans-for-sale/sprinter" },
    //         { label: "Ford Transit Vans", link: "/vans-for-sale/ford-transit" },
    //         { label: "Promaster Vans", link: "/vans-for-sale/promaster" },
    //         { label: "Volkswagen", link: "/vans-for-sale/volkswagen" },
    //       ],
    //     },
    //     {
    //       title: "Pre-Owned Vans",
    //       items: [
    //         { label: "Ready to Ship", link: "/vans-for-sale/ready" },
    //         { label: "In-Progress", link: "/vans-for-sale/in-progress" },
    //         { label: "Previous Builds", link: "/vans-for-sale/previous" },
    //       ],
    //     },
    //   ],
    // },
    // layouts: {
    //   title: "Explore Layouts",
    //   sections: [
    //     {
    //       title: "Layout Types",
    //       items: [
    //         { label: "Family-Friendly", link: "/layouts/family" },
    //         { label: "Solo & Couple", link: "/layouts/solo" },
    //         { label: "Off-Grid Ready", link: "/layouts/offgrid" },
    //       ],
    //     },
    //     {
    //       title: "Layout Features",
    //       items: [
    //         { label: "Elevator Bed", link: "/layouts/elevator-bed" },
    //         { label: "Full Bathroom", link: "/layouts/full-bathroom" },
    //         { label: "Swivel Seats", link: "/layouts/swivel-seats" },
    //         { label: "Dinette", link: "/layouts/dinette" },
    //       ],
    //     },
    //   ],
    // },
    // "3d-van-builder": {
    //   title: "Build Your Dream Van",
    //   sections: [
    //     {
    //       title: "Customization Options",
    //       items: [
    //         { label: "Choose Van Model", link: "/van/model" },
    //         { label: "Interior Layouts", link: "/van/interior" },
    //         { label: "Exterior Features", link: "/van/exterior" },
    //         { label: "Electrical Systems", link: "/van/electrical" },
    //       ],
    //     },
    //     {
    //       title: "Design Gallery",
    //       items: [
    //         { label: "Popular Builds", link: "/van/gallery/popular" },
    //         { label: "Customer Creations", link: "/van/gallery/customers" },
    //         { label: "Inspiration", link: "/van/gallery/inspiration" },
    //         { label: "Color Palettes", link: "/van/gallery/colors" },
    //       ],
    //     },
    //   ],
    // },
    discover: {
      title: "Discover Big Bear Vans",
      sections: [
        {
          title: "Company",
          items: [
            { label: "Our Process", link: "/our-process" },
            { label: "About us", link: "/about-us" },
          ],
        },
      ],
    },
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 w-full px-6 py-4 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* LOGO LEFT */}
          <div className="z-10">
            <Link to="/" className="text-2xl font-bold text-blackish">
              <img src="/images/logoo.png" width={150} height={100} alt="BBV logo" />
            </Link>
          </div>

          {/* CENTER MENU */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-blackish tracking-wide font-medium font-serif text-base">
            <Link to="/vans-for-sale" onMouseEnter={() => handleMenuHover("vans-for-sale")} onMouseLeave={handleMenuLeave}>Vans For Sale</Link>
            <Link to="/layouts" onMouseEnter={() => handleMenuHover("layouts")} onMouseLeave={handleMenuLeave}>Layouts</Link>
            <Link to="/van" onMouseEnter={() => handleMenuHover("3d-van-builder")} onMouseLeave={handleMenuLeave}>3D Van Builder</Link>
            <Link to="/contact" onMouseEnter={() => handleMenuHover("contact-us")} onMouseLeave={handleMenuLeave}>Contact</Link>
            <Link to="#" onMouseEnter={() => handleMenuHover("discover")} onMouseLeave={handleMenuLeave}>Discover</Link>
          </div>

          {/* RIGHT SPACER */}
          <div className="hidden md:block w-[150px]"></div>

          {/* MOBILE BUTTON */}
          <button className="md:hidden text-gray-700 z-10" onClick={toggleMobileMenu}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ✅ FIXED DESKTOP MEGA MENU */}
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
              {menuContent[activeMenu]?.title}
            </h2>
            <div className="flex h-auto">
              {menuContent[activeMenu]?.sections?.map((section, idx) => (
                <div
                  key={idx}
                  className={`w-1/2 ${idx === 0 ? "pr-6 border-r border-gray-200" : "pl-6"}`}
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link} className="text-gray-700 hover:text-indigo-600">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-[76px] left-0 w-full bg-white shadow-lg z-40 overflow-hidden"
        style={{ height: "0" }}
      >
        <div className="flex flex-col items-center py-8">
          <Link to="/vans-for-sale" className="text-xl font-semibold text-blackish py-3">Vans For Sale</Link>
          <Link to="/layouts" className="text-xl font-semibold text-blackish py-3">Layouts</Link>
          <Link to="/van" className="text-xl font-semibold text-blackish py-3">3D Van Builder</Link>
          <Link to="/contact" className="text-xl font-semibold text-blackish py-3">Contact</Link>
          <Link to="/discover" className="text-xl font-semibold text-blackish py-3">Discover</Link>
        </div>
      </div>
      {/* MOBILE MENU */}
<div
  ref={mobileMenuRef}
  className="md:hidden fixed top-[76px] left-0 w-full bg-white shadow-lg z-40 overflow-hidden"
  style={{ height: "0" }}
>
  <div className="flex flex-col items-center py-8 px-4">
    {Object.keys(menuContent).map((key, idx) => (
      <div key={idx} className="w-full mb-3">
        <button
          className="w-full text-xl font-semibold text-blackish py-3 flex justify-between items-center"
          onClick={() =>
            setActiveMenu(activeMenu === key ? null : key)
          }
        >
          {menuContent[key].title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transform transition-transform ${
              activeMenu === key ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Submenu items */}
        {activeMenu === key && (
          <div className="pl-4 transition-all duration-300">
            {menuContent[key]?.sections?.map((section, secIdx) => (
              <div key={secIdx} className="mb-3">
                <h4 className="text-indigo-600 font-medium mb-2">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to={item.link}
                        className="text-gray-700 hover:text-indigo-600 block py-1"
                        onClick={() => setIsMobileMenuOpen(false)} // close after click
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}

    {/* Static links (optional) */}
    <Link
      to="/contact"
      className="text-xl font-semibold text-blackish py-3 block w-full text-left"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      Contact
    </Link>
  </div>
</div>

    </>
  );
}
