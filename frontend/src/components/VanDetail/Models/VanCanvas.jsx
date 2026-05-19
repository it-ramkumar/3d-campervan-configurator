"use client"
import React, { Suspense, useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import { easing } from "maath"
import { X } from "lucide-react"
import InteriorCamera from "./MidCamera"
import { cameraViews } from "./cameraViews"
import ControlBtn from "./ControllBtn"
import Model from "./Model"
import { PrimaryButton } from "@/components/Common/Common"
import PartModel from "./Parts"

function CameraRig({ view }) {
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    setIsUserInteracting(false)
  }, [view])

  useFrame((state, delta) => {
    if (isUserInteracting) return

    easing.damp3(state.camera.position, view.position, 0.4, delta)

    if (state.controls) {
      easing.damp3(state.controls.target, view.target, 0.4, delta)
      state.controls.update()
    }
  })

  useEffect(() => {
    const handleStart = () => setIsUserInteracting(true)

    window.addEventListener("mousedown", handleStart)
    window.addEventListener("touchstart", handleStart)

    return () => {
      window.removeEventListener("mousedown", handleStart)
      window.removeEventListener("touchstart", handleStart)
    }
  }, [])

  return null
}

export default function VanCanvas({ url, variants, setIsOpen,isOpen }) {
  const [currentView, setCurrentView] = useState(cameraViews.default)
  const [activeVariant, setActiveVariant] = useState(null)
  const [activeParts, setActiveParts] = useState([])
  const [interiorMode, setInteriorMode] = useState(false)

  const [interiorConfig, setInteriorConfig] = useState({
    x: 0,
    z: 7,
    targetY: 4,
  })

  const updateConfig = (key, val) => {
    setInteriorConfig((prev) => ({
      ...prev,
      [key]: parseFloat(val),
    }))
  }

  const handleVariantClick = (variant) => {
    setActiveVariant(variant)
    setActiveParts(variant.parts || [])
  }

  useEffect(() => {
    setActiveParts([])
  }, [])

  if (!url || url === "loading...") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FCFCFB]">
        <div className="text-primary text-lg font-semibold animate-pulse">
          Loading Experience...
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-secondary p-3 md:p-5 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_420px] gap-4 h-full">

        {/* 3D VIEWER */}
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

          <div className="absolute top-0 left-0 z-20 w-full p-5 hidden md:flex items-start justify-between pointer-events-none">
            <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-lg px-5 py-4 shadow-lg">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                Premium Configurator
              </p>

              <h2 className="text-2xl md:text-3xl font-black italic text-primary mt-1">
                Big Bear Vans
              </h2>
            </div>

            <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-lg px-4 py-3 shadow-lg">
              <p className="text-xs text-slate-500 font-medium">
                {interiorMode ? "Interior View" : "Exterior View"}
              </p>
            </div>
          </div>

          <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[0, 2, 0]} intensity={2} />

            <Suspense
              fallback={
                <Html center>
                  <div className="px-4 py-2 rounded-lg bg-white shadow-xl text-primary font-semibold">
                    Loading 3D...
                  </div>
                </Html>
              }
            >
              {!interiorMode ? (
                <>
                  <CameraRig view={currentView} />

                  <OrbitControls
                    makeDefault
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={5}
                    maxDistance={50}
                  />
                </>
              ) : (
                <InteriorCamera
                  active={true}
                  position={[interiorConfig.x, 2.2, interiorConfig.z]}
                  target={[
                    interiorConfig.x,
                    interiorConfig.targetY,
                    interiorConfig.z - 5,
                  ]}
                />
              )}

              <Model url={url} />

              {activeParts.length > 0 &&
                activeParts.map((part) => (
                  <PartModel
                    key={part._id}
                    url={part.model}
                    position={[0, -2, 0]}
                    rotation={part.rotation || [0, 0, 0]}
                  />
                ))}

              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* SIDEBAR */}
        <div className="h-full overflow-hidden rounded-lg bg-primary text-secondary border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

          <div className="h-full overflow-y-auto px-5 md:px-6 py-6">

            {/* HEADER */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">
                Custom Build Studio
              </p>
<button
  onClick={() => setIsOpen(false)}
  className="
    absolute top-7 right-7 z-50
    w-11 h-11
    flex items-center justify-center
    rounded-full
    bg-white/80
    backdrop-blur-xl
    border border-white/40
    shadow-lg
    text-primary
    hover:bg-red-500
    hover:text-white
    transition-all duration-300
    pointer-events-auto
  "
>
  <X size={18} />
</button>
              <h1 className="text-3xl font-black italic mt-2 leading-none">
                Configure
                <br />
                Your Van
              </h1>
            </div>

            {/* VIEW MODE */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
                  View Mode
                </p>

                <div className="h-[1px] flex-1 bg-slate-700 ml-4"></div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <ControlBtn
                  label={
                    interiorMode ? "Exit Interior View" : "Enter Interior View"
                  }
                  active={interiorMode}
                  onClick={() => setInteriorMode(!interiorMode)}
                />
              </div>
            </div>

            {/* INTERIOR CONTROLS */}
            {interiorMode && (
              <div className="mb-8 bg-slate-900/40 border border-slate-700 rounded-lg p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
                    Interior Navigation
                  </p>

                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                </div>

                <div className="space-y-5">

                  {/* Z */}
                  <div>
                    <div className="flex justify-between text-xs mb-2 text-slate-300">
                      <span>Forward / Back</span>
                      <span>{interiorConfig.z}m</span>
                    </div>

                    <input
                      type="range"
                      min="1.5"
                      max="9"
                      step="0.1"
                      value={interiorConfig.z}
                      onChange={(e) => updateConfig("z", e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-secondary bg-slate-700"
                    />
                  </div>

                  {/* X */}
                  <div>
                    <div className="flex justify-between text-xs mb-2 text-slate-300">
                      <span>Left / Right</span>
                      <span>{interiorConfig.x}m</span>
                    </div>

                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.1"
                      value={interiorConfig.x}
                      onChange={(e) => updateConfig("x", e.target.value)}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-secondary bg-slate-700"
                    />
                  </div>

                  {/* TARGET */}
                  <div>
                    <div className="flex justify-between text-xs mb-2 text-slate-300">
                      <span>Tilt View</span>
                      <span>{interiorConfig.targetY}m</span>
                    </div>

                    <input
                      type="range"
                      min="3"
                      max="5.8"
                      step="0.1"
                      value={interiorConfig.targetY}
                      onChange={(e) =>
                        updateConfig("targetY", e.target.value)
                      }
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-secondary bg-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VARIANTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
                  Van Variants
                </p>

                <div className="h-[1px] flex-1 bg-slate-700 ml-4"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {variants.map((v) => (
                  <PrimaryButton
                    key={v._id}
                    onClick={() => handleVariantClick(v)}
                    label={v.name}
                    className={`
                      !rounded-lg
                      !py-3
                      !text-sm
                      border
                      transition-all
                      duration-300
                      ${
                        activeVariant?._id === v._id
                          ? "bg-secondary text-primary border-secondary shadow-xl scale-[1.02]"
                          : "bg-slate-900/40 text-secondary border-slate-700 hover:border-secondary/50 hover:bg-slate-800"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}