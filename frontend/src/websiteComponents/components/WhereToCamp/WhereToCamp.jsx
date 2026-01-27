import React from "react";
import Heading4 from "../Common/Headings/Heading4";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { campgrounds } from "../../DataUseInComp/WhereToCamp";
import Cosultation from "../Consultation/Consultation"
import { Heading2, RichParagraph,ImageWithSkeleton, BlackButton } from '../Common/Common'


const WhereToCamp = () => {
 const LocationCard = ({ loc, categoryTitle, tableData }) => {
    return (
        <section className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-24">
            <div className="flex flex-col lg:flex-row">
                {/* Left: Image Stack */}
                <div className="lg:w-3/5 p-4 lg:p-6 flex flex-col gap-4 bg-gray-50/50">
                    {loc.images.map((img, index) => (
                        <div key={index} className="relative rounded-2xl overflow-hidden shadow-sm">
                            <ImageWithSkeleton
                                src={img}
                                alt={`${loc.name} view ${index + 1}`}
                            />
                            {index === 0 && (
                                <div className="absolute top-6 left-6">
                                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                                        {categoryTitle.includes("RV") ? "RV Park" : "Campground"}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: Sticky Info Section (No Table here anymore) */}
                <div className="lg:w-2/5 p-8 lg:p-12">
                    <div className="lg:sticky lg:top-10">
                        <h3 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                            {loc.name}
                        </h3>

                        <RichParagraph className="text-gray-500 text-base leading-relaxed mb-8">
                            {loc.desc}
                        </RichParagraph>

                        {/* Amenities List moved up for better flow */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🛠️</span>
                                    <Heading4 text="Facilities" textColor="text-gray-900" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {loc.facilities.map((f, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🛶</span>
                                    <Heading4 text="Activities" textColor="text-gray-900" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {loc.activities.map((a, i) => (
                                        <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-100">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loc.notes && (
                            <div className="mt-10 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <p className="text-xs text-orange-800 italic leading-relaxed">
                                    <strong>Note:</strong> {loc.notes}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* NEW FULL WIDTH TABLE SECTION */}
            {tableData && tableData.length > 0 && (
                <div className="border-t border-gray-100 bg-white p-8 lg:p-12">
                    <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Site Logistics</span>
                        <div className="h-1 w-10 bg-blue-600 mt-2 rounded-full"></div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="p-5 text-sm font-bold text-gray-900">Season Dates</th>
                                    <th className="p-5 text-sm font-bold text-gray-900">Site Type</th>
                                    <th className="p-5 text-sm font-bold text-gray-900">Daily Rates</th>
                                    <th className="p-5 text-sm font-bold text-gray-900">Max Stay</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tableData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-5 text-sm text-gray-600">{row.seasonDates || "-"}</td>
                                        <td className="p-5 text-sm text-gray-600">
                                            <span className="bg-gray-100 px-2 py-1 rounded text-[11px] font-bold text-gray-500 uppercase">
                                                {row.siteType || "-"}
                                            </span>
                                        </td>
                                        <td className="p-5 text-sm font-semibold text-gray-900">{row.dailyRates || "-"}</td>
                                        <td className="p-5 text-sm text-gray-600">{row.maximumStay || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <Navbar />
            <HeroSection
                title="Where to Camp"
                description="From lakeside retreats to alpine escapes, discover the perfect basecamp for your Big Bear adventure."
                image="/whereToCamp/Pineknot campground 2.png"
                link="/inquiry"

                showButton={false}
            />
            {/* Intro Section */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
                    {/* Decorative Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                    </div>

                    {/* The Content */}
                    <div className="space-y-6">
                        <RichParagraph className="text-2xl lg:text-3xl font-medium text-gray-900 leading-snug tracking-tight">
                            Big Bear has many tourist attractions, including its stunning mountains, Big Bear Lake, and two beautiful ski resorts.
                        </RichParagraph>

                        <div className="h-px w-20 bg-blue-600/20 mx-auto rounded-full" />

                        <RichParagraph className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
                            If you’re coming here to visit our showroom or to pick up your campervan, why not make a trip out of it?
                            Big Bear has some beautiful campgrounds and RV parks nearby where you can stay to check that everything
                            works great and meets your expectations.
                        </RichParagraph>

                        <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.25em] pt-4">
                            Start Your Adventure Below
                        </p>
                    </div>
                </div>
            </section>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {campgrounds.map((category, catIndex) => (
                    <div key={catIndex} className="mb-32">
                        {/* Category Heading with Light Gray Index */}
                        <div className="flex items-center gap-6 mb-16 group">
                            <div className="relative flex items-center">
                                {/* The Index Number */}
                                <span className="text-6xl lg:text-7xl font-black text-gray-300 leading-none select-none transition-colors duration-300 group-hover:text-gray-200">
                                    {String(catIndex + 1).padStart(2, '0')}
                                </span>
                                {/* Vertical Divider */}
                                <div className="h-12 w-[1px] bg-gray-200 mx-6 rotate-[20deg]" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-[0.3em] mb-1">
                                    Explore Category
                                </span>
                                <Heading2 text={category.categoryTitle} />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {category.locations.map((loc, locIndex) => (
                                <LocationCard
                                    key={locIndex}
                                    loc={loc}
                                    categoryTitle={category.categoryTitle}
                                    tableData={loc?.table}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            <div className="flex flex-col items-center gap-4">
  <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
    Ready to visit our showroom?
  </p>

   <BlackButton label={"Book Your Private Tour"} link={"/contact"}/>
</div>
            <Cosultation/>
            <Footer />
        </div>
    );
};

export default WhereToCamp;