import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function BicycleCarrier(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/carrier-with-bike-two.glb')

  return (
    <group {...props} dispose={null}>
      <group position={[0.756, 1.341, -2.91]} rotation={[3.102, -1.478, -1.647]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056.geometry}
          material={materials['Material.066']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056_1.geometry}
          material={materials['Material.071']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056_2.geometry}
          material={materials['Material.067']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056_3.geometry}
          material={materials['Material.072']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056_4.geometry}
          material={materials['Material.073']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056_5.geometry}
          material={materials['Material.074']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/carrier-with-bike-two.glb')

