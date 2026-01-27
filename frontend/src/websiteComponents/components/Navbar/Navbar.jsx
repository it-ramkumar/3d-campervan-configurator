"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from 'lucide-react';
import { gsap } from "gsap";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { getNavCat } from "../../../api/portfolio/navBarCat";
import { getnavWheel } from "../../../api/portfolio/navWheelBase";
import { menuContent } from "../../DataUseInComp/MegaMenu";
import { routes } from "../../DataUseInComp/NavbarRoutes";
import { FooterListItem } from "../Common/Li/FooterLiItem";
import { Heading4,ImageWithSkeleton } from '../Common/Common'

// --- Sub Components ---
const NavListItem = ({ to, children, isActive, onClick }) => (
  <FooterListItem
    to={to}
    onClick={onClick}
    className={`block py-1 ${isActive ? "text-indigo-600 font-bold" : "text-gray-700 hover:text-indigo-600"} transition-colors`}
  >
    {children}
  </FooterListItem>
);

const BlogListItem = ({ to, children, onClick }) => (
  <FooterListItem
    to={to}
    onClick={onClick}
    className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors"
    bullets="list-desc"
  >
    {children} →
  </FooterListItem>
);

const ViewAllLink = ({ to, children, onClick }) => (
  <FooterListItem
    to={to}
    onClick={onClick}
    className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors"
  >
    {children} →
  </FooterListItem>
);

const MobileSectionTitle = ({ children }) => (
  <Heading4 text={children} textColor="text-indigo-600" />
);

