"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link"; // react-router-dom ki jagah next/link behtar hai
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Html } from "@react-three/drei";
import BaseVanModel from "../van/BaseVanModel";
import PartModel from "./PartModel";
import Image from "next/image";

const Loader3D = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  </Html>
);

export default function PreviewClient({ quoteData, baseVan, partsData }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex">
      {/* Styles remains the same */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes load-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-load-slide { animation: load-slide 1.5s infinite linear; }
      `}</style>

      <aside className={`relative z-20 h-full bg-black border-r border-white/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex-shrink-0 overflow-y-auto no-scrollbar ${sidebarOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden'}`}>
        <div className={`p-8 w-full md:w-[400px] transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          <header className="mb-12">
            <h1 className="text-3xl font-black text-white uppercase leading-none italic">Van Build</h1>
            <p className="text-zinc-500 text-[10px] tracking-widest mt-2 uppercase underline underline-offset-4 decoration-zinc-800">Review Specification</p>
          </header>

          <div className="mb-10 text-white">
            <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Customer Details</h3>
            <p className="text-xl font-bold italic">{quoteData?.name}</p>
            <p className="text-sm text-zinc-400 mt-1">{quoteData?.email}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-5 border border-white/5">
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Base Vehicle</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Layout</p>
                  <p className="text-white text-sm font-medium">{baseVan?.layout}</p>
                </div>
                {/* <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Year</p>
                  <p className="text-white text-sm font-medium">{baseVan?.modelYear}</p>
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Added Components</h3>
              <div className="space-y-2">
                {partsData.map((part) => (
                  <div key={part._id} className="group flex items-center justify-between bg-zinc-900/30 p-3 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden relative">
                        <Image src={part.image} alt={part.label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-bold">{part.label}</p>
                        <p className="text-[9px] text-zinc-500 uppercase">{part.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10">
            <Link href="/configurator">
              <button className="w-full bg-white text-black py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-200">
                Confirm Configuration
              </button>
            </Link>
          </div>
        </div>
      </aside>

      <main className="relative flex-1 bg-[#0a0a0a] overflow-hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex absolute top-0 left-0 z-40 bg-black text-white w-14 h-14 items-center justify-center border-r border-b border-white/10">
          {sidebarOpen ? <span className="text-[10px] uppercase italic">Close</span> : "Menu"}
        </button>

        <Canvas shadows flat camera={{ position: [8, 4, 8], fov: 45 }}>
          <Suspense fallback={<Loader3D />}>
            <OrbitControls
              autoRotate={!sidebarOpen}
              autoRotateSpeed={0.4}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.2}
              minDistance={5}
              maxDistance={15}
            />
            <Stage environment="city" intensity={0.5} contactShadow={true}>
              <group>
                {baseVan?.glbFileUrl && <BaseVanModel url={baseVan.glbFileUrl} />}
                {partsData.map((part) => (
                  part?.glbFile && <PartModel key={part._id} url={part.glbFile} />
                ))}
              </group>
            </Stage>
          </Suspense>
        </Canvas>
      </main>
    </div>
  );
}