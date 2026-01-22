// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import HeroSection from "../HeroSection/HeroSection";
// import ImageWithSkeleton from '../Common/ImageWithSkeleton/ImageWithSkeleton';
// import Consultation from "../Consultation/Consultation"
// import Heading2 from '../Common/Headings/Heading2';
// import Heading3 from '../Common/Headings/Heading3';
// import Heading4 from '../Common/Headings/Heading4';
// import RichParagraph from '../Common/Paragraph/RichParagraph';

// const VanSystemsPage = () => {
//     return (
//         <>
//             <Navbar />
//             <HeroSection
//                 title="Electrical and Water System in Big Bear Vans"
//                 description="Electrical and water systems keep your campervan running smoothly, powering lights, heating water, and charging your devices. At Big Bear Vans, we install reliable, high-performance electrical and water systems designed for off-grid travel. Let us walk you through every component we offer, so you know exactly what goes into your van and why it matters."
//                 image="/heroSlider/system.jpg"
//                 showButton={false}
//             />

//             <div className="bg-gradient-to-b from-gray-50 to-white">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

//                     {/* Electrical System Section */}
//                     <section className="mb-24">
//                         <div className="text-center mb-16">
//                             <div className="inline-block relative">
//                                 <Heading2 className="my-4" textColor="text-black" text=' Electrical System' />
//                                 {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

//                 </h2> */}
//                                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
//                             </div>
//                             <RichParagraph className="my-3">The electrical system of campervans consists of batteries, shore power, an alternator, and solar panels that run your AC and other appliances. Here are the electrical components we install in your campervans:
//                             </RichParagraph>
//                             {/* <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto">
//               </p> */}
//                         </div>

//                         <div className="space-y-12">
//                             {/* Lithium Batteries */}
//                             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                                 <div className="flex flex-col lg:flex-row items-start p-10 bg-gradient-to-r from-blue-50 to-gray-50">
//                                     <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:mr-10">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/lithium batteries.png"
//                                             alt="Lithium Batteries"
//                                             className="w-full h-96 object-contain rounded-2xl shadow-lg"
//                                         />
//                                     </div>
//                                     <div className="lg:w-3/5">
//                                         <Heading3 textColor="text-black" text='Lithium Batteries' />
//                                         {/* <h3 className="text-3xl font-bold text-gray-900 mb-6">Lithium Batteries</h3> */}
//                                         <div className="space-y-4 text-gray-700 text-lg">
//                                             <RichParagraph className="my-3">
//                                                 Lithium batteries are known for their long lifespan, lightweight, fast charging, and low self-discharge rate.
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                             <RichParagraph className="my-3">
//                                                 At Big Bear Vans, we offer a range of battery capacities to meet customer needs. Self-heating Lithium batteries range from 200Ah to 1200Ah.
//                                             </RichParagraph>
//                                             {/* <p></p>
//                        */}
//                                             <RichParagraph className="my-3">
//                                                 <span className="font-semibold text-gray-900">Battery Monitor:</span> The battery monitor shows how much energy is left in your batteries and your current consumption.
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                             <RichParagraph className="my-3">
//                                                 Lithium batteries can be charged in three ways:
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                             <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                                                 <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
//                                                     <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
//                                                     Solar Power
//                                                 </li>
//                                                 <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
//                                                     <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
//                                                     Alternator (charges while you're driving)
//                                                 </li>
//                                                 <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
//                                                     <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
//                                                     Shore Power (plugging into an external power source)
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Solar Power */}
//                             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                                 <div className="flex flex-col lg:flex-row items-start p-10 bg-gradient-to-r from-yellow-50 to-gray-50">
//                                     <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:mr-10">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/solar panels.jpg"
//                                             alt="Solar Power"
//                                             className="w-full h-96 object-cover rounded-2xl shadow-lg"
//                                         />
//                                     </div>
//                                     <div className="lg:w-3/5">
//                                         <Heading3 textColor="text-black" text='Solar Power' />
//                                         {/* <h3 className="text-3xl font-bold text-gray-900 mb-6"></h3> */}
//                                         <RichParagraph className="my-3">
//                                             An eco-friendly way to charge your batteries during the day is through solar panels. These solar panels charge inverter batteries by converting sunlight into electricity. At BBV, we offer solar panels in a range of power outputs, including 180W, 200W, 300W, 400W, and 440W.
//                                         </RichParagraph>
//                                         {/* <p className="text-gray-700 text-lg leading-relaxed">

