"use client";
import { motion } from "framer-motion";

// Modernized animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const slideInLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

// Modern InfoCard component
const InfoCard = ({ title, description, className = "" }) => (
  <div className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative">
      <h3 className="font-sans font-bold text-lg md:text-2xl leading-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="font-sans font-normal text-sm md:text-base leading-relaxed text-gray-600 mt-3 md:mt-4">
        {description}
      </p>
    </div>
  </div>
);

// Modern ProcessStep component
const ProcessStep = ({ time, title, details, circleColor, isLast = false, isFirst = false }) => {

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.2,
      boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 }
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, transformOrigin: "top" },
    visible: {
      scaleY: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_auto_1fr] gap-6 items-start relative group">
      {/* Time */}
      <motion.div
        className="hidden md:block text-right pt-2"
        variants={textVariants}
      >
        <span className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-sans font-semibold text-sm border border-blue-200">
          {time}
        </span>
      </motion.div>

      {/* Timeline & Circle */}
      <div className={`flex flex-col items-center h-full ${isFirst ? 'pt-3' : ''} relative`}>
        <motion.div
          className={`w-6 h-6 ${circleColor} border-2 border-white rounded-full z-10 shrink-0 shadow-lg relative`}
          variants={circleVariants}
          whileHover="hover"
        >
          <div className="absolute inset-0 rounded-full bg-white/50 animate-ping" />
        </motion.div>
        {!isLast && (
          <motion.div
            className="w-1 h-full bg-gradient-to-b from-blue-200 to-gray-200 rounded-full mt-2"
            variants={lineVariants}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className={`pb-12 md:pb-16 ${!isLast ? "border-l-0 md:border-l md:border-l-gray-100 md:pl-8" : ""}`}
        variants={textVariants}
      >
        {/* Mobile Time */}
        <div className="md:hidden mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-sans font-semibold text-xs border border-blue-200">
            {time}
          </span>
        </div>

        <h3 className="font-sans font-bold text-2xl md:text-3xl leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </h3>

        <div className="space-y-6">
          {details.map((item, index) => (
            <motion.div
              key={index}
              className="group/item p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="font-sans font-bold text-base md:text-lg leading-tight text-gray-800">
                      {item.subtitle}
                    </h5>
                    {item.duration && (
                      <span className="font-sans font-normal text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <p className="font-sans font-normal text-sm md:text-base leading-relaxed text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
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
      circleColor: "bg-blue-400",
      details: [
        { subtitle: "Bring Your Van", description: "Already own a Sprinter? We'll inspect it and plan your build." },
        { subtitle: "We'll Source It For You", description: "Tap into our exclusive discounts at Mercedes dealerships in LA/San Diego." },
      ],
    },
    {
      time: "1 Month",
      title: "Collaborative Design Phase",
      circleColor: "bg-cyan-400",
      details: [
        { subtitle: "Step 1: Zoom Consultations", description: "Meet your Project Manager to discuss your needs and vision." },
        { subtitle: "Step 2: 3D Renderings", description: "Photorealistic visuals of your van's layout and materials." },
        { subtitle: "Step 3: Refine & Approve", description: "Unlimited tweaks until you're 100% satisfied." },
      ],
    },
    {
      time: "2 Months",
      title: "Engineering & Precision Planning",
      circleColor: "bg-emerald-400",
      details: [
        { subtitle: "What Happens", description: "Our engineers optimize every detail for safety and functionality." },
        { subtitle: "Client Involvement", description: "Approve final blueprints and material samples." },
      ],
    },
    {
      time: "3-4 Months",
      title: "Build & Assembly",
      circleColor: "bg-amber-400",
      details: [
        { subtitle: "Interior Build", duration: "(2 Months)", description: "Cabinetry, electrical, plumbing, and insulation installed." },
        { subtitle: "Exterior Upgrades", duration: "(1 Month)", description: "Roof racks, solar panels, and custom paint/wraps." },
        { subtitle: "Quality Checks", description: "Weekly photo/video updates sent to you." },
        { subtitle: "Welcome Gifts", description: "We stock your van with premium gifts and essentials." },
      ],
    },
    {
      time: "Pickup",
      title: "Delivery & Beyond",
      circleColor: "bg-purple-500",
      details: [
        { subtitle: "Walkthrough & Test Drive", description: "Learn every feature with our expert team." },
        { subtitle: "Lifetime Support", description: "1-Year Warranty with 3-year extended options." },
        { subtitle: "Upgrades & Servicing", description: "Visit our California workshops for maintenance." },
      ],
      isLast: true,
    },
  ];

  const mainTitle = "Big Bear Vans Custom Build Process";

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Custom Build Process
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to final delivery, experience our transparent,
            collaborative approach to creating your dream adventure van.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-28"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp}>
            <InfoCard
              title="Bring Your Van or Let Us Source It"
              description="Up to $10,000 off MSRP through our exclusive dealership partnerships."
            />
          </motion.div>
          <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
            <InfoCard
              title="3D Renderings"
              description="Visualize your van in lifelike detail before we build."
            />
          </motion.div>
          <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
            <InfoCard
              title="5-Month Average Timeline"
              description="Transparent stages from design to delivery with regular updates."
            />
          </motion.div>
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
          </div>

          {processData.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProcessStep {...step} isFirst={index === 0} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="max-w-4xl mx-auto text-center mt-20 md:mt-28 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="font-bold text-3xl md:text-5xl leading-tight mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Fly in, Drive out
          </motion.h2>

          <motion.div
            className="font-sans text-base md:text-lg leading-relaxed space-y-6 text-left max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-700">
              For most of our clients, the process works like this:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 marker:text-blue-500 marker:font-bold">
              <li className="pl-2">
                <span className="font-semibold text-gray-800">You order your van and we build it</span> -
                Follow along with weekly updates
              </li>
              <li className="pl-2">
                <span className="font-semibold text-gray-800">You fly in to pick it up</span> -
                We coordinate your arrival
              </li>
              <li className="pl-2">
                <span className="font-semibold text-gray-800">We book your first two nights</span> -
                Stay at a local campground in Big Bear to test everything
              </li>
            </ol>
            <p className="text-gray-700">
              This allows you to stay close by, thoroughly test your van, and drive back to our shop for any final tweaks.
            </p>
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">🚀 Pro Tip:</p>
              <p className="text-gray-700">
                Ship your personal gear directly to our shop before arrival. We'll load everything into your new van so you're ready to hit the road immediately.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}