"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { createPortal } from "react-dom"
import { X, MousePointer2, Move } from "lucide-react"
import { PrimaryButton } from '@/components/Common/Common'

const VanCanvas = dynamic(() => import("./VanCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#FCFCFB]">
      <div className="w-10 h-10 border-2 border-[#ED3500] border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

export default function Van3DSection({ url, title }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <PrimaryButton
        onClick={() => setIsOpen(true)}
        className='w-full'
        label={
          <div className="flex items-center justify-center gap-2">

            <svg
              className="w-6 h-6 animate-spin-3d"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
              <path d="M12 12l8-4.5" />
              <path d="M12 12v9" />
              <path d="M12 12L4 7.5" />
            </svg>

            <span className="font-semibold uppercase tracking-wider">
              Launch 3D Model
            </span>

            <style>{`
              @keyframes spin-3d {
                from { transform: rotateY(0deg); }
                to { transform: rotateY(360deg); }
              }

              .animate-spin-3d {
                animation: spin-3d 3s linear infinite;
                transform-style: preserve-3d;
              }
            `}</style>
          </div>
        }
      />

      {/* FULL SCREEN MODAL */}
      {mounted &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999999999] bg-white">

            {/* HEADER */}
            <div className="absolute top-0 left-0 right-0 z-[999999999] flex justify-between p-3 md:p-6 pointer-events-none">

              <div className="pointer-events-auto bg-white/80 backdrop-blur p-2 md:p-4 rounded-xl shadow-lg">
                <h2 className="font-black uppercase text-sm md:text-base">
                  {title}
                </h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="pointer-events-auto p-2 md:p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

            </div>

            {/* CANVAS */}
            <div className="absolute inset-0 z-0 bg-[#FCFCFB]">
              <VanCanvas url={url} />
            </div>

            {/* CONTROLS */}
            <div className="absolute bottom-6 left-6 space-y-2 z-[999999999] hidden md:block">
              <ControlBadge
                Icon={MousePointer2}
                label="Click + Drag to Look"
              />

              <ControlBadge
                Icon={Move}
                label="Buttons: Forward/Back"
              />
            </div>

          </div>,
          document.body
        )}
    </>
  )
}

function ControlBadge({ Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
      <Icon className="w-3 h-3 text-[#ED3500]" />
      <span className="text-[10px] font-bold uppercase">
        {label}
      </span>
    </div>
  )
}