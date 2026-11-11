import React from "react";
import HeroSection from "../Common/HeroSectionNew/HeroSectionNew";
import {
    Heading2,
        Heading1,
    Heading3,
    Heading4,
    RichParagraph,
    ImageWithSkeleton,
    SecondaryButton
} from '@/components/Common/Common';
import FAQs from "@/components/Faqs/Faqs";
import { campgroundSummary, campingFaqs } from "@/DataUseInComp/WhereToCamp";

// Anchor id for each campground card, used by the comparison table links
export const campId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


// Internal Sub-component (Keep it inside or move to another file)
const LocationCard = ({ loc, categoryTitle, tableData }) => {
    return (
        <section id={campId(loc.name)} className="scroll-mt-24 bg-white rounded-lg border border-[#ACBAC4]/20 shadow-sm overflow-hidden mb-16 font-body">
            <div className="flex flex-col lg:flex-row">
                {/* Left: Image Stack */}
                <div className="lg:w-1/2 p-4 flex flex-col gap-4 bg-[#F5F5F0]">
                    {loc.images.map((img, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden shadow-sm aspect-[8/5]">
                            <ImageWithSkeleton
                                src={img}
                                alt={`${loc.name} view ${index + 1}`}
                            />
                            {index === 0 && (
                                <div className="absolute top-4 left-4">
                                    <RichParagraph variant="sub" className="bg-primary text-secondary px-3 py-1 rounded-lg !text-sm font-bold uppercase tracking-wider">
                                        {categoryTitle.includes("RV") ? "RV Park" : "Campground"}
                                    </RichParagraph>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: Info Section */}
                <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                    <Heading1 variant="card" textColor="text-primary" text={loc.name} className="mb-4" />
                    <RichParagraph variant="card"  className=" mb-8" >
                        {loc.desc}
                    </RichParagraph>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Heading1 variant="card" text="Facilities" textColor="text-primary"/>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {loc.facilities.map((f, i) => (
                                    <RichParagraph variant="card"  key={i} className="px-2 py-1 bg-secondary text-primary rounded-lg !text-sm border border-primary/30">
                                        {f}
                                    </RichParagraph>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Heading1 variant="card" text="Activities" textColor="text-primary"/>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {loc.activities.map((a, i) => (
                                    <RichParagraph variant="card" key={i} className="px-2 py-1 bg-secondary text-primary rounded-lg !text-sm border border-secondary">
                                        {a}
                                    </RichParagraph>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loc.notes && (
                        <div className="mt-8 p-4 bg-[#F5F5F0] rounded-lg border-l-4 border-hover">
                            <RichParagraph variant="sub" className=" italic">
                                <strong>Note:</strong> {loc.notes}
                            </RichParagraph>
                        </div>
                    )}
                </div>
            </div>

            {/* Logistics Table */}
            {tableData && tableData.length > 0 && (
                <div className="border-t border-primary/20 bg-white p-6 lg:p-10">
                    <div className="mb-4">
                        <RichParagraph variant="sub" className="font-bold uppercase tracking-widest !text-hover">Site Logistics</RichParagraph>
                        <div className="h-1 w-8 bg-hover mt-1 rounded-full"></div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="p-4 text-sm font-bold text-primary">Season Dates</th>
                                    <th className="p-4 text-sm font-bold text-primary">Site Type</th>
                                    <th className="p-4 text-sm font-bold text-primary">Daily Rates</th>
                                    <th className="p-4 text-sm font-bold text-primary">Max Stay</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tableData.map((row, index) => (
                                    <tr key={index} className="hover:bg-hover/50 transition-colors">
                                        <td className="p-4 text-sm text-gray-600">{row.seasonDates || "-"}</td>
                                        <td className="p-4 text-sm">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-bold text-gray-500 uppercase">
                                                {row.siteType || "-"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-semibold text-primary">{row.dailyRates || "-"}</td>
                                        <td className="p-4 text-sm text-primary-600">{row.maximumStay || "-"}</td>
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

export default function WhereToCamp({campgrounds}) {

    return (
        <>

            <div className="bg-secondary min-h-screen font-body">
                <HeroSection
                    title="Big Bear Camping: Campgrounds & RV Parks Near Big Bear Lake"
                    description="Compare 9 campgrounds and RV parks around Big Bear Lake, CA, from free first-come sites to lakeside RV parks with full hookups. Prices, hookups and season dates, picked by our local team."
                    alt="Campsite near Big Bear Lake, California"
                    image="/Home/where-to-camp-big-bear-vans.webp"
                    link="/build-your-own-camper-van"
                    showButton={false}
                />

                {/* Intro Section */}
                <section className="bg-white border-b border-primary/20">
                    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-[#001F3D] border border-[#ACBAC4]/30 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Heading1 variant="section" text="Where to Camp in Big Bear, California" textColor="text-[#001F3D]" />
                            <div className="h-0.5 w-16 bg-hover mx-auto rounded-full" />
                            <RichParagraph variant="body" className="max-w-2xl mx-auto">
                                Big Bear has its mountains, Big Bear Lake and two ski resorts, plus plenty of places to camp: Forest Service campgrounds for tents and RVs, free first-come sites and lakeside RV parks with full hookups. Our showroom is in Big Bear City, so these are the spots we send our own customers to when they visit or pick up their camper van.
                            </RichParagraph>
                            <RichParagraph variant="sub" textColor="text-hover" >
Start Your Adventure Below
                            </RichParagraph>

                        </div>
                    </div>
                </section>

                {/* Quick comparison */}
                <section aria-labelledby="compare-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                    <div className="text-center mb-8">
                        <RichParagraph variant="sub" textColor="text-hover" className="!text-sm uppercase font-bold tracking-wider mb-1">
                            Quick comparison
                        </RichParagraph>
                        <Heading1 as="h2" variant="section" id="compare-heading" text="Big Bear Campgrounds at a Glance" textColor="text-primary" />
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-primary/15 bg-white">
                        <table className="w-full min-w-[640px] text-left border-collapse">
                            <caption className="sr-only">Campgrounds and RV parks near Big Bear Lake compared by price, hookups and season</caption>
                            <thead>
                                <tr className="bg-primary text-secondary">
                                    <th scope="col" className="p-4 text-sm font-bold">Campground</th>
                                    <th scope="col" className="p-4 text-sm font-bold">Type</th>
                                    <th scope="col" className="p-4 text-sm font-bold">Price / night</th>
                                    <th scope="col" className="p-4 text-sm font-bold">Hookups</th>
                                    <th scope="col" className="p-4 text-sm font-bold">Season</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {campgroundSummary.map((row) => (
                                    <tr key={row.name} className="even:bg-secondary">
                                        <th scope="row" className="p-4 text-sm font-semibold text-primary">
                                            <a href={`#${campId(row.name)}`} className="underline underline-offset-4 decoration-hover hover:text-hover">
                                                {row.name}
                                            </a>
                                        </th>
                                        <td className="p-4 text-sm text-primary/80">{row.type}</td>
                                        <td className="p-4 text-sm font-semibold text-primary">{row.price}</td>
                                        <td className="p-4 text-sm text-primary/80">{row.hookups}</td>
                                        <td className="p-4 text-sm text-primary/80">{row.season}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <RichParagraph variant="card" className="mt-3 text-center !opacity-70">
                        Rates and season dates change every year. Check with each campground before you book.
                    </RichParagraph>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {campgrounds.map((category, catIndex) => (
                        <div key={catIndex} className="mb-20">
                            <div className="flex items-center gap-4 mb-10">
                           <div className="flex flex-col justify-center items-center text-center w-full">
    <RichParagraph variant="sub" textColor="text-hover" className="!text-sm uppercase font-bold tracking-wider mb-1">
        Explore Category {String(catIndex + 1).padStart(2, '0')}
    </RichParagraph>
    <Heading1
        as="h2"
        variant="section"
        text={category.categoryTitle}
        textColor="text-primary"
        className="max-w-2xl mx-auto text-center"
    />
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

                </div>

                {/* Camper van CTA */}
                <section aria-labelledby="van-cta-heading" className="bg-primary text-secondary">
                    <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-5">
                        <Heading1 as="h2" variant="section" id="van-cta-heading" text="Camping in Big Bear in a Camper Van?" textColor="text-secondary" />
                        <RichParagraph variant="body" textColor="text-secondary/80" className="max-w-2xl mx-auto">
                            We build custom Sprinter and Ford Transit camper vans right here in Big Bear City. Stop by our showroom while you are in town, or see the vans we have ready to buy.
                        </RichParagraph>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <SecondaryButton link="/showroom" label="Visit Our Showroom" />
                            <SecondaryButton link="/camper-vans-for-sale" label="Camper Vans for Sale" />
                        </div>
                    </div>
                </section>

                <FAQs faqs={campingFaqs} description="Answers to the most common questions about camping in Big Bear." />
            </div>
        </>
    );
}