import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from "../HeroSection/HeroSection";
import ImageWithSkeleton from '../Common/ImageWithSkeleton/ImageWithSkeleton';
import Consultation from "../Consultation/Consultation"
import Heading2 from '../Common/Headings/Heading2';
import Heading3 from '../Common/Headings/Heading3';
import Heading4 from '../Common/Headings/Heading4';
import RichParagraph from '../Common/Paragraph/RichParagraph';

const VanSystemsPage = () => {
    return (
        <>
           

            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">


          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>


                    {/* Water System Section */}
                    <section>
                        <div className="text-center mb-16">
                            <div className="inline-block relative">
                                <Heading2 className="my-4" textColor="text-black" text='Water System' />
                                {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

                                </h2> */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
                            </div>
                            <RichParagraph className="my-3">
                                At Big Bear Vans, we install customized plumbing in our campervans. Here's what we install in our vans:
                            </RichParagraph>
                            {/* <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto">

                            </p> */}
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl p-10 md:p-14 mb-14 border-2 border-blue-100">
                            <div className="space-y-14">
                                {/* Water Pump */}
                                <div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span className="w-4 h-4 bg-blue-500 rounded-full mr-4"></span>
                                        Water Pump
                                    </h3>
                                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                                        <ul className="space-y-4 text-gray-700 text-lg">
                                            <li className="flex items-start">
                                                <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                                We commonly use 12V electric water pumps in our camper vans.
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                                Provides pressurized water to faucets, showerheads, and other fixtures.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Water Tanks */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                        <span className="w-4 h-4 bg-blue-500 rounded-full mr-4"></span>
                                        Water Tanks
                                    </h3>
                                    <div className="grid lg:grid-cols-2 gap-10">
                                        {/* Fresh Water Tank */}
                                        <div className="bg-white rounded-2xl p-10 shadow-lg">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6 text-blue-700">Fresh Water Tank:</h4>
                                            <p className="text-gray-700 text-lg mb-6">Stores clean water for drinking, cooking, and washing. You can choose to install:</p>
                                            <ul className="space-y-4">
                                                {["A 20-gallon freshwater tank.", "A 30-gallon freshwater tank.", "A 37-gallon undermount instead of a spare tire."].map((item, i) => (
                                                    <li key={i} className="flex items-start bg-blue-50 p-4 rounded-xl">
                                                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                                        <span className="text-gray-700 text-lg">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Grey Water Tank */}
                                        <div className="bg-white rounded-2xl p-10 shadow-lg">
                                            <h4 className="text-xl font-bold text-gray-900 mb-6 text-gray-700">Grey Water Tank:</h4>
                                            <p className="text-gray-700 text-lg mb-6">Stores wastewater from sinks and showers. You can choose to install:</p>
                                            <ul className="space-y-4">
                                                {["A 7-gallon portable greywater tank under the sink.", "A fixed 20-gallon tank under the van.", "A 37-gallon greywater tank under the mount instead of a spare tire (if the rear bathroom)"].map((item, i) => (
                                                    <li key={i} className="flex items-start bg-gray-50 p-4 rounded-xl">
                                                        <span className="w-3 h-3 bg-gray-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                                        <span className="text-gray-700 text-lg">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Heaters */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                            <div className="p-10 bg-gradient-to-r from-orange-50 to-gray-50">

                                <Heading3 textColor="text-black" text="Heaters" />

                                <RichParagraph className="my-4 max-w-4xl">
                                    To regulate the temperature of your campervan during winter, we install a heater.
                                    You can choose from the following reliable heating options based on your needs.
                                </RichParagraph>

                                <ul className="space-y-6 mt-8 max-w-4xl">
                                    <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
                                        <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                        <span className="text-gray-700 text-lg">
                                            An advanced glycol combined water and air heater connected to your fuel tank,
                                            eliminating the need to drain your batteries.
                                        </span>
                                    </li>

                                    <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
                                        <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                        <span className="text-gray-700 text-lg">
                                            A diesel air heater installed under the passenger seat paired with a 110V water heater.
                                        </span>
                                    </li>

                                    <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
                                        <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                        <span className="text-gray-700 text-lg">
                                            A diesel air heater under the passenger seat combined with a 12V water heater.
                                        </span>
                                    </li>
                                </ul>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
            <Consultation />
            <Footer />
        </>
    );
};

export default VanSystemsPage;