//                     </p> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Alternator */}
//                             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                                 <div className="flex flex-col lg:flex-row items-start p-10 bg-gradient-to-r from-green-50 to-gray-50">
//                                     <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:mr-10">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/alternator.png"
//                                             alt="Alternator"
//                                             className="w-full h-96 object-contain rounded-2xl shadow-lg"
//                                         />
//                                     </div>
//                                     <div className="lg:w-3/5">
//                                         <Heading3 textColor="text-black" text='Alternator' />
//                                         {/* <h3 className="text-3xl font-bold text-gray-900 mb-6">Alternator</h3> */}
//                                         <RichParagraph className="my-3">
//                                             The camper van's alternator can also charge batteries while driving. As the engine runs, the alternator generates electricity, which can be directed to the house batteries through a battery isolator. Our DC-DC charger delivers up to 50A, and up to 250A with a 2nd alternator.
//                                         </RichParagraph>
//                                         {/* <p className="text-gray-700 text-lg leading-relaxed">


//                     </p> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Shore Power */}
//                             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                                 <div className="flex flex-col lg:flex-row items-start p-10 bg-gradient-to-r from-purple-50 to-gray-50">
//                                     <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:mr-10">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/30A shore power inlet.jpg"
//                                             alt="Shore Power"
//                                             className="w-full h-96 object-cover rounded-2xl shadow-lg"
//                                         />
//                                     </div>
//                                     <div className="lg:w-3/5">
//                                         <Heading3 textColor="text-black" text='Shore Power' />
//                                         {/* <h3 className="text-3xl font-bold text-gray-900 mb-6"></h3> */}
//                                         <div className="space-y-4 text-gray-700 text-lg">
//                                             <RichParagraph className="my-3">
//                                                 Shore power refers to the ability to charge batteries by connecting the camper van to an external power source. The shore power connection provides alternating current (AC), which is converted to direct current (DC) by a battery charger to charge the inverter batteries.
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                             <RichParagraph className="my-3">
//                                                 Typically includes a 120V or 240V connection with a built-in charger to charge the battery bank when plugged in.
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Inverter */}
//                             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                                 <div className="flex flex-col lg:flex-row items-start p-10 bg-gradient-to-r from-red-50 to-gray-50">
//                                     <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:mr-10">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/inverter.png"
//                                             alt="Inverter"
//                                             className="w-full h-96 object-contain rounded-2xl shadow-lg"
//                                         />
//                                     </div>
//                                     <div className="lg:w-3/5">
//                                         <Heading3 textColor="text-black" text='Inverter' />
//                                         {/* <h3 className="text-3xl font-bold text-gray-900 mb-6"></h3> */}
//                                         <RichParagraph className="my-3">
//                                             An inverter converts direct current (DC) from batteries to alternating current (AC) to power electrical devices. At Big Bear Vans, you can choose to install a 2000W or 3000W inverter in your campervans.
//                                         </RichParagraph>
//                                         <div className="space-y-4 text-gray-700 text-lg">
//                                             {/* <p></p> */}
//                                             <RichParagraph className="my-3">
//                                                 The inverter drains a little bit of battery power, so it's better to turn it off when you are driving or sleeping. You've to turn it on when using a microwave or stove, or when you plug something into the 110V outlet, like an induction stove or slow cooker.
//                                             </RichParagraph>
//                                             {/* <p></p> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     {/* Electrical Appliances Section */}
//                     <section className="mb-24">
//                         <div className="text-center mb-16">
//                             <div className="inline-block relative">
//                                 <Heading2 className="my-4" textColor="text-black" text='Electrical Appliances in Your Campervan' />
//                                 {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

