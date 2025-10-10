"use client";
import { motion } from "framer-motion";

// Animation Variants for re-use
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

// CHANGED: Made title animation more pronounced
const titleStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Slower stagger
      delayChildren: 0.1,
    },
  },
};

const titleLetter = {
  hidden: { opacity: 0, y: 20, x: -10 }, // Added x motion
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

// Helper component for the top three info cards
const InfoCard = ({ title, description, className = "" }) => (
  <div className={`text-center flex flex-col items-center ${className}`}>
    <h3 className="font-serif font-bold text-base md:text-[36px] leading-tight">
      {title}
    </h3>
    <p className="font-serif font-normal text-xs md:text-xl leading-tight text-black opacity-70 mt-2 md:mt-4">
      {description}
    </p>
  </div>
);

// Helper component for each item in the main process timeline
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
        <h4 className="font-serif font-semibold text-xl md:text-[28px] leading-none pt-1">
          {time}
        </h4>
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
      </motion.div>
    </div>
  );
};


export default function ProcessPage() {
  const processData = [
    {
      time: "Immediate",
      title: "Start Your Journey: Vehicle Sourcing",
      circleColor: "bg-white",
      details: [
        { subtitle: "Bring Your Van", description: "Already own a Sprinter? We’ll inspect it and plan your build." },
        { subtitle: "We’ll Source It For You", description: "Tap into our exclusive discounts at Mercedes dealerships in LA/San Diego. We handle negotiations, paperwork, and delivery to our facility." },
      ],
    },
    {
      time: "1 Month",
      title: "Collaborative Design Phase",
      circleColor: "bg-gray-300",
      details: [
        { subtitle: "Step 1: Zoom Consultations", description: "Meet your Project Manager to discuss needs (adventure trips, family size, storage priorities)." },
        { subtitle: "Step 2: 3D Renderings", description: "Our designers create photorealistic visuals of your van’s layout, color schemes, and materials." },
        { subtitle: "Step 3: Refine & Approve", description: "Tweaks are unlimited until you’re 100% satisfied." },
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

  const mainTitle = "Big Bear Vans Custom Build Process";

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
          {/* CHANGED: Enhanced hover effect with scale and shadow */}
          <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="Bring Your Van or Let Us Source It"
              description="Up to $10,000 off MSRP through our LA/San Diego dealership partners."
            />
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="3D Renderings"
              description="Visualize your van in lifelike detail before we build."
              className="md:mt-8"
            />
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={{ y: -12, scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}>
            <InfoCard
              title="5-Month Average Timeline"
              description="Transparent stages from design to delivery."
            />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-center font-bold text-3xl md:text-[48px] leading-tight md:leading-none mb-8 md:mb-12"
          variants={titleStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          {mainTitle.split("").map((char, index) => (
            <motion.span key={index} variants={titleLetter}>{char}</motion.span>
          ))}
        </motion.h2>

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

        {/* CHANGED: Enhanced hover effect with scale and shadow */}
        <motion.div
          className="max-w-3xl mx-auto text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -12, scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
        >
            <h2 className="font-serif font-bold text-3xl md:text-[48px] leading-tight md:leading-none mb-8">
                Fly in, Drive out
            </h2>
            <div className="font-serif text-base md:text-xl leading-relaxed space-y-4 text-left">
                <p>For most of our clients, the process works like this:</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>You order your van and we build it.</li>
                    <li>You fly in to pick it up.</li>
                    <li>We book your first two nights at a local campground in Big Bear.</li>
                </ol>
                <p>This allows you to stay close by, test everything in the van, and drive back to our shop for any final tweaks.</p>
                <p>
                    <span className="font-bold">Pro Tip:</span> You can ship your personal gear directly to our shop before you arrive. We’ll load everything into your new van so you’re ready to hit the road immediately.
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}