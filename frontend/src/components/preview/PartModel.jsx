import React from "react";
import { useGLTF } from "@react-three/drei";

export default function PartModel({ url }) {
  const { scene } = useGLTF(url, "https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  return <primitive object={scene} />;
}