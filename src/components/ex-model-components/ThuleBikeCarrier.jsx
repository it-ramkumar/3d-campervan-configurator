import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ThuleBikeCarrier(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/bike-carrier-with-storage.glb')

  return (
    <group {...props} dispose={null}>
      <group position={[-0.549, 1.29, -2.904]} rotation={[-0.017, -0.096, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006.geometry}
          material={materials['Material.069']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006_1.geometry}
          material={materials['Material.019']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/bike-carrier-with-storage.glb')