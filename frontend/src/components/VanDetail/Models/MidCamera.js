"use client"
import { useRef, useLayoutEffect } from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function InteriorCamera({
  active,
  position,
  target,
  fov = 75
}) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useLayoutEffect(() => {
    if (active && camera) {
      // 1. Camera ki position set karein
      camera.position.set(...position)

      // 2. Controls ka target set karein
      if (controlsRef.current) {
        controlsRef.current.target.set(...target)

        // INTERIOR FIX: Distance limits ko chota rakhein
        // Taake camera jump karke wapas 0 (midpoint) pe na jaye
        controlsRef.current.minDistance = 0.01
        controlsRef.current.maxDistance = 0.5

        controlsRef.current.update()
      }
    }
  }, [active, position, target, camera])

  return (
    <>
      <PerspectiveCamera makeDefault position={position} fov={fov} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI * 0.9}
      />
    </>
  )
}