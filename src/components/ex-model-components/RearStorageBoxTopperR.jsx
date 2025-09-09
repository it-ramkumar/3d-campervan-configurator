import { useGLTF } from '@react-three/drei'

export default function RearStorageBoxTopperR(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/rear-storage-box-topper-r.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube047.geometry}
        material={materials['Material.040']}
        position={[0.581, 1.516, -3.113]}
      />
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/rear-storage-box-topper-r.glb')