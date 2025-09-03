import { useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
const ExteriorCameraControls = ({cameraRef, orbitControlsRef}) => {
const { camera } = useThree();
    useEffect(() => {

  }, [camera,cameraRef]);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[-4, 3, -4.8]}
            />
           {cameraRef.current && (
  <OrbitControls
    ref={orbitControlsRef}
    args={[cameraRef.current]}
    enableRotate={true}
    enableZoom={true}
    enablePan={false}
    maxPolarAngle={Math.PI / 2}
    minPolarAngle={0}
  />
)}

        </>
    );
};

export default ExteriorCameraControls;