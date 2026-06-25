"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { RichParagraph, Heading3, SecondaryButton, CustomLink } from '../Common/Common';
import Link from "next/link";

export default function ExteriorCTR() {
    return (
        <section className="bbv-section-light relative py-20 overflow-hidden">
            <div className="bbv-dot-grid-light" />

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Compass size={200} className="text-hover rotate-12" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto bbv-card border-primary/10 p-10 md:p-16 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Tiny badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-hover/10 border border-hover/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-lg bg-hover animate-pulse"></span>
                        <span className="text-hover text-[10px] font-black uppercase tracking-[0.2em]">Adventure Awaits</span>
                    </motion.div>

                    <Heading3
                        text='Ready to Build Your Dream Van?'
                        className='text-primary font-display uppercase tracking-wide'
                    />

                    <div className="bbv-divider mb-6" />

                    <div className="max-w-2xl mx-auto mb-10">
                        <RichParagraph className="text-primary/60">
                            Transform your van into the ultimate adventure companion with our premium exterior upgrades. Our expert team is ready to bring your vision to life.
                        </RichParagraph>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto"
                        >
                            <SecondaryButton
                                label="Start Your Build Journey"
                                link="/contact"
                            />
                        </motion.div>

                        <motion.button
                            className="flex items-center gap-3 text-primary/70 font-black text-xs uppercase tracking-widest group hover:text-hover transition-colors"
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
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-hover/30 to-transparent"></div>
        </section>
    );
}
