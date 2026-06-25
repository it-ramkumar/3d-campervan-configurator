"use client"
import React, { Suspense, useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import { X } from "lucide-react"
import InteriorCamera from "./MidCamera"
import Model from "./Model"
import PartModel from "./Parts"
import { useRouter } from "next/navigation"

const STUDIO_BG = "radial-gradient(ellipse 80% 65% at 50% 58%, #0D2647 0%, #071423 55%, #020C18 100%)"

export default function VanCanvas({ url, variants }) {
  const [activeVariant, setActiveVariant] = useState(null)
  const [activeParts, setActiveParts] = useState([])
  const [interiorMode, setInteriorMode] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const router = useRouter()

  const [isMainModelLoaded, setIsMainModelLoaded] = useState(false)
  const hasInitialized = useRef(false)
  const [interiorConfig, setInteriorConfig] = useState({ x: 0, z: 7, targetY: 4 })

  useEffect(() => {
    if (variants && variants.length > 0 && !hasInitialized.current) {
      const defaultVariant = variants[0]
      setActiveVariant(defaultVariant)
      setActiveParts(defaultVariant.parts || [])
      hasInitialized.current = true
    }
  }, [variants])

  useEffect(() => {
    setIsMainModelLoaded(false)
  }, [url])

  useEffect(() => {
    if (!showHint) return
    const t = setTimeout(() => setShowHint(false), 4500)
    return () => clearTimeout(t)
  }, [showHint])

  const updateConfig = (key, val) => {
    setInteriorConfig((prev) => ({ ...prev, [key]: parseFloat(val) }))
  }

  const handleVariantClick = (variant) => {
    setActiveVariant(variant)
    setActiveParts(variant.parts || [])
  }

  const sortedVariants = [...(variants || [])].sort(
    (a, b) => (parseInt(a.name) || 0) - (parseInt(b.name) || 0)
  )

  if (!url || url === "loading...") {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: STUDIO_BG }}>
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#ED985F]/20 border-t-[#ED985F] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#ED985F]/60" />
            </div>
          </div>
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#FBFBF9]/35 font-semibold">
            Preparing Studio
          </p>
        </div>
      </div>
    )
  }

  return (
    /* Outer container — h-screen, no overflow */
    <div
      className="h-screen w-full overflow-hidden flex flex-col lg:grid"
      style={{ background: "#020C18", gridTemplateColumns: "1fr 360px" }}
    >

      {/* ── 3D CANVAS ── */}
      <div
        className="relative overflow-hidden h-[52vh] lg:h-auto"
        style={{ background: STUDIO_BG }}
        onPointerDown={() => setShowHint(false)}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(251,251,249,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floor glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{
            width: "80%", height: "160px",
            background: "radial-gradient(ellipse, rgba(237,152,95,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Orange top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ED985F] z-30" />

        {/* Brand badge — desktop only */}
        <div
          className="absolute top-4 left-4 z-20 hidden md:block px-4 py-3 rounded-xl"
          style={{
            background: "rgba(2,12,24,0.65)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#ED985F] font-semibold leading-none mb-1.5">
            Premium Configurator
          </p>
          <p className="font-display text-xl font-bold text-[#FBFBF9] leading-none tracking-wide">
            Big Bear Vans
          </p>
        </div>

        {/* View mode pill — desktop only */}
        <div
          className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(2,12,24,0.65)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              interiorMode ? "bg-[#ED985F] animate-pulse" : "bg-[#FBFBF9]/25"
            }`}
          />
          <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FBFBF9]/50">
            {interiorMode ? "Interior" : "Exterior"}
          </span>
        </div>

        {/* Active variant label — bottom left, desktop only */}
        {activeVariant && (
          <div className="absolute bottom-5 left-5 z-20 hidden md:block">
            <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-[#FBFBF9]/25 mb-0.5">
              Active Build
            </p>
            <p className="font-display text-base font-bold text-[#FBFBF9]/70 leading-none">
              {activeVariant.name}
            </p>
          </div>
        )}

        {/* Drag to rotate hint */}
        <div
          className="absolute bottom-5 right-5 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl pointer-events-none transition-opacity duration-1000"
          style={{
            background: "rgba(2,12,24,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(237,152,95,0.18)",
            opacity: showHint ? 1 : 0,
          }}
        >
          {/* Animated rotate icon */}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#ED985F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: "spin 2.5s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-9-9" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
          <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[#FBFBF9]/45 font-semibold">
            Drag to rotate
          </span>
        </div>

        {/* R3F Canvas */}
        <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }} style={{ position: "absolute", inset: 0 }}>
          {/* Fix white canvas background */}
          <color attach="background" args={["#020C18"]} />

          <Suspense
            fallback={
              <Html center>
                <div
                  style={{
                    background: "rgba(0,31,61,0.92)",
                    border: "1px solid rgba(237,152,95,0.3)",
                    borderRadius: "12px",
                    padding: "14px 22px",
                    color: "#FBFBF9",
                    fontFamily: "sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Loading model…
                </div>
              </Html>
            }
          >
            {!interiorMode ? (
              <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.05}
                minDistance={5}
                maxDistance={50}
              />
            ) : (
              <InteriorCamera
                active={true}
                position={[interiorConfig.x, 4, interiorConfig.z]}
                target={[interiorConfig.x, interiorConfig.targetY, interiorConfig.z - 5]}
              />
            )}

            <Model url={url} onLoadComplete={() => setIsMainModelLoaded(true)} />

            {isMainModelLoaded && activeParts.length > 0 &&
              activeParts.map((part) => (
                <PartModel
                  key={part._id}
                  url={part.model}
                  position={[0, -2, 0]}
                  rotation={[0, 0, 0]}
                />
              ))}

            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* ── SIDEBAR ── */}
      <div
        className="flex flex-col flex-1 min-h-0 overflow-hidden"
        style={{
          background: "#001F3D",
          borderTop: "2px solid #ED985F",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Sidebar header — sticky top */}
        <div
          className="shrink-0 px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-ui text-[9px] uppercase tracking-[0.35em] text-[#ED985F] font-semibold mb-1.5">
                Custom Build Studio
              </p>
              <h1 className="font-display text-[2rem] lg:text-[2.25rem] font-bold text-[#FBFBF9] leading-[0.95] tracking-wide">
                Configure<br />Your Van
              </h1>
            </div>
            <button
              onClick={() => router.back()}
              aria-label="Close configurator"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#FBFBF9]/50 hover:text-[#001F3D] hover:bg-[#ED985F] transition-all duration-200 shrink-0 mt-0.5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Sidebar scrollable body */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-5 space-y-6">

          {/* VIEW MODE TOGGLE */}
          <div>
            <SectionLabel label="View Mode" />
            <div
              className="grid grid-cols-2 gap-1 p-1 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => setInteriorMode(false)}
                className={`py-2.5 rounded-lg font-ui text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  !interiorMode
                    ? "bg-[#FBFBF9] text-[#001F3D]"
                    : "text-[#FBFBF9]/40 hover:text-[#FBFBF9]/65"
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setInteriorMode(true)}
                className={`py-2.5 rounded-lg font-ui text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  interiorMode
                    ? "bg-[#ED985F] text-white"
                    : "text-[#FBFBF9]/40 hover:text-[#FBFBF9]/65"
                }`}
              >
                Interior
              </button>
            </div>
          </div>

          {/* INTERIOR NAVIGATION */}
          {interiorMode && (
            <div
              className="rounded-xl p-4 space-y-5"
              style={{
                background: "rgba(237,152,95,0.05)",
                border: "1px solid rgba(237,152,95,0.18)",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#ED985F] font-semibold">
                  Navigation
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ED985F] animate-pulse" />
              </div>
              <SliderControl
                label="Forward / Back"
                value={interiorConfig.z}
                min="1.5" max="9" step="0.1" unit="m"
                onChange={(e) => updateConfig("z", e.target.value)}
              />
              <SliderControl
                label="Left / Right"
                value={interiorConfig.x}
                min="-1.5" max="1.5" step="0.1" unit="m"
                onChange={(e) => updateConfig("x", e.target.value)}
              />
              <SliderControl
                label="Tilt View"
                value={interiorConfig.targetY}
                min="3" max="5.8" step="0.1" unit="m"
                onChange={(e) => updateConfig("targetY", e.target.value)}
              />
            </div>
          )}

          {/* VAN VARIANTS */}
          <div>
            <SectionLabel label="Van Variants" />
            <div className="space-y-2">
              {sortedVariants.map((v, idx) => {
                const isActive = activeVariant?._id === v._id
                return (
                  <button
                    key={v._id}
                    onClick={() => handleVariantClick(v)}
                    className={`w-full rounded-xl py-3.5 px-4 text-left transition-all duration-200 flex items-center gap-4 ${
                      isActive
                        ? "bg-[#FBFBF9] text-[#001F3D]"
                        : "text-[#FBFBF9]/65 hover:text-[#FBFBF9] hover:bg-white/5"
                    }`}
                    style={
                      isActive
                        ? {
                            border: "1px solid rgba(237,152,95,0.35)",
                            boxShadow: "0 0 24px rgba(237,152,95,0.14), inset 0 1px 0 rgba(255,255,255,0.25)",
                          }
                        : { border: "1px solid rgba(255,255,255,0.07)" }
                    }
                  >
                    {/* Number */}
                    <span
                      className={`font-ui text-[10px] font-bold tabular-nums shrink-0 w-5 ${
                        isActive ? "text-[#ED985F]" : "text-[#FBFBF9]/20"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Name */}
                    <span className="font-ui text-xs font-semibold uppercase tracking-[0.12em] flex-1 truncate">
                      {v.name}
                    </span>

                    {/* Active dot */}
                    {isActive && (
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ED985F]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* Sidebar footer — sticky CTA */}
        <div
          className="shrink-0 px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <a
            href="/contact"
            className="flex items-center justify-center w-full py-3 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.2em] bg-[#ED985F] text-white hover:bg-[#d67e45] transition-all duration-200 active:scale-[0.98]"
          >
            Book Consultation
          </a>
          <p className="text-center font-ui text-[9px] text-[#FBFBF9]/20 uppercase tracking-[0.14em] mt-2.5">
            Free · No commitment required
          </p>
        </div>

      </div>
    </div>
  )
}

function SectionLabel({ label }) {
  return (
    <div className="flex items-center mb-3">
      <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#FBFBF9]/30 font-semibold shrink-0">
        {label}
      </p>
      <div className="flex items-center flex-1 ml-3">
        <div className="w-1 h-1 rounded-full bg-[#ED985F] shrink-0" />
        <div className="flex-1 ml-2" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  )
}

function SliderControl({ label, value, min, max, step, unit, onChange }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-ui text-xs text-[#FBFBF9]/50">{label}</span>
        <span className="font-ui text-xs font-semibold text-[#ED985F]">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={onChange}
        className="w-full h-[3px] rounded-full appearance-none cursor-pointer accent-[#ED985F]"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />
    </div>
  )
}
