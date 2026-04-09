"use client"
import React, { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html, useProgress } from '@react-three/drei'

function Model({ url, doors }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  // Pichli state ko track karne ke liye ref
  const prevDoors = useRef(doors)

  useEffect(() => {
    const handleAnimation = (actionName, isNowOpen, wasOpen) => {
      const action = actions[actionName]
      if (!action) return

      // Sirf tab chalao jab state change hui ho
      if (isNowOpen !== wasOpen) {
        action.stop() // Pehle se chal rahi clip ko reset karein
        action.clampWhenFinished = true
        action.setLoop(THREE.LoopOnce, 1)

        // Direction set karein
        action.timeScale = isNowOpen ? 1 : -1

        // Agar band karna hai toh clip ke end se start karein
        if (!isNowOpen) {
          action.time = action.getClip().duration
        }

        action.paused = false
        action.play()
      }
    }

    // Individual checks for each door
    handleAnimation("rare door-RAction", doors.openBackRight, prevDoors.current.openBackRight)
    handleAnimation("rare-door_LAction", doors.openBackLeft, prevDoors.current.openBackLeft)

    // Current state ko save karein agli bar check karne ke liye
    prevDoors.current = doors
  }, [doors, actions])

  // Center the model once loaded
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
    }
  }, [scene])

  return (
    <group ref={group} scale={0.005} dispose={null}>
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
    openSlider: false,
    openBackLeft: false,
    openBackRight: false
  })

  const toggleDoor = (key) => {
    setDoors(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!url || url === "loading...") {
    return (
      <div className="h-screen flex items-center justify-center text-[17px] text-gray-500 italic">
        Configuring your build...
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full bg-[#FFFCFB] p-5 gap-6 font-sans">
      {/* 3D Viewport */}
      <div className="flex-[2] relative bg-slate-100 rounded-[20px] overflow-hidden shadow-inner border border-slate-200">
        <Canvas shadows camera={{ position: [20, 10, 20], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={<Loader />}>
            <Model url={url} doors={doors} />
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>
        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[13px] text-gray-600 shadow-sm">
          Interactive 3D Preview
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex-[0.7] bg-[#001F3D] p-8 rounded-[20px] shadow-2xl flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-[24px] font-bold text-white mb-1">Big Bear Vans</h2>
          <p className="text-[15px] text-slate-400">Custom Sprinter 144" Builder</p>
        </div>

        <hr className="border-slate-700" />

        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-slate-500 font-semibold">Rear Door Controls</h3>
          <DoorButton label="Back Door (Left)" isActive={doors.openBackLeft} onClick={() => toggleDoor('openBackLeft')} />
          <DoorButton label="Back Door (Right)" isActive={doors.openBackRight} onClick={() => toggleDoor('openBackRight')} />

          <h3 className="text-[13px] uppercase tracking-widest text-slate-500 font-semibold mt-4">Other Actions</h3>
          <DoorButton label="Driver Door" isActive={doors.openDriver} onClick={() => toggleDoor('openDriver')} />
          <DoorButton label="Passenger Door" isActive={doors.openPassenger} onClick={() => toggleDoor('openPassenger')} />
          <DoorButton label="Side Slider Door" isActive={doors.openSlider} onClick={() => toggleDoor('openSlider')} />
        </div>
      </div>
    </div>
  )
}

function DoorButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-xl text-[15px] font-medium transition-all duration-300 flex items-center justify-between group
        ${isActive ? 'bg-[#ED3500] text-white shadow-lg' : 'bg-[#30364F] text-slate-300 hover:bg-slate-700'}`}
    >
      {label}
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-600'}`} />
    </button>
  )
}