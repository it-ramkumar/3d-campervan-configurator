"use client";

// --- ICONS for the 'Fly in, Drive out' section ---
const BuildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.212l2.27-1.023a1.875 1.875 0 011.64 0l2.27 1.023c.55.205 1.02.67 1.11 1.212l.223 1.341c.12.721.57 1.362 1.173 1.73l1.98.99c.642.32 1.092.96 1.092 1.688V13.5a1.875 1.875 0 01-1.875 1.875h-2.25a1.875 1.875 0 01-1.875-1.875v-1.125a3.375 3.375 0 00-3.375-3.375H9.375a3.375 3.375 0 00-3.375 3.375v1.125A1.875 1.875 0 014.125 15.375H1.875A1.875 1.875 0 010 13.5v-2.073c0-.728.45-1.368 1.092-1.688l1.98-.99c.603-.368 1.053-1.009 1.173-1.73l.223-1.341z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-3.75-3.75M12 12l-3.75 3.75" />
  </svg>
);
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);
const CampgroundIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
  </svg>
);

const ProTipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);

const InfoCard = ({ title, description, className = "" }) => (
  <div className={`text-center flex flex-col items-center transition-all duration-700 hover:-translate-y-3 hover:scale-105 hover:shadow-xl ${className} opacity-0 animate-fadeInUp`}>
    <h3 className="font-serif font-bold text-base md:text-[36px] leading-tight">
      {title}
    </h3>
    <p className="font-serif font-normal text-xs md:text-xl leading-tight text-black opacity-70 mt-2 md:mt-4">
      {description}
    </p>
  </div>
);

const ProcessStep = ({ time, title, details, circleColor, isLast = false }) => (
  <div className="grid grid-cols-[1fr_auto_2fr] md:grid-cols-[1fr_auto_3fr] gap-x-4 md:gap-x-6 items-start relative opacity-0 animate-fadeInUp">
    <div className="text-right">
      <h4 className="font-serif font-semibold text-xl md:text-[28px] leading-none pt-1">
        {time}
      </h4>
    </div>

    <div className="flex flex-col items-center h-full">
      <div className={`w-[25px] h-[25px] ${circleColor} border-[3px] border-black rounded-full z-10 shrink-0 transition-transform duration-500 hover:scale-125`} />
      {!isLast && <div className="w-[1px] h-full bg-black origin-top"></div>}
    </div>

    <div className={!isLast ? "pb-16 md:pb-20" : "pb-0"}>
      <h3 className="font-serif font-bold text-2xl md:text-[36px] leading-none mb-6">
        {title}
      </h3>
      <div className="space-y-6">
        {details.map((item, index) => (
          <div key={index} className="text-left">
            <h5 className="font-serif font-bold text-base md:text-xl leading-none">
              {item.subtitle}
              {item.duration && (
                <span className="font-normal text-black opacity-70 ml-2">
                  {item.duration}
                </span>
              )}
            </h5>
            <p className="font-serif font-normal text-base md:text-xl leading-normal mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FlyInStep = ({ icon, text, isLast = false }) => (
  <div className="flex items-start gap-x-4 group opacity-0 animate-fadeInUp">
    <div className="flex flex-col items-center shrink-0">
      <div className="p-2 bg-gray-200 group-hover:bg-gray-300 transition-colors rounded-full border border-gray-300">
        {icon}
      </div>
      {!isLast && <div className="w-px h-16 bg-gray-300 mt-2"></div>}
    </div>
    <p className="font-serif font-normal text-base md:text-xl leading-relaxed pt-1">
      {text}
    </p>
  </div>
);

export default function ProcessPage() {
  const processData = [
    {
      time: "Immediate",
      title: "Start Your Journey: Vehicle Sourcing",
      circleColor: "bg-white",
      details: [
        { subtitle: "Bring Your Van", description: "Already own a Sprinter? We’ll inspect it and plan your build." },
        { subtitle: "We’ll Source It For You", description: "Access a brand-new van directly from a Mercedes dealer at a great price. We leverage our purchasing power in the LA/San Diego market to secure preferential pricing." },
      ],
    },
    {
      time: "1 Month",
      title: "Collaborative Design Phase",
      circleColor: "bg-gray-300",
      details: [
        { subtitle: "Step 1: Zoom Consultations", description: "Meet your Project Manager to discuss needs (adventure trips, family size, storage priorities)." },
        { subtitle: "Step 2: 3D Renderings", description: "Our designers create photorealistic visuals of your van’s layout and materials." },
      ],
    },
    {
      time: "3 - 4 Months",
      title: "Build & Assembly",
      circleColor: "bg-gray-800",
      details: [
        { subtitle: "Interior Build", duration: "(2 Months)", description: "Cabinetry, electrical, plumbing, and insulation installed." },
        { subtitle: "Exterior Upgrades", duration: "(1 Month)", description: "Roof racks, solar panels, or off-grid packages." },
      ],
    },
    {
      time: "Pickup",
      title: "Delivery & Beyond",
      circleColor: "bg-black",
      details: [
        { subtitle: "Walkthrough & Test Drive", description: "Learn every feature with our team." },
        { subtitle: "Lifetime Support", description: "1-Year Warranty (3 years extended) on craftsmanship." },
      ],
      isLast: true,
    },
  ];

  const flyInSteps = [
    { text: "You order your van and we build it.", icon: <BuildIcon /> },
    { text: "You fly in to pick it up.", icon: <PlaneIcon /> },
    { text: "We book your first two nights at a local campground in Big Bear.", icon: <CampgroundIcon /> },
  ];

  const mainTitle = "Big Bear Vans Custom Build Process";

  return (
    <section className="bg-white text-black font-serif pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          <InfoCard title="Bring Your Van or Let Us Source It" description="Up to $10,000 off MSRP through our LA/San Diego dealership partners." />
          <InfoCard title="3D Renderings" description="Visualize your van in lifelike detail before we build." />
          <InfoCard title="5-Month Average Timeline" description="Transparent stages from design to delivery." />
        </div>

        {/* Title */}
        <h2 className="text-center font-bold text-3xl md:text-[48px] leading-tight md:leading-none mb-8 md:mb-12 opacity-0 animate-fadeInUp">
          {mainTitle}
        </h2>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          {processData.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>

        {/* Fly in, Drive out */}
        <div className="max-w-5xl mx-auto mt-8 md:mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-xl opacity-0 animate-fadeInUp transition-transform duration-700 hover:-translate-y-3 hover:shadow-2xl">
          <h2 className="text-center font-serif font-bold text-3xl md:text-[48px] leading-tight md:leading-none mb-10">
            Fly in, Drive out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col justify-center h-full space-y-2">
              {flyInSteps.map((step, index) => (
                <FlyInStep key={index} {...step} isLast={index === flyInSteps.length - 1} />
              ))}
            </div>

            <div className="font-serif text-base md:text-xl leading-relaxed space-y-6 text-left">
              <p className="opacity-80">
                For most of our clients, the process is simple and seamless. We handle the logistics so you can focus on the adventure ahead.
              </p>
              <p className="opacity-80">
                This initial stay allows you to test everything in a real-world setting and drive back to our shop for any final tweaks before your journey home.
              </p>
              <div className="bg-gray-800 text-white rounded-xl p-6 space-y-3 shadow-lg">
                <div className="flex items-center gap-x-3">
                  <ProTipIcon />
                  <h4 className="font-bold text-xl">Pro Tip</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  You can ship personal gear directly to our shop before you arrive. We’ll load it into your new van so you’re ready to hit the road immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
