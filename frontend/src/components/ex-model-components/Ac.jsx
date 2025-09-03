// import React, { useMemo } from 'react';
// import { useGLTF } from '@react-three/drei';

// export function Ac({ isSelected, ...props }) {
//   const { nodes, materials } = useGLTF('./models/ex-parts144/Ac.glb');

//   const highlightedMaterial004 = useMemo(() => {
//     const material = materials['Material.004'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.004']]);

//   const highlightedMaterial010 = useMemo(() => {
//     const material = materials['Material.010'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.010']]);

//   const highlightedMaterial013 = useMemo(() => {
//     const material = materials['Material.013'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.013']]);

//   const highlightedMaterial023 = useMemo(() => {
//     const material = materials['Material.023'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.023']]);

//   const highlightedMaterial017 = useMemo(() => {
//     const material = materials['Material.017'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.017']]);

//   const highlightedMaterial020 = useMemo(() => {
//     const material = materials['Material.020'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.020']]);

//   const highlightedMaterialPCFanBlade = useMemo(() => {
//     const material = materials.PCFanBlade.clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials.PCFanBlade]);

//   const highlightedMaterial021 = useMemo(() => {
//     const material = materials['Material.021'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.021']]);

//   const highlightedMaterial022 = useMemo(() => {
//     const material = materials['Material.022'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.022']]);

//   const highlightedMaterial008 = useMemo(() => {
//     const material = materials['Material.008'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.008']]);

//   const highlightedMaterial009 = useMemo(() => {
//     const material = materials['Material.009'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.009']]);

//   const highlightedMaterial011 = useMemo(() => {
//     const material = materials['Material.011'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.011']]);

//   const highlightedMaterial012 = useMemo(() => {
//     const material = materials['Material.012'].clone();
//     // // material.emissive.set('blue');
//     material.emissiveIntensity = 1;
//     return material;
//   }, [materials['Material.012']]);

//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013.geometry}
//         material={isSelected ? highlightedMaterial004 : materials['Material.004']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_1.geometry}
//         material={isSelected ? highlightedMaterial010 : materials['Material.010']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_2.geometry}
//         material={isSelected ? highlightedMaterial013 : materials['Material.013']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_3.geometry}
//         material={isSelected ? highlightedMaterial023 : materials['Material.023']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_4.geometry}
//         material={isSelected ? highlightedMaterial017 : materials['Material.017']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_5.geometry}
//         material={isSelected ? highlightedMaterial020 : materials['Material.020']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_6.geometry}
//         material={isSelected ? highlightedMaterialPCFanBlade : materials.PCFanBlade}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_7.geometry}
//         material={isSelected ? highlightedMaterial021 : materials['Material.021']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_8.geometry}
//         material={isSelected ? highlightedMaterial022 : materials['Material.022']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_9.geometry}
//         material={isSelected ? highlightedMaterial008 : materials['Material.008']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_10.geometry}
//         material={isSelected ? highlightedMaterial009 : materials['Material.009']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_11.geometry}
//         material={isSelected ? highlightedMaterial011 : materials['Material.011']}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube013_12.geometry}
//         material={isSelected ? highlightedMaterial012 : materials['Material.012']}
//       />
//     </group>
//   );
// }

// useGLTF.preload('./models/ex-parts144/Ac.glb');


import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ac(props) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/ac.glb')
  return (
    <group {...props} dispose={null} position={[0, 2.576, -0.168]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials['Material.004']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_1.geometry}
        material={materials['Material.010']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_2.geometry}
        material={materials['Material.013']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_3.geometry}
        material={materials['Material.023']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_4.geometry}
        material={materials['Material.017']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_5.geometry}
        material={materials['Material.020']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_6.geometry}
        material={materials.PCFanBlade}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_7.geometry}
        material={materials['Material.021']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_8.geometry}
        material={materials['Material.022']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_9.geometry}
        material={materials['Material.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_10.geometry}
        material={materials['Material.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_11.geometry}
        material={materials['Material.011']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_12.geometry}
        material={materials['Material.012']}
      />
    </group>
  )
}

useGLTF.preload('./models/ex-parts144/ac.glb')
