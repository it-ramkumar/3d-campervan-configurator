"use client"
import React from 'react'
import { Heading2, RichParagraph,Heading3 } from '../../Common/Common'
import FinancialSection from './FinancialSection'
import { motion } from "framer-motion";
import { Plane, Compass, Heart, Zap, BatteryCharging, CheckCircle2 } from 'lucide-react';

function ListItem({ text, isDark }) {
  return (
    <li className="flex gap-3 items-start group">
      <span className="flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
        <CheckCircle2 size={18} className={isDark ? "text-white" : "text-primary"} />
      </span>
      <RichParagraph className={`${isDark ? "text-white/80" : "text-primary/70"} text-sm leading-relaxed`}>
        {text}
      </RichParagraph>
    </li>
  );
}

export default function WhyChoose() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block px-4 py-1 bg-primary text-white rounded-lg text-sm font-black uppercase tracking-wider mb-6">
            Big Bear Advantage
          </div>
          <Heading2 text="Why Should You Buy a Custom Campervan from Us?" className="text-primary" />
          <div className="w-20 h-1 bg-primary/20 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ease of Travel Card */}
          <motion.div whileHover={{ y: -5 }} className="p-10 rounded-lg bg-white border border-primary/5 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-8 shadow-md">
              <Plane className="text-white w-6 h-6" />
            </div>
            <Heading3 text="Ease of Travel" className="mb-6" />
            <ul className="space-y-4">
              <ListItem text="No advance bookings, hotel check-ins, flight delays, or rental counters to worry about." />
              <ListItem text="Your van is your own private, clean space — zero hygiene concerns." />
              <ListItem text="Pack without limits — bring sports gear, pillows, tools, or anything you need without luggage fees or weight restrictions." />
            </ul>
          </motion.div>

          {/* Complete Freedom Card */}
          <motion.div whileHover={{ y: -5 }} className="p-10 rounded-lg bg-white border border-primary/5 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-8 shadow-md">
              <Compass className="text-white w-6 h-6" />
            </div>
            <Heading3 text="Complete Freedom" className="mb-6" />
            <ul className="space-y-4">
              <ListItem text="Stop anywhere, anytime — turn any beautiful view into your home for the night." />
              <ListItem text="Change plans instantly without worrying about non-refundable bookings." />
              <ListItem text="Travel on your schedule — leave when you want, stop when you want." />
            </ul>
          </motion.div>

          {/* Personal Comfort Card */}
          <motion.div whileHover={{ y: -5 }} className="p-10 rounded-lg bg-white border border-primary/5 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-8 shadow-md">
              <Heart className="text-white w-6 h-6" />
            </div>
            <Heading3 text="Personal Comfort" className=" mb-6" />
            <ul className="space-y-4">
              <ListItem text="Fully equipped kitchen for healthy, home-cooked meals on the road." />
              <ListItem text="Pets travel safely with you — not in cargo or kennels." />
              <ListItem text="Bring kids or friends together in one private, comfortable living space." />
            </ul>
          </motion.div>

          {/* Spontaneity Card (Dark) */}
          <motion.div whileHover={{ y: -5 }} className="p-10 rounded-lg bg-primary text-white shadow-xl relative overflow-hidden">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-8 border border-white/10">
              <Zap className="text-white w-6 h-6" />
            </div>
            <Heading3 text="Spontaneity" className="text-secondary  mb-6" />
            <ul className="space-y-4">
              <ListItem text="Your van is always 90% packed. Just add food and fuel." isDark />
              <ListItem text="Say yes to last-minute trip plans without logistics stress." isDark />
            </ul>
          </motion.div>

          {/* Self-Sufficiency Card (Wide) */}
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 p-10 md:p-12 rounded-lg bg-primary text-white shadow-xl relative overflow-hidden border border-white/5">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-8 border border-white/10">
                  <BatteryCharging className="text-white w-8 h-8" />
                </div>
                <Heading3 text="Complete Self-Sufficiency" className="text-secondary" />
              </div>
              <div className="md:col-span-3">
                <ul className="space-y-5">
                  <ListItem text="Advanced solar and battery systems run your fridge and devices." isDark />
                  <ListItem text="Enjoy hot showers and a private, sanitary bathroom 24/7." isDark />
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <FinancialSection />
          </div>
        </div>
      </div>
    </section>
  )
}