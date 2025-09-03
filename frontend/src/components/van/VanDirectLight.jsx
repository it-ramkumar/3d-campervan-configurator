import { useRef, useEffect } from "react";


export default function DirectionalLightCom({
  position ,        // Sunlight position
  targetPos,       // Where the light points
  color,            // Soft white sunlight
  intensity,
  geo
}) {
  const lightRef = useRef();
  const targetRef = useRef();



  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      {/* ☀️ Directional Light */}
     <directionalLight
  ref={lightRef}
  position={position}
  intensity={intensity}
  color={color}
  castShadow
  shadow-mapSize-width={2048}     // ⬅️ Higher resolution
  shadow-mapSize-height={2048}
  shadow-camera-far={15}
  shadow-camera-left={-5}         // ⬅️ Wider bounds
  shadow-camera-right={5}
  shadow-camera-top={5}
  shadow-camera-bottom={-5}
  shadow-bias={-0.004}            // ⬅️ Prevents shadow artifacts/lines
/>


      {/* 🎯 Target the light aims at */}
      <object3D ref={targetRef} position={targetPos} />


    </>
  );
}
