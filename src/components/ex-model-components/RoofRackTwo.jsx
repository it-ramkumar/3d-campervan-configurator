import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function RoofRackTwo(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/roof-rack-two.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roof_Rack001.geometry}
        material={materials['Material.042']}
        position={[0.033, 2.647, -1.079]}
        rotation={[1.574, 0, 0]}
        scale={[0.011, 0.01, 0.011]}
      />
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/roof-rack-two.glb')