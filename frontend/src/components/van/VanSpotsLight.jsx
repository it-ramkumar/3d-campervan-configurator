

import { useRef, useEffect } from "react";


function SpotLightCom({ position }) {
  const spotRef = useRef();
  const targetRef = useRef();


  useEffect(() => {
    if (spotRef.current && targetRef.current) {
      spotRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      <spotLight
        ref={spotRef}
        position={position}
        angle={10}
        penumbra={1}
        intensity={4}
        decay={1}
        distance={5}
        color="#d1d1cd"
        castShadow
      />

      {/* 🎯 Target positioned in front of the spotlight */}
      <object3D ref={targetRef} position={[position[0], position[1], position[2] + 2]} />

    </>
  );
}

export default SpotLightCom;
