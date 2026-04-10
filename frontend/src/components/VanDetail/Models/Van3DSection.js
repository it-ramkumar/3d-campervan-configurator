"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Zap, X } from "lucide-react"

// Dynamic import for performance
const VanCanvas = dynamic(() => import("../Models/VanCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#ED3500] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading 3D Engine...</p>
      </div>
    </div>
  )
})

export default function Van3DSection({ url, title }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 3D Entry Button */}
      <div className="my-12 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-[30px] shadow-sm border border-primary/5 text-center">
          <h2 className="text-3xl font-bold text-primary mb-3">Interactive 3D Experience</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto italic">
            Step inside your future van. Open the doors, explore the layout, and see the craftsmanship in detail.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#ED3500] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 mx-auto"
          >
            <Zap className="w-6 h-6 fill-current group-hover:animate-pulse" />
            Launch 3D Viewer
          </button>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-primary uppercase text-xl">{title}</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold italic">Interactive Build Preview</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-[#ED3500] transition-all font-bold group"
            >
              EXIT 3D <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Model Canvas */}
          <div className="flex-1 relative bg-[#F8F9FA]">
            <VanCanvas url={url} />
          </div>

          {/* Footer Guide */}
          <div className="bg-white py-3 px-8 flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Left Click: Rotate</span>
            <span>Scroll: Zoom</span>
            <span>Right Click: Pan</span>
          </div>
        </div>
      )}
    </>
  )
}