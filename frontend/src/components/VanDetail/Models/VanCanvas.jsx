"use client"
import React, { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Environment } from '@react-three/drei'
import { PrimaryButton } from '@/components/Common/Common'
import { easing } from 'maath'
import InteriorCamera from './MidCamera'
import { cameraViews, doorGroups } from './cameraViews'
import ControlBtn from './ControllBtn'
import Model from './Model'

function CameraRig({ view }) {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const lastView = useRef(view);

  // Jab bhi naya view (button click) aaye, animation ko dobara allow karein
  useEffect(() => {
    setIsUserInteracting(false);
    lastView.current = view;
  }, [view]);

  useFrame((state, delta) => {
    // Agar user khud orbit kar raha hai, toh auto-camera animation rok do
    if (isUserInteracting) return;

    // Camera aur Target ko smoothly move karein
    easing.damp3(state.camera.position, view.position, 0.4, delta);

    if (state.controls) {
      easing.damp3(state.controls.target, view.target, 0.4, delta);
      state.controls.update();

      // Check karein: Agar camera target ke bahut kareeb pahunch gaya hai,
      // toh animation mode off kar sakte hain (optional)
      const dist = state.camera.position.distanceTo(new THREE.Vector3(...view.position));
      if (dist < 0.01) {
        // Animation finished
      }
    }
  });

  // OrbitControls ke events ko monitor karne ke liye
  useEffect(() => {
    const controls = document.querySelector('canvas'); // Base listener
    const handleStart = () => setIsUserInteracting(true);

    // Jab user click/touch start kare, tab interaction true kar do
    window.addEventListener('mousedown', handleStart);
    window.addEventListener('touchstart', handleStart);

    return () => {
      window.removeEventListener('mousedown', handleStart);
      window.removeEventListener('touchstart', handleStart);
    };
  }, []);

  return null;
}


export default function VanCanvas({ url }) {
  const [animState, setAnimState] = useState({});
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [currentView, setCurrentView] = useState(cameraViews.default);
  // VanCanvas ke andar
  const [interiorMode, setInteriorMode] = useState(false);
  // interiorConfig se 'y' remove kar diya, lekin ek default fixed height (e.g., 2.2) rakhenge
  const [interiorConfig, setInteriorConfig] = useState({
    x: 0,
    z: 7,      // Forward/Backward
    targetY: 1.8 // Isse aap upar/neeche dekh kar height adjust feel kar sakte hain
  });
  // Helper function
  const updateConfig = (key, val) => {
    setInteriorConfig(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  // Group toggle function
  const toggleDoorGroup = (groupName, animNames) => {
    // Check if any door in group is open
    const anyOpen = animNames.some(name => animState[name]);

    // Toggle all doors in group to opposite state
    const newState = { ...animState };
    animNames.forEach(name => {
      newState[name] = !anyOpen;
    });
    setAnimState(newState);

    // Set camera view (use first animation's camera view)
    if (cameraViews[animNames[0]]) {
      setCurrentView(cameraViews[animNames[0]]);
    }
  };

  // Get grouped buttons
  const getGroupedButtons = () => {
    const buttons = [];

    Object.entries(doorGroups).forEach(([groupName, animNames]) => {
      // Check if all animations in group are available
      const allAvailable = animNames.every(name => availableAnimations.includes(name));

      if (allAvailable) {
        // Check if any door in group is open
        const anyOpen = animNames.some(name => animState[name]);

        buttons.push({
          key: groupName,
          label: groupName,
          active: anyOpen,
          onClick: () => toggleDoorGroup(groupName, animNames)
        });
      }
    });

    // Add individual buttons for animations not in groups
    availableAnimations.forEach(name => {
      const isInGroup = Object.values(doorGroups).some(group => group.includes(name));
      if (!isInGroup) {
        buttons.push({
          key: name,
          label: name.replace(/_/g, ' '),
          active: !!animState[name],
          onClick: () => {
            setAnimState(prev => ({ ...prev, [name]: !prev[name] }));
            if (cameraViews[name]) setCurrentView(cameraViews[name]);
          }
        });
      }
    });

    return buttons;
  };

  if (!url || url === "loading...") return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#FCFCFB] p-2 md:p-5 gap-3 md:gap-6">
      {/* Canvas Area */}
      <div className="flex-1 lg:flex-[2] relative bg-slate-50 rounded-xl lg:rounded-2xl overflow-hidden border border-slate-100 min-h-[50vh] lg:min-h-0">
        <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 2, 0]} intensity={2} />

          <Suspense fallback={<Html center>Loading 3D</Html>}>

            {/* CONDITIONALLY SWITCH BETWEEN EXTERIOR AND INTERIOR */}
            {!interiorMode ? (
              <>
                {/* Exterior Mode: Rig + Default OrbitControls */}
                <CameraRig view={currentView} />
                <OrbitControls
                  makeDefault
                  enableDamping
                  dampingFactor={0.05}
                  minDistance={5}
                  maxDistance={50}
                />
              </>
            ) : (
              <InteriorCamera
                active={true}
                // Y (height) ko humne 2.2 pe fix kar diya hai, baaki sliders se aayenge
                position={[interiorConfig.x, 2.2, interiorConfig.z]}
                // Target hamesha camera se 5 units aage rahega taake "Forward" sahi chale
                target={[interiorConfig.x, interiorConfig.targetY, interiorConfig.z - 5]}
              />
            )}

            <Model url={url} setAvailableAnimations={setAvailableAnimations} activeAnims={animState} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Controls Panel */}
      <div className="flex-1 lg:flex-[0.6] bg-primary p-4 md:p-8 rounded-lg text-secondary shadow-2xl overflow-y-auto">
        <h2 className="text-lg md:text-2xl font-black mb-4 uppercase italic">Big Bear Vans</h2>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2 mb-4">
              View Mode
            </p>
            <ControlBtn
              label={interiorMode ? "Exit Interior" : "Enter Interior"}
              active={interiorMode}
              onClick={() => setInteriorMode(!interiorMode)}
            />
          </div>

          {interiorMode && (
            <div className="bg-slate-800/50 p-4 rounded-xl space-y-4 border border-slate-700 mt-4">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Interior Navigation
              </p>

              {/* FORWARD / BACKWARD (Z) */}
              <div className="space-y-1">
                <label className="text-[10px] flex justify-between text-slate-300">
                  Forward / Back (Z): <span>{interiorConfig.z}m</span>
                </label>
                <input
                  type="range" min="1.5" max="9" step="0.1"
                  value={interiorConfig.z}
                  onChange={(e) => updateConfig('z', e.target.value)}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              {/* LEFT / RIGHT (X) */}
              <div className="space-y-1">
                <label className="text-[10px] flex justify-between text-slate-300">
                  Left / Right (X): <span>{interiorConfig.x}m</span>
                </label>
                <input
                  type="range" min="-1.5" max="1.5" step="0.1"
                  value={interiorConfig.x}
                  onChange={(e) => updateConfig('x', e.target.value)}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              {/* TILT VIEW (LOOK UP/DOWN) */}
              <div className="space-y-1">
                <label className="text-[10px] flex justify-between text-slate-300">
                  Tilt View: <span>{interiorConfig.targetY}m</span>
                </label>
                <input
                  type="range" min="1.8" max="3.3" step="0.1"
                  value={interiorConfig.targetY}
                  onChange={(e) => updateConfig('targetY', e.target.value)}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>
            </div>
          )}

          {/* Door Controls */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2">Component Controls</p>
            {getGroupedButtons().map((button) => (
              <ControlBtn key={button.key} label={button.label} active={button.active} onClick={button.onClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


