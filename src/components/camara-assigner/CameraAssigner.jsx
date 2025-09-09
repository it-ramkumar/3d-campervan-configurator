 import { useThree } from "@react-three/fiber";
 import { useEffect } from "react";
 const CameraAssigner = ({ cameraRef }) => {
    const { camera } = useThree();

    useEffect(() => {
      if (cameraRef) {
        cameraRef.current = camera;
      }
    }, [camera]);

    return null;
  };
   export default CameraAssigner
