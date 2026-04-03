"use client"
import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, Html, useProgress, useGLTF } from '@react-three/drei'

function Model({ url, doors }) {
  const { nodes, scene } = useGLTF(url)
  const group = useRef()

  // Initial transforms store karne ke liye
  const initial = useRef({
    sideDoorZ: 0,
    driverRot: 0,
    passengerRot: 0,
    saved: false
  })

  // useEffect(() => {
  //   if (!initial.current.saved) {
  //     if (nodes.side_door) initial.current.sideDoorZ = nodes.side_door.position.z
  //     if (nodes.door_front_R_Glass) initial.current.driverRot = nodes.door_front_R_Glass.parent.rotation.y
  //     if (nodes.door_front_R_Glass002) initial.current.passengerRot = nodes.door_front_R_Glass002.parent.rotation.y
  //     initial.current.saved = true
  //   }

  //   // Front doors default position set
  //   if (nodes.door_front_R_Glass) nodes.door_front_R_Glass.parent.position.set(-56.682, 42.027, 109.748)
  //   if (nodes.door_front_R_Glass002) nodes.door_front_R_Glass002.parent.position.set(56.682, 42.027, 109.748)
  // }, [nodes])

  useFrame(() => {
    const speed = 0.15

// Side door animation
if (nodes.side_door) {
  // Z position: original ya open override
  const targetZ = doors.openSlider ? -90 : initial.current.sideDoorZ-5

  // X position: open pe hardcoded, else original
  // const targetX = initial.current.sideDoorX // <- yahan -2 example value hai

  nodes.side_door.position.z = THREE.MathUtils.lerp(nodes.side_door.position.z, targetZ, speed)
  // nodes.side_door.position.x = THREE.MathUtils.lerp(nodes.side_door.position.x, targetX, speed)
}
    // Driver door rotation
    if (nodes.door_front_R_Glass) {
      const targetRot = doors.openDriver ? Math.PI / 4 : initial.current.driverRot
      nodes.door_front_R_Glass.parent.rotation.y = THREE.MathUtils.lerp(nodes.door_front_R_Glass.parent.rotation.y, targetRot, speed)
    }

    // Passenger door rotation
    if (nodes.door_front_R_Glass002) {
      const targetRot = doors.openPassenger ? -Math.PI / 4 : initial.current.passengerRot
      nodes.door_front_R_Glass002.parent.rotation.y = THREE.MathUtils.lerp(nodes.door_front_R_Glass002.parent.rotation.y, targetRot, speed)
    }
  })

  return (
    <group ref={group} scale={0.05} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#ED3500] border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-[15px] font-bold text-[#30364F]">{Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

export default function VanCanvas({ url }) {
  const [doors, setDoors] = useState({
    openDriver: false,
    openPassenger: false,
    openSlider: false
  })

  if (!url || url === "loading...") {
    return (
      <div className="h-screen flex items-center justify-center text-[17px] text-gray-500 italic">
        Configuring your build...
      </div>
    )
  }

  const toggleDoor = (key) => {
    setDoors(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex h-screen w-full bg-[#FFFCFB] p-5 gap-6 font-sans">
      {/* 3D Viewer Container */}
      <div className="flex-[2] relative bg-slate-100 rounded-[20px] overflow-hidden shadow-inner border border-slate-200">
        <Canvas shadows camera={{ position: [15, 10, 15], fov: 35 }}>
          <ambientLight intensity={0.8} />
          <spotLight position={[20, 20, 10]} intensity={1.5} castShadow />
          <Suspense fallback={<Loader />}>
            <Model url={url} doors={doors} />
            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={25} blur={2.5} far={10} />
          </Suspense>
          <OrbitControls makeDefault minDistance={5} maxDistance={30} />
        </Canvas>

        {/* Floating Tooltip */}
        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[13px] text-gray-600 shadow-sm border border-white/50">
           Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="flex-[0.7] bg-[#001F3D] p-8 rounded-[20px] shadow-2xl flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-[24px] font-bold text-white mb-1">Big Bear Vans</h2>
          <p className="text-[15px] text-slate-400">Custom Sprinter 144" Builder</p>
        </div>

        <hr className="border-slate-700" />

        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-slate-500 font-semibold">Exterior Actions</h3>

          <DoorButton
            label="Driver Door"
            isActive={doors.openDriver}
            onClick={() => toggleDoor('openDriver')}
          />
          <DoorButton
            label="Passenger Door"
            isActive={doors.openPassenger}
            onClick={() => toggleDoor('openPassenger')}
          />
          <DoorButton
            label="Side Slider Door"
            isActive={doors.openSlider}
            onClick={() => toggleDoor('openSlider')}
          />
        </div>

        <div className="mt-auto bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-[13px] text-slate-300 italic text-center">
            "Design your dream van with precision."
          </p>
        </div>
      </div>
    </div>
  )
}

// Reusable Button Component for consistency
function DoorButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full py-4 px-6 rounded-xl text-[15px] font-medium transition-all duration-300
        flex items-center justify-between group
        ${isActive
          ? 'bg-[#ED3500] text-white shadow-lg shadow-[#ED3500]/20'
          : 'bg-[#30364F] text-slate-300 hover:bg-[#E8988A] hover:text-white'}
      `}
    >
      {label}
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-600 group-hover:bg-white'}`} />
    </button>
  )
}