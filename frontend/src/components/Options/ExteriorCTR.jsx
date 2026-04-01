"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { RichParagraph, Heading3, SecondaryButton,CustomLink } from '../Common/Common';
import Link from "next/link";

export default function ExteriorCTR() {
    return (
        <section className="relative py-20 bg-primary overflow-hidden">
            {/* --- BBV Premium Background Elements --- */}

            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#F5F5F0_1px,transparent_1px),linear-gradient(to_bottom,#F5F5F0_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-lg blur-[120px] pointer-events-none" />

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <Compass size={200} className="text-secondary rotate-12" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-primary/10 p-10 md:p-16 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Tiny badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-lg bg-secondary animate-pulse"></span>
                        <span className="text-[#F5F5F0] text-[10px] font-black uppercase tracking-[0.2em]">Adventure Awaits</span>
                    </motion.div>

                    <Heading3
                        text='Ready to Build Your Dream Van?'
                        className='text-secondary'
                    />

                    <div className="max-w-2xl mx-auto mb-10">
                        <RichParagraph className="text-secondary">
                            Transform your van into the ultimate adventure companion with our premium exterior upgrades. Our expert team is ready to bring your vision to life.
                        </RichParagraph>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto"
                        >
                            {/* Using your SecondaryButton with BBV colors internally or custom wrapper */}
                            <SecondaryButton
                                label="Start Your Build Journey"
                                link="/contact"
                            />
                        </motion.div>

                        <motion.button
                            className="flex items-center gap-3 text-[#F5F5F0] font-black text-xs uppercase tracking-widest group"
                            whileHover={{ x: 5 }}
                        >
                            <Link href={"/van-layouts"}>
                             View All Projects
                            </Link>

                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                </motion.div>
            </div>

            {/* Bottom Border Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5F5F0]/20 to-transparent"></div>
        </section>
    );
}