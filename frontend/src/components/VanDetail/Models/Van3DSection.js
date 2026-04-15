"use client"
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { X, MousePointer2, Move } from "lucide-react"
import { PrimaryButton } from '@/components/Common/Common'

const VanCanvas = dynamic(() => import("../Models/VanCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#FCFCFB]">
      <div className="w-10 h-10 border-2 border-[#ED3500] border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

export default function Van3DSection({ url, title }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => (document.body.style.overflow = 'unset')
  }, [isOpen])

  return (
    <>
      {/* Launch */}
      <div className="my-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <PrimaryButton
            label="Launch 3D Configurator"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* FULL SCREEN */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-white">

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-6 pointer-events-none">
            <div className="pointer-events-auto bg-white/80 backdrop-blur p-4 rounded-xl">
              <h2 className="font-black uppercase">{title}</h2>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="pointer-events-auto p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <X />
            </button>
          </div>

          {/* CANVAS AREA */}
          <div className="absolute inset-0 bg-[#FCFCFB]">
            <VanCanvas url={url} />
          </div>

          {/* Controls Info */}
          <div className="absolute bottom-6 left-6 space-y-2 z-10">
            <ControlBadge Icon={MousePointer2} label="Click + Drag to Look" />
            <ControlBadge Icon={Move} label="Buttons: Forward/Back" />
          </div>

        </div>
      )}
    </>
  )
}

function ControlBadge({ Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
      <Icon className="w-3 h-3 text-[#ED3500]" />
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
  )
}