// --- Main Component ---
export default function Navbar({ forceMobile }) {
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState({ blogs: [], categories: [], wheelBases: [] });

  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const location = useLocation();

  const navLinks = useMemo(() => [
    { name: 'CustomBuild', label: 'Custom Build', path: '/custom-build', hasDropdown: true },
    { name: 'vans-for-sale', label: 'Vans For Sale', path: '/vans-for-sale', hasDropdown: false },
    { name: 'layout', label: 'Layouts', path: '/van-layouts', hasDropdown: true },
    { name: 'contact', label: 'Contact', path: '/contact', hasDropdown: false },
    { name: 'discover', label: 'Discover', path: '#', hasDropdown: true },
  ], []);

  // Sync state with location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  // Data Fetching with error boundary
  useEffect(() => {
    const loadData = async () => {
      try {
        const [b, c, w] = await Promise.all([
          getAllBlogs().catch(() => ({ data: [] })),
          getNavCat().catch(() => ({ data: [] })),
          getnavWheel().catch(() => ({ data: [] }))
        ]);
        setData({ blogs: b.data || [], categories: c.data || [], wheelBases: w.data || [] });
      } catch (err) {
        console.error("Error loading data", err);
        setData({ blogs: [], categories: [], wheelBases: [] });
      }
    };
    loadData();
  }, []);

  // Optimized Desktop Mega Menu Animation
  useEffect(() => {
    if (!megaMenuRef.current || forceMobile) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    const element = megaMenuRef.current;

    if (desktopMenu) {
      gsap.set(element, {
        display: 'block',
        height: 'auto',
        opacity: 0,
        y: -20
      });

      animationRef.current = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        force3D: true
      });
    } else {
      animationRef.current = gsap.to(element, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        force3D: true,
        onComplete: () => {
          gsap.set(element, { display: 'none' });
        }
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [desktopMenu, forceMobile]);

  const handleHover = useCallback((menu) => {
    if (forceMobile) return;
    clearTimeout(timeoutRef.current);
    setDesktopMenu(menu);
  }, [forceMobile]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setDesktopMenu(null), 200);
  }, []);

  const isParentActive = useCallback((key) =>
    routes[key]?.some(r => location.pathname === r || location.pathname.startsWith(r + "/")),
    [location.pathname]
  );

  const getWheelbaseLabel = useCallback((base) => {
    const labels = { "144": "Sprinter 144", "170": "Sprinter 170", "148": "Transit 148" };
    return labels[base] || `RAM Promaster ${base}`;
  }, []);

  const renderSectionItems = useCallback((section, isMobile = false) => {
    const closeMobile = () => isMobile && setIsMobileMenuOpen(false);

    if (section.title === "Blog") {
      return (
        <>
          {data.blogs.slice(0, 4).map(b => (
            <BlogListItem key={b._id} to={`/blog-detail/${b.slug}`} onClick={closeMobile}>
              {b.title}
            </BlogListItem>
          ))}
          <ViewAllLink to="/blog" onClick={closeMobile}>View All Blogs</ViewAllLink>
        </>
      );
    }

    if (section.title === "Explore Layout Options") {
      const displayCats = isMobile ? data.categories.slice(0, 4) : data.categories;
      return (
        <>
          {displayCats.map((cat, i) => (
            <NavListItem key={i} to={`/layout-by-category/${cat}`} onClick={closeMobile}>
              {cat} →
            </NavListItem>
          ))}
          {isMobile && data.categories.length > 4 && (
            <ViewAllLink to="/van-layouts" onClick={closeMobile}>View All Categories</ViewAllLink>
          )}
        </>
      );
    }

    if (section.title === "Van Models Options") {
      return data.wheelBases.map((base, i) => (
        <NavListItem key={i} to={`/wheel-base/${base}`} onClick={closeMobile}>
          {getWheelbaseLabel(base)} →
        </NavListItem>
      ));
    }

    return section.items?.map((item, i) => (
      <NavListItem key={i} to={item.link} isActive={location.pathname === item.link} onClick={closeMobile}>
        {item.label}
      </NavListItem>
    ));
  }, [data, location.pathname, getWheelbaseLabel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  return (
    <>
      {/* --- Main Navigation Bar --- */}
      <nav className={`sticky top-0 w-full   font-serif z-[1000] flex items-center ${forceMobile ? "bg-none h-[15px] " : "px-6 bg-white shadow-md h-[65px] "}`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {!forceMobile && (
            <Link to="/">
              <ImageWithSkeleton
                src="/images/logoo.webp"
                alt="BBV logo"
                className="w-[170px] h-[30px] object-contain"
                priority={true}
                click={true}
              />
            </Link>
          )}

          {/* DESKTOP LINKS */}
          <div className={`${forceMobile ? "hidden" : "hidden lg:flex"} absolute left-1/2 -translate-x-1/2 gap-6`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => link.hasDropdown && handleHover(link.name)}
                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                className={`flex items-center gap-1 uppercase text-[11px] tracking-widest font-bold transition-colors duration-200 ${
                  isParentActive(link.name) ? "text-indigo-600" : "text-black hover:text-indigo-600"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    desktopMenu === link.name ? 'rotate-180' : ''
                  }`} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!forceMobile && (
              <Link
                to="/contact"
                className="hidden lg:block px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white animate-gradient-flow border border-white/20 transition-transform hover:scale-105"
              >
                Book Consultation
              </Link>
            )}
            {/* Hamburger menu - only show on mobile/tablet or when forceMobile is true */}
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${forceMobile ? "block" : "block lg:hidden p-2"} text-black  transition-transform hover:scale-110`}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Desktop Mega Menu --- */}
      <div
        ref={megaMenuRef}
        className="fixed left-0 w-full bg-white shadow-2xl z-[999] border-t will-change-transform"
        style={{
          top: "65px",
          display: desktopMenu && !forceMobile ? 'block' : 'none',
          contain: 'layout style paint'
        }}
        onMouseEnter={() => !forceMobile && handleHover(desktopMenu)}
        onMouseLeave={() => !forceMobile && handleMouseLeave()}
      >
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
          {menuContent[desktopMenu]?.sections?.map((sec, idx) => (
            <div key={idx} className={idx === 0 ? "border-r pr-10" : ""}>
              <Heading4 text={sec.title} textColor="text-indigo-600" />
              <ul className="space-y-1 mt-4">{renderSectionItems(sec)}</ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1001]" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-[85%] bg-white p-6 overflow-y-auto transform transition-transform duration-300 will-change-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <ImageWithSkeleton src="/images/logoo.webp" alt="Logo" className="w-32" priority={true} />
              </Link>
              <X className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b last:border-0">
                  {!link.hasDropdown ? (
                    <Link
                      to={link.path}
                      className="block py-4 font-bold text-lg uppercase transition-colors hover:text-indigo-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="w-full flex justify-between items-center py-4 font-bold text-lg uppercase transition-colors hover:text-indigo-600"
                        onClick={() => setMobileMenu(mobileMenu === link.name ? null : link.name)}
                      >
                        {link.label}
                        <ChevronDown className={`transition-transform duration-200 ${mobileMenu === link.name ? "rotate-180" : ""}`} />
                      </button>
                      {mobileMenu === link.name && (
                        <div className="pl-4 pb-4 space-y-4">
                          {menuContent[link.name]?.sections?.map((sec, i) => (
                            <div key={i}>
                              <MobileSectionTitle>{sec.title}</MobileSectionTitle>
                              <ul className="space-y-2">{renderSectionItems(sec, true)}</ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="block w-full bg-black text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}