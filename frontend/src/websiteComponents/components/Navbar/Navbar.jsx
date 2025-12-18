"use client";
import { useState, useEffect, useRef } from "react";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { gsap } from "gsap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from 'lucide-react';
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { getNavCat } from "../../../api/portfolio/navBarCat";
import { getnavWheel } from "../../../api/portfolio/navWheelBase";
import { menuContent } from "../../DataUseInComp/MegaMenu";
import { routes } from "../../DataUseInComp/NavbarRoutes";

export default function Navbar({ forceMobile }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const megaMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuContentRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [layoutData, setLayoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [wheelBases, setWheelBases] = useState([]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuContentRef.current && 
          !mobileMenuContentRef.current.contains(event.target) &&
          !event.target.closest('[data-menu-button]')) {
        setIsMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

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
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileLinkClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
    
    // Use setTimeout to ensure state updates before navigation
    setTimeout(() => {
      navigate(link);
    }, 100);
  };

  const handleMobileSubmenuToggle = (menuKey) => {
    setActiveMenu(prev => prev === menuKey ? null : menuKey);
  };

  const isParentActive = (key) => routes[key]?.includes(location.pathname);
  const isChildActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsLoading(true);
    const fetchBlogs = async () => {
      try {
        const result = await getAllBlogs();
        setBlogs(result.data || []);
        setIsLoading(false);
      } catch (err) {
        console.log("Error loading blogs", err);
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [location.pathname]);

  const handleLayoutClick = async (link) => {
    console.log(link, "link");
    setSelectedLayout(link);
    setLoading(true);

    try {
      const res = await fetch(`/api/layouts?type=${encodeURIComponent(link)}`);
      const data = await res.json();
      setLayoutData(data);
    } catch (err) {
      console.error("Error fetching layout data", err);
      setLayoutData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const catRes = await getNavCat();
    const wheelRes = await getnavWheel();

    setCategories(catRes.data);
    setWheelBases(wheelRes.data);
  };

  if (isLoading) {
    return <div className="h-16 bg-white"></div>; // Return empty navbar while loading
  }

  return (
    <>
      <nav className={`${forceMobile ? "sticky top-0 w-full px-2 py-1 shadow-md z-50" : "sticky top-0 w-full px-6 py-4 bg-white shadow-md z-50"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* LEFT LOGO */}
          {!forceMobile && (
            <div className="flex items-center">
              <Link to="/" className="block">
                <ImageWithSkeleton
                  src="/images/chris-logo-black.png"
                  alt="BBV logo"
                  className="w-[170px] h-[30px] border-none object-contain"
                  click={true}
                />
              </Link>
            </div>
          )}
          
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
            {!forceMobile && (
              <Link
                to="/contact"
                className="
                  hidden md:flex text-sm bg-black text-white p-1 rounded-xl font-bold
                  shadow-5xl shadow-black hover:shadow-black/70 hover:shadow-2xl
                  transition-all duration-500 transform hover:-translate-y-1 hover:scale-105
                  hover:animate-none relative overflow-hidden group
                "
              >
                {/* GLOW BACKGROUND RING */}
                <div
                  className="absolute inset-0 rounded-xl opacity-60 blur-lg
                    bg-gradient-to-r from-green-300 via-orange-400 to-cyan-500
                    group-hover:opacity-100 transition-all duration-500"
                ></div>

                {/* COLORFUL BORDER */}
                <div
                  className="absolute inset-0 rounded-xl p-[2px]
                    bg-gradient-to-r from-green-300 via-orange-400 to-cyan-500
                    animate-[spin_6s_linear_infinite]"
                ></div>

                {/* INNER BUTTON */}
                <div className="relative z-10 bg-white text-black rounded-xl px-4 py-2.5 flex items-center">
                  Book Free Consultation
                  <svg
                    className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>

                {/* PING DOT */}
                <span className="absolute flex h-6 w-6 -top-2 -right-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-white"></span>
                </span>
              </Link>
            )}

            <button
              data-menu-button
              className={`${forceMobile ? "" : "md:hidden"} z-50 p-2 focus:outline-none`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
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
                    {section.title === "Blog" ? (
                      <>
                        {blogs?.slice(0, 4).map((blog) => (
                          <li key={blog._id}>
                            <Link
                              to={`/blog-detail/${blog._id}`}
                              className="block py-1 text-gray-700 hover:text-indigo-600 group"
                            >
                              <span>{blog.title}</span>
                              <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                --→
                              </span>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to="/blogs"
                            className="block py-2 text-indigo-600 font-semibold hover:text-indigo-700"
                          >
                            View All Blogs →
                          </Link>
                        </li>
                      </>
                    ) : section.title === "Explore Layout Options" ? (
                      <>
                        {categories?.map((category, i) => (
                          <li key={i}>
                            <Link
                              to={`/layout-by-category/${category}`}
                              className="block py-1 text-gray-700 hover:text-indigo-600 group"
                            >
                              <span>{category}</span>
                              <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                --→
                              </span>
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : section.title === "Van Models Options" ? (
                      <>
                        {wheelBases?.map((base, i) => {
                          let label = "";
                          if (base === "144" || base === 144) {
                            label = "Mercedes Sprinter 144";
                          } else if (base === "170" || base === 170) {
                            label = "Mercedes Sprinter 170";
                          } else if (base === "148" || base === 148) {
                            label = "Ford Transit 148";
                          } else {
                            label = `RAM Promaster ${base}`;
                          }

                          return (
                            <li key={i}>
                              <Link
                                to={`/wheel-base/${base}`}
                                className="block py-1 text-gray-700 hover:text-indigo-600 group"
                              >
                                <span>{label}</span>
                                <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                  --→
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      section.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.link}
                            className={`block py-1 ${
                              isChildActive(item.link)
                                ? "text-indigo-600 font-semibold"
                                : "text-gray-700 hover:text-indigo-600"
                            }`}
                            onClick={() => {
                              setActiveMenu(null);
                              if (section.title === "Layouts by Big Bear Vans") {
                                handleLayoutClick(item.link);
                              }
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          forceMobile ? "md:block" : "md:hidden"
        } ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      >
        {/* MOBILE MENU CONTENT */}
        <div
          ref={mobileMenuContentRef}
          className={`absolute top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-out ${
            forceMobile ? "w-full md:w-[40%]" : "w-full"
          } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex flex-col py-8 px-4 min-h-full">
            {forceMobile && (
              <div className="flex items-center mb-5">
                <Link to="/" className="block">
                  <ImageWithSkeleton 
                    src="/images/logoo.webp" 
                    alt="BBV logo" 
                    className="w-[150px] h-[30px] object-contain" 
                  />
                </Link>
              </div>
            )}

            {/* Book Appointment Button - Mobile */}
            <div className="mb-6">
              <Link
                to="/contact"
                onClick={(e) => handleMobileLinkClick(e, "/contact")}
                className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center block"
              >
                Book Free Consultation
              </Link>
            </div>

            {Object.keys(menuContent).map((key, idx) => {
              const menu = menuContent[key];
              const hasSubmenu = menu.sections && menu.sections.length > 0;

              return (
                <div key={idx} className="w-full mb-3">
                  {hasSubmenu ? (
                    <>
                      <button
                        className={`w-full text-xl font-semibold text-blackish py-3 flex justify-between items-center ${
                          isParentActive(key) ? "text-indigo-600" : ""
                        }`}
                        onClick={() => handleMobileSubmenuToggle(key)}
                      >
                        {menu.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            activeMenu === key ? "rotate-180" : ""
                          }`}
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
                                {section.title === "Blog" ? (
                                  <>
                                    {blogs?.slice(0, 4).map((blog) => (
                                      <li key={blog._id}>
                                        <Link
                                          to={`/blog-detail/${blog._id}`}
                                          onClick={(e) => handleMobileLinkClick(e, `/blog-detail/${blog._id}`)}
                                          className="block py-1 text-gray-700 hover:text-indigo-600 group"
                                        >
                                          <span>{blog.title}</span>
                                          <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                            --→
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                    <li>
                                      <Link
                                        to="/blogs"
                                        onClick={(e) => handleMobileLinkClick(e, "/blogs")}
                                        className="block py-2 text-indigo-600 font-semibold hover:text-indigo-700"
                                      >
                                        View All Blogs →
                                      </Link>
                                    </li>
                                  </>
                                ) : section.title === "Explore Layout Options" ? (
                                  <>
                                    {categories?.slice(0, 4).map((category, i) => (
                                      <li key={i}>
                                        <Link
                                          to={`/layout-by-category/${category}`}
                                          onClick={(e) => handleMobileLinkClick(e, `/layout-by-category/${category}`)}
                                          className="block py-1 text-gray-700 hover:text-indigo-600 group"
                                        >
                                          <span>{category}</span>
                                          <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                            --→
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                    <li>
                                      <Link
                                        to="/portfolio"
                                        onClick={(e) => handleMobileLinkClick(e, "/portfolio")}
                                        className="block py-2 text-indigo-600 font-semibold hover:text-indigo-700"
                                      >
                                        View All Categories →
                                      </Link>
                                    </li>
                                  </>
                                ) : section.title === "Van Models Options" ? (
                                  <>
                                    {wheelBases?.slice(0, 4).map((base, i) => {
                                      let label = "";
                                      if (base == "144") label = "Sprinter 144";
                                      else if (base == "170") label = "Sprinter 170";
                                      else if (base == "148") label = "Transit 148";
                                      else label = `Promaster ${base}`;

                                      return (
                                        <li key={i}>
                                          <Link
                                            to={`/wheel-base/${base}`}
                                            onClick={(e) => handleMobileLinkClick(e, `/wheel-base/${base}`)}
                                            className="block py-1 text-gray-700 hover:text-indigo-600 group"
                                          >
                                            <span>{label}</span>
                                            <span className="text-xl text-indigo-600 font-bold opacity-70 group-hover:translate-x-1 transition-all">
                                              --→
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                    <li>
                                      <Link
                                        to="/wheel-base"
                                        onClick={(e) => handleMobileLinkClick(e, "/wheel-base")}
                                        className="block py-2 text-indigo-600 font-semibold hover:text-indigo-700"
                                      >
                                        View All Wheelbases →
                                      </Link>
                                    </li>
                                  </>
                                ) : (
                                  section.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                      <Link
                                        to={item.link}
                                        onClick={(e) => handleMobileLinkClick(e, item.link)}
                                        className={`block py-1 ${
                                          isChildActive(item.link)
                                            ? "text-indigo-600 font-semibold"
                                            : "text-gray-700 hover:text-indigo-600"
                                        }`}
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={menu.link}
                      onClick={(e) => handleMobileLinkClick(e, menu.link)}
                      className={`w-full text-xl font-semibold text-blackish py-3 block ${
                        isParentActive(key) ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {menu.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
