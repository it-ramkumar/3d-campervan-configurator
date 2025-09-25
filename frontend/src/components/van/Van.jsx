import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, Preload } from "@react-three/drei";
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
 const [isOpen, setIsOpen] = useState(true);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-2 md:gap-0 lg:gap-2 h-screen overflow-auto bg-brand color-scroll">


      {/* Canvas Section - 50% on mobile, 75% on desktop */}
      <div className="canvas-parent md:col-span-8" >
        <div className="meta-data bg-brand shadow-xl  p-2 relative">
  {/* Toggle Button */}
  <div
    className="flex justify-between  cursor-pointer"
    onClick={() => setIsOpen(!isOpen)}
  >
    <h1 className="text-sm font-bold text-dark">
      See More Information
    </h1>

    <span className="text-dark">
      {isOpen ? "▲" : "▼"}
    </span>
  </div>

  {/* Accordion Overlay Content */}
  {isOpen && (
    <div className="absolute top-full left-0 w-full bg-white shadow-xl p-2 border z-50">
      <div className="heading-button md:flex md:justify-between">
        <div>
          <h1 className="text-3xl text-dark">
            Mercedes-Benz Sprinter{" "}
            <sub className="text-gray-500 text-xs">2022</sub>
          </h1>
          <p className="text-sm">
            Starting: <span>$20,323,342</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-full flex bg-brand mt-3 md:mt-0">
            <button className="px-4 py-2 text-xs rounded-full bg-white shadow-sm text-dark transition">
              Mercedes-Benz Sprinter 2022
            </button>
            <button className="px-4 py-2 text-xs rounded-full text-dark hover:text-gray-900 transition">
              Mercedes-Benz Sprinter 2025
            </button>
          </div>

          <div>
            <table className="w-full border bg-dark text-brand rounded-lg overflow-hidden text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2">Wheel Base</th>
                  <th className="px-2 py-2">Drive Train</th>
                  <th className="px-2 py-2">Sit & Sleep</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="px-2 py-2">144</td>
                  <td className="px-2 py-2">AWD</td>
                  <td className="px-2 py-2">2–5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )}
</div>



        <div className="canvas bg-white relative h-[30vh] lg:h-[93vh] ">
          <div className="w-fulll h-full">
            <Canvas className="h-screen">
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


              <Preload all />
              <Suspense
                fallback={
                 <Html fullscreen>
      <div className="flex flex-col justify-center items-center h-full gap-4">
        {/* 3D Cube Icon */}
        <svg xmlns="http://www.w3.org/2000/svg"
             className="h-12 w-12 animate-spin text-gray-700"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0
                   001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>

        {/* Loading Text */}
        <p className="text-gray-800 font-medium text-center">
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
 <div className="absolute top-1 left-3/8  gap-3">
      {/* View Toggle Button */}
    <div className="flex bg-brand  rounded-full">
  {/* Interior View Button */}
  <button
    onClick={() => setIsIntView(false)}
    className={`px-4 py-1 rounded-full flex items-center gap-2 text-sm transition-colors
      ${!isIntView ? "bg-white text-dark" : ""}`}
  >

    Interior
  </button>

  {/* Exit Interior Button */}
  <button
    onClick={() => setIsIntView(true)}
    className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm  transition-colors
      ${isIntView ? "bg-white text-dark" : ""}`}
  >

    Exterior
  </button>
</div>


      {/* Interior Navigation Buttons */}

    </div>
 {isIntView && (
        <div className=" absolute gap-4 bg-opacity-70 p-2 bottom-5 flex flex-col right-0 rounded-md">
          <button
            onClick={() => cameraDirectionBack(camPros, setTargetPos)}
            className="bg-white hover:bg-brand hover:text-dark text-dark p-2 rounded-md transition-colors"
            aria-label="Previous view"
          >
          <svg xmlns="http://www.w3.org/2000/svg"
     class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 4c.55 0 1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1h-6v6c0 .55-.45 1-1
           1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1z"/>
</svg>
          </button>
          <button
            onClick={() => interiorDirectionNext(camPros, setTargetPos)}
            className="bg-white hover:bg-brand hover:text-dark text-dark p-2 rounded-md transition-colors"
            aria-label="Next view"
          >
          <svg xmlns="http://www.w3.org/2000/svg"
     class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20 12H4" />
</svg>

          </button>
        </div>
      )}
        </div>

        {/* Canvas Controls Overlay */}

      </div>

      {/* Cards Section - 50% on mobile, 25% on desktop */}
      <div className="card-section col-span-4 p-2 bg-white shadow-md ">
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
