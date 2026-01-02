"use client";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from 'lucide-react';
import { gsap } from "gsap";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { getNavCat } from "../../../api/portfolio/navBarCat";
import { getnavWheel } from "../../../api/portfolio/navWheelBase";
import { menuContent } from "../../DataUseInComp/MegaMenu";
import { routes } from "../../DataUseInComp/NavbarRoutes";

export default function Navbar({ forceMobile }) {
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState({ blogs: [], categories: [], wheelBases: [] });

  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // --- NAV LINKS CONFIGURATION ---
  // Aap yahan asani se links change kar sakte hain
  const navLinks = [
    { name: 'CustomBuild', label: 'Custom Build', path: '/custom-build', hasDropdown: true },
    { name: 'vans-for-sale', label: 'Vans For Sale', path: '/vans-for-sale', hasDropdown: false },
    { name: 'layout', label: 'Layouts', path: '/layouts', hasDropdown: true },
    { name: 'contact', label: 'Contact', path: '/contact', hasDropdown: false },
    { name: 'discover', label: 'Discover', path: '#', hasDropdown: true },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [b, c, w] = await Promise.all([getAllBlogs(), getNavCat(), getnavWheel()]);
        setData({ blogs: b.data || [], categories: c.data || [], wheelBases: w.data || [] });
      } catch (err) { console.error("Error loading data", err); }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!megaMenuRef.current || forceMobile) return;
    gsap.to(megaMenuRef.current, {
      height: desktopMenu ? "auto" : 0,
      opacity: desktopMenu ? 1 : 0,
      duration: 0.3, ease: "power3.out"
    });
  }, [desktopMenu, forceMobile]);

  const handleHover = (menu) => {
    clearTimeout(timeoutRef.current);
    setDesktopMenu(menu);
  };

  const isParentActive = (key) => routes[key]?.some(r => location.pathname.startsWith(r));

  const getWheelbaseLabel = (base) => {
    if (base === "144" || base === 144) return "Mercedes Sprinter 144";
    if (base === "170" || base === 170) return "Mercedes Sprinter 170";
    if (base === "148" || base === 148) return "Ford Transit 148";
    return `RAM Promaster ${base}`;
  };

  const renderSectionItems = (section, isMobile = false) => {
    if (section.title === "Blog") {
      return (
        <>
          {data.blogs.slice(0, 4).map(b => (
            <li key={b._id}><Link to={`/blog-detail/${b._id}`} className="block py-1 text-gray-700 hover:text-indigo-600">{b.title} →</Link></li>
          ))}
          <li><Link to="/blogs" className="block py-2 text-indigo-600 font-bold">View All Blogs →</Link></li>
        </>
      );
    }
    if (section.title === "Explore Layout Options") {
      const displayCats = isMobile ? data.categories.slice(0, 4) : data.categories;
      return (
        <>
          {displayCats.map((cat, i) => (
            <li key={i}><Link to={`/layout-by-category/${cat}`} className="block py-1 text-gray-700 hover:text-indigo-600">{cat} →</Link></li>
          ))}
          {isMobile && data.categories.length > 4 && (
            <li><Link to="/layouts" className="text-indigo-600 font-bold text-sm">View All Categories →</Link></li>
          )}
        </>
      );
    }
    if (section.title === "Van Models Options") {
      return data.wheelBases.map((base, i) => (
        <li key={i}><Link to={`/wheel-base/${base}`} className="block py-1 text-gray-700 hover:text-indigo-600">{getWheelbaseLabel(base)} →</Link></li>
      ));
    }
    return section.items?.map((item, i) => (
      <li key={i}><Link to={item.link} className={`block py-1 ${location.pathname === item.link ? "text-indigo-600 font-bold" : "text-gray-700 hover:text-indigo-600"}`}>{item.label}</Link></li>
    ));
  };

  return (
    <>
      <nav className={`sticky top-0 w-full bg-white shadow-md z-[1000] ${forceMobile ? "px-2 py-1" : "px-6 py-4"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/"><ImageWithSkeleton src="/images/logoo.webp" alt="BBV logo" className="w-[170px] h-[30px] object-contain" click={true} /></Link>

          {/* DESKTOP NAV (Using Variable) */}
          <div className={`${forceMobile ? "hidden" : "hidden md:flex"} absolute left-1/2 -translate-x-1/2 gap-6 font-serif text-base`}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}
                onMouseEnter={() => link.hasDropdown && handleHover(link.name)}
                onMouseLeave={() => link.hasDropdown && (timeoutRef.current = setTimeout(() => setDesktopMenu(null), 300))}
                className={`flex font-noto-serif items-center gap-1 uppercase text-xs tracking-widest font-bold ${isParentActive(link.name) ? "text-indigo-600" : "text-blackish"}`}>
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* Highlighted & Animated Consultation Button */}
            <Link
              to="/contact"
              className="hidden sm:block px-5 py-2.5 rounded-xl text-[10px] md:text-xs font-bold
               uppercase tracking-widest text-white transition-all duration-300
               hover:scale-110 hover:shadow-[0_0_20px_rgba(79,70,229,0.6)]
               animate-gradient-flow border border-white/20"
            >
              Book Consultation
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU */}
      {desktopMenu && !forceMobile && (
        <div ref={megaMenuRef} className="fixed left-0 w-full bg-white shadow-2xl z-[999] overflow-hidden border-t" style={{ top: "63px" }}
          onMouseEnter={() => handleHover(desktopMenu)} onMouseLeave={() => setDesktopMenu(null)}>
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
            {menuContent[desktopMenu]?.sections?.map((sec, idx) => (
              <div key={idx} className={idx === 0 ? "border-r pr-10" : ""}>
                <h3 className="text-xl font-bold text-indigo-600 mb-4 uppercase text-sm tracking-widest">{sec.title}</h3>
                <ul className="space-y-2">{renderSectionItems(sec)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1001]" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-[85%] bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <ImageWithSkeleton src="/images/logoo.webp" alt="Logo" className="w-32" />
              <X className="w-6 h-6" onClick={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b last:border-0">
                  {!link.hasDropdown ? (
                    <Link to={link.path} className="block py-4 font-bold text-lg uppercase" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>
                  ) : (
                    <>
                      <button className="w-full flex justify-between items-center py-4 font-bold text-lg uppercase" onClick={() => setMobileMenu(mobileMenu === link.name ? null : link.name)}>
                        {link.label}
                        <ChevronDown className={`transition-transform ${mobileMenu === link.name ? "rotate-180" : ""}`} />
                      </button>
                      {mobileMenu === link.name && (
                        <div className="pl-4 pb-4 space-y-4">
                          {menuContent[link.name]?.sections?.map((sec, i) => (
                            <div key={i}>
                              <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-2 tracking-widest">{sec.title}</h4>
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
                <Link to="/contact" className="block w-full bg-black text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Book Free Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}