import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, Preload } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../multi-step-form/MultiStepForm";
import InteriorCameraControls from "./VanInteriorCameraControls";
import ExteriorCameraControls from "./VanExteriorCameraControl";
import SpotLightCom from "./VanSpotsLight";
import CameraAssigner from "../camara-assigner/CameraAssigner";
import ExportableScene from "../exportable-scene/ExportableScene";
import Navbar from "../../websiteComponents/components/Navbar/Navbar"
import { ArrowBigDownDash, ArrowBigUpDash, X, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { configuratorSchema } from "../../websiteComponents/schema/configuratorSchema"
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
import { useGLTF } from "@react-three/drei";
import axios from "axios";
import BaseVanModel from "./BaseVanModel";
import FullPageLoader from "../multi-step-form/FullPageLoader";

function Van() {
  const [isSanta, setIsSanta] = useState(0)
  const dispatch = useDispatch();
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const [isOpen, setIsOpen] = useState(false);
  const [activeModelId, setActiveModelId] = useState(null);
  const [sceneToExport, setSceneToExport] = useState(null);
  const [showExterior, setShowExterior] = useState(false);
  const [isIntView, setIsIntView] = useState(false);
  const [targetPos, setTargetPos] = useState([0, 0, 0]);
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const SantaMonica = vans[0]
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

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchVans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/add-base-van`);
      if (res.data.success) {
        setVans(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVans();
    if (groupRef.current) centerModelByBoundingBox(groupRef);
  }, [groupRef.current]);

  useEffect(() => {
    setTargetPos([0, 0, 0]);
  }, [isIntView]);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  useEffect(() => {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const handleContextLost = (event) => {
      event.preventDefault();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  useLeavePageConfirm("Are you sure you want to leave? Your changes will be lost.");

  function DynamicModel({ model, setActiveModelId, modelRefs }) {
    const { scene } = useGLTF(model.glbFile);

    return (
      <primitive
        object={scene}
        ref={(el) => (modelRefs.current[model.id] = el)}
        position={model.position || [0, 0, 0]}
        scale={model.scale || [1, 1, 1]}
        rotation={model.rotation || [0, 0, 0]}
        castShadow
        receiveShadow
        onClick={() => setActiveModelId(model.id)}
      />
    );
  }

  const jsonLd = configuratorSchema();

  // Mobile van selector modal
  const MobileVanSelector = () => (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col p-4 lg:hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Select Van Model</h2>
        <button
          onClick={() => setShowMobileMenu(false)}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {vans.map((van, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsSanta(idx);
              setShowMobileMenu(false);
            }}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${isSanta === idx
                ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-2xl">🚐</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{van.layout}</h3>
                <p className="text-sm text-slate-400">{van.modelYear} • {van.spec?.wheelBase}" WB</p>
                <div className="flex gap-2 mt-2 text-xs text-slate-300">
                  <span className="px-2 py-1 rounded-full bg-white/10">{van.spec?.drivetrain}</span>
                  <span className="px-2 py-1 rounded-full bg-white/10">{van.spec?.SitSleep} Seats</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <title>3D Camper Van Configurator | Design Your Own Van | Big Bear Vans</title>
      <meta name="description" content="Use our professional 3D Van Configurator to design your dream Mercedes Sprinter build. Customize layouts, colors, and features in real-time." />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {showMobileMenu && <MobileVanSelector />}

      {/* Main Container - Fixed Height */}
      <div className="h-screen w-full bg-slate-950 overflow-hidden flex flex-col lg:flex-row">

        {/* 3D Canvas Section - 50% on mobile, 66% on desktop */}
        <div className="relative h-[50vh] lg:h-full lg:w-2/3 bg-gradient-to-b from-slate-900 to-slate-950 flex-shrink-0">

          {/* Header Overlay */}
          {/* Header Overlay - FIXED */}
          <div className="absolute top-0 left-0 right-0 z-20 p-3 lg:p-4">
            <div className="flex items-center justify-between">

              {/* LEFT: Navbar - Clean without glass panel */}
              <div className="relative z-10000">
                <Navbar forceMobile={true} />
              </div>

              {/* RIGHT: Mobile Van Selector Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden glass-panel px-3 py-2 rounded-full flex items-center gap-2 text-white text-xs font-medium hover:bg-white/20 transition backdrop-blur-md"
              >
                <span>🚐</span>
                <span className="truncate max-w-[100px]">{vans[isSanta]?.layout || "Select Van"}</span>
                <ArrowBigDownDash size={14} />
              </button>
            </div>
          </div>

          {/* Desktop Van Info */}
          <div className="hidden lg:block absolute top-20 left-4 z-20 max-w-sm">
            <div
              className="glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/15"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-white flex items-center gap-2">
                    {SantaMonica?.layout}
                    <sub className="text-xs text-slate-400 font-normal">{SantaMonica?.modelYear}</sub>
                  </h1>
                  <p className="text-xs text-slate-300 mt-1">Click to view specs</p>
                </div>
                <span className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <ArrowBigDownDash size={20} />
                </span>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-white/10 mt-2 pt-4">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {vans.map((van, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSanta(idx);
                        }}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isSanta === idx
                            ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                      >
                        {van.layout}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="glass-panel rounded-lg p-2">
                      <p className="text-[10px] text-slate-400 uppercase">Wheel Base</p>
                      <p className="text-sm font-bold text-white">{SantaMonica?.spec?.wheelBase}"</p>
                    </div>
                    <div className="glass-panel rounded-lg p-2">
                      <p className="text-[10px] text-slate-400 uppercase">Drive Train</p>
                      <p className="text-sm font-bold text-white">{SantaMonica?.spec?.drivetrain}</p>
                    </div>
                    <div className="glass-panel rounded-lg p-2">
                      <p className="text-[10px] text-slate-400 uppercase">Sit & Sleep</p>
                      <p className="text-sm font-bold text-white">{SantaMonica?.spec?.SitSleep}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="w-full h-full" ref={canvasContainerRef}>
            <Canvas className="h-full w-full">
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
              <Suspense fallback={<Html fullscreen><FullPageLoader /></Html>}>
                <group ref={groupRef} position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}>
                  <Environment files="/textures/zwartkops_straight_afternoon_1k.hdr" />

                  {vans && vans.length > 0 && vans[0]?.glbFileUrl ? (
                    <BaseVanModel url={vans[0].glbFileUrl} showExterior={showExterior} />
                  ) : null}

                  {addedModels.map((model) => (
                    <DynamicModel
                      key={model._id || model.id}
                      model={model}
                      setActiveModelId={setActiveModelId}
                      modelRefs={modelRefs}
                    />
                  ))}
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

          {/* View Toggle */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 lg:bottom-8">
            <div className="glass-panel rounded-full p-1 flex gap-1">
              <button
                onClick={() => setIsIntView(false)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${!isIntView
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                Interior
              </button>
              <button
                onClick={() => setIsIntView(true)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${isIntView
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                Exterior
              </button>
            </div>
          </div>

          {/* Interior Navigation */}
          {isIntView && (
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 lg:bottom-8">
              <button
                onClick={() => cameraDirectionBack(camPros, setTargetPos)}
                className="glass-panel p-2 rounded-lg text-white hover:bg-white/20 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => interiorDirectionNext(camPros, setTargetPos)}
                className="glass-panel p-2 rounded-lg text-white hover:bg-white/20 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Configurator Panel - 50% on mobile, 33% on desktop */}
        <div className="h-[50vh] lg:h-full lg:w-1/3 bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10 flex-shrink-0 overflow-hidden">
          <MultiStepForm
            addModelToScene={(m) => addModelToScene(m, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef)}
            removeModelFromScene={(label) => removeModelFromScene(label, dispatch, addedModels)}
            getAddedQuantity={(label) => getAddedQuantity(label, addedModels)}
            toggleExterior={setShowExterior}
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            modelRefs={modelRefs}
            orbitControlsRef={orbitControlsRef}
            SantaMonica={SantaMonica}
          />
        </div>
      </div>

      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

export default Van;