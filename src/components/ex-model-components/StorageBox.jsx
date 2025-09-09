// import React, { useMemo } from 'react';
// import { useGLTF } from '@react-three/drei';

// export default function StorageBox({ isSelected, ...props }) {
//   const { nodes, materials } = useGLTF('./models/parts144/StorageBox.glb');

//   // Log nodes and materials for debugging
//   console.log('Nodes:', nodes);
//   console.log('Materials:', materials);

//   // Highlighted material logic
//   const highlightedMaterial = useMemo(() => {
//     if (!materials['Material.026']) return null; // Fallback if material is missing
//     const material = materials['Material.026'].clone();

//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.026']]);

//   // Render nothing if highlightedMaterial is not available
//   if (!highlightedMaterial) return null;

//   return (
//     <group {...props} dispose={null}>
//       {/* Safely access geometry using optional chaining */}
//       {nodes?.Cube011?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube011.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.434, 1.397, -3.161]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube012?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube012.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.419, 0.871, -2.942]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube010?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube010.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.437, 1.723, -3.211]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube015?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube015.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.427, 0.864, -3.036]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube016?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube016.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.239, 1.325, -2.88]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube026?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube026.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.116, 1.126, -3.105]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube027?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube027.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.128, 1.139, -3.295]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube028?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube028.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.141, 1.097, -2.826]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube029?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube029.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.233, 1.087, -2.757]}
//           rotation={[0.054, 0.065, -0.003]}
//           scale={0.374}
//         />
//       )}
//       {nodes?.Cube033?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube033.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.239, 1.325, -2.88]}
//           rotation={[0.054, 0.065, 3.139]}
//           scale={[-0.061, -0.061, -0.124]}
//         />
//       )}
//       {nodes?.Cube035?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube035.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.239, 1.325, -2.88]}
//           rotation={[0.054, 0.065, 3.139]}
//           scale={[-0.061, -0.061, -0.124]}
//         />
//       )}
//       {nodes?.Cube036?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube036.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.239, 1.325, -2.88]}
//           rotation={[0.054, 0.065, 3.139]}
//           scale={[-0.061, -0.061, -0.124]}
//         />
//       )}
//       {nodes?.Cube037?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube037.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.239, 1.325, -2.88]}
//           rotation={[0.054, 0.065, 3.139]}
//           scale={[-0.061, -0.061, -0.124]}
//         />
//       )}
//       {nodes?.Cube115?.geometry && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube115.geometry}
//           material={isSelected ? highlightedMaterial : materials['Material.026']}
//           position={[-0.433, 1.196, -3.185]}
//         />
//       )}
//     </group>
//   );
// }

// useGLTF.preload('./models/parts144/StorageBox.glb');


/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function StorageBox(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/storage-box.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials['Material.026']}
        position={[-0.434, 1.397, -3.161]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials['Material.026']}
        position={[-0.419, 0.871, -2.942]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials['Material.026']}
        position={[-0.437, 1.723, -3.21]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials['Material.026']}
        position={[-0.427, 0.864, -3.036]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials['Material.026']}
        position={[-0.239, 1.325, -2.88]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube026.geometry}
        material={materials['Material.026']}
        position={[-0.116, 1.126, -3.105]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube027.geometry}
        material={materials['Material.026']}
        position={[-0.128, 1.139, -3.295]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028.geometry}
        material={materials['Material.026']}
        position={[-0.141, 1.097, -2.826]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube029.geometry}
        material={materials['Material.026']}
        position={[-0.233, 1.087, -2.757]}
        rotation={[0.054, 0.065, -0.003]}
        scale={0.374}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube032.geometry}
        material={materials['Material.026']}
        position={[-0.239, 1.325, -2.88]}
        rotation={[0.054, 0.065, 3.139]}
        scale={[-0.061, -0.061, -0.124]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube035.geometry}
        material={materials['Material.026']}
        position={[-0.239, 1.325, -2.88]}
        rotation={[0.054, 0.065, 3.139]}
        scale={[-0.061, -0.061, -0.124]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036.geometry}
        material={materials['Material.026']}
        position={[-0.239, 1.325, -2.88]}
        rotation={[0.054, 0.065, 3.139]}
        scale={[-0.061, -0.061, -0.124]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube037.geometry}
        material={materials['Material.026']}
        position={[-0.239, 1.325, -2.88]}
        rotation={[0.054, 0.065, 3.139]}
        scale={[-0.061, -0.061, -0.124]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube115.geometry}
        material={materials['Material.026']}
        position={[-0.433, 1.196, -3.185]}
      />
    </group>
  )
}

  useGLTF.preload('./models/ex-parts144/storage-box.glb')
