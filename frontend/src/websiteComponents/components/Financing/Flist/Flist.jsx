"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Car, Home, CreditCard, Phone, CheckCircle, Star, ArrowUpRight, Building, FileText, DollarSign, Users, HomeIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Financing() {
  const [activeSection, setActiveSection] = useState("new-builds");
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General Fade In for sections
      gsap.utils.toArray(".anim-section").forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // Card hover animations
      gsap.utils.toArray(".finance-card").forEach((card) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navigationItems = [
    { id: "new-builds", label: "New Builds", icon: Car },
    { id: "pre-built", label: "Pre-Built", icon: Building },
    { id: "alternative", label: "Alternative", icon: Home },
  ];

  return (
    <div ref={containerRef} className="w-full bg-gray-50 font-serif text-[#1e2a4a] overflow-hidden">

      {/* Introduction Section */}
      <section className="anim-section container mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-gradient-to-br from-[#1e2a4a] to-[#111827] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-[#1e2a4a]/50"
          >
            <CreditCard className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-black">Financing Your Dream Van</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <span className="h-px w-8 bg-gray-300"></span>
            <p className="text-xs uppercase tracking-widest font-semibold">Premium Funding Solutions</p>
            <span className="h-px w-8 bg-gray-300"></span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              You've completed your research and decided to trust Big Bear Vans for your dream campervan. But, before starting the process of choosing the{" "}
              <a 
                href="https://bigbearvans.com/interior-choice/" 
                className="text-[#1e2a4a] font-semibold hover:underline underline-offset-4"
              >
                interior
              </a>{" "}
              &{" "}
              <a 
                href="https://bigbearvans.com/innovation/" 
                className="text-[#1e2a4a] font-semibold hover:underline underline-offset-4"
              >
                exterior
              </a>{" "}
              choices, the most important thing is finding a way to finance your van.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#1e2a4a] to-[#111827] p-6 rounded-2xl border border-[#1e2a4a]/50 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative z-10">
                <p className="text-white text-base font-medium leading-relaxed text-center">
                  Traditional auto loans often do not cover the conversion. However, we have several trusted options and partners to help you fund your dream van.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="anim-section py-6 bg-white border-y border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-[#1e2a4a] to-[#111827] text-white transform -translate-y-1 shadow-xl"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="anim-section container mx-auto px-4 sm:px-6 pb-16">
        
        {/* New Builds Section */}
        {activeSection === "new-builds" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Financing for New Custom Builds</h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                If you are starting a new custom build with us, you have two common paths for financing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Option 1 */}
              <div className="finance-card rounded-2xl p-0 shadow-xl flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1e2a4a] to-[#111827] border border-[#1e2a4a]/50 min-h-[400px] w-full max-w-md mx-auto">
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Finance the Van Only</h3>
                      <p className="text-gray-300 text-sm">(Most Common Method)</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    This is the most common route our clients take. The process is simple:
                  </p>

                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-green-500/30">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-base font-semibold mb-1">Finance the Van</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          You secure your own financing for the new Sprinter van chassis, often directly through Mercedes-Benz Financial Services.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-green-500/30">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-base font-semibold mb-1">Pay for Conversion</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          You pay for the custom conversion (typically $90,000 - $150,000) using cash or a separate line of credit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="finance-card rounded-2xl p-0 shadow-xl flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1e2a4a] to-[#111827] border border-[#1e2a4a]/50 min-h-[400px] w-full max-w-md mx-auto">
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">All-in-One Loan</h3>
                      <p className="text-gray-300 text-sm">(Mercedes Sprinter Van + Conversion)</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-blue-500/30">
                        <Building className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-base font-semibold mb-1">Partner</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          We work directly with a partner Mercedes dealership.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-blue-500/30">
                        <CreditCard className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-base font-semibold mb-1">Loan</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          They can include our estimate for the custom build into one extended 6-year car loan.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-blue-500/30">
                        <Star className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white text-base font-semibold mb-1">Requirements</p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          This loan covers both the new Sprinter and the conversion, and typically requires a 30% down payment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm mt-auto">
                    <p className="text-white text-xs font-semibold leading-relaxed">
                      How to apply: please call us, we will go over the quote for a custom build, and then submit it together to the dealership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pre-Built Vans Section */}
        {activeSection === "pre-built" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Financing for Pre-Built Vans</h2>
              <p className="text-gray-600 text-base px-2">
                If you are purchasing one of our completed, ready-to-go campervans, here are your primary financing options.
              </p>
            </div>

            <div className="finance-card rounded-2xl p-0 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1e2a4a] to-[#111827] border border-[#1e2a4a]/50 min-h-[520px] sm:min-h-[550px] w-full max-w-md mx-auto">
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">RV Loan Financing</h3>
                    <p className="text-gray-300 text-[9px] sm:text-[10px] truncate">Through our trusted partner</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 flex flex-col h-[calc(520px-64px)] sm:h-[calc(550px-80px)]">
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-grow">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Provider</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">Trident Funding - Specialized RV financing experts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Loan Type</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">RV Loan specifically designed for campervans</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Requirements</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">Good credit score and a 20% down payment. Minimum credit score typically 680+</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Process</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">Quick pre-approval with soft credit check that doesn't affect your credit score</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Benefits</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">Competitive interest rates, flexible terms (up to 15 years), quick approval process, specialized understanding of campervan values</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border border-green-500/30">
                      <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white text-[11px] sm:text-xs font-semibold mb-0.5">Loan Amounts</p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed break-words">Available for campervans ranging from $50,000 to $250,000+</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20 mb-3 sm:mb-4 backdrop-blur-sm">
                  <p className="text-yellow-200 text-[9px] sm:text-[10px] leading-relaxed break-words">
                    <strong>Note:</strong> We have had numerous clients successfully use this option, including for a $189,000 campervan. The application process is straightforward and our partners understand the unique nature of custom campervan financing.
                  </p>
                </div>

                <motion.a
                  href="https://www.tridentfunding.com/rv-loans/?source=0&subsource=84&keycode=trident%20funding%20rv&promocode=17143878190&utm_source=google&utm_medium=cpc&utm_campaign=goog_tf_us_search_branded&utm_content=tf_rv_branded_ex&utm_term=trident%20funding%20rv&gad_source=1&gad_campaignid=17143878190&gbraid=0AAAAACqngBIVceM_a0q7g5nAU4smrIwfb&gclid=CjwKCAiAz_DIBhBJEiwAVH2XwJ_gATYaMNa92kICXqBKpYTmS1X_dR8o_URDk5w36fOiPJc3TbUw-xoC6lEQAvD_BwE"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-1/2 sm:w-1/2 bg-white text-[#1e2a4a] py-2 px-3 rounded-lg font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl mt-auto mx-auto"
                >
                  Start Your Application
                  <ArrowUpRight className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Alternative Financing Section */}
        {activeSection === "alternative" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Alternative Financing</h2>
              <p className="text-gray-600 text-base">Using Real Estate for Better Rates</p>
            </div>

            <div className="finance-card rounded-2xl p-0 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1e2a4a] to-[#111827] border border-[#1e2a4a]/50 min-h-[400px] w-full max-w-lg mx-auto">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <HomeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Real Estate Collateral</h3>
                    <p className="text-gray-300 text-sm">Leverage your property for better terms</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-[calc(400px-112px)]">
                <div className="grid grid-cols-1 gap-4 mb-6 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-purple-500/30">
                      <Building className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-base font-semibold mb-1">Provider</p>
                      <p className="text-gray-400 text-xs">ADU Loans Net (CrossCountry Mortgage)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 border border-purple-500/30">
                      <CreditCard className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-base font-semibold mb-1">Loan Type</p>
                      <p className="text-gray-400 text-xs">Uses your real estate as collateral</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 backdrop-blur-sm mt-auto">
                  <div className="flex items-start gap-4">
                    <Star className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="text-white text-base font-semibold mb-1">Benefit</p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Often provides very good interest rates compared to traditional auto or RV loans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="anim-section w-full relative py-16 bg-gradient-to-br from-[#1e2a4a] to-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Have Questions?</h2>
            
            <p className="text-gray-300 text-base mb-8 leading-relaxed max-w-xl mx-auto">
              If you are unsure which option is best for you, please contact us. We will be happy to discuss your project and help you find the right path.
            </p>

            <motion.a
              href="https://bigbearvans.com/contact/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#1e2a4a] px-6 sm:px-8 py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}