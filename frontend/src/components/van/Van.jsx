"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, Preload } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../multi-step-form/MultiStepForm";
import InteriorCameraControls from "./VanInteriorCameraControls";
import ExteriorCameraControls from "./VanExteriorCameraControl";
import SpotLightCom from "./VanSpotsLight";
import CameraAssigner from "../camara-assigner/CameraAssigner";
import Navbar from "../Navbar/Navbar";
import { ArrowBigDownDash, X, ChevronLeft, ChevronRight } from "lucide-react"
import {
  addModelToScene,
} from "../../CustomHooks/addSceneToModel";
import {
  getAddedQuantity,
} from "../../CustomHooks/addQuantityToModel";
import {
  removeModelFromScene,
} from "../../CustomHooks/removeModelFromScene";
import { centerModelByBoundingBox } from "../../CustomHooks/centerCanvas";
import { cameraDirectionBack } from "../../CustomHooks/interiorDirectionBack";
import { interiorDirectionNext } from "../../CustomHooks/interiorDirectionNext";
import { useLeavePageConfirm } from "../../CustomHooks/useLeavePageConfirm";
import { useGLTF } from "@react-three/drei";
import axios from "axios";
import BaseVanModel from "./BaseVanModel";
import Loader from "../../components/Loader/Loader"
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

  const API_URL = process.env.NEXT_PUBLIC_URL;

  const fetchVans = async () => {
    try {
      const res = await axios.get(`${API_URL}/add-base-van`);
      if (res.data.success) {
        setVans(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
    } finally {
    }
  };
  // Force rerender for BaseVanModel when URL changes
  const [modelKey, setModelKey] = useState(0);
  const currentVanUrl = vans && vans.length > 0 ? vans[isSanta]?.glbFileUrl || vans[0]?.glbFileUrl : null;

  useEffect(() => {
    if (currentVanUrl) setModelKey(prev => prev + 1);
  }, [currentVanUrl]);
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




  // Mobile van selector modal
  const MobileVanSelector = () => (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col p-4 lg:hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Select Van Model</h2>
        <button
          onClick={() => setShowMobileMenu(false)}
          className="p-2 rounded-full bg-black/10 text-black hover:bg-black/20 transition"
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
              ? "border-black bg-black/5 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
              : "border-black/10 bg-white hover:border-black/30"
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center">
                <span className="text-2xl">🚐</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">{van.layout}</h3>
                <p className="text-sm text-gray-600">{van.modelYear} • {van.spec?.wheelBase}" WB</p>
                <div className="flex gap-2 mt-2 text-xs text-gray-700">
                  <span className="px-2 py-1 rounded-full bg-black/5">{van.spec?.drivetrain}</span>
                  <span className="px-2 py-1 rounded-full bg-black/5">{van.spec?.SitSleep} Seats</span>
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

      {showMobileMenu && <MobileVanSelector />}

      {/* Main Container */}
      <div className="h-screen w-full bg-white overflow-hidden flex flex-col lg:flex-row">

        {/* 3D Canvas Section */}
        <div className="relative h-[50vh] lg:h-full lg:w-2/3 bg-gradient-to-b from-gray-100 to-white flex-shrink-0">
          {/* FIXED HEADER - Navbar and Van Selector */}
          {!showMobileMenu && (
            <div className="absolute top-0 left-0 right-0 z-[9999] p-3 lg:p-4 pointer-events-none">
              <div className="flex items-center justify-between pointer-events-auto">

                {/* LEFT: Navbar */}
                <div className="relative z-[9999]">
                  <Navbar forceMobile={true} />
                </div>

                {/* RIGHT: Mobile Van Selector Button - Ab menu khulne par hide ho jayega */}
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="lg:hidden bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-2xl z-50 transition-transform active:scale-95"
                >
                  <span>🚐</span>
                  <span className="truncate max-w-[100px]">{vans[isSanta]?.layout || "Select Van"}</span>
                  <ArrowBigDownDash size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          )}


          {/* Desktop Van Info - Bottom Left */}
          <div className="hidden lg:block absolute bottom-8 left-4 z-40 w-full max-w-[320px]">
            <div
              className="glass-panel-light rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:bg-black/5 shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Compact View */}
              <div className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">🚐</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-primary leading-tight">
                      {vans[isSanta]?.layout || "Loading..."}
                    </h1>
                    <p className="text-xs text-gray-500">
                       {vans[isSanta]?.spec?.wheelBase}" WB
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isOpen ? "bg-primary text-secondary rotate-180" : "bg-primary/10 text-primary"}`}>
                  <ArrowBigDownDash size={18} />
                </div>
              </div>

              {/* Expanded View - With Tailwind Custom Scroll */}
              {isOpen && (
                <div className="px-3 pb-3 border-t border-primary/10 pt-3">
                  <p className="text-[9px] font-black text-primary/70 uppercase tracking-widest mb-2 ml-1">Select Model</p>

                  {/* Horizontal Scroll Container */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-3 flex-nowrap custom-scrollbar">
                    {vans?.map((van, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSanta(idx);
                        }}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${isSanta === idx
                          ? "bg-primary text-secondary  border-primary shadow-md"
                          : "bg-secondary text-primary border-primary hover:border-black/20"
                          }`}
                      >
                        {van?.layout}
                      </button>
                    ))}
                  </div>

                  {/* Specs Table (Grid) */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-primary bg-secondary rounded-lg p-2 text-center border border-black/5">
                      <p className="text-[8px] text-primary/70 uppercase font-bold mb-1">Wheelbase</p>
                      <p className="text-[10px] font-black text-primary">{vans[isSanta]?.spec?.wheelBase}"</p>
                    </div>
                    <div className="bg-primary bg-secondary rounded-lg p-2 text-center border border-black/5">
                      <p className="text-[8px] text-primary/70 uppercase font-bold mb-1">Drivetrain</p>
                      <p className="text-[10px] font-black text-primary">{vans[isSanta]?.spec?.drivetrain}</p>
                    </div>
                    <div className="bg-primary bg-secondary rounded-lg p-2 text-center border border-black/5">
                      <p className="text-[8px] text-primary/70 uppercase font-bold mb-1">Capacity</p>
                      <p className="text-[10px] font-black text-primary">{vans[isSanta]?.spec?.SitSleep} S</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-[8px] text-black/20 uppercase font-black tracking-[0.3em]">
                      Official Big Bear Vans Configuration
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 3D Canvas */}

          <div className="w-full h-full" ref={canvasContainerRef}>
            <Canvas className="h-full w-full">
              <CameraAssigner cameraRef={cameraRef} />

              {/* Lights */}
              {isIntView ? (
                <>
                  {/* <SpotLightCom position={[0.6, -0.1, 1.1]} /> */}
                  {/* <SpotLightCom position={[0, -0.1, 1.1]} />
                  <SpotLightCom position={[-0.6, 0.3, 1.1]} /> */}
                </>
              ) : (
                <ambientLight intensity={0.25} />
              )}

              <Preload all />

              {/* Suspense wrapper */}
              <Suspense
                fallback={
                  <Html fullscreen>
                    <Loader />
                  </Html>
                }
              >
                <group
                  ref={groupRef}
                  position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}
                  onAfterRender={() => setLoading(false)}
                >
                  {/* HDR Environment */}
                  <Environment
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_straight_afternoon_1k.hdr"
                    background={false}
                  />

                  {/* Base Van Model */}
                  {currentVanUrl && (
                    <BaseVanModel
                      key={modelKey}
                      url={currentVanUrl}
                      showExterior={showExterior}
                    />
                  )}

                  {/* Additional dynamic models */}
                  {addedModels?.map((model) => (
                    <DynamicModel
                      key={model?._id || model?.id}
                      model={model}
                      setActiveModelId={() => { }}
                      modelRefs={modelRefs}
                    />
                  ))}
                </group>
              </Suspense>

              {/* Camera Controls */}
              {isIntView ? (
                <InteriorCameraControls camPros={camPros} targetPos={targetPos} />
              ) : (
                <ExteriorCameraControls
                  cameraRef={cameraRef}
                  orbitControlsRef={orbitControlsRef}
                />
              )}
            </Canvas>

            {/* Optional: Overlay loader if Suspense hides too soon */}
            {loading && (
              <Loader />
            )}
          </div>

          {/* View Toggle - Lower z-index */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2  lg:bottom-8">
            <div className="glass-panel-light rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setIsIntView(false)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${!isIntView
                  ? "bg-primary text-secondary shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                  : "text-primary/70 hover:text-primary"
                  }`}
              >

                Exterior
              </button>
              <button
                onClick={() => setIsIntView(true)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${isIntView
                  ? "bg-primary text-secondary shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                  : "text-primary/70 hover:text-primary"
                  }`}
              >
                Interior
              </button>
            </div>
          </div>

          {/* Interior Navigation - Lower z-index */}
          {isIntView && (
            <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2 lg:bottom-8">
              <button
                onClick={() => cameraDirectionBack(camPros, setTargetPos)}
                className="glass-panel-light p-2 rounded-lg text-black hover:bg-black/10 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => interiorDirectionNext(camPros, setTargetPos)}
                className="glass-panel-light p-2 rounded-lg text-black hover:bg-black/10 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Configurator Panel */}
        <div className="h-[50vh] lg:h-full lg:w-1/3 bg-white border-t lg:border-t-0 lg:border-l border-black/10 flex-shrink-0 overflow-hidden relative z-20">
          <MultiStepForm
            addModelToScene={(m) => addModelToScene(m, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef)}
            removeModelFromScene={(label) => removeModelFromScene(label, dispatch, addedModels)}
            getAddedQuantity={(label) => getAddedQuantity(label, addedModels)}
            toggleExterior={setShowExterior}
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            modelRefs={modelRefs}
            orbitControlsRef={orbitControlsRef}
            BaseVan={vans[isSanta]} // Pass the selected van's data
          />
        </div>
      </div>

      <style>{`
        .glass-panel-light {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}

export default Van;