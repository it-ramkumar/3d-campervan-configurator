"use client";
import { useState, useEffect, useRef } from "react";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from 'lucide-react';
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { getNavCat } from "../../../api/portfolio/navBarCat";
import { getnavWheel } from "../../../api/portfolio/navWheelBase";
import { menuContent } from "../../DataUseInComp/MegaMenu";
import { routes } from "../../DataUseInComp/NavbarRoutes";

export default function Navbar({ forceMobile }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wheelBases, setWheelBases] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [layoutData, setLayoutData] = useState(null);
  const [loading, setLoading] = useState(false);

  const megaMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // --- FIX 1: INSTANT CLOSE ON ROUTE CHANGE ---
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
    document.body.style.overflow = "auto";
    // This ensures that as soon as the path changes, the menu state resets
  }, [location.pathname]);

  // --- FIX 2: GSAP DESKTOP MEGA MENU ---
  useEffect(() => {
    if (!megaMenuRef.current) return;
    if (activeMenu && !forceMobile) {
      gsap.fromTo(
        megaMenuRef.current,
        { height: 0, opacity: 0, display: "none" },
        { height: "auto", opacity: 1, display: "block", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(megaMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        display: "none"
      });
    }
  }, [activeMenu, forceMobile]);

  // --- FIX 3: GSAP MOBILE MENU (STOPS FLASHING & OVERLAY) ---
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      document.body.style.overflow = "hidden"; 
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
          document.body.style.overflow = "auto";
        }
      });
    }
  }, [isMobileMenuOpen]);

  // --- DATA FETCHING ---
  useEffect(() => {
    setLoader(true);
    const fetchBlogs = async () => {
      try {
        const result = await getAllBlogs();
        setBlogs(result.data || []);
      } catch (err) {
        console.log("Error loading blogs", err);
      } finally {
        setLoader(false);
      }
    };
    fetchBlogs();
  }, [location.pathname]);

  useEffect(() => {
    const loadData = async () => {
      const catRes = await getNavCat();
      const wheelRes = await getnavWheel();
      setCategories(catRes.data || []);
      setWheelBases(wheelRes.data || []);
    };
    loadData();
  }, []);

  // --- HANDLERS ---
  const handleMenuHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLayoutClick = async (link) => {
    setSelectedLayout(link);
    setLoading(true);
    try {
      const res = await fetch(`/api/layouts?type=${encodeURIComponent(link)}`);
      const data = await res.json();
      setLayoutData(data);
    } catch (err) {
      console.error("Error fetching layout data", err);
    } finally {
      setLoading(false);
    }
  };

  const isParentActive = (key) => routes[key]?.includes(location.pathname);
  const isChildActive = (path) => location.pathname === path;

  if (Loader) return null;

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <nav className={`${forceMobile ? "sticky top-0 w-full px-2 py-1 shadow-md z-[3000] bg-white" : "sticky top-0 w-full px-6 py-4 bg-white shadow-md z-[3000]"}`}>
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

          {/* DESKTOP NAVIGATION LINKS */}
          <div className={`${forceMobile ? "hidden" : "hidden md:flex"} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 text-blackish tracking-wide font-medium font-serif text-base`}>
            <Link
              to="#"
              onMouseEnter={() => handleMenuHover("CustomBuild")}
              onMouseLeave={handleMenuLeave}
              className={`flex items-center gap-1 ${isParentActive("CustomBuild") ? "text-indigo-600 font-semibold" : ""}`}
            >
              Custom Build <ChevronDown className="w-3 h-3" />
            </Link>

            <Link
              to="/vans-for-sale"
              onMouseEnter={() => handleMenuHover("vans-for-sale")}
              onMouseLeave={handleMenuLeave}
              className={`flex items-center gap-2 ${isParentActive("vans-for-sale") ? "text-indigo-600 font-semibold" : ""}`}
            >
              Vans For Sale
              <span className="bg-red-600 text-white text-[10px] px-2 py-[2px] rounded-full animate-pulse">SALE</span>
            </Link>

            <Link
              to="/layouts"
              onMouseEnter={() => handleMenuHover("layout")}
              onMouseLeave={handleMenuLeave}
              className={`flex items-center gap-1 ${isParentActive("layout") ? "text-indigo-600 font-semibold" : ""}`}
            >
              Layouts <ChevronDown className="w-3 h-3" />
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
              Discover <ChevronDown className="w-3 h-3" />
            </Link>
          </div>

          {/* RIGHT BUTTON & HAMBURGER */}
          <div className="flex items-center gap-4">
            {!forceMobile && (
              <Link to="/contact" className="hidden md:flex relative group bg-black text-white rounded-xl p-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-orange-400 to-cyan-500 animate-[spin_6s_linear_infinite]"></div>
                <div className="relative z-10 bg-white text-black px-4 py-2.5 rounded-xl flex items-center">
                  Book Free Consultation
                  <svg className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              </Link>
            )}

            {/* Hamburger Button with Toggle Icon */}
            <button onClick={toggleMobileMenu} className={`${forceMobile ? "" : "md:hidden"} z-[3100] text-blackish p-2`}>
               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU */}
      {activeMenu && !forceMobile && menuContent[activeMenu]?.sections && (
        <div
          ref={megaMenuRef}
          className="fixed left-0 w-full bg-white shadow-xl z-[2500] overflow-hidden"
          style={{ top: "63px", height: "0" }}
          onMouseEnter={() => handleMenuHover(activeMenu)}
          onMouseLeave={handleMenuLeave}
        >
          <div className="max-w-7xl px-6 py-8 mx-auto">
            <h2 className="text-3xl font-bold text-blackish mb-8">{menuContent[activeMenu]?.title}</h2>
            <div className="flex h-auto">
              {menuContent[activeMenu]?.sections?.map((section, idx) => (
                <div key={idx} className={`w-1/2 ${idx === 0 ? "pr-6 border-r border-gray-200" : "pl-6"}`}>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.title === "Blog" ? (
                      <>
                        {blogs?.slice(0, 4).map((blog) => (
                          <li key={blog._id}>
                            <Link to={`/blog-detail/${blog._id}`} className="block py-1 text-gray-700 hover:text-indigo-600">
                              <span>{blog.title}</span>
                              <span className="ml-2 text-indigo-600 font-bold">→</span>
                            </Link>
                          </li>
                        ))}
                        <li><Link to="/blogs" className="block py-2 text-indigo-600 font-semibold">View All Blogs →</Link></li>
                      </>
                    ) : section.title === "Explore Layout Options" ? (
                      categories?.map((category, i) => (
                        <li key={i}>
                          <Link to={`/layout-by-category/${category}`} className="block py-1 text-gray-700 hover:text-indigo-600">
                            <span>{category}</span>
                            <span className="ml-2 text-indigo-600 font-bold">→</span>
                          </Link>
                        </li>
                      ))
                    ) : section.title === "Van Models Options" ? (
                      wheelBases?.map((base, i) => {
                        let label = base == "144" ? "Sprinter 144" : base == "170" ? "Sprinter 170" : base == "148" ? "Transit 148" : `Promaster ${base}`;
                        return (
                          <li key={i}>
                            <Link to={`/wheel-base/${base}`} className="block py-1 text-gray-700 hover:text-indigo-600">
                              <span>{label}</span>
                              <span className="ml-2 text-indigo-600 font-bold">→</span>
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      section.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.link}
                            className={`block py-1 ${isChildActive(item.link) ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
                            onClick={() => {
                              setActiveMenu(null);
                              if (section.title === "Layouts by Big Bear Vans") handleLayoutClick(item.link);
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

      {/* MOBILE MENU - FULL RESTORATION */}
      <div
        ref={mobileMenuRef}
        className={`fixed left-0 top-[62px] bg-white shadow-lg z-[2900] transition-all duration-300 ${forceMobile ? "w-full md:w-[40%]" : "w-full md:hidden"}`}
        style={{ height: "calc(100vh - 62px)", overflowY: "auto", display: "none" }}
      >
        <div className="flex flex-col py-8 px-4 min-h-full">
          {forceMobile && (
            <div className="flex items-center mb-5">
              <Link to="/" className="block">
                <ImageWithSkeleton src="/images/logoo.webp" alt="BBV logo" className="w-[150px] h-[30px] object-contain" />
              </Link>
            </div>
          )}

          {Object.keys(menuContent).map((key, idx) => {
            const menu = menuContent[key];
            const hasSubmenu = menu.sections && menu.sections.length > 0;
            const isOpen = activeMenu === key;

            return (
              <div key={idx} className="w-full mb-3">
                {hasSubmenu ? (
                  <>
                    <button
                      className={`w-full text-xl font-semibold text-blackish py-3 flex justify-between ${isParentActive(key) ? "text-indigo-600" : ""}`}
                      onClick={() => setActiveMenu(isOpen ? null : key)}
                    >
                      {menu.title}
                      <ChevronDown className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <div className="pl-4 border-l-2 border-indigo-50 mt-2">
                        {menu.sections.map((section, secIdx) => (
                          <div key={secIdx} className="mb-4">
                            <h4 className="text-indigo-600 font-bold text-sm uppercase mb-2">{section.title}</h4>
                            <ul className="space-y-3">
                              {/* DYNAMIC BLOCKS FOR MOBILE */}
                              {section.title === "Blog" ? (
                                <>
                                  {blogs?.slice(0, 4).map((blog) => (
                                    <li key={blog._id}>
                                      <Link to={`/blog-detail/${blog._id}`} className="block py-1 text-gray-700">
                                        {blog.title}
                                      </Link>
                                    </li>
                                  ))}
                                  <li><Link to="/blogs" className="text-indigo-600 font-bold">All Blogs →</Link></li>
                                </>
                              ) : section.title === "Explore Layout Options" ? (
                                categories?.map((cat, i) => (
                                  <li key={i}><Link to={`/layout-by-category/${cat}`} className="block py-1 text-gray-700">{cat}</Link></li>
                                ))
                              ) : section.title === "Van Models Options" ? (
                                wheelBases?.map((base, i) => (
                                  <li key={i}><Link to={`/wheel-base/${base}`} className="block py-1 text-gray-700">{base} Wheelbase</Link></li>
                                ))
                              ) : (
                                section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link to={item.link} className="block py-1 text-gray-700">
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
                    className={`w-full text-xl font-semibold py-3 block ${isParentActive(key) ? "text-indigo-600" : "text-blackish"}`}
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            );
          })}
          
          <div className="mt-auto pt-6">
            <Link to="/contact" className="w-full bg-black text-white px-4 py-4 rounded-xl font-bold text-center block">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
