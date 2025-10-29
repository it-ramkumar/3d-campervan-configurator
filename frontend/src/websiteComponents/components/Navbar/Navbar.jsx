"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function Navbar({ forceMobile }) {
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
  // ✅ Mobile menu animation fix (only fade)
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
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

  CustomBuild: {
    title: "Custom Builds",
    sections: [
      {
        title: "Start Your Custom Build",
        items: [
          { label: "3D Van Builder", link: "https://configurator.bigbearvans.com" },
          { label: "Send an Inquiry", link: "/inquiry" },
        ],
      },
    ],
  },

  "vans-for-sale": { title: "Vans for Sale", link: "/vans-for-sale" },

  layout: {
    title: "Layouts by Big Bear Vans",
    sections: [
      {
        title: "Our Flagship Models",
        items: [
          { label: "Flagship Short Van — Santa Monica", link: "/" },
          { label: "Flagship Long Van — Montreal", link: "/" },
        ],
      },
      {
        title: "Explore Layout Options",
        items: [
          { label: "Layouts for Solo & Couple Travelers", link: "/couples-layout" },
          { label: "Layouts for Families (3–9 People)", link: "/family-layout" },
          { label: "Portfolio of Custom Builds", link: "/" },
        ],
      },
    ],
  },

  // "3d-van-builder": { title: "Build Your Dream Van", link: "https://www.vanbuild3d.com/van" },
  "contact-us": { title: "Contact Us", link: "/contact" },

  discover: {
    title: "Discover Big Bear Vans",
    sections: [
      {
        title: "Company Info",
        items: [
          { label: "Our Process", link: "/our-process" },
          { label: "Showroom", link: "/showroom" },
          { label: "About Us", link: "/about-us" },

        ],
      },
        {
        title: "Insights",
        items: [
          { label: "Exterior", link: "/innovation" },
          { label: "Blog", link: "/blogs" },


        ],
      },
    ],
  },
};


  return (
    <>
      {/* NAVBAR */}
      <nav className={`${forceMobile ? "sticky top-0 w-full px-2 py-1 bg-white shadow-md z-1000" : "sticky top-0 w-full px-6 py-4 bg-white shadow-md z-1000"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* LOGO */}
          {!forceMobile && <div className="flex items-center">
            <Link to="/" className="block">
              <img
                src="/images/logoo.png"
                alt="BBV logo"
                className="w-[150px] h-[30px] object-contain"
              />
            </Link>
          </div>}

          {/* CENTER MENU (Desktop) */}
          <div
            className={`${forceMobile ? "hidden" : "hidden md:flex"
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-blackish tracking-wide font-medium font-serif text-base`}
          >
            <Link
              to="/"
              onMouseEnter={() => handleMenuHover("CustomBuild")}
              onMouseLeave={handleMenuLeave}
            >
              Custom Build
            </Link>
            <Link
              to="/vans-for-sale"
              onMouseEnter={() => handleMenuHover("vans-for-sale")}
              onMouseLeave={handleMenuLeave}
            >
              Vans For Sale
            </Link>
            <Link
              to="/layouts"
              onMouseEnter={() => handleMenuHover("layout")}
              onMouseLeave={handleMenuLeave}
            >
              Layouts
            </Link>
            {/* <Link
              to="/van"
              onMouseEnter={() => handleMenuHover("3d-van-builder")}
              onMouseLeave={handleMenuLeave}
            >
              3D Van Builder
            </Link> */}
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
          <div className={`${forceMobile ? "hidden" : "hidden md:block"} w-[150px]`}></div>

          {/* MOBILE BUTTON */}
          <button
            className={`${forceMobile ? "" : "md:hidden"} text-gray-700 z-10`}
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
      {activeMenu && !forceMobile && menuContent[activeMenu]?.sections && (
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
                  className={`w-1/2 ${idx === 0 ? "pr-6 border-r border-gray-200" : "pl-6"
                    }`}
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
      {/* ✅ MOBILE MENU */}
      {/* ✅ MOBILE MENU FIXED VERSION */}
      <div
        ref={mobileMenuRef}
        className={`fixed left-0 top-[62px] bg-white shadow-lg z-40 transition-all duration-300 ${forceMobile ? "w-[100%] md:w-[40%] backdrop-blur bg-white/50"   : "w-full md:hidden"
          }`}
        style={{
          height: "calc(100vh - 64px)", // full height below navbar
          overflowY: "auto", // stable vertical scroll
          WebkitOverflowScrolling: "touch", // smooth on mobile
        }}
      >
        <div className="flex flex-col py-8 px-4 min-h-full">
          {forceMobile && <div className="flex items-center mb-5">
            <Link to="/" className="block">
              <img
                src="/images/logoo.png"
                alt="BBV logo"
                className="w-[150px] h-[30px] object-contain"
              />
            </Link>
          </div>}
          {Object.keys(menuContent).map((key, idx) => {
            const menu = menuContent[key];
            const hasSubmenu = menu.sections && menu.sections.length > 0;

            return (
              <div key={idx} className="w-full mb-3">
                {hasSubmenu ? (
                  <>
                    <button
                      className="w-full text-xl font-semibold text-blackish py-3 flex justify-between"
                      onClick={() =>
                        setActiveMenu(activeMenu === key ? null : key)
                      }
                    >
                      {menu.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transform transition-transform ${activeMenu === key ? "rotate-180" : ""
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