//                                 </h2> */}
//                                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
//                             </div>
//                             <RichParagraph className="my-3">
//                                 To give you a homelike comfort on the road, our campervans are equipped with all the necessary electrical devices. Electrical appliances of our campervans are the following:
//                             </RichParagraph>
//                             {/* <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto">

//                             </p> */}
//                         </div>

//                         {/* Lighting Section */}
//                         <div className="mb-20">
//                             <Heading3 textColor="text-black" text='Lighting' />
//                             {/* <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center"></h3> */}
//                             <RichParagraph className="my-3">
//                                 In the campervan, you have two types of lighting: Ceiling lights and Reading lights
//                             </RichParagraph>
//                             {/* <p className="text-gray-700 text-lg mb-12 text-center max-w-3xl mx-auto">

//                             </p> */}

//                             <div className="grid lg:grid-cols-2 gap-10">
//                                 {/* Ceiling Lights */}
//                                 <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
//                                     <div className="flex flex-col items-center mb-8">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/ceiling lights.jpg"
//                                             alt="Ceiling Lights"
//                                             className="w-full  object-cover rounded-2xl mb-8 shadow-lg"
//                                         />
//                                         <Heading4 textColor="text-black" text="Ceiling Lights" />
//                                         {/* <h4 className="text-2xl font-bold text-gray-900"></h4> */}
//                                     </div>
//                                     <div className="space-y-6 text-gray-700 text-lg">
//                                         <RichParagraph className="my-3">For the lights of your ceiling, you can choose between:</RichParagraph>
//                                         {/* <p>:</p> */}
//                                         <ul className="space-y-4">
//                                             <li className="flex items-center bg-gray-50 p-4 rounded-xl">
//                                                 <span className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></span>
//                                                 <span className="font-medium">Warm white lights</span>
//                                             </li>
//                                             <li className="flex items-center bg-gray-50 p-4 rounded-xl">
//                                                 <span className="w-4 h-4 bg-blue-300 rounded-full mr-4"></span>
//                                                 <span className="font-medium">Cool white lights</span>
//                                             </li>
//                                         </ul>
//                                         <RichParagraph className="my-3">
//                                             The ceiling light trims also come in different colors. You can choose to have:
//                                         </RichParagraph>
//                                         {/* <p></p> */}
//                                         <div className="flex flex-wrap gap-4 mt-4">
//                                             <span className="px-6 py-3 bg-gray-900 text-white rounded-full text-lg font-medium">Black</span>
//                                             <span className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-lg font-medium">White</span>
//                                             <span className="px-6 py-3 bg-gray-300 rounded-full text-lg font-medium">Silver</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Reading Lights */}
//                                 <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
//                                     <div className="flex flex-col items-center mb-8">
//                                         <ImageWithSkeleton
//                                             src="/systemChoice/Reading lights.jpg"
//                                             alt="Reading Lights"
//                                             className="w-full object-cover rounded-2xl mb-8 shadow-lg"
//                                         />
//                                         <Heading4 textColor="text-black" text="Reading Lights" />
//                                         {/* <h4 className="text-2xl font-bold text-gray-900"></h4> */}
//                                     </div>
//                                     <div className="space-y-6 text-gray-700 text-lg">
//                                         <RichParagraph className="my-3">
//                                             We also install 12V reading lights for the elevator and dinette bed system. These lights go directly into the batteries, so you can use them without turning on the inverter. You can choose the colour from:
//                                         </RichParagraph>
//                                         {/* <p></p> */}
//                                         <ul className="space-y-4">
//                                             <li className="flex items-center bg-gray-50 p-4 rounded-xl">
//                                                 <span className="w-4 h-4 bg-gray-900 rounded-full mr-4"></span>
//                                                 <span className="font-medium">Black reading lights</span>
//                                             </li>
//                                             <li className="flex items-center bg-gray-50 p-4 rounded-xl">
//                                                 <span className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full mr-4"></span>
//                                                 <span className="font-medium">White reading lights</span>
//                                             </li>
//                                             <li className="flex items-center bg-gray-50 p-4 rounded-xl">
//                                                 <span className="w-4 h-4 bg-yellow-600 rounded-full mr-4"></span>
//                                                 <span className="font-medium">Golden reading lights</span>
//                                             </li>
//                                         </ul>
//                                         <RichParagraph className="my-3">
//                                             These lights are extremely low power, typically drawing around 3-5W per fixture.
//                                         </RichParagraph>
//                                         {/* <p className="text-gray-600 mt-6 text-lg"></p> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Other Appliances Grid */}
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//                             {/* Outlets */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/12V outlets.jpg"
//                                         alt="Outlets"
//                                         className="w-full h-64 object-contain mb-6 rounded-xl"
//                                     />
//                                     <Heading4 textColor="text-black" text='Outlets' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center">Outlets</h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     In our campervans, we put outlets at various places. We install 12V outlets with USB-A & USB-C ports for charging devices near the swivel seats and at the upper and lower beds, so you can charge your phones when the inverter is off. We also install 110V outlets in the kitchen area for appliances such as a slow cooker and an induction cooktop.
//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">

