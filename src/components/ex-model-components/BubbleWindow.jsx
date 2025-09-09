import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function BubbleWindow({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/bubble-style-window.glb');

  // Highlighted materials for each unique material
  const highlightedMaterial038 = useMemo(() => {
    const material = materials['Material.038'].clone();
    // // material.emissive.set('blue');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.038']]);

  const highlightedMaterial039 = useMemo(() => {
    const material = materials['Material.039'].clone();
    // material.emissive.set('blue');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.039']]);

  const highlightedMaterial040 = useMemo(() => {
    const material = materials['Material.040'].clone();
    // // material.emissive.set('blue');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.040']]);

  const highlightedMaterial042 = useMemo(() => {
    const material = materials['Material.042'].clone();
    // // material.emissive.set('blue');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.042']]);

  const highlightedMaterial043 = useMemo(() => {
    const material = materials['Material.043'].clone();
    // material.emissive.set('blue');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.043']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0.001, 1.81, -1.816]} rotation={[-Math.PI, 0, 0]} scale={-1}>
        {nodes?.Mesh006?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh006.geometry}
            material={isSelected ? highlightedMaterial038 : materials['Material.038']}
          />
        )}
        {nodes?.Mesh006_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh006_1.geometry}
            material={isSelected ? highlightedMaterial039 : materials['Material.039']}
          />
        )}
        {nodes?.Mesh006_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh006_2.geometry}
            material={isSelected ? highlightedMaterial040 : materials['Material.040']}
          />
        )}
        {nodes?.Mesh006_3?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh006_3.geometry}
            material={isSelected ? highlightedMaterial042 : materials['Material.042']}
          />
        )}
        {nodes?.Mesh006_4?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh006_4.geometry}
            material={isSelected ? highlightedMaterial043 : materials['Material.043']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/ex-parts144/bubble-style-window.glb');