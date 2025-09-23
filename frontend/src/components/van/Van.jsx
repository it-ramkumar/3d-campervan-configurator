import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html,Preload } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
// import Van_White from "../van-model-components/VanModel";
import { vans } from "../../ModelData";
import MultiStepForm from "../multi-step-form/MultiStepForm";
import InteriorCameraControls from "./VanInteriorCameraControls";
import ExteriorCameraControls from "./VanExteriorCameraControl";
import SpotLightCom from "./VanSpotsLight";
import CameraAssigner from "../camara-assigner/CameraAssigner";
import ExportableScene from "../exportable-scene/ExportableScene";

import {
  addModelToScene,
} from "../../customeHooks/addSceneToModel";
import {
  getAddedQuantity,
} from "../../customeHooks/addQuantityToModel";
import {
  removeModelFromScene,
} from "../../customeHooks/removeModelFromScene";
import { centerModelByBoundingBox } from "../../customeHooks/centerCanvas";
import { cameraDirectionBack } from "../../customeHooks/interiorDirectionBack";
import { interiorDirectionNext } from "../../customeHooks/interiorDirectionNext";
import { useLeavePageConfirm } from "../../customeHooks/useLeavePageConfirm";
import { ModelPreloader } from "../model-preloader/ModelPreloader";

function Van() {
  const Santa = vans[0].component
    const dispatch = useDispatch();
  const vanName = useSelector((state) => state.vanName.vanName);
  const addedModels = useSelector((state) => state.addedModels.addedModels);

  const [activeModelId, setActiveModelId] = useState(null);
  const [sceneToExport, setSceneToExport] = useState(null);
  const [showExterior, setShowExterior] = useState(false);
  const [isIntView, setIsIntView] = useState(false);
  const [targetPos, setTargetPos] = useState([0, 0, 0]);
  const CAMERA_OFFSET = 0.2;

  const orbitControlsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const modelRefs = useRef({});
  const groupRef = useRef();
  const canvasContainerRef = useRef();

  const camPros = [
    targetPos[0],
    targetPos[1],
    targetPos[2] + CAMERA_OFFSET,
  ];

  // Center model whenever groupRef changes
  useEffect(() => {
    if (groupRef.current) centerModelByBoundingBox(groupRef);
  }, [groupRef.current]);

  // Reset targetPos when interior view toggles
  useEffect(() => {
    setTargetPos([0, 0, 0]);
  }, [isIntView]);

  // Cleanup for exported scene
  useEffect(() => {
    return () => {
      sceneToExport?.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, [sceneToExport]);

  // Prevent scrolling while viewing the van
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  // WebGL context lost handler
  useEffect(() => {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost!", canvas);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);


  ModelPreloader(vanName);

  useLeavePageConfirm("Are you sure you want to leave? Your changes will be lost.");

  return (
<div className=" grid md:grid-cols-12 gap-5">
  {/* Canvas Section - 50% on mobile, 75% on desktop */}
  <div className="canvas-parent md:md:col-span-8 ">
<div className="meta-data bg-white shadow-lg rounded-xl p-4 flex  justify-between ">
  {/* Left Section */}
  <div className="">
    <img src="/logobbv.jpg" alt="logo" className="w-15 h-15 rounded-lg " />
    <div>
      <h1 className="text-3xl mt-8  text-gray-800">
        Mercedes-Benz Sprinter <sub className="text-gray-500 text-xs">2022</sub>
      </h1>

      <p className="text-sm  ">
        Starting: <span className="">$20,323,342</span>
      </p>
    </div>
  </div>

  {/* Right Section */}
  <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
    <h1 className="text-lg md:text-xl font-bold text-gray-900 text-right">
      Van Customizer
    </h1>

    {/* Tab-like buttons */}
    <div className="flex bg-gray-200 rounded-full ">
      <button className="px-4 py-2 text-xs  rounded-full bg-white shadow-sm text-gray-800 transition">
        Mercedes-Benz Sprinter 2022
      </button>
      <button className="px-4 py-2 text-xs rounded-full text-gray-600 hover:text-gray-900 transition">
        Mercedes-Benz Sprinter 2025
      </button>
    </div>

    {/* Table */}
    <table className="w-full border bg-black text-white rounded-lg overflow-hidden text-sm">
      <thead className="text-white">
        <tr>
          <th className="px-2 py-2">Wheel Base</th>
          <th className="px-2 py-2">Drive Train</th>
          <th className="px-2 py-2">Sit & Sleep</th>
        </tr>
      </thead>
      <tbody className="">
        <tr className="text-center">
          <td className="px-2 py-2">144</td>
          <td className="px-2 py-2">AWD</td>
          <td className="px-2 py-2">2–5</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


    <div className="canvas">
      <div className="h-[600px]">
      <Canvas className="h-full">
        <CameraAssigner cameraRef={cameraRef} />

        {isIntView ? (
          <>
            <SpotLightCom position={[0.6, -0.1, 1.1]} />
            <SpotLightCom position={[0, -0.1, 1.1]} />
            <SpotLightCom position={[-0.6, 0.3, 1.1]} />
          </>
        ) : (
          <ambientLight intensity={0.25} />
        )}
{/*
        <Suspense fallback={null}>

        </Suspense> */}

        <Preload all />
 <Suspense
        fallback={
          <Html fullscreen>
            <div >
              <p >
                Good things take time — your model is on the way!
              </p>
            </div>
          </Html>
        }
      >
        <group ref={groupRef} position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}>
            <Environment files="./textures/zwartkops_straight_afternoon_1k.hdr" />
          <Santa showExterior={showExterior} />
          {addedModels.map((model) => {
            const ModelComponent = model?.component;
            if (!ModelComponent) return null;
            return (
              <group key={model.id || model.label} ref={(el) => modelRefs.current[model.id] = el} position={model.position}>
                <ModelComponent
                  castShadow
                  receiveShadow
                  scale={model.scale}
                  rotation={model.rotation}
                  onClick={() => setActiveModelId(model.id)}
                />
              </group>
            );
          })}
        </group>
</Suspense>
        {isIntView ? (
          <InteriorCameraControls camPros={camPros} targetPos={targetPos} />
        ) : (
          <ExteriorCameraControls cameraRef={cameraRef} orbitControlsRef={orbitControlsRef} />
        )}

        <ExportableScene ref={sceneRef} exportSceneCallback={setSceneToExport} />
      </Canvas>
         </div>
      <div className="camera-button bg-purple ">
      {/* View Toggle Button */}
      <button
        onClick={() => setIsIntView(!isIntView)}

      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {isIntView ? "Exit Interior" : "Interior View"}
      </button>

      {/* Interior Navigation Buttons */}
      {isIntView && (
        <div >
          <button
            onClick={() => cameraDirectionBack(camPros, setTargetPos)}

          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => interiorDirectionNext(camPros, setTargetPos)}

          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
    </div>

    {/* Canvas Controls Overlay */}

  </div>

  {/* Cards Section - 50% on mobile, 25% on desktop */}
  <div className="card-section md:col-span-4">
    <MultiStepForm
      addModelToScene={(m) =>
        addModelToScene(m, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef)
      }
      removeModelFromScene={(label) => removeModelFromScene(label, dispatch, addedModels)}
      getAddedQuantity={(label) => getAddedQuantity(label, addedModels)}
      toggleExterior={setShowExterior}
      sceneRef={sceneRef}
      cameraRef={cameraRef}
      modelRefs={modelRefs}
      orbitControlsRef={orbitControlsRef}
    />
  </div>
</div>



  );
}

export default Van;
