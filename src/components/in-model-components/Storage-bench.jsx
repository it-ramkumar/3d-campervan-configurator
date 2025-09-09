import { useGLTF } from '@react-three/drei'

export default function StorageBench(props) {
  const { nodes, materials } = useGLTF('/models/in-parts144/Storage-bench.glb')
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.438, 0.574, -0.58]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������1'].geometry}
          material={materials.Материал_1}
          position={[692.5, -169.339, -218.677]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������1_2'].geometry}
          material={materials.Материал_1}
          position={[1132.597, -173.807, -214.94]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������1_3'].geometry}
          material={materials['Material.091']}
          position={[7.403, -173.807, -214.94]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������1_4'].geometry}
          material={materials.Материал_1}
          position={[350, 58.687, -129.275]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2'].geometry}
          material={materials.Материал_1}
          position={[1076.858, -63.851, -260.264]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2_2'].geometry}
          material={materials.Материал_1}
          position={[748.1, -63.837, -97.762]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2_3'].geometry}
          material={materials.Материал_1}
          position={[748.141, -63.842, -260.253]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2_4'].geometry}
          material={materials.Материал_1}
          position={[1076.898, -63.847, -97.773]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2_5'].geometry}
          material={materials['Material.091']}
          position={[916.845, 75.523, -267.807]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������2_6'].geometry}
          material={materials['Material.091']}
          position={[916.855, 75.521, -91.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3'].geometry}
          material={materials['Material.091']}
          position={[570.038, -164.441, -437.491]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3_2'].geometry}
          material={materials.Материал_1}
          position={[912.509, -68.351, -141.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3_3'].geometry}
          material={materials.Материал_1}
          position={[1104.799, -140.35, -224.967]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3_4'].geometry}
          material={materials.Материал_1}
          position={[720.201, -140.348, -224.968]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3_5'].geometry}
          material={materials.Материал_1}
          position={[912.509, -68.351, -314]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������3_6'].geometry}
          material={materials['Material.091']}
          position={[570, -160.079, -452.509]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������4'].geometry}
          material={materials['Material.091']}
          position={[347.501, 74.177, -216.627]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1'].geometry}
          material={materials.Материал_1}
          position={[912.5, -341.897, -114.56]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1_2'].geometry}
          material={materials.Материал_1}
          position={[912.5, -191.877, -91.955]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1_3'].geometry}
          material={materials.Материал_1}
          position={[912.5, -191.812, -254.398]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1_4'].geometry}
          material={materials.Материал_1}
          position={[570.514, -406.504, -215]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1_5'].geometry}
          material={materials.Материал_1}
          position={[570.344, -103.993, -7.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������1_6'].geometry}
          material={materials.Материал_1}
          position={[350, -341.671, -129.229]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������2'].geometry}
          material={materials.Материал_1}
          position={[35.157, -141.492, -129.24]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['������2_2'].geometry}
          material={materials.Материал_1}
          position={[664.843, -141.492, -129.24]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1'].geometry}
          material={materials.Материал_1}
          position={[912.5, -58.992, -56.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_2'].geometry}
          material={materials.Материал_1}
          position={[912.5, 41.008, -189]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_3'].geometry}
          material={materials.Материал_1}
          position={[912.5, -58.992, -209]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_4'].geometry}
          material={materials.Материал_1}
          position={[912.5, -138.992, -36.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_5'].geometry}
          material={materials.Материал_1}
          position={[912.5, 41.008, -365.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_6'].geometry}
          material={materials.Материал_1}
          position={[912.5, -341.492, -374]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_6002'].geometry}
          material={materials['Material.091']}
          position={[916.466, 75.492, -392.029]}
          scale={[1.151, 1.248, 0.794]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�������-�������1_7'].geometry}
          material={materials.Материал_1}
          position={[350, -141.492, -36.5]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1'].geometry}
          material={materials.Материал_1}
          position={[1052.5, -4.833, -18.452]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_2'].geometry}
          material={materials.Материал_1}
          position={[602.5, -4.833, -18.452]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_3'].geometry}
          material={materials.Материал_1}
          position={[97.5, -4.833, -18.452]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_4'].geometry}
          material={materials.Материал_1}
          position={[772.5, -4.833, -18.452]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_5'].geometry}
          material={materials.Материал_1}
          position={[341.887, -143.418, -231.065]}
        />
      </group>
      <group
        position={[0.438, 0.574, -0.58]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NONE_11.geometry}
          material={materials['lock.004']}
          position={[345.535, 65.252, -397.128]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NONE_11002.geometry}
          material={materials['lock.004']}
          position={[910.067, 64.878, -324.534]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NONE_11003.geometry}
          material={materials['lock.004']}
          position={[910.067, 64.878, -149.985]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials.Mattress}
        position={[0.791, 1.012, 0.096]}
        scale={[0.921, 0.571, 0.924]}
      />
    </group>
  )
}

useGLTF.preload('/models/in-parts144/Storage-bench.glb')