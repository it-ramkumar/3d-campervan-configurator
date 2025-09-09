import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Awning(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/awning.glb')
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      console.log("✅ Awning loaded, ready for focus:", groupRef.current)
      // yahan tum apna focusOnModel call kar sakte ho
      // focusOnModel(obj, groupRef.current, camera, controls)
    }
  }, [])

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['G-Object061'].geometry}
        material={materials['Material.051']}
        position={[-1.777, 2.485, -0.982]}
      />
    </group>
  )
}
useGLTF.preload('./models/ex-parts144/awning.glb')