import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect,useState } from "react";

const InteriorCameraControls = ({ camPros, targetPos }) => {
  const controlsRef = useRef();
   const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
  }, [isDragging]);
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...targetPos);
      controlsRef.current.update();
    }
  }, [camPros, targetPos]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={80}
        position={camPros}
        near={0.1}
        far={10}
      />
    <OrbitControls
  ref={controlsRef}
  rotateSpeed={0.5}
  enableZoom={false}
  enablePan={true}
  minPolarAngle={Math.PI / 5}
  maxPolarAngle={Math.PI / 1.5}
  minAzimuthAngle={-Infinity}
  maxAzimuthAngle={Infinity}
  enableDamping={false} // turn off animation
/>

    </>
  );
};

export default InteriorCameraControls;