//                                 </p> */}
//                             </div>

//                             {/* Ventilation Fan */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/ventilation fan.jpg"
//                                         alt="Ventilation Fan"
//                                         className="w-full h-64 object-contain mb-6 rounded-xl"
//                                     />
//                                     <Heading4 textColor="text-black" text='Ventilation Fan' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center"></h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     We use Vankea's 12V roof ventilation fan in our campervans. The fan circulates air, removes moisture & food smell, and cools the interior, especially during warm weather. The fan has 14" x 14" dimensions, a blackout curtain for privacy, and comes with a remote control for adjustable speed settings.
//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">

//                                 </p> */}
//                             </div>

//                             {/* Air Conditioner */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/Air conditioner.jpg"
//                                         alt="Air Conditioner"
//                                         className="w-full h-64 object-contain mb-6 rounded-xl"
//                                     />
//                                     <Heading4 textColor="text-black" text='Air Conditioner' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center"></h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     Air conditioners provide cooling in hot climates. They are high-energy devices that often require solar panels, shore power, or a proper battery system for operation. At Big Bear Vans, we use a 12V slim A/C unit that runs for up to 20 hours on the batteries.
//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">

//                                 </p> */}
//                             </div>
//                         </div>
//                     </section>

//                     {/* Kitchen Appliances Section */}
//                     <section className="mb-24">
//                         <div className="text-center mb-16">
//                             <div className="inline-block relative">
//                                 <Heading2 className="my-4" textColor="text-black" text='Kitchen Appliances' />
//                                 {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

//                                 </h2> */}
//                                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
//                             </div>
//                         </div>

//                         <div className="grid lg:grid-cols-3 gap-10">
//                             {/* Refrigerator */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/refrigerator.jpg"
//                                         alt="12V Refrigerator"
//                                         className="w-full h-72 object-cover rounded-2xl mb-8"
//                                     />
//                                     <Heading4 textColor="text-black" text='12V Refrigerator' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center"></h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     In our campervans, we use Vankea's compressor-based 12V fridge with a separate freezer. You can choose to have a fridge with 3.3 cu ft or 4.4 cu ft capacity. You can easily place a small refrigerator under the kitchen countertop and a tall one beside the bathroom of your campervan.
//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">

//                                 </p> */}
//                             </div>

//                             {/* Induction Cooktop */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/Induction cooktop.jpg"
//                                         alt="Induction Cooktop"
//                                         className="w-full h-72 object-cover rounded-2xl mb-8"
//                                     />
//                                     <Heading4 textColor="text-black" text='Induction Cooktop' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center"></h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     An induction cooktop is an energy-efficient cooking option for a camper van, running off the battery system or shore power. It requires an inverter and a strong battery setup to function properly.

//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">
//                                 </p> */}
//                             </div>

