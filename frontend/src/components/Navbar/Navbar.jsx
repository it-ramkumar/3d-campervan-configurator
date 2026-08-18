"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link"; // Next.js Link
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { linksForNavbar } from "../../api/blog/linksForNavbar";
import { menuContent } from "../../DataUseInComp/MegaMenu";
// import { routes } from "../../DataUseInComp/NavbarRoutes";
import { FooterListItem } from "../Common/Li/FooterLiItem";
import { Heading4 } from "../Common/Common";
import Image from "next/image";

// --- Sub Components ---
// NOTE: FooterListItem ke andar 'to' ko 'href' mein badalna hoga agar wo Link use kar raha hai
const NavListItem = ({ href, children, isActive, onClick }) => (
  <FooterListItem
    href={href}
    onClick={onClick}
    className={`block py-1.5 ${isActive ? "text-[#ED985F] font-semibold" : "text-primary hover:!text-[#ED985F]"} transition-colors font-ui tracking-wide text-[13px]`}
  >
    {children}
  </FooterListItem>
);

const floorPlans = [
   {
    name: "Moto Van",
    slug: "/floorplans?search=moto",
    image: ["/renderings/moto.webp"],
  },
   {
    name: "Imperial",
    slug: "/floorplans?search=imperial",
    image: ["/renderings/imperialFinal.webp"],
  },
  {
    name: "Santa Monica",
    slug: "/floorplans?category=flagship-short-van-santa-monica",
    image: ["/renderings/sm.webp"],
  },
  {
    name: "Montreal",
    slug: "/floorplans?category=flagship-long-van-montreal",
    image: ["/renderings/montreal.webp"],
  },
   {
    name: "Cusco",
    slug: "/floorplans?search=cusco",
    image: ["/renderings/cusco (1).webp"],
  },
   {
    name: "Oregan Campervan",
    slug: "/floorplans?search=Oregon",
    image: ["/renderings/oregon.webp"],
  },
    {
    name: "Sugarloaf",
    slug: "/floorplans?category=sugarloaf",
    image: ["/renderings/sugarloaf.webp"],
  },

  {
    name: "Santa Barbara",
    slug: "/floorplans?search=santa+barbara",
    image: ["/renderings/santaBarbara.webp"],
  },

];
const TrendPortfolios = [
  {
    name: "MOTO Campervan ",
    slug: "/van-layouts/moto-van",
    image: ["/navbar/motov1.webp"],
  },
   {
    name: "Imperial Campervan",
    slug: "/van-layouts/imperial",
    image: ["/navbar/imperial.webp"],
  },
  {
    name: "Lake Tohoe Campervan ",
    slug: "/van-layouts/lake-tahoe",
    image: ["/navbar/lakeTohoe.webp"],
  },
  {
    name: "San Clemente",
    slug: "/van-layouts/san-clemente",
    image: ["/navbar/sanCelement.webp"],
  },
  {
    name: "Santa Cruz",
    slug: "/van-layouts/santa-cruz",
    image: ["/navbar/santaCruz.webp"],
  },
{
    name: "Santa Monica Campervan",
    slug: "/van-layouts/santa-monica-ford-transit-148-high-roof",
    image: ["/navbar/edProject.webp"],
  },
  {
    name: "Moto V2 Campervan",
    slug: "/van-layouts/moto-van-2-the-glen-helen-edition",
    image: ["/navbar/motov2.webp"],
  },
  {
    name: "Vermont Campervan",
    slug: "/van-layouts/vermont",
    image: ["/navbar/vermont.webp"],
  },
    {
    name: "Montreal 1.0 Campervan",
    slug: "/van-layouts/montreal",
    image: ["/navbar/montrealv1.webp"],
  },
{
    name: "Amsterdam 2.0 Campervan",
    slug: "/van-layouts/amsterdam-20",
    image: ["/navbar/amsterdam.webp"],
  },
];

