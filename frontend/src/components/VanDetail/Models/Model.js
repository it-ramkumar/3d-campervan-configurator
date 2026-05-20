import React, { useState, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'



export default function Model({ url }) {
  const group = useRef()
  const { scene } = useGLTF(url)
  const [ready, setReady] = useState(false)

useEffect(() => {
  if (scene) {
    // Model ki position ko chhere bina, bas thoda sa delay de kar ready state true kar dein
    const timer = setTimeout(() => setReady(true), 150);

    return () => clearTimeout(timer); // Cleanup function taake memory leak na ho
  }
}, [scene]);

  return (
    <group ref={group} visible={ready} position={[0, -2, 0]}>
      <primitive object={scene} scale={0.004} />
    </group>
  )
}
