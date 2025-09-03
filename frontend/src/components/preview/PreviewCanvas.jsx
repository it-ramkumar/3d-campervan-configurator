import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./model";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
export default function PreviewCanvas({ modelUrl }) {

  return (
   <div className="h-full w-full">
    <Canvas

       camera={{ position: [0, 2, 6], fov: 50, near: 0.1, far: 1000 }}
       dpr={[1, 1.5]}
       gl={{ alpha: true }}
       shadows
     >
       <ambientLight intensity={0.6} />
       <Environment
         files="./textures/zwartkops_straight_afternoon_1k.hdr"
         background={false}
         environmentIntensity={1.2}
       />

       <Suspense
         fallback={
           <Html fullscreen>
             <div className="w-full h-full flex items-center justify-center">
               <p className="mt-4 text-[#44444E] font-medium bg-none">
                 Good things take time — your model is on the way! Please wait a moment.
               </p>
             </div>
           </Html>
         }
       >
       <Model  url={modelUrl} />
       </Suspense>
       <OrbitControls
         enableZoom={true}
         enablePan={false}
         enableRotate={true}
         rotateSpeed={0.7}
         autoRotate={false}
       />
     </Canvas>
</div>

  );
}
