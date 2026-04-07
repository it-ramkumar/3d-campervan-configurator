"use client"
import React, { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, Html, useProgress, useGLTF } from '@react-three/drei'

function Model({ url, doors }) {
  const { nodes, scene } = useGLTF(url)
  const group = useRef()

  const initial = useRef({
    sideDoorZ: 0,
    driverRot: 0,
    passengerRot: 0,
    backDoorRot: 0,
    saved: false
  })

  // Model ko center aur scale karne ke liye
  useEffect(() => {
    if (scene) {
      // Bounding box calculate karo
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      // Model ko center pe move karo
      scene.position.sub(center)

      // Consistent scale apply karo (sabse bada dimension 10 units ka ho)
      const maxDimension = Math.max(size.x, size.y, size.z)
      const targetSize = 10 // Ye value adjust kar sakte ho
      const scale = targetSize / maxDimension
      scene.scale.setScalar(scale)

      // Initial positions save karo (scaled ke baad)
      if (!initial.current.saved) {
        if (nodes.side_door) {
          initial.current.sideDoorZ = nodes.side_door.position.z
        }
        initial.current.saved = true
      }
    }
  }, [scene, nodes])

  useFrame(() => {
    const speed = 0.15

    // 1. Side Slider Door
    if (nodes.side_door) {
      const targetZ = doors.openSlider ? initial.current.sideDoorZ - 2 : initial.current.sideDoorZ
      const targetX = doors.openSlider ? nodes.side_door.position.x + 0.5 : nodes.side_door.position.x

      nodes.side_door.position.z = THREE.MathUtils.lerp(nodes.side_door.position.z, targetZ, speed)
      if (doors.openSlider) {
        nodes.side_door.position.x = THREE.MathUtils.lerp(nodes.side_door.position.x, targetX, speed)
      }
    }

    // 2. Driver Door
    if (nodes.door_front_R_Glass) {
      const targetRot = doors.openDriver ? Math.PI / 4 : initial.current.driverRot
      nodes.door_front_R_Glass.parent.rotation.y = THREE.MathUtils.lerp(nodes.door_front_R_Glass.parent.rotation.y, targetRot, speed)
    }

    // 3. Passenger Door
    if (nodes.door_front_R_Glass002) {
      const targetRot = doors.openPassenger ? -Math.PI / 4 : initial.current.passengerRot
      nodes.door_front_R_Glass002.parent.rotation.y = THREE.MathUtils.lerp(nodes.door_front_R_Glass002.parent.rotation.y, targetRot, speed)
    }

    // 4. Back Door Left
    if (nodes['back-door-Left']) {
      const targetRot = doors.openBackLeft ? Math.PI / 2 : initial.current.backDoorRot
      nodes['back-door-Left'].rotation.y = THREE.MathUtils.lerp(nodes['back-door-Left'].rotation.y, targetRot, speed)
    }

    // 5. Back Door Right
    if (nodes['Back-door-R']) {
      const targetRot = doors.openBackRight ? -Math.PI / 2 : initial.current.backDoorRot
      nodes['Back-door-R'].rotation.y = THREE.MathUtils.lerp(nodes['Back-door-R'].rotation.y, targetRot, speed)
    }
  })

  return (
    <group ref={group} dispose={null}>
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
      <div className="flex-[2] relative bg-slate-100 rounded-[20px] overflow-hidden shadow-inner border border-slate-200">

        {/* FIXED CAMERA SETTINGS - Ab sab models same dikhenge */}
        <Canvas
          shadows
          camera={{
            position: [0, 5, 25], // Peeche hata diya, thoda upar
            fov: 50,
            far: 1000
          }}
        >
          <ambientLight intensity={0.8} />
          <Suspense fallback={<Loader />}>
            <Model url={url} doors={doors} />
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            makeDefault
            target={[0, 2, 0]} // Thoda upar focus karo
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={80}
          />
        </Canvas>

        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[13px] text-gray-600 shadow-sm border border-white/50">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      <div className="flex-[0.7] bg-[#001F3D] p-8 rounded-[20px] shadow-2xl flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-[24px] font-bold text-white mb-1">Big Bear Vans</h2>
          <p className="text-[15px] text-slate-400">Custom Sprinter 144" Builder</p>
        </div>

        <hr className="border-slate-700" />

        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-slate-500 font-semibold">Exterior Actions</h3>

          <DoorButton label="Driver Door" isActive={doors.openDriver} onClick={() => toggleDoor('openDriver')} />
          <DoorButton label="Passenger Door" isActive={doors.openPassenger} onClick={() => toggleDoor('openPassenger')} />
          <DoorButton label="Side Slider Door" isActive={doors.openSlider} onClick={() => toggleDoor('openSlider')} />
          <DoorButton label="Back Door (Left)" isActive={doors.openBackLeft} onClick={() => toggleDoor('openBackLeft')} />
          <DoorButton label="Back Door (Right)" isActive={doors.openBackRight} onClick={() => toggleDoor('openBackRight')} />
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