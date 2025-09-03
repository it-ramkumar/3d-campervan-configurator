import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html,Preload } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";

import Van_White from "../van-model-components/VanModel";
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

  // Preload the van model
  // console.log("Preloading model:", addedModels);
  ModelPreloader(vanName);

  useLeavePageConfirm("Are you sure you want to leave? Your changes will be lost.");

  return (
<div className="flex flex-col md:flex-row h-screen md:gap-4">
  {/* Canvas Section - 50% on mobile, 75% on desktop */}
  <div className="w-full md:w-3/4 h-1/2 md:h-full relative ">
    <div className="absolute inset-0">
      <Canvas>
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
            <div className="w-full h-full flex items-center justify-center">
              <p className="mt-4 text-[#44444E] font-medium bg-none">
                Good things take time — your model is on the way!
              </p>
            </div>
          </Html>
        }
      >
        <group ref={groupRef} position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}>
            <Environment files="./textures/zwartkops_straight_afternoon_1k.hdr" />
          <Van_White showExterior={showExterior} />
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

    {/* Canvas Controls Overlay */}
    <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row items-center gap-3">
      {/* View Toggle Button */}
      <button
        onClick={() => setIsIntView(!isIntView)}
        className="bg-dark hover:shadow-md font-heading text-brand px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {isIntView ? "Exit Interior" : "Interior View"}
      </button>

      {/* Interior Navigation Buttons */}
      {isIntView && (
        <div className="flex gap-4 bg-opacity-70 p-2 rounded-md">
          <button
            onClick={() => cameraDirectionBack(camPros, setTargetPos)}
            className="bg-dark hover:bg-brand hover:text-dark text-brand p-2 rounded-md transition-colors"
            aria-label="Previous view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => interiorDirectionNext(camPros, setTargetPos)}
            className="bg-dark hover:bg-brand hover:text-dark text-brand p-2 rounded-md transition-colors"
            aria-label="Next view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>

    {/* Title Overlay */}
    <div className="absolute top-4 left-4 font-heading bg-dark bg-opacity-70 text-brand px-4 py-2 rounded-md">
      <h2 className="text-lg font-semibold">Van Customizer</h2>
    </div>
  </div>

  {/* Cards Section - 50% on mobile, 25% on desktop */}
  <div className="w-full md:w-1/4 h-1/2 md:h-full overflow-hidden">
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
