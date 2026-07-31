"use client";
import React, { useEffect, useState, useRef, Suspense, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
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

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

const WebGLBlockedFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-8 text-center">
    <div
      className="rounded-2xl p-6 max-w-sm w-full"
      style={{ background: "rgba(237,152,95,0.08)", border: "1px solid rgba(237,152,95,0.25)" }}
    >
      <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#ED985F] font-semibold mb-2">GPU Unavailable</p>
      <h2 className="font-display text-lg font-bold text-[#FBFBF9] mb-3">3D view is blocked</h2>
      <p className="font-ui text-[11px] text-[#FBFBF9]/50 leading-relaxed mb-4">
        Chrome has disabled hardware acceleration for this session. Restart your browser to restore it.
      </p>
      <div
        className="rounded-xl p-3 text-left"
        style={{ background: "rgba(2,12,24,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-[#FBFBF9]/30 mb-2">Quick fix</p>
        <ol className="font-ui text-[10px] text-[#FBFBF9]/55 space-y-1 list-decimal list-inside leading-relaxed">
          <li>Close all Chrome windows completely</li>
          <li>Reopen Chrome and return here</li>
          <li>If it persists → <span className="text-[#ED985F]">chrome://flags/#ignore-gpu-blocklist</span> → Enable</li>
        </ol>
      </div>
    </div>
  </div>
);

const STUDIO_BG = "radial-gradient(ellipse 80% 65% at 50% 58%, #0D2647 0%, #071423 55%, #020C18 100%)"

function DynamicModel({ model, modelRefs }) {
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
    />
  );
}

const FLOOR_PULSES = 7;

function AnimatedFloor() {
  const pulseRefs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t + i / FLOOR_PULSES) % 1;
      const s = 0.8 + phase * 5;
      mesh.scale.set(s, s, s);
      mesh.material.opacity = 0.15 * Math.sin(phase * Math.PI);
    });
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Static concentric rings — subtle base grid */}
      {[1.5, 2.5, 3.5, 4.5, 5.5].map((r) => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.008, r, 96]} />
          <meshBasicMaterial
            color="#ED985F"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
      {/* Animated ripple pulse rings */}
      {Array.from({ length: FLOOR_PULSES }).map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <ringGeometry args={[0.92, 1, 96]} />
          <meshBasicMaterial
            color="#ED985F"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Van() {
  const [isSanta, setIsSanta] = useState(0)
  const [webGLAvailable, setWebGLAvailable] = useState(true);
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
    setWebGLAvailable(isWebGLAvailable());
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
    const handleContextLost = (event) => { event.preventDefault(); };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () => { canvas.removeEventListener("webglcontextlost", handleContextLost); };
  }, []);

  useLeavePageConfirm("Are you sure you want to leave? Your changes will be lost.");

  // ─────────────────────────────────────────────
  const MobileVanSelector = () => (
    <div
      className="fixed inset-0 z-[9999] flex flex-col p-4 lg:hidden"
      style={{ background: "#020C18" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ED985F]" />

      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-[#ED985F] font-semibold mb-1">
            Studio
          </p>
          <h2 className="font-display text-2xl font-bold text-[#FBFBF9]">Select Model</h2>
        </div>
        <button
          onClick={() => setShowMobileMenu(false)}
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#FBFBF9]/50 hover:text-[#001F3D] hover:bg-[#ED985F] transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {vans.map((van, idx) => (
          <button
            key={idx}
            onClick={() => { setIsSanta(idx); setShowMobileMenu(false); }}
            className="w-full text-left rounded-xl py-3.5 px-4 transition-all duration-200 flex items-center gap-4"
            style={
              isSanta === idx
                ? {
                    background: "#FBFBF9",
                    border: "1px solid rgba(237,152,95,0.35)",
                    boxShadow: "0 0 24px rgba(237,152,95,0.14)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }
            }
          >
            <span
              className={`font-ui text-[10px] font-bold shrink-0 w-5 ${
                isSanta === idx ? "text-[#ED985F]" : "text-[#FBFBF9]/20"
              }`}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className={`font-ui text-sm font-semibold uppercase tracking-[0.12em] truncate ${
                isSanta === idx ? "text-[#001F3D]" : "text-[#FBFBF9]/70"
              }`}>{van.layout}</h3>
              <p className={`font-ui text-[10px] mt-0.5 ${
                isSanta === idx ? "text-[#001F3D]/50" : "text-[#FBFBF9]/30"
              }`}>
                {van.modelYear} · {van.spec?.wheelBase}" WB · {van.spec?.drivetrain}
              </p>
            </div>
            {isSanta === idx && (
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ED985F]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {showMobileMenu && <MobileVanSelector />}

      {/* Main Container — dark studio */}
      <div className="h-screen w-full overflow-hidden flex flex-col lg:flex-row" style={{ background: "#020C18" }}>

        {/* ── 3D Canvas Section ── */}
        <div
          className="relative h-[52vh] lg:h-full lg:w-2/3 flex-shrink-0 overflow-hidden"
          style={{ background: STUDIO_BG }}
        >
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(251,251,249,0.035) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Floor ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
            style={{
              width: "80%",
              height: "200px",
              background: "radial-gradient(ellipse, rgba(237,152,95,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Orange top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ED985F] z-30" />

          {/* FIXED HEADER — Navbar + mobile van selector trigger */}
          {!showMobileMenu && (
            <div className="absolute top-0 left-0 right-0 z-[9999] pt-3 px-3 lg:pt-4 lg:px-4 pointer-events-none">
              <div className="flex items-center justify-between pointer-events-auto">
                {/* Navbar */}
                <div className="relative z-[9999]">
                  <Navbar forceMobile={true} />
                </div>

                {/* Mobile: van picker trigger */}
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-widest transition-all active:scale-95"
                  style={{
                    background: "rgba(2,12,24,0.72)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(237,152,95,0.25)",
                    color: "#FBFBF9",
                  }}
                >
                  <span className="text-[#ED985F]">◈</span>
                  <span className="truncate max-w-[100px]">{vans[isSanta]?.layout || "Select Van"}</span>
                  <ArrowBigDownDash size={12} strokeWidth={2.5} className="text-[#ED985F]" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Van Info — Bottom Left */}
          <div className="hidden lg:block absolute bottom-8 left-4 z-40 w-full max-w-[300px]">
            <div
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(2,12,24,0.72)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Compact header row */}
              <div className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(237,152,95,0.12)", border: "1px solid rgba(237,152,95,0.2)" }}
                  >
                    <span className="text-base">🚐</span>
                  </div>
                  <div>
                    <p className="font-ui text-[8px] uppercase tracking-[0.25em] text-[#ED985F] font-semibold mb-0.5">
                      Active Build
                    </p>
                    <h1 className="font-display text-base font-bold text-[#FBFBF9] leading-none tracking-wide">
                      {vans[isSanta]?.layout || "3D Camper Van Configurator"}
                    </h1>
                    <p className="font-ui text-[9px] text-[#FBFBF9]/35 mt-0.5">
                      {vans[isSanta]?.spec?.wheelBase}" WB
                    </p>
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
                    isOpen ? "bg-[#ED985F] text-white rotate-180" : "text-[#FBFBF9]/40"
                  }`}
                  style={!isOpen ? { border: "1px solid rgba(255,255,255,0.1)" } : {}}
                >
                  <ArrowBigDownDash size={14} />
                </div>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div className="px-3 pb-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-ui text-[8px] uppercase tracking-[0.3em] text-[#FBFBF9]/25 font-semibold mt-3 mb-2">
                    Select Model
                  </p>

                  {/* Horizontal model pills */}
                  <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2 flex-nowrap van-scrollbar">
                    {vans?.map((van, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setIsSanta(idx); }}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg font-ui text-[9px] font-semibold uppercase tracking-wider transition-all duration-200"
                        style={
                          isSanta === idx
                            ? { background: "#FBFBF9", color: "#001F3D", border: "1px solid rgba(237,152,95,0.35)" }
                            : {
                                background: "rgba(255,255,255,0.05)",
                                color: "rgba(251,251,249,0.5)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }
                        }
                      >
                        {van?.layout}
                      </button>
                    ))}
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "Wheelbase", val: `${vans[isSanta]?.spec?.wheelBase}"` },
                      { label: "Drive", val: vans[isSanta]?.spec?.drivetrain },
                      { label: "Capacity", val: `${vans[isSanta]?.spec?.SitSleep} S` },
                    ].map(({ label, val }) => (
                      <div
                        key={label}
                        className="rounded-lg p-2 text-center"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <p className="font-ui text-[7px] uppercase tracking-wider text-[#FBFBF9]/30 font-semibold mb-0.5">{label}</p>
                        <p className="font-ui text-[10px] font-bold text-[#ED985F]">{val}</p>
                      </div>
                    ))}
                  </div>

                  <p className="font-ui text-[7px] uppercase tracking-[0.3em] text-[#FBFBF9]/15 text-center mt-3">
                    Big Bear Vans Configurator
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* View mode indicator — desktop top right */}
          <div
            className="absolute top-14 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: "rgba(2,12,24,0.65)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isIntView ? "bg-[#ED985F] animate-pulse" : "bg-[#FBFBF9]/25"
              }`}
            />
            <span className="font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FBFBF9]/50">
              {isIntView ? "Interior" : "Exterior"}
            </span>
          </div>

          {/* 3D Canvas */}
          <div className="w-full h-full" ref={canvasContainerRef}>
            {!webGLAvailable ? (
              <WebGLBlockedFallback />
            ) : (
            <CanvasErrorBoundary fallback={<WebGLBlockedFallback />}>
            <Canvas
              className="h-full w-full"
              gl={{ powerPreference: "high-performance", antialias: true, preserveDrawingBuffer: false }}
            >
              {/* Fix canvas background — no white flash */}
              <color attach="background" args={["#020C18"]} />

              <CameraAssigner cameraRef={cameraRef} />

              {!isIntView && <ambientLight intensity={0.25} />}

              <Preload all />

              <Suspense
                fallback={
                  <Html center>
                    <div
                      style={{
                        background: "rgba(2,12,24,0.92)",
                        border: "1px solid rgba(237,152,95,0.3)",
                        borderRadius: "12px",
                        padding: "14px 22px",
                        color: "#FBFBF9",
                        fontFamily: "sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Loading Experience
                    </div>
                  </Html>
                }
              >
                <group
                  ref={groupRef}
                  position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}
                  onAfterRender={() => setLoading(false)}
                >
                  <Environment
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_straight_afternoon_1k.hdr"
                    background={false}
                  />

                  <AnimatedFloor />

                  {currentVanUrl && (
                    <BaseVanModel
                      key={modelKey}
                      url={currentVanUrl}
                      showExterior={showExterior}
                    />
                  )}

                  {addedModels?.map((model) => (
                    <DynamicModel
                      key={model?._id || model?.id}
                      model={model}
                      modelRefs={modelRefs}
                    />
                  ))}
                </group>
              </Suspense>

              {isIntView ? (
                <InteriorCameraControls camPros={camPros} targetPos={targetPos} />
              ) : (
                <ExteriorCameraControls
                  cameraRef={cameraRef}
                  orbitControlsRef={orbitControlsRef}
                />
              )}
            </Canvas>
            </CanvasErrorBoundary>
            )}

            {loading && webGLAvailable && <Loader />}
          </div>

          {/* View toggle — Exterior / Interior */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 lg:bottom-8">
            <div
              className="p-1 flex gap-1 rounded-xl"
              style={{
                background: "rgba(2,12,24,0.72)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => setIsIntView(false)}
                className="px-4 py-2 rounded-lg font-ui text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200"
                style={
                  !isIntView
                    ? { background: "#FBFBF9", color: "#001F3D" }
                    : { color: "rgba(251,251,249,0.4)" }
                }
              >
                Exterior
              </button>
              <button
                onClick={() => setIsIntView(true)}
                className="px-4 py-2 rounded-lg font-ui text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200"
                style={
                  isIntView
                    ? { background: "#ED985F", color: "#fff" }
                    : { color: "rgba(251,251,249,0.4)" }
                }
              >
                Interior
              </button>
            </div>
          </div>

          {/* Interior navigation arrows */}
          {isIntView && (
            <div className="absolute bottom-5 right-4 z-30 flex flex-col gap-2 lg:bottom-8">
              <button
                onClick={() => cameraDirectionBack(camPros, setTargetPos)}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 text-[#FBFBF9]/60 hover:text-[#FBFBF9] hover:bg-white/10"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => interiorDirectionNext(camPros, setTargetPos)}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 text-[#FBFBF9]/60 hover:text-[#FBFBF9] hover:bg-white/10"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ── Configurator Panel ── */}
        <div
          className="h-[48vh] lg:h-full lg:w-1/3 flex-shrink-0 overflow-hidden relative z-20"
          style={{
            background: "#001F3D",
            borderTop: "2px solid #ED985F",
          }}
        >
          <MultiStepForm
            addModelToScene={(m) => addModelToScene(m, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef)}
            removeModelFromScene={(label) => removeModelFromScene(label, dispatch, addedModels)}
            getAddedQuantity={(label) => getAddedQuantity(label, addedModels)}
            toggleExterior={setShowExterior}
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            modelRefs={modelRefs}
            orbitControlsRef={orbitControlsRef}
            BaseVan={vans[isSanta]}
          />
        </div>
      </div>

      <style>{`
        .van-scrollbar::-webkit-scrollbar { height: 2px; }
        .van-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .van-scrollbar::-webkit-scrollbar-thumb { background: rgba(237,152,95,0.3); border-radius: 99px; }
      `}</style>
    </>
  );
}

export default Van;
