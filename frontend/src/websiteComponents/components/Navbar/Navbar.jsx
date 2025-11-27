"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { Menu } from "lucide-react"
import { ChevronDown } from 'lucide-react';

export default function Navbar({ forceMobile }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();


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

  const handleMenuHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };
  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
            { label: "Short Van — Santa Monica", link: "/short-van" },
            { label: "Long Van — Montreal", link: "/long-van" },
          ],
        },
        {
          title: "Explore Layout Options",
          items: [
            { label: "Layouts for Solo & Couple Travelers", link: "/couples-layout" },
            { label: "Layouts for Families (3–9 People)", link: "/family-layout" },
            { label: "Portfolio of Custom Builds", link: "/custom-van" },
          ],
        },
      ],
    },
    "contact-us": { title: "Contact Us", link: "/contact" },
    discover: {
      title: "Discover Big Bear Vans",
      sections: [
        {
          title: "Company Info",
          items: [
            { label: "Our Process", link: "/our-process" },
            { label: "Showroom", link: "/showroom" },
            { label: "Financing", link: "/financing" },
            { label: "About Us", link: "/about-us" },
            { label: "Our Clients", link: "/our-clients" },
          ],
        },
        {
          title: "Insights",
          items: [
            { label: "Exterior Choices", link: "/innovation" },
            { label: "Interior Choices", link: "/interior-choice" },
            { label: "Sprinter Guide", link: "/sprinter-guide" },
            { label: "Blog", link: "/blogs" },
          ],
        },
      ],
    },
  };

  const routes = {
    CustomBuild: ["#", "/inquiry"],
    "vans-for-sale": ["/vans-for-sale"],
    layout: [
      "/layouts",
      "/short-van",
      "/long-van",
      "/couples-layout",
      "/family-layout",
      "/custom-van",
    ],
    "contact-us": ["/contact"],
    discover: [
      "/our-process",
      "/showroom",
      "/about-us",
      "/our-clients",
      "/innovation",
      "/interior-choice",
      "/blogs",
    ],
  };

  const isParentActive = (key) => routes[key]?.includes(location.pathname);
  const isChildActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`${forceMobile ? "sticky top-0 w-full px-2 py-1 shadow-md z-1000" : "sticky top-0 w-full px-6 py-4 bg-white shadow-md z-1000"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">

          {/* LEFT LOGO */}
          {!forceMobile && (
            <div className="flex items-center">
              <Link to="/" className="block">
                <ImageWithSkeleton
                  src="/images/logoo.webp"
                  alt="BBV logo"
                  className="w-[170px] h-[30px] border-none object-contain"
                  click={true}
                />
              </Link>
            </div>
          )}

          {/* CENTER MENU (Desktop) */}
     {/* CENTER MENU (Desktop) */}
<div
  className={`${forceMobile ? "hidden" : "hidden md:flex"} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 text-blackish tracking-wide font-medium font-serif text-base`}
>
  <Link
    to="#"
    onMouseEnter={() => handleMenuHover("CustomBuild")}
    onMouseLeave={handleMenuLeave}
    className={`flex items-center gap-1 ${isParentActive("CustomBuild") ? "text-indigo-600 font-semibold" : ""}`}
  >
    Custom Build
    <ChevronDown className="w-3 h-3" />
  </Link>

  <Link
    to="/vans-for-sale"
    onMouseEnter={() => handleMenuHover("vans-for-sale")}
    onMouseLeave={handleMenuLeave}
    className={`flex items-center gap-2 ${isParentActive("vans-for-sale") ? "text-indigo-600 font-semibold" : ""}`}
  >
    Vans For Sale
    <span className="bg-red-600 text-white text-[10px] px-2 py-[2px] rounded-full animate-pulse">
      SALE
    </span>
  </Link>

  <Link
    to="/layouts"
    onMouseEnter={() => handleMenuHover("layout")}
    onMouseLeave={handleMenuLeave}
    className={`flex items-center gap-1 ${isParentActive("layout") ? "text-indigo-600 font-semibold" : ""}`}
  >
    Layouts
    <ChevronDown className="w-3 h-3" />
  </Link>

  <Link
    to="/contact"
    onMouseEnter={() => handleMenuHover("contact-us")}
    onMouseLeave={handleMenuLeave}
    className={`${isParentActive("contact-us") ? "text-indigo-600 font-semibold" : ""}`}
  >
    Contact
  </Link>

  <Link
    to="#"
    onMouseEnter={() => handleMenuHover("discover")}
    onMouseLeave={handleMenuLeave}
    className={`flex items-center gap-1 ${isParentActive("discover") ? "text-indigo-600 font-semibold" : ""}`}
  >
    Discover
    <ChevronDown className="w-3 h-3" />
  </Link>
</div>


          {/* RIGHT SECTION - Book Appointment Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {!forceMobile && <Link
              to="/contact"
              className="hidden md:flex text-sm bg-black text-white px-4 py-2.5 rounded-xl font-bold shadow-2xl hover:shadow-gray-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-pulse hover:animate-none relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Book Free Consultation
                <svg
                  className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </span>

              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <span className="absolute flex h-6 w-6 -top-2 -right-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-white"></span>
              </span>
            </Link>}


            <Menu className={`${forceMobile ? "" : "md:hidden"} z-10`}
              onClick={toggleMobileMenu}></Menu>

          </div>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU */}
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
                <div key={idx} className={`w-1/2 ${idx === 0 ? "pr-6 border-r border-gray-200" : "pl-6"}`}>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.link}
                          className={`block py-1 ${isChildActive(item.link) ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
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

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className={`fixed left-0 top-[62px] bg-white shadow-lg z-40 transition-all duration-300 ${forceMobile ? "w-[100%] md:w-[40%] backdrop-blur bg-white/50" : "w-full md:hidden"}`}
        style={{ height: "calc(100vh - 64px)", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex flex-col py-8 px-4 min-h-full">
          {forceMobile && (
            <div className="flex items-center mb-5">
              <Link to="/" className="block">
                <ImageWithSkeleton src="/images/logoo.webp" alt="BBV logo" className="w-[150px] h-[30px] object-contain" />
              </Link>
            </div>
          )}

          {/* Book Appointment Button - Mobile */}

          {Object.keys(menuContent).map((key, idx) => {
            const menu = menuContent[key];
            const hasSubmenu = menu.sections && menu.sections.length > 0;

            return (
              <div key={idx} className="w-full mb-3">
                {hasSubmenu ? (
                  <>
                    <button
                      className={`w-full text-xl font-semibold text-blackish py-3 flex justify-between ${isParentActive(key) ? "text-indigo-600" : ""}`}
                      onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                    >
                      {menu.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transform transition-transform ${activeMenu === key ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {activeMenu === key && (
                      <div className="pl-4 transition-all duration-300">
                        {menu.sections.map((section, secIdx) => (
                          <div key={secIdx} className="mb-3">
                            <h4 className="text-indigo-600 font-medium mb-2">{section.title}</h4>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    to={item.link}
                                    className={`block py-1 ${isChildActive(item.link) ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
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
                    className={`w-full text-xl font-semibold text-blackish py-3 block ${isParentActive(key) ? "text-indigo-600 font-semibold" : ""}`}
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            );
          })}
          <div className="mb-6">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center block"
            >
              Book Free Consultation
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
