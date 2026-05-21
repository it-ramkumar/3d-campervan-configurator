"use client"
import React from 'react'
import { useGLTF } from "@react-three/drei"

export default function PartModel({ url, position, rotation }) {
  const { scene } = useGLTF(url)

  return (
    // scene.clone() useful hai agar ek hi part multi-times map ho raha ho
    <primitive
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={0.004}
    />
  )
}