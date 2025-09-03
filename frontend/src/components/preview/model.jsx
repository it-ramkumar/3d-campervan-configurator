import { useGLTF } from "@react-three/drei";

export default function Model({ url }) {
    if (!url) return null; // if no URL, render nothing

  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}