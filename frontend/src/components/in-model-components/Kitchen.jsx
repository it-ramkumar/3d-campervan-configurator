// import React, { useMemo } from 'react';
// import { useGLTF } from '@react-three/drei';

// export default function Kitchen({ isSelected, ...props }) {
//   const { nodes, materials } = useGLTF('./models/parts144/Kitchen.glb');

//   const highlightedMaterialW_ma = useMemo(() => {
//     const material = materials.W_ma.clone();

//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials.W_ma]);

//   const highlightedMaterialBlack = useMemo(() => {
//     const material = materials.Black.clone();

//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials.Black]);

//   const highlightedMaterialInductionMat = useMemo(() => {
//     const material = materials.InductionMat.clone();

//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials.InductionMat]);

//   const highlightedMaterialSimpleWood = useMemo(() => {
//     const material = materials['Simple wood'].clone();

//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Simple wood']]);

//   return (
//     <group {...props} dispose={null}>
//       <group position={[-0.584, 1.195, -0.467]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube005.geometry}
//           material={isSelected ? highlightedMaterialW_ma : materials.W_ma}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube005_1.geometry}
//           material={isSelected ? highlightedMaterialBlack : materials.Black}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube005_2.geometry}
//           material={isSelected ? highlightedMaterialInductionMat : materials.InductionMat}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube005_3.geometry}
//           material={isSelected ? highlightedMaterialSimpleWood : materials['Simple wood']}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload('./models/parts144/Kitchen.glb');