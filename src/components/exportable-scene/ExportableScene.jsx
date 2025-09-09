import { useImperativeHandle, useEffect, forwardRef } from "react";
import { useThree } from "@react-three/fiber";

const ExportableScene = forwardRef(({ exportSceneCallback }, ref) => {
  const { scene } = useThree();

  useEffect(() => {
    exportSceneCallback(scene);
  }, [scene, exportSceneCallback]);

  useImperativeHandle(ref, () => ({
    getScene: () => scene,
  }));

  return null;
});

ExportableScene.displayName = "ExportableScene";

export default ExportableScene;