const CategoryCard = ({ image, title, href, onClick,floorPlans }) => (
  <div className={`flex flex-col items-center group ${floorPlans ? "text-center" : ""}`} >
    <Link href={href} onClick={onClick} className="w-full no-underline">
      {/* Image Container */}
      <div className="w-full mb-4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={floorPlans ? 500 : 100}
          height={floorPlans ? 400 : 100}
          className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title Section */}
      <span className="block px-2 text-[12px] font-display font-bold uppercase tracking-[0.12em] text-primary group-hover:text-[#ED985F] transition-colors">
        {title}
      </span>
    </Link>
  </div>
);

const BlogListItem = ({ href, children, onClick }) => (
  <FooterListItem
    href={href}
    onClick={onClick}
    className="block py-2 text-[13px] text-primary font-ui tracking-wide hover:!text-[#ED985F] transition-colors"
    bullets="list-desc"
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
  const [data, setData] = useState({
    blogs: [],
    categories: [],
    wheelBases: [],
  });

  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const pathname = usePathname(); // Yeh direct string deta hai
const closeDesktopMenu = useCallback(() => {
  setDesktopMenu(null);
}, []);
const navLinks = useMemo(
  () => [
    {
      name: "CustomBuild",
      label: "Custom Build",
      path: "/custom-build",
      hasDropdown: true,
    },
    {
      name: "Camper Vans For Sale",
      label: "Vans For Sale",
      path: "/camper-vans-for-sale",
      hasDropdown: false,
    },
    {
      name: "layout",
      label: "Portfolio",
      path: "/van-layouts",
      hasDropdown: true,
    },
    {
      name: "floorplans",
      label: "Floor Plans",
      path: "/floorplans",
      hasDropdown: true,
    },
    // Updated item below:
    {
      name: "DIY COMPONENTS",
      label: "DIY COMPONENTS",
      path: "/diy-components", // Ye aapka naya internal page path hoga
      hasDropdown: false,
    },
    { name: "discover", label: "Discover", path: "#", hasDropdown: true },
  ],
  [],
);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const loadData = async () => {
      const res = await linksForNavbar();
      if (res && res.success) {
        setData(res.data);
      } else {
        console.log("something wrong:", res.message);
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
      gsap.set(element, {
        display: "block",
        height: "auto",
        opacity: 0,
        y: -20,
      });
      animationRef.current = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      animationRef.current = gsap.to(element, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(element, { display: "none" }),
      });
    }
  }, [desktopMenu, forceMobile]);

  const handleHover = useCallback(
    (menu) => {
      if (forceMobile) return;
      clearTimeout(timeoutRef.current);
      setDesktopMenu(menu);
    },
    [forceMobile],
  );

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setDesktopMenu(null), 200);
  }, []);

  const renderSectionItems = useCallback(
    (section, isMobile = false) => {
      const closeMobile = () => isMobile && setIsMobileMenuOpen(false);
const handleItemClick = () => {
      if (isMobile) {
        setIsMobileMenuOpen(false);
      } else {
        closeDesktopMenu();
      }
    };
      if (section.title === "Blog") {
        return (
          <>
            {data?.map((b) => (
              <BlogListItem
                key={b.slug}
                href={`/blog/${b.slug}`}
               onClick={handleItemClick}
              >
                {b.title}
              </BlogListItem>
            ))}
             <div className="flex justify-center md:justify-start border-t border-primary/10 pt-6">
              <Link
                href="/blog"
              onClick={handleItemClick}
                className="group flex items-center bg-primary py-2 px-4 rounded-lg text-secondary gap-2 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-primary hover:text-hover transition-all"
              >
                All Blogs
                <span className="transform transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </>
        );
      }

      if (section?.title === "Explore Completed Van Builds & Journeys") {
        return (
          <div className="flex flex-col w-full">
            {/* 1. Cards Grid: Mobile pe 2, Desktop pe 3 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 md:gap-10">
              {TrendPortfolios?.map((cat, i) => (
                <CategoryCard
                  key={i}
                  href={`${cat.slug}`}
                 onClick={handleItemClick}
                  image={cat.image[0]}
                  title={cat.name}
                />
              ))}
            </div>


          </div>
        );
      }
       if (section?.title === "Find Your Ideal Floor Plan") {
        return (
          <div className="flex flex-col w-full">
            {/* 1. Cards Grid: Mobile pe 2, Desktop pe 3 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-10">
              {floorPlans?.map((cat, i) => (
                <CategoryCard
                  key={i}
                  href={`${cat.slug}`}
                onClick={handleItemClick}
                  image={cat.image[0]}
                  title={cat.name}
                  floorPlans={true}
                />
              ))}
            </div>
  <div className="flex justify-center border-t border-primary/10 pt-6">
              <Link
                href="/floorplans"
                onClick={handleItemClick}
                className="group flex items-center bg-primary py-2 px-4 rounded-lg text-secondary gap-2 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-primary hover:text-hover transition-all"
              >
                All Floor Plans
                <span className="transform transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>

          </div>
        );
      }
      if (section?.title === "Find Your Perfect Van") {
        return (
          <>
            <NavListItem
              href={`/van-layouts?wheelbase=144`}
         onClick={handleItemClick}
            >
              Mercedes Sprinter 144 →
            </NavListItem>
            <NavListItem
              href={`/van-layouts?wheelbase=170`}
             onClick={handleItemClick}
            >
              Mercedes Sprinter 170 →
            </NavListItem>{" "}
            <NavListItem
              href={`/van-layouts?wheelbase=148`}
            onClick={handleItemClick}
            >
              Ford Transit 148 →
            </NavListItem>{" "}
            <NavListItem
              href={`/van-layouts?wheelbase=159`}
              onClick={closeMobile}
            >
              Ram ProMaster 159 →
            </NavListItem>
            <Heading4 text="Built for Every Journey Size" className="my-4" />
            {/* Uske foran baad ye items nazar aayenge */}
            <NavListItem
              href={`/van-layouts?category=layouts-for-solo-and-couple-travelers`}
              onClick={handleItemClick}
            >
              Ideal for small families (2–3 people)
            </NavListItem>
            <NavListItem
              href={`/van-layouts?category=layouts-for-families-3-9-people`}
        onClick={handleItemClick}
            >
              Perfect for larger families (4+ passengers)
            </NavListItem>
            <div className="mt-10 mb-4 flex justify-center md:justify-start border-t border-primary/10 pt-6">
              <Link
                href="/van-layouts"
               onClick={handleItemClick}
                className="group flex items-center bg-primary py-2 px-4 rounded-lg text-secondary gap-2 text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-primary hover:text-hover transition-all"
              >
                All Portfolios
                <span className="transform transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </>
        );
      }

      return section?.items?.map((item, i) => (
        <NavListItem
          key={i}
          href={item?.link}
          isActive={pathname === item?.link}
          // onClick={closeMobile}
          onClick={handleItemClick}
        >
          {item?.label}
        </NavListItem>
      ));
    },
    [data, pathname,closeDesktopMenu],
  );

  return (
    <>
      {/* --- Main Navigation Bar --- */}
      <nav
        className={`sticky top-0 w-full font-ui z-[100] flex items-center ${forceMobile ? "bg-none h-[15px]" : "px-6 bg-secondary h-[65px] shadow-[0_1px_0_0_rgba(0,31,61,0.08),0_2px_12px_rgba(0,0,0,0.04)]"}`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {!forceMobile && (
            <Link href="/" className="flex flex-col items-start leading-none">
              <Image
                src="/images/logoo.webp"
                alt="BBV logo"
                width={150}
                height={100}
                className="object-contain border-none mb-1"
              />

              <span className="font-ui text-[9px] md:text-[10px] italic tracking-[0.15em] text-[#ED985F] mt-[-8px] ml-1">
                You Dream It. We Build It.
              </span>
            </Link>
          )}

          {/* DESKTOP LINKS */}
          <div
            className={`${forceMobile ? "hidden" : "hidden lg:flex"} gap-6`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name || "/"}
                href={link.path}
                onMouseEnter={() => link.hasDropdown && handleHover(link.name)}
                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                className={`flex items-center gap-1 uppercase text-[11px] font-ui font-semibold tracking-[0.1em] transition-colors duration-200 pb-0.5
                  ${pathname === link.path
                    ? "text-[#ED985F] border-b-2 border-[#ED985F]"
                    : "text-primary hover:text-[#ED985F]"
                  }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${desktopMenu === link.name ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!forceMobile && (
              <a
                href="tel:+19514419719"
                aria-label="Call Big Bear Vans at 951-441-9719"
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-[11px] font-ui font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] bg-[#ED985F] text-primary border border-[#ED985F] whitespace-nowrap transition-all duration-200 hover:bg-primary hover:text-secondary hover:border-primary active:scale-95"
              >
                <span className="sm:hidden">Call Now</span>
                <span className="hidden sm:inline">Call Now</span>
              </a>
            )}
            {!forceMobile && (
              <Link
                href="/contact"
                className="hidden lg:block px-5 py-2 rounded-lg text-[11px] font-ui font-semibold uppercase tracking-[0.15em] bg-primary text-secondary border border-primary/20 transition-all duration-200 hover:bg-[#ED985F] hover:border-[#ED985F] hover:scale-105"
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
  className="fixed left-0 w-full shadow-2xl z-[999] border-t border-[#ED985F]/15 font-ui will-change-transform bg-secondary text-primary max-h-[80vh] overflow-y-auto"
  data-lenis-prevent
  style={{
    top: "65px",
    display: desktopMenu && !forceMobile ? "block" : "none",
    contain: "layout style paint",
  }}
  onMouseEnter={() => !forceMobile && clearTimeout(timeoutRef.current)}
  onMouseLeave={() => !forceMobile && handleMouseLeave()}
>
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-10 min-h-fit">
    {menuContent[desktopMenu]?.sections?.map((sec, idx) => {
      const isExplore =
        sec.title === "Explore Completed Van Builds & Journeys";
      const isVanModels = sec.title === "Find Your Perfect Van";
      const isFloorPlans = sec.title === "Find Your Ideal Floor Plan";

      return (
        <div
          key={idx}
          className={`
            ${
              isFloorPlans
                ? "col-span-12"
                : isExplore
                ? "col-span-9 border-r border-primary"
                : isVanModels
                ? "col-span-3"
                : "col-span-6 border-r border-primary"
            }
          `}
        >
          <Heading4 text={sec.title} textColor="text-primary" />
          <ul className="space-y-1 font-ui mt-4">
            {renderSectionItems(sec)}
          </ul>
        </div>
      );
    })}
  </div>
</div>
      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-[1001]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 h-full w-full p-6 overflow-y-auto transform transition-transform duration-300 will-change-transform bg-secondary text-primary`}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 border-b border-primary pb-4">
              <Link href={"/"} onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/images/logoo.webp"
                  alt="Logo"
                  width={200}
                  height={100}
                  priority={true}
                />
              </Link>
              <X
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="border-b border-primary last:border-0"
                >
                  {!link.hasDropdown ? (
                    // Simple Link (No Dropdown)
                    <Link
                      href={link.path}
                      className="block py-4 font-display font-bold text-2xl uppercase tracking-wide transition-colors hover:!text-[#ED985F]"
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
                          className="flex-grow py-4 font-display font-bold text-2xl uppercase tracking-wide transition-colors hover:!text-[#ED985F]"
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
                            setMobileMenu(
                              mobileMenu === link.name ? null : link.name,
                            );
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
                              <MobileSectionTitle>
                                {sec.title}
                              </MobileSectionTitle>
                              <ul className="space-y-2">
                                {renderSectionItems(sec, true)}
                              </ul>
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
                  className="block w-full bg-primary font-ui text-secondary text-center py-4 rounded-lg font-semibold uppercase tracking-[0.15em] text-xs transition-all hover:bg-[#ED985F] hover:scale-105"
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
