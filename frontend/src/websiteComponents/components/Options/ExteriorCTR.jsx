import React from 'react'
import { motion } from 'framer-motion';
import { RichParagraph, Heading3, BlackButton } from '../Common/Common'

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
                    <Heading3 text=' Ready to Build Your Dream Van?' textColor='text-white' />

                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="inline-block my-4"

                    >
                        <BlackButton label={" Start Your Build Journey"} link={"/contact"} />

                    </motion.div>
                    <RichParagraph white={true}>
                        Transform your van into the ultimate adventure companion with our premium exterior upgrades.

                    </RichParagraph>

                </motion.div>
            </div>
        </section>
    );
}
