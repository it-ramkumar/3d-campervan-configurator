"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


// Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import ExteriorChoicesList from './ExteriorChoicesList';
import AdditionalAccessories from './ExteriorAccessories';
import SystemOptions from "./SystemOptions";
import ExteriorCTR from './ExteriorCTR';
import Loader from "../Loader/Loader";



const PAGE_CONFIG = {
  "exterior-options": {
    api: "exterior",
    keyword:"bathroom",
    title: "Campervan Exterior Upgrades",
    desc: "The exterior of your campervan is all about looks and functionality. We equip your van with practical exterior accessories.",
    heroImage: "/heroSlider/exteriorhero.webp"
  },
  "interior-options": {
    api: "interior",
    title: "Premium Interior Finishes",
    desc: "Luxury meets comfort. Explore our range of interior linings, flooring, and bespoke cabinetry options.",
    heroImage: "/heroSlider/interiorHero.png"
  },
  "system-options": {
    api: "system",
    title: "Electrical & Water Systems",
    desc: "Reliable, high-performance electrical and water systems, installed in every custom van.",
    heroImage: "/heroSlider/system.webp"
  }
};

export default function ExteriorChoicePage() {
  const { options } = useParams();
  const current = PAGE_CONFIG[options];

  const [dataState, setDataState] = useState({
    categories: [],
    activeSubCategoryMap: {},
    activeItemMap: {},
    expandedCategories: {},
    showFullItemListMap: {},
    loading: true,
  });
const apiUrl = `${process.env.NEXT_PUBLIC_URL}/${current.api}`;
  useEffect(() => {
    if (!current) return;

    const fetchCategories = async () => {
      setDataState(prev => ({ ...prev, loading: true }));
      try {
      const res = await fetch(apiUrl, { cache: 'no-store' });
        const data = res.data.data || [];

        const categoryMap = {};
        const initialExpanded = {};
        const initialSubMap = {};
        const initialItemMap = {};
        const initialShowFullMap = {};

        data.forEach((item) => {
          const cat = item.categoryId;
          if (!cat) return;

          if (!categoryMap[cat._id]) {
            categoryMap[cat._id] = { ...cat, subCategories: {}, items: [] };
            initialExpanded[cat._id] = false;
            initialShowFullMap[cat._id] = false;
          }

          const sub = item.subCategoryId;
          if (sub) {
            if (!categoryMap[cat._id].subCategories[sub._id]) {
              categoryMap[cat._id].subCategories[sub._id] = { ...sub, items: [] };
            }
            categoryMap[cat._id].subCategories[sub._id].items.push(item);
          } else {
            categoryMap[cat._id].items.push(item);
          }
        });

        const categoriesArray = Object.values(categoryMap).map((cat) => ({
          ...cat,
          subCategories: Object.values(cat.subCategories),
        }));

        categoriesArray.forEach((cat) => {
          if (cat.subCategories.length > 0) {
            initialSubMap[cat._id] = cat.subCategories[0]._id;
            initialItemMap[cat._id] = cat.subCategories[0].items[0] || null;
          } else {
            initialSubMap[cat._id] = null;
            initialItemMap[cat._id] = cat.items[0] || null;
          }
        });

        setDataState({
          categories: categoriesArray,
          activeSubCategoryMap: initialSubMap,
          activeItemMap: initialItemMap,
          expandedCategories: initialExpanded,
          showFullItemListMap: initialShowFullMap,
          loading: false,
        });
      } catch (e) {
        console.error("Error fetching categories:", e);
        setDataState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchCategories();
  }, [options, current]);

  if (!current) return <Loader />;


  return (
    <div className="bg-secondary min-h-screen font-body">
      <Navbar />
      {/* --- Hero Section with Overlay --- */}
      <section className="relative overflow-hidden">
        <HeroSection
          title={current.title}
          description={current.desc}
          image={current.heroImage}
          link="/inquiry"
          buttonText="Get a Quote"
          showButton={false}
        />
        {/* Subtle Bottom Curve/Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 " />
      </section>

      {/* --- Main Content Area --- */}
      <main className="">

        {/* Loader Wrapper for List */}
        <div className="transition-all duration-500">
          {!dataState.loading ? (
            <div className="animate-fadeIn">
              <ExteriorChoicesList
                key={options}
                initialData={dataState}
                heading={current.api}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center py-40">
              <Loader />
            </div>
          )}
        </div>

        {/* --- Contextual Components (System Specific) --- */}
        {current.api === "system" && (
          <section className="mt-20 border-t border-[#001F3D]/10 pt-20 animate-fadeIn">
            <div className="bg-white rounded-[20px] p-8 lg:p-12 shadow-sm border border-[#001F3D]/5">
               <SystemOptions />
            </div>
          </section>
        )}

        {/* --- Contextual Components (Exterior Specific) --- */}
        {current.api === "exterior" && (
          <section className="mt-20 space-y-20 animate-fadeIn">
            <div className="bg-[#001F3D] text-white rounded-lg p-1 overflow-hidden shadow-2xl">
               <ExteriorCTR />
            </div>
            <div className="pt-10">
               <div className="flex items-center gap-4 mb-10">
                  <div className="h-[2px] flex-grow bg-[#001F3D]/10"></div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest text-[#001F3D]">Additional Accessories</h2>
                  <div className="h-[2px] flex-grow bg-[#001F3D]/10"></div>
               </div>
               <AdditionalAccessories />
            </div>
          </section>
        )}
      </main>
<Consultation/>
      <Footer />

      {/* --- Custom Scoping Styles --- */}
      <style >{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}