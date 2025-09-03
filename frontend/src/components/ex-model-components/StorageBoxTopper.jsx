import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function StorageBoxTopper(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/rear-storage-box-topper.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube043.geometry}
        material={materials['Material.040']}
        position={[-0.571, 1.516, -3.113]}
      />
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/rear-storage-box-topper.glb')