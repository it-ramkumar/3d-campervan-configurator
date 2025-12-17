import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function ExteriorCTR() {
   return (
        <section className="relative py-8 sm:py-10 md:py-12 bg-gradient-to-br from-gray-50 to-white text-white overflow-hidden">
            {/* Enhanced background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/90"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="font-serif font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-white drop-shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Ready to Build Your Dream Van?
                    </motion.h3>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="inline-block"
                    >
                        <Link to="/contact">
                            <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-sans font-semibold text-sm py-2 px-6 rounded-lg transition-all duration-300 ease-out
                                           hover:shadow-xl hover:from-gray-900 hover:to-black shadow-lg border-2 border-gray-700/50 hover:border-gray-600
                                           transform hover:translate-y-[-2px]">
                                Start Your Build Journey
                            </button>
                        </Link>
                    </motion.div>

                    <motion.p
                        className="text-gray-300 font-sans text-sm sm:text-base mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Transform your van into the ultimate adventure companion with our premium exterior upgrades.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
