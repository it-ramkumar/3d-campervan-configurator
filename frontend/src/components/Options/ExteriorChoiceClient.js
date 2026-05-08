"use client";
import React, { useMemo } from 'react';
import HeroSection from "@/components/Common/HeroSectionNew/HeroSectionNew";
import ExteriorChoicesList from './ExteriorChoicesList';
import AdditionalAccessories from './ExteriorAccessories';
import SystemOptions from "./SystemOptions";
import ExteriorCTR from './ExteriorCTR';

export default function ExteriorChoiceClient({ options, current, initialRawData }) {

  const dataState = useMemo(() => {
    const categoryMap = {};
    const initialSubMap = {};
    const initialItemMap = {};

    initialRawData.forEach((item) => {
      const cat = item.categoryId;
      if (!cat) return;

      if (!categoryMap[cat._id]) {
        categoryMap[cat._id] = { ...cat, subCategories: {}, items: [] };
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
      if (cat.subCategories && cat.subCategories.length > 0) {
        initialSubMap[cat._id] = cat.subCategories[0]._id;
        initialItemMap[cat._id] = cat.subCategories[0].items[0] || null;
      } else {
        initialSubMap[cat._id] = null;
        initialItemMap[cat._id] = cat.items[0] || null;
      }
    });

    return {
      categories: categoriesArray,
      activeSubCategoryMap: initialSubMap,
      activeItemMap: initialItemMap,
      loading: false
    };
  }, [initialRawData]);

  // --- CRASH PREVENTION ---
  // Agar raw data hai par processing abhi finalize nahi hui
  if (initialRawData.length > 0 && dataState.categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary min-h-screen font-body">
      <HeroSection
        title={current.title}
        description={current.desc}
        image={current.heroImage}
        showButton={false}
      />

      <main>
        <div className="animate-fadeIn">
          <ExteriorChoicesList
            key={options}
            // Yahan mistake thi, 'processedData' ki jagah 'dataState' aayega
            initialData={dataState}
            heading={current.api}
          />
        </div>

        {current.api === "system" && <SystemOptions />}
        {current.api === "exterior" && (
            <>
                <ExteriorCTR />
                <AdditionalAccessories />
            </>
        )}
      </main>
    </div>
  );
}