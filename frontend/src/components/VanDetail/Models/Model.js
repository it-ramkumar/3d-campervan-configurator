"use client"
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ url, onLoadComplete }) {
  const group = useRef()
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (scene && onLoadComplete) {
      // Native Three.js trigger jab scene memory me fully construct ho jaye
      onLoadComplete()
    }
  }, [scene, onLoadComplete])

  return (
    <group ref={group} position={[0, -2, 0]}>
      <primitive object={scene} scale={0.004} />
    </group>
  )
}