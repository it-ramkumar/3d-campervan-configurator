import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import ExteriorChoicesList from './ExteriorChoicesList';
import AdditionalAccessories from './ExteriorAccessories';
import SystemAccessories from "./SystemAccessories"
import ExteriorCTR from './ExteriorCTR';
import Loader from "../Loader/Loader";
import { useParams } from 'react-router-dom';
import { generateDynamicSchema } from '../../schema/optionsSchema'; // Path check karlein

export default function ExteriorChoicePage() {
  const { options } = useParams();

  const [dataState, setDataState] = useState({
    categories: [],
    activeSubCategoryMap: {},
    activeItemMap: {},
    expandedCategories: {},
    showFullItemListMap: {},
    loading: true,
  });

  // 1. Config ko useEffect ke bahar rakhein taaki render mein use ho sake
  const config = {
    "exterior-options": {
      api: "exterior",
      title: "Campervan Exterior Upgrades",
      desc: "The exterior of your campervan is all about looks and functionality. We equip your van with practical accessories.",
      heroImage: "/heroSlider/exteriorhero.webp"
    },
    "interior-options": {
      api: "interior",
      title: "Premium Interior Finishes",
      desc: "Luxury meets comfort. Explore our range of interior linings, flooring, and bespoke cabinetry options.",
      heroImage: "/heroSlider/interiorHero.png" // Ensure karein ye image path sahi ho
    },
    "system-options": {
      api: "system",
      title: "Premium System Finishes",
      desc: "Luxury meets comfort. Explore our range of system linings, flooring, and bespoke cabinetry options.",
      heroImage: "/heroSlider/system.jpg" // Ensure karein ye image path sahi ho
    }
  };
  const current = config[options];

  useEffect(() => {

    // Agar URL galat hai toh wapis bhej do
    if (!current) {
      // navigate('/'); // Optional: Redirect if wrong URL
      return;
    }

    const fetchCategories = async () => {
      setDataState(prev => ({ ...prev, loading: true })); // Loader start karein
      try {
        // 2. FIX: current.api use karein (sirf current nahi)
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/${current.api}`);
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
            initialExpanded[cat._id] = true;
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

    window.scrollTo(0, 0);
    fetchCategories();
  }, [options]); // 3. FIX: Dependency array mein 'options' zaroori hai

  if (!current) return <Loader />;

  return (
    <div>
        <title>{current.title}</title>
          <meta name="description" content={current.desc} />
          <meta name="keywords" content={current.keywords} />

          {/* Open Graph (Facebook/LinkedIn share) */}
          <meta property="og:title" content={current.title} />
          <meta property="og:description" content={current.desc} />
          <meta property="og:image" content={current.heroImage} />
          <meta property="og:url" content={current.pageUrl} />
          <meta property="og:type" content="website" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={current.title} />
          <meta name="twitter:description" content={current.desc} />
          <meta name="twitter:image" content={current.heroImage} />
        <script type="application/ld+json">
        {JSON.stringify(generateDynamicSchema(options, current, dataState.categories))}
      </script>
      <Navbar />
      <div className='hero'>
        <HeroSection
          title={current.title} // Dynamic Title
          description={current.desc} // Dynamic Description
          image={current.heroImage} // Dynamic Image
          link="/inquiry"
          buttonText="Get a Quote"
          showButton={false}
        />
      </div>

      <div className='list'>
        {!dataState.loading ? (
          // key={options} dene se component fresh reset hoga jab page badlega
          <ExteriorChoicesList key={options} initialData={dataState} heading={current.api}/>
        ) : (
          <div className="py-20"><Loader /></div>
        )}
      </div>
      {
        current.api === "system" &&
        <div className='list'>
        <SystemAccessories />
      </div>
      }
{
        current.api === "exterior" &&
        <div className='list'>
          <ExteriorCTR />
        <AdditionalAccessories />
      </div>
      }

      <Footer />
    </div>
  );
}