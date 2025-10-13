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

  // ✅ Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Desktop mega menu animation
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

  // ✅ Mobile menu animation fix (auto height)
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    gsap.to(mobileMenuRef.current, {
      height: isMobileMenuOpen ? "auto" : 0,
      opacity: isMobileMenuOpen ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isMobileMenuOpen]);

  // Handlers
  const handleMenuHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };
  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // ✅ MENU CONTENT
  const menuContent = {
    "vans-for-sale": {
      title: "Vans For Sale",
      link: "/vans-for-sale",
    },
    layouts: {
      title: "Explore Layouts",
      link: "/layouts",
    },
    "3d-van-builder": {
      title: "Build Your Dream Van",
      link: "/van",
    },
    "contact-us": {
      title: "Contact Us",
      link: "/contact",
    },
    discover: {
      title: "Discover Big Bear Vans",
      sections: [
        {
          title: "Company",
          items: [
            { label: "Our Process", link: "/our-process" },
            { label: "Showroom", link: "/showroom" },
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
          {/* LOGO */}
          <div className="flex items-center">
            <Link to="/" className="block">
              <img
                src="/images/logoo.png"
                alt="BBV logo"
                className="w-[150px] h-[30px] object-contain"
              />
            </Link>
          </div>

          {/* CENTER MENU (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-blackish tracking-wide font-medium font-serif text-base">
            <Link
              to="/vans-for-sale"
              onMouseEnter={() => handleMenuHover("vans-for-sale")}
              onMouseLeave={handleMenuLeave}
            >
              Vans For Sale
            </Link>
            <Link
              to="/layouts"
              onMouseEnter={() => handleMenuHover("layouts")}
              onMouseLeave={handleMenuLeave}
            >
              Layouts
            </Link>
            <Link
              to="/van"
              onMouseEnter={() => handleMenuHover("3d-van-builder")}
              onMouseLeave={handleMenuLeave}
            >
              3D Van Builder
            </Link>
            <Link
              to="/contact"
              onMouseEnter={() => handleMenuHover("contact-us")}
              onMouseLeave={handleMenuLeave}
            >
              Contact
            </Link>
            <Link
              to="#"
              onMouseEnter={() => handleMenuHover("discover")}
              onMouseLeave={handleMenuLeave}
            >
              Discover
            </Link>
          </div>

          {/* RIGHT SPACER */}
          <div className="hidden md:block w-[150px]"></div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-700 z-10"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU (only Discover uses it) */}
      {activeMenu && menuContent[activeMenu]?.sections && (
        <div
          ref={megaMenuRef}
          className="fixed left-0 w-full bg-white shadow-xl z-40 overflow-hidden"
          style={{ top: "63px", height: "0" }}
          onMouseEnter={() => handleMenuHover(activeMenu)}
          onMouseLeave={handleMenuLeave}
        >
          <div className="max-w-7xl px-6 py-8 h-full">
            <h2 className="text-3xl font-bold text-blackish mb-8">
              {menuContent[activeMenu]?.title}
            </h2>
            <div className="flex h-auto">
              {menuContent[activeMenu]?.sections?.map((section, idx) => (
                <div
                  key={idx}
                  className={`w-1/2 ${idx === 0 ? "pr-6 border-r border-gray-200" : "pl-6"}`}
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.link}
                          className="text-gray-700 hover:text-indigo-600"
                        >
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

      {/* ✅ MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-[76px] left-0 w-full bg-white shadow-lg z-40 overflow-hidden"
        style={{ height: "0" }}
      >
        <div className="flex flex-col  py-8 px-4">
          {Object.keys(menuContent).map((key, idx) => {
            const menu = menuContent[key];
            const hasSubmenu = menu.sections && menu.sections.length > 0;

            return (
              <div key={idx} className="w-full mb-3">
                {hasSubmenu ? (
                  <>
                    {/* Dropdown button */}
                    <button
                      className="w-full text-xl font-semibold text-blackish py-3 flex justify-between "
                      onClick={() =>
                        setActiveMenu(activeMenu === key ? null : key)
                      }
                    >
                      {menu.title}
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
                        {menu.sections.map((section, secIdx) => (
                          <div key={secIdx} className="mb-3">
                            <h4 className="text-indigo-600 font-medium mb-2">
                              {section.title}
                            </h4>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-indigo-600 block py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
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
                  </>
                ) : (
                  // Direct link for menus without submenus
                  <Link
                    to={menu.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-xl font-semibold text-blackish py-3 block"
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
