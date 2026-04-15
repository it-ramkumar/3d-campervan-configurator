"use client"
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

const MidCamera = ({ isActive }) => {
  const controlsRef = useRef()
  const cameraRef = useRef()

  // Camera settings constants
  const MID_POSITION = [0, 1.6, 0.5] // Van ke beech ki position [X, Y, Z]
  const LOOK_AT = [0, 1.6, 0]      // Camera kahan dekh raha hai

  useFrame(() => {
    if (isActive && controlsRef.current) {
      controlsRef.current.update()
    }
  })

  if (!isActive) return null

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        position={MID_POSITION}
        near={0.1}
        far={100}
      />
     <OrbitControls
  ref={controlsRef}
  target={LOOK_AT}
  enableZoom={false}
  enablePan={false}
  enableDamping={true}

  // Vertical movement allow karo (upar/neeche)
  minPolarAngle={Math.PI / 2 - 0.5} // thoda upar dekh sakay
  maxPolarAngle={Math.PI / 2 + 0.5} // thoda neeche dekh sakay

  maxDistance={0.1}
  minDistance={0.1}
/>
    </>
  )
}

export default MidCamera