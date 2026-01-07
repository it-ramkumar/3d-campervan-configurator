"use client";
import { motion } from "framer-motion";
import AirService from "../../AirService/AirService";
import RichParagraph from "../../Common/Paragraph/RichParagraph";
import Heading2 from "../../Common/Headings/Heading2";
import Heading3 from "../../Common/Headings/Heading3";


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
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.4-2.4l-1.178-.398 1.178-.398a3.375 3.375 0 002.4-2.4l.398-1.178.398 1.178a3.375 3.375 0 002.4 2.4l1.178.398-1.178.398a3.375 3.375 0 00-2.4 2.4z" />
  </svg>
);
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const titleStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};
const titleLetter = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};
const InfoCard = ({ title, description, className = "" }) => (
  <div className={`text-center flex flex-col items-center ${className}`}>
    <Heading3 text={title} textColor="text-black"/>
   <RichParagraph>
    {description}
   </RichParagraph>

  </div>
);
const ProcessStep = ({ time, title, details, circleColor, isLast = false, isFirst = false }) => {

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    hover: { scale: 1.25, boxShadow: "0px 0px 15px #4A5568" },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { backgroundColor: "#4A5568" },
  };

  return (
    <div className="grid grid-cols-[1fr_auto_2fr] md:grid-cols-[1fr_auto_3fr] gap-x-4 md:gap-x-6 items-start relative">
      <motion.div className="text-right" variants={textVariants}>
        <RichParagraph>{time}</RichParagraph>

      </motion.div>

      <div className={`flex flex-col items-center h-full ${isFirst ? 'pt-2.5' : ''}`}>
        <motion.div
          className={`w-[25px] h-[25px] ${circleColor} border-[3px] border-black rounded-full z-10 shrink-0`}
          variants={circleVariants}
        />
        {!isLast && (
          <motion.div
            className="w-[1px] h-full bg-black origin-top"
            variants={lineVariants}
          />
        )}
      </div>

      <motion.div
        className={!isLast ? "pb-16 md:pb-20" : "pb-0"}
        variants={textVariants}
      >
        <Heading3 text={title} textColor="text-black"/>

        <div className="space-y-6">
          {details.map((item, index) => (
            <div key={index} className="text-left">
              <RichParagraph className="font-bold">{item.subtitle} <span className="font-normal text-black opacity-70 ml-2">
                    {item.duration}
                  </span> </RichParagraph>

              <RichParagraph> {item.description}</RichParagraph>

            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
const FlyInStep = ({ icon, text, isLast = false }) => (
  <div className="flex items-start gap-x-4 group">
    <div className="flex flex-col items-center shrink-0">
      <div className="p-2 bg-gray-200 group-hover:bg-gray-300 transition-colors rounded-full border border-gray-300">
        {icon}
      </div>
      {!isLast && <div className="w-px h-16 bg-gray-300 mt-2"></div>}
    </div>
    <RichParagraph>
      {text}
    </RichParagraph>

  </div>
);



export default function ProcessPage() {
  const processData = [
    {
      time: "Immediate",
      title: "Start Your Journey: Vehicle Sourcing",
      circleColor: "bg-white",
      details: [
        { subtitle: "Bring Your Van", description: "Already own a Sprinter? We'll inspect it and plan your build." },
        { subtitle: "We'll Source It For You", description: "Access a brand-new van directly from a Mercedes dealer at a great price. We leverage our purchasing power in the LA/San Diego market to secure preferential pricing, handling all negotiations, paperwork, and delivery to our facility." },
      ],
    },
    {
      time: "1 Month",
      title: "Collaborative Design Phase",
      circleColor: "bg-gray-300",
      details: [
        { subtitle: "Step 1: Zoom Consultations", description: "Meet your Project Manager to discuss needs (adventure trips, family size, storage priorities)." },
        { subtitle: "Step 2: 3D Renderings", description: "Our designers create photorealistic visuals of your van's layout, color schemes, and materials." },
        { subtitle: "Step 3: Refine & Approve", description: "Tweaks are unlimited until you're 100% satisfied." },
      ],
    },
    {
      time: "2 Month",
      title: "Engineering & Precision Planning",
      circleColor: "bg-gray-600",
      details: [
        { subtitle: "What Happens", description: "Our engineers ensure every detail (electrical systems, storage dimensions, weight distribution) is optimized for safety and functionality." },
        { subtitle: "Client Involvement", description: "Approve final blueprints and material samples (e.g., countertop finishes, fabric swatches)." },
      ],
    },
    {
      time: "3 - 4 Months",
      title: "Build & Assembly",
      circleColor: "bg-gray-800",
      details: [
        { subtitle: "Interior Build", duration: "(2 Months)", description: "Cabinetry, electrical, plumbing, and insulation installed." },
        { subtitle: "Exterior Upgrades", duration: "(1 Month)", description: "Roof racks, solar panels, custom paint/wraps, or off-grid packages." },
        { subtitle: "Quality Checks:", description: "Weekly photo/video updates sent to you." },
        { subtitle: "Welcome Gifts on Us", description: "We stock your van with gifts, including pillows, blankets, pots and pans, and a cake." },
      ],
    },
    {
      time: "Pickup",
      title: "Delivery & Beyond",
      circleColor: "bg-black",
      details: [
        { subtitle: "Walkthrough & Test Drive:", description: "Learn every feature with our team." },
        { subtitle: "Lifetime Support:", description: "1-Year Warranty (3 years extended) on craftsmanship." },
        { subtitle: "Upgrades & Servicing:", description: "Visit our California workshops for maintenance or new features." },
      ],
      isLast: true,
    },
  ];

  const flyInSteps = [
    { text: "You order your van and we build it.", icon: <BuildIcon /> },
    { text: "You fly in to pick it up.", icon: <PlaneIcon /> },
    { text: "We book your first two nights at a local campground in Big Bear.", icon: <CampgroundIcon /> },
  ];




  return (
    <section className="bg-white text-black font-serif pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="Bring Your Van or Let Us Source It"
              description="Up to $10,000 off MSRP through our LA/San Diego dealership partners."
            />
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="5-Month Average Timeline"
              description="Transparent stages from design to delivery."
            />
          </motion.div>
             <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="3D Renderings"
              description="Visualize your van in lifelike detail before we build."
              className="md:mt-8"
            />
          </motion.div>
        </motion.div>
<Heading2 text="Big Bear Vans Custom Build Process" className="text-center my-6"/>


        <div className="max-w-4xl mx-auto">
          {processData.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ProcessStep {...step} isFirst={index === 0} />
            </motion.div>
          ))}
        </div>

        {/* --- REDESIGNED FLY IN DRIVE OUT SECTION --- */}
        <motion.div
          className="max-w-5xl mx-auto mt-8 md:mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -10, scale: 1.01, boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)" }}
        >
          <Heading2 text="Fly in, Drive out" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Timeline */}
            <div className="flex flex-col justify-center h-full">
              <div className="space-y-2">
                {flyInSteps.map((step, index) => (
                  <FlyInStep
                    key={index}
                    icon={step.icon}
                    text={step.text}
                    isLast={index === flyInSteps.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Text & Pro Tip */}
            <div className="font-serif text-base md:text-xl leading-relaxed space-y-6 text-left">
              <RichParagraph>
                For most of our clients, the process is simple and seamless. We handle the logistics so you can focus on the adventure ahead.
              </RichParagraph>

              <RichParagraph>
                This initial stay allows you to test everything in a real-world setting and drive back to our shop for any final tweaks before your journey home.
              </RichParagraph>

              {/* Pro Tip Box */}
              <div className="bg-gray-800 text-white rounded-xl p-6 space-y-3 shadow-lg">
                <div className="flex items-center gap-x-3">
                  <ProTipIcon />
                  <Heading3 text="Pro Tip" />
                  {/* <h4 className="font-bold text-xl">Pro Tip</h4> */}
                </div>
                <RichParagraph className="text-white">
                  You can ship personal gear directly to our shop before you arrive. We'll load it into your new van so you're ready to hit the road immediately.
                </RichParagraph>

              </div>
            </div>
          </div>
        </motion.div>

        {/* --- PREMIUM HOW TO GET HERE SECTION --- */}
        <AirService />
      </div>
    </section>
  );
}