//                             {/* Microwave or Oven */}
//                             <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
//                                 <div className="flex flex-col items-center mb-8">
//                                     <ImageWithSkeleton
//                                         src="/systemChoice/Microwave.jpg"
//                                         alt="Microwave or Oven"
//                                         className="w-full h-72 object-cover rounded-2xl mb-8"
//                                     />
//                                     <Heading4 textColor="text-black" text='Microwave or Oven' />
//                                     {/* <h4 className="text-2xl font-bold text-gray-900 text-center"></h4> */}
//                                 </div>
//                                 <RichParagraph className="my-3">
//                                     Microwave requires a powerful inverter, while an oven can be propane- or electric-powered (the latter being more power-intensive). A microwave is usually built-in in a wall-mounted cabinet behind the driver's side and sometimes over the countertop cabinet. The Ninja oven is placed under the countertop.
//                                 </RichParagraph>
//                                 {/* <p className="text-gray-700 text-lg">

//                                 </p> */}
//                             </div>
//                         </div>
//                     </section>

//                     {/* Other Electrical Appliances Section */}
//                     <section className="mb-24">
//                         <div className="text-center mb-16">
//                             <div className="inline-block relative">
//                                 <Heading2 className="my-4" textColor="text-black" text='Other Electrical Appliances' />
//                                 {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

//                                 </h2> */}
//                                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
//                             </div>
//                             <RichParagraph className="my-3">
//                                 Besides the most commonly used electrical appliances, we can also install some other devices in the campervan, like:
//                             </RichParagraph>
//                             {/* <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto">

//                             </p> */}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                             {[
//                                 {
//                                     img: "/systemChoice/Maritime Starlink.jpg",
//                                     title: "Starlink Maritime",
//                                     desc: "It ensures strong internet connectivity in remote or off-grid areas."
//                                 },
//                                 {
//                                     img: "/systemChoice/WeBoost Antenna.jpg",
//                                     title: "WeBoost Antenna",
//                                     desc: "Boosts your mobile connectivity on the road and enhances cell phone signals in off-grid areas with weak signals."
//                                 },
//                                 {
//                                     img: "/systemChoice/detachable projector screen.png",
//                                     title: "Detachable Projector Screen",
//                                     desc: "Offers entertainment during downtime."
//                                 },
//                                 {
//                                     img: "/systemChoice/camera.jpg",
//                                     title: "Backup Camera",
//                                     desc: "Assists with parking and reversing."
//                                 },
//                                 {
//                                     img: "/systemChoice/smoke detector.png",
//                                     title: "Fire Extinguisher and Smoke Detector",
//                                     desc: "Ensures safety in case of fires or other emergencies."
//                                 }
//                             ].map((item, index) => (
//                                 <div key={index} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-all duration-300">
//                                     <div className="flex flex-col items-center h-full">
//                                         <ImageWithSkeleton
//                                             src={item.img}
//                                             alt={item.title}
//                                             className="w-full h-72 object-contain mb-8 rounded-2xl"
//                                         />
//                                         <Heading4 textColor="text-black" text={item.title} />
//                                         {/* <h4 className="text-2xl font-bold text-gray-900 text-center mb-6"></h4> */}
//                                         <RichParagraph className="my-3">
//                                             {item.desc}
//                                         </RichParagraph>
//                                         {/* <p className="text-gray-700 text-lg text-center flex-grow"></p> */}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>

//                     {/* Water System Section */}
//                     <section>
//                         <div className="text-center mb-16">
//                             <div className="inline-block relative">
//                                 <Heading2 className="my-4" textColor="text-black" text='Water System' />
//                                 {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

//                                 </h2> */}
//                                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
//                             </div>
//                             <RichParagraph className="my-3">
//                                 At Big Bear Vans, we install customized plumbing in our campervans. Here's what we install in our vans:
//                             </RichParagraph>
//                             {/* <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto">

//                             </p> */}
//                         </div>

//                         <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl p-10 md:p-14 mb-14 border-2 border-blue-100">
//                             <div className="space-y-14">
//                                 {/* Water Pump */}
//                                 <div>

