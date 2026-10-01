import { cache } from "react";

// one entry per options listing page; the key is the URL segment under /van-options
export const PAGE_CONFIG = {
  "exterior-options": {
    api: "exterior",
    label: "Exterior Options",
    keyword: "bathroom",
    title: `Camper Van Exterior Upgrades & Accessories | Big Bear Vans`,
    desc: `Explore Big Bear Vans' exterior upgrade options - roof racks,
awnings, storage boxes, window and door choices - for your
 custom Sprinter or Transit build.`,
    heroImage: "/options/imperial campervan big bear vans (2).webp",
    mobileHeroImage: "/options/imperial campervan big bear vans (2).webp",
  },
  "interior-options": {
    api: "interior",
    label: "Interior Options",
    title: `Camper Van Interior Finishes & Cabinetry | Big Bear Vans`,
    desc: `Explore premium camper van interior options - wall paneling,
 flooring, cabinetry, and bathroom layouts - for your custom
Big Bear Vans conversion.`,
    heroImage: "/options/montreal-pop-top-campervan-big-bear-vans (25).webp",
    mobileHeroImage: "/options/montreal-pop-top-campervan-big-bear-vans (25).webp",
  },
  "system-options": {
    api: "system",
    label: "System Options",
    title: `Camper Van Electrical & Water Systems | Big Bear Vans`,
    desc: `Explore off-grid electrical and water systems for your
custom camper van - lithium batteries, solar,
inverters, and fresh/grey water tanks explained..`,
    heroImage: "/options/santa monica walnut campervan big bear vans (26).webp",
    mobileHeroImage: "/options/santa monica walnut campervan big bear vans (26).webp",
  },
};

// no cache: admin changes show on the page immediately.
// wrapped in React cache() so metadata + page share one request per render.
export const fetchOptionItems = cache(async (api) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/${api}`, { cache: "no-store" });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
});
