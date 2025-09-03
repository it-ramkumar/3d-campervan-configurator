import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
export const ModelPreloader = (vanName) => {
  useEffect(() => {
    if (!vanName) return;
    const formattedName = vanName.replace(/\s+/g, "");
    const modelPath = `/models/AllColorGLB144/Van_${formattedName}.glb`;

    useGLTF.preload(modelPath);

  }, [vanName]);
};