//                                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                                         <span className="w-4 h-4 bg-blue-500 rounded-full mr-4"></span>
//                                         Water Pump
//                                     </h3>
//                                     <div className="bg-white rounded-2xl p-8 shadow-lg">
//                                         <ul className="space-y-4 text-gray-700 text-lg">
//                                             <li className="flex items-start">
//                                                 <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                                 We commonly use 12V electric water pumps in our camper vans.
//                                             </li>
//                                             <li className="flex items-start">
//                                                 <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                                 Provides pressurized water to faucets, showerheads, and other fixtures.
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>

//                                 {/* Water Tanks */}
//                                 <div>
//                                     <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
//                                         <span className="w-4 h-4 bg-blue-500 rounded-full mr-4"></span>
//                                         Water Tanks
//                                     </h3>
//                                     <div className="grid lg:grid-cols-2 gap-10">
//                                         {/* Fresh Water Tank */}
//                                         <div className="bg-white rounded-2xl p-10 shadow-lg">
//                                             <h4 className="text-xl font-bold text-gray-900 mb-6 text-blue-700">Fresh Water Tank:</h4>
//                                             <p className="text-gray-700 text-lg mb-6">Stores clean water for drinking, cooking, and washing. You can choose to install:</p>
//                                             <ul className="space-y-4">
//                                                 {["A 20-gallon freshwater tank.", "A 30-gallon freshwater tank.", "A 37-gallon undermount instead of a spare tire."].map((item, i) => (
//                                                     <li key={i} className="flex items-start bg-blue-50 p-4 rounded-xl">
//                                                         <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                                         <span className="text-gray-700 text-lg">{item}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>

//                                         {/* Grey Water Tank */}
//                                         <div className="bg-white rounded-2xl p-10 shadow-lg">
//                                             <h4 className="text-xl font-bold text-gray-900 mb-6 text-gray-700">Grey Water Tank:</h4>
//                                             <p className="text-gray-700 text-lg mb-6">Stores wastewater from sinks and showers. You can choose to install:</p>
//                                             <ul className="space-y-4">
//                                                 {["A 7-gallon portable greywater tank under the sink.", "A fixed 20-gallon tank under the van.", "A 37-gallon greywater tank under the mount instead of a spare tire (if the rear bathroom)"].map((item, i) => (
//                                                     <li key={i} className="flex items-start bg-gray-50 p-4 rounded-xl">
//                                                         <span className="w-3 h-3 bg-gray-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                                         <span className="text-gray-700 text-lg">{item}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Heaters */}
//                         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
//                             <div className="p-10 bg-gradient-to-r from-orange-50 to-gray-50">

//                                 <Heading3 textColor="text-black" text="Heaters" />

//                                 <RichParagraph className="my-4 max-w-4xl">
//                                     To regulate the temperature of your campervan during winter, we install a heater.
//                                     You can choose from the following reliable heating options based on your needs.
//                                 </RichParagraph>

//                                 <ul className="space-y-6 mt-8 max-w-4xl">
//                                     <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
//                                         <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                         <span className="text-gray-700 text-lg">
//                                             An advanced glycol combined water and air heater connected to your fuel tank,
//                                             eliminating the need to drain your batteries.
//                                         </span>
//                                     </li>

//                                     <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
//                                         <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                         <span className="text-gray-700 text-lg">
//                                             A diesel air heater installed under the passenger seat paired with a 110V water heater.
//                                         </span>
//                                     </li>

//                                     <li className="flex items-start bg-orange-50 p-6 rounded-2xl">
//                                         <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
//                                         <span className="text-gray-700 text-lg">
//                                             A diesel air heater under the passenger seat combined with a 12V water heater.
//                                         </span>
//                                     </li>
//                                 </ul>

//                             </div>
//                         </div>

//                     </section>
//                 </div>
//             </div>
//             <Consultation />
//             <Footer />
//         </>
//     );
// };

// export default VanSystemsPage;