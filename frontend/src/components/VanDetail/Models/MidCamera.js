"use client"
import { useRef, useLayoutEffect } from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'

export default function InteriorCamera({
  active,
  position,
  target,
  fov = 75,
  minFov = 60,    // Minimum FOV (zoom in)
  maxFov = 120    // Maximum FOV (wide angle)
}) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const baseFov = useRef(fov)

  useLayoutEffect(() => {
    if (active && camera) {
      // 1. Camera ki position set karein
      camera.position.set(...position)

      // 2. Base FOV set karein
      camera.fov = fov
      baseFov.current = fov
      camera.updateProjectionMatrix()

      // 3. Controls ka target set karein
      if (controlsRef.current) {
        controlsRef.current.target.set(...target)
        controlsRef.current.minDistance = 0.01
        controlsRef.current.maxDistance = 0.5
        controlsRef.current.update()
      }
    }
  }, [active, position, target, camera, fov])

  // Dynamic FOV based on orbit rotation
  useFrame(() => {
    if (active && controlsRef.current && camera) {
      // Get rotation angles from controls
      const azimuthAngle = Math.abs(controlsRef.current.getAzimuthalAngle())
      const polarAngle = controlsRef.current.getPolarAngle()

      // Calculate FOV multiplier based on rotation
      // Zyada rotation = zyada FOV (wider view)
      const rotationFactor = (azimuthAngle / Math.PI) * 0.5 +
                           (polarAngle / Math.PI) * 0.3

      // Calculate new FOV
      const newFov = baseFov.current + (rotationFactor * 30)

      // Clamp between min and max
      const clampedFov = Math.max(minFov, Math.min(maxFov, newFov))

      // Apply smooth transition
      camera.fov += (clampedFov - camera.fov) * 0.1
      camera.updateProjectionMatrix()
    }
  })

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