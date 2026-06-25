"use client";
import React from "react";
import Image from "next/image";
import { Globe, Camera, Users, MapPin } from "lucide-react";
import AirService from "../../AirService/AirService";
import { Heading2, RichParagraph, Heading3, Heading4, ImageWithSkeleton, SecondaryButton } from '../../Common/Common'

export default function ShowroomAndTours() {
  return (
    <div className="min-h-screen selection:bg-hover selection:text-primary">

      {/* --- Section 1: Minimalist Header --- */}
      <section className="bbv-section-light pt-32 pb-20 px-6 relative">
        <div className="bbv-dot-grid-light" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-hover"></span>
              <p className="text-hover text-xs uppercase tracking-widest font-bold">
                Remote Design Studio
              </p>
            </div>
            <Heading2 text="Virtual Tours For Distant Clients" className="text-primary" />
          </div>
          <div className="max-w-md">
            <RichParagraph className="border-l-2 border-hover/30 pl-6 py-2 text-primary/70">
              If you're out of State, no problem. We'll bring the showroom to you. Jump on a video call with us via FaceTime or Zoom. We'll give you a full virtual tour of our workshop, just like you're here in person.
            </RichParagraph>
          </div>
        </div>
      </section>

      {/* --- Section 2: The Floating Experience --- */}
      <section className="bg-primary max-w-full px-6 py-24 relative">
        <div className="bbv-dot-grid" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-stretch relative z-10">

          {/* Main Showcase Image */}
          <div className="lg:col-span-7 relative group">
            <div className="sticky top-10 w-full rounded-lg overflow-hidden shadow-2xl border border-secondary/10">
              <div className="relative w-full aspect-video">
                <Image
                  src="/images2/Client.webp"
                  alt="Virtual Session"
                  width={1000}
                  height={720}
                  className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Feature Cards Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-12 py-10">
              <Heading3 text="What to expect in your session:" className="text-secondary" />

              <div className="space-y-10">
                {[
                  { icon: Camera, title: "Live Walkthrough", desc: "Real-time inspection of finished builds and cabinetry details." },
                  { icon: Globe, title: "Material Close-ups", desc: "High-def views of countertops, flooring, and fabric textures." },
                  { icon: Users, title: "Expert Consultation", desc: "Face-to-face time with our lead engineers and project managers." }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-6">
                    <div className="w-14 h-14 shrink-0 bbv-glass-light rounded-lg flex items-center justify-center text-hover shadow-sm group-hover:bg-hover group-hover:text-primary transition-all">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-2">
                      <Heading4 text={item.title} className="text-secondary !mb-0" />
                      <RichParagraph className="text-secondary/60">{item.desc}</RichParagraph>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-auto bbv-glass-light rounded-lg p-10 relative overflow-hidden group border border-hover/20">
              <div className="relative z-10">
                <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Book a Session</p>
                <div className="bbv-divider mb-4" />
                <Heading4 text="Ready to start?" className="text-secondary mb-4" />
                <RichParagraph className="mb-8 text-secondary/70">
                  Book a personalized Zoom session and let's bring your vision to life.
                </RichParagraph>
                <SecondaryButton label="Schedule Your Tour" link={"/contact"} />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-hover/10 rounded-lg blur-3xl group-hover:bg-hover/20 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: The Big Bear Journey --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative rounded-lg overflow-hidden group flex items-center">
          <Image
            src="/images/virtuaal1.webp"
            alt="Big Bear Destination"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent lg:bg-gradient-to-r lg:from-primary lg:via-primary/70 lg:to-transparent" />

          <div className="relative z-10 px-10 md:px-20 py-20 max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-hover/20 backdrop-blur-md px-4 py-2 rounded-lg mb-6">
              <MapPin size={14} className="text-hover" />
              <p className="text-hover text-xs uppercase tracking-widest font-bold">Big Bear Lake, CA</p>
            </div>
            <Heading2 text="A Destination Worth the Drive" className="text-secondary" />
            <RichParagraph className="mt-6 text-secondary/70">
              Surrounded by mountains, ski resorts, and crystal-clear waters, visiting our workshop is the perfect excuse for a weekend getaway.
            </RichParagraph>
            <div className="mt-10 h-[1px] w-full bg-secondary/20"></div>
            <div className="mt-6 flex gap-10">
              <div>
                <p className="text-hover text-2xl font-black">2</p>
                <p className="text-secondary/60 text-xs uppercase tracking-wider mt-1">Ski Resorts</p>
              </div>
              <div>
                <p className="text-hover text-2xl font-black">100+</p>
                <p className="text-secondary/60 text-xs uppercase tracking-wider mt-1">Nature Trails</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Travel Logistics --- */}
      <section className="bbv-section-light-alt py-32 relative">
        <div className="bbv-dot-grid-light" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Getting Here</p>
            <Heading2 text="Travel Logistics" className="text-primary" />
            <div className="bbv-divider mx-auto mt-4" />
          </div>
          <AirService />
        </div>
      </section>

    </div>
  );
}
