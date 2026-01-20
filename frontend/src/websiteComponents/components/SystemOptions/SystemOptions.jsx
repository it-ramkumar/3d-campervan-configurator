import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles, Tag } from "lucide-react";
import { data } from '../../DataUseInComp/SystemOptions';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// UI Components
import Heading2 from "../Common/Headings/Heading2";
import Heading3 from "../Common/Headings/Heading3";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import WhiteButton from "../Common/Button/WhiteButton";
import Image from "../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function SystemOptions() {
    // 1. Initial Category setup
    const categoriesList = useMemo(() => [...new Set(data.map(item => item.category.title))], []);
    const [activeCategory, setActiveCategory] = useState(categoriesList[0]);

    // Current category ka pura object (description wagera nikalne ke liye)
    const currentCategoryData = data.find(i => i.category.title === activeCategory);

    // 2. Subcategories nikalna (agar hain)
    const subcategories = useMemo(() => {
        return [...new Set(data
            .filter(item => item.category.title === activeCategory && item.subcategory)
            .map(item => item.subcategory.title)
        )];
    }, [activeCategory]);

    // 3. Selection State (Subcategory ya Item title handle karne ke liye)
    // Initially, pehla available subcategory ya direct item select hoga
    const initialSelection = subcategories.length > 0
        ? subcategories[0]
        : data.find(i => i.category.title === activeCategory)?.title;

    const [selection, setSelection] = useState(initialSelection);

    // Jab Category change ho, selection reset karein
    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        const newSubcategories = [...new Set(data
            .filter(item => item.category.title === cat && item.subcategory)
            .map(item => item.subcategory.title)
        )];
        const firstAvailable = newSubcategories.length > 0
            ? newSubcategories[0]
            : data.find(i => i.category.title === cat)?.title;
        setSelection(firstAvailable);
    };

    // 4. Render ke liye items filter karna based on selection
    const displayItems = data.filter(item => {
        const categoryMatch = item.category.title === activeCategory;
        if (subcategories.length > 0) {
            return categoryMatch && item.subcategory?.title === selection;
        }
        return categoryMatch && item.title === selection;
    });

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:mt-24 mt-10">

                {/* --- SECTION 1: Category Selection --- */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categoriesList.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                activeCategory === cat
                                ? "bg-black text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- SECTION 2: Category Description --- */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 mb-2">
                        <Tag className="h-5 w-5" />
                        <Heading2 text={activeCategory} />
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <RichParagraph>{currentCategoryData?.category.desc}</RichParagraph>
                    </div>
                </motion.div>

                {/* --- SECTION 3: Subcategory/Item Buttons (The Options) --- */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    {(subcategories.length > 0 ? subcategories : data.filter(i => i.category.title === activeCategory).map(i => i.title)).map(option => (
                        <WhiteButton
                            key={option}
                            label={option}
                            onClick={() => setSelection(option)}
                            className={`transition-all ${selection === option ? "bg-black text-white" : "text-black border-gray-200 hover:border-black"}`}
                        />
                    ))}
                </div>

                {/* --- SECTION 4: Content Rendering (Left Image, Right Details) --- */}
                <div className="space-y-12">
                    <AnimatePresence mode="wait">
                        {displayItems.map((item, index) => (
                            <motion.div
                                key={item.title + index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                                    {/* Left: Image */}
                                    <div className="h-[400px] w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Right: Content */}
                                    <div className="p-8 md:p-12 space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                                <Sparkles className="h-5 w-5" />
                                                <span className="text-sm font-bold uppercase tracking-widest">Premium Choice</span>
                                            </div>
                                            <Heading3 text={item.title} />
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.data.desc}
                                            </p>

                                            <div className="grid grid-cols-1 gap-3">
                                                {item.data.item.map((point, i) => point && (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <CheckCircle className="h-5 w-5 text-black mt-1 flex-shrink-0" />
                                                        <span className="text-gray-700 font-medium">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {item.subcategory && (
                                            <div className="pt-4 border-t border-gray-100">
                                                <p className="text-sm text-gray-400 italic">
                                                    * Part of our {item.subcategory.title} collection. {item.subcategory.desc}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
}