import React from 'react'
import { useGLTF } from "@react-three/drei";


export default function PartModel({ url, position, rotation, scale }) {
  const { scene } = useGLTF(url);

  return (
     <primitive
       object={scene.clone()}
       position={position}
       rotation={rotation}
       scale={0.004}
     />
   );
 }

