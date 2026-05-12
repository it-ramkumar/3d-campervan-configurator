"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link"; // Next.js Link
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from 'lucide-react';
import { gsap } from "gsap";
import { linksForNavbar } from "../../api/blog/linksForNavbar";
import { menuContent } from "../../DataUseInComp/MegaMenu"
import { routes } from "../../DataUseInComp/NavbarRoutes";
import { FooterListItem } from "../Common/Li/FooterLiItem";
import { Heading4 } from '../Common/Common'
import Image from "next/image";

// --- Sub Components ---
// NOTE: FooterListItem ke andar 'to' ko 'href' mein badalna hoga agar wo Link use kar raha hai
const NavListItem = ({ href, children, isActive, onClick }) => (
  <FooterListItem
    href={href}
    onClick={onClick}
    className={`block py-1 ${isActive ? "text-primary font-semibold" : "text-primary hover:!text-hover"} transition-colors font-body tracking-tight text-[14px]`}
  >
    {children}
  </FooterListItem>
);


const layoutCategories = [
  { name: "Santa Monica", slug: "/van-layouts?search=santa+monica", image: ["/renderings/sm.webp", "/renderings/sm1.webp"] },
  { name: "Montreal", slug: "/van-layouts?search=montreal", image: ["/renderings/montreal.webp", "/renderings/montreal1.webp"] },
  { name: "Imperial", slug: "/van-layouts?search=imperial", image: ["/renderings/imperial.webp", "/renderings/imperial1.webp"] },
  { name: "Santa Barbara", slug: "/van-layouts?search=santa+barbara", image: ["/renderings/santaBarbara.webp", "/renderings/santaBarbara1.webp"] },
];
const CategoryCard = ({ image, title, href, onClick }) => (
  <div className="flex flex-col items-center group text-center">
    <Link
      href={href}
      onClick={onClick}
      className="w-full no-underline"
    >
      {/* Image Container */}
      <div className="w-full mb-4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title Section */}
      <span className="block px-2 text-[14px] font-body font-semibold uppercase tracking-[0.1em] text-primary group-hover:text-hover transition-colors">
        {title}
      </span>
    </Link>
  </div>
);

const BlogListItem = ({ href, children, onClick }) => (
  <FooterListItem
    href={href}
    onClick={onClick}
    className="block py-2 text-[14px] text-primary font-body tracking-tight hover:!text-hover transition-colors"
    bullets="list-desc"
  >
    {children} →
  </FooterListItem>
);

const ViewAllLink = ({ href, children, onClick }) => (
  <FooterListItem
    href={href}
    onClick={onClick}
    className="block py-2 text-[14px] text-primary font-body tracking-tight hover:!text-hover transition-colors"
  >
    {children} →
  </FooterListItem>
);

const MobileSectionTitle = ({ children }) => (
  <Heading4 text={children} textColor="text-primary" />
);

export default function Navbar({ forceMobile }) {
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState({ blogs: [], categories: [], wheelBases: [] });

  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const pathname = usePathname(); // Yeh direct string deta hai

  const navLinks = useMemo(() => [
    { name: 'CustomBuild', label: 'Custom Build', path: '/custom-build', hasDropdown: true },
    { name: 'Camper Vans For Sale', label: 'Vans For Sale', path: '/camper-vans-for-sale', hasDropdown: false },
    { name: 'layout', label: 'Layouts', path: '/layout-by-category', hasDropdown: true },
    { name: 'Shop', label: 'Shop', path: 'https://vanpartsoutlet.com/', hasDropdown: false },
    { name: 'discover', label: 'Discover', path: '#', hasDropdown: true },
  ], []);

  const isParentActive = useCallback((key) => {
    const routeList = routes?.[key];
    if (!routeList || !pathname) return false;
    return routeList.some(r => pathname === r || pathname.startsWith(r + "/"));
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
    if (typeof document !== "undefined") document.body.style.overflow = '';
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }
  }, [isMobileMenuOpen]);

useEffect(() => {
  const loadData = async () => {
    // 1. Function call karein
    const res = await linksForNavbar();

    // 2. Response check karein (linksForNavbar hamesha object bhejega)
    if (res && res.success) {
      // Yahan apna state update karein
      setData(res.data);
    } else {
      console.log("Kuch ghalat hua:", res.message);
      // Default empty state set karein
      setData({ blogs: [] });
    }
  };

  loadData();
}, []);

  // --- GSAP Animation Logic (Same as before) ---
  useEffect(() => {
    if (!megaMenuRef.current || forceMobile) return;
    const element = megaMenuRef.current;
    if (animationRef.current) animationRef.current.kill();

    if (desktopMenu) {
      gsap.set(element, { display: 'block', height: 'auto', opacity: 0, y: -20 });
      animationRef.current = gsap.to(element, {
        opacity: 1, y: 0, duration: 0.25, ease: "power2.out",
      });
    } else {
      animationRef.current = gsap.to(element, {
        opacity: 0, y: -10, duration: 0.2, ease: "power2.in",
        onComplete: () => gsap.set(element, { display: 'none' })
      });
    }
  }, [desktopMenu, forceMobile]);

  const handleHover = useCallback((menu) => {
    if (forceMobile) return;
    clearTimeout(timeoutRef.current);
    setDesktopMenu(menu);
  }, [forceMobile]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setDesktopMenu(null), 200);
  }, []);

  const renderSectionItems = useCallback((section, isMobile = false) => {
    const closeMobile = () => isMobile && setIsMobileMenuOpen(false);

    if (section.title === "Blog") {
      return (
        <>
          {data?.map(b => (
            <BlogListItem key={b.slug} href={`/blog-detail/${b.slug}`} onClick={closeMobile}>
              {b.title}
            </BlogListItem>
          ))}
          <ViewAllLink href="/blog" onClick={closeMobile}>View All Blogs</ViewAllLink>
        </>
      );
    }

    if (section?.title === "Explore Layout Options") {
      return (
        <div className="flex flex-col w-full">
          {/* 1. Cards Grid: Mobile pe 2, Desktop pe 3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-10">
            {layoutCategories
              ?.map((cat, i) => (
                <CategoryCard
                  key={i}
                  href={`${cat.slug}`}
                  onClick={closeMobile}
                  image={cat.image[0]}
                  title={cat.name}
                />
              ))}
          </div>

          <div className="mt-10 mb-4 flex justify-center md:justify-start border-t border-primary/10 pt-6">
            <Link
              href="/layout-by-category"
              onClick={closeMobile}
              className="group flex items-center gap-2 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-primary hover:text-hover transition-all"
            >
              View All Layout By Category
              <span className="transform transition-transform group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>
      );
    }
    if (section?.title === "Van Models Options") {
      return (
        <>

          <NavListItem href={`/van-layouts?wheelbase=144`} onClick={closeMobile}>
            Mercedes Sprinter 144 →
          </NavListItem>
          <NavListItem href={`/van-layouts?wheelbase=170`} onClick={closeMobile}>
            Mercedes Sprinter 170 →
          </NavListItem> <NavListItem href={`/van-layouts?wheelbase=148`} onClick={closeMobile}>
            Ford Transit 148 →
          </NavListItem> <NavListItem href={`/van-layouts?wheelbase=159`} onClick={closeMobile}>
            Ram ProMaster 159 →
          </NavListItem>
          <Heading4 text="Built for Every Journey Size" className="my-4" />
          {/* Uske foran baad ye items nazar aayenge */}
          <NavListItem href={`/van-layouts?category=Flagship+Long+Van+—+Montreal`} onClick={closeMobile}>
            Ideal for small families (2–3 people)
          </NavListItem>
          <NavListItem href={`/van-layouts?category=Layouts+for+Families+%283–9+People%29`} onClick={closeMobile}>
            Perfect for larger families (4+ passengers)
          </NavListItem>
          <div className="mt-10 mb-4 flex justify-center md:justify-start border-t border-primary/10 pt-6">
            <Link
              href="/van-layouts"
              onClick={closeMobile}
              className="group flex items-center gap-2 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-primary hover:text-hover transition-all"
            >
              View All Layout Options
              <span className="transform transition-transform group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </>
      );
    }

    return section?.items?.map((item, i) => (
      <NavListItem key={i} href={item?.link} isActive={pathname === item?.link} onClick={closeMobile}>
        {item?.label}
      </NavListItem>
    ));
  }, [data, pathname]);

  return (
    <>
      {/* --- Main Navigation Bar --- */}
      <nav className={`sticky top-0 w-full font-body z-[1000] flex items-center ${forceMobile ? "bg-none h-[15px]" : "px-6 bg-secondary shadow-md h-[65px]"}`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {!forceMobile && (
            <Link href="/">
              <Image src="/images/logoo.webp" alt="BBV logo" width={200} height={100} className="object-contain border-none"/>
            </Link>
          )}

          {/* DESKTOP LINKS */}
          <div className={`${forceMobile ? "hidden" : "hidden lg:flex"} absolute left-1/2 -translate-x-1/2 gap-6`}>
            {navLinks.map((link) => (
              <Link
                key={link.name || "/"}
                href={link.path}
                onMouseEnter={() => link.hasDropdown && handleHover(link.name)}
                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                className={`flex items-center gap-1 uppercase text-[12px] font-body font-semibold tracking-tight transition-colors duration-200 ${isParentActive(link.name) ? "text-primary" : "text-primary hover:!text-hover"
                  }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${desktopMenu === link.name ? 'rotate-180' : ''}`} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!forceMobile && (
              <Link
                href="/contact"
                className="hidden lg:block px-5 py-2.5 rounded-md text-[11px] font-semibold uppercase tracking-widest bg-primary text-secondary border border-black/20 transition-transform hover:scale-105 hover:bg-primary hover:text-secondary"
              >
                Book Consultation
              </Link>
            )}
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${forceMobile ? "block" : "block lg:hidden p-2"} text-primary transition-transform hover:scale-110`}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Desktop Mega Menu --- */}
      <div
        ref={megaMenuRef}
        className="fixed left-0 w-full shadow-2xl z-[999] border-t font-body tracking-tight will-change-transform bg-secondary text-primary max-h-[80vh] overflow-y-auto"
        style={{
          top: "65px",
          display: desktopMenu && !forceMobile ? 'block' : 'none',
          contain: 'layout style paint',
        }}
        onMouseEnter={() => !forceMobile && clearTimeout(timeoutRef.current)}
        onMouseLeave={() => !forceMobile && handleMouseLeave()}
      >
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-10 gap-10 min-h-fit">
          {menuContent[desktopMenu]?.sections?.map((sec, idx) => {
            const isExplore = sec.title === "Explore Layout Options";
            const isVanModels = sec.title === "Van Models Options";

            return (
              <div
                key={idx}
                className={`
            ${isExplore ? "col-span-7 border-r-1 border-primary" : isVanModels ? "col-span-3" : "col-span-5 border-r-1 border-primary"}
          `}
              >
                <Heading4 text={sec.title} textColor="text-primary" />
                <ul className="space-y-1 font-body mt-4">
                  {renderSectionItems(sec)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/25 z-[1001]" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className={`fixed right-0 top-0 h-full w-full p-6 overflow-y-auto transform transition-transform duration-300 will-change-transform bg-secondary text-primary`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 border-b border-primary pb-4">
              <Link href={"/"} onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/images/logoo.webp" alt="Logo" width={200} height={100} priority={true} />
              </Link>
              <X className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-primary last:border-0">
                  {!link.hasDropdown ? (
                    // Simple Link (No Dropdown)
                    <Link
                      href={link.path}
                      className="block py-4 font-semibold text-lg uppercase transition-colors hover:!text-hover"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    // Split Action: Text redirects, Arrow toggles
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between w-full border-b border-gray-100/10">
                        {/* 1. Yeh text user ko page par le jayega */}
                        <Link
                          href={link.path}
                          className="flex-grow py-4 font-semibold text-lg uppercase transition-colors hover:!text-hover"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>

                        {/* 2. Yeh icon sirf dropdown toggle karega */}
                        <button
                          aria-label="Toggle Submenu"
                          className="p-4 border-l border-gray-100/10"
                          onClick={(e) => {
                            e.stopPropagation(); // Parent link ko trigger hone se rokega
                            setMobileMenu(mobileMenu === link.name ? null : link.name);
                          }}
                        >
                          <ChevronDown
                            className={`w-6 h-6 transition-transform duration-200
                ${mobileMenu === link.name ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Dropdown Content */}
                      {mobileMenu === link.name && (
                        <div className="pl-4 pb-4 space-y-4 bg-black/5 animate-in slide-in-from-top-2">
                          {menuContent[link.name]?.sections?.map((sec, i) => (
                            <div key={i} className="mt-4">
                              <MobileSectionTitle>{sec.title}</MobileSectionTitle>
                              <ul className="space-y-2">{renderSectionItems(sec, true)}</ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="block w-full bg-primary font-body text-secondary text-center py-4 rounded-md font-semibold uppercase tracking-tight text-xs transition-transform hover:scale-105"
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
