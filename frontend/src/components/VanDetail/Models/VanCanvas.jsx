"use client"
import React, { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html, Environment, PerspectiveCamera } from '@react-three/drei'
import { PrimaryButton, SecondaryButton } from '@/components/Common/Common'
import Loader from "../../Loader/Loader"

const InteriorCameraControls = ({ isActive, cameraZ, cameraHeight }) => {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const currentPos = useRef(new THREE.Vector3(0, cameraHeight, cameraZ));
  const currentTarget = useRef(new THREE.Vector3(0, cameraHeight, cameraZ - 0.5));

  useFrame((state, delta) => {
    if (!isActive || !cameraRef.current || !controlsRef.current) return;

    const targetY = cameraHeight;
    const targetZ = cameraZ;

    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.1);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.1);

    const currentX = cameraRef.current.position.x;
    cameraRef.current.position.set(currentX, currentPos.current.y, currentPos.current.z);

    if (!isDragging) {
      currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetY, 0.1);
      currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, targetZ - 0.5, 0.1);
      const currentTargetX = controlsRef.current.target.x;
      controlsRef.current.target.set(currentTargetX, currentTarget.current.y, currentTarget.current.z);
    }

    controlsRef.current.update();
  });

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !isActive) return;

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, [isActive]);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !isActive) return;
    canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
  }, [isDragging, isActive]);

  if (!isActive) return null;

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={80}
        position={[0, cameraHeight, cameraZ]}
        near={0.1}
        far={20}
      />
      <OrbitControls
        ref={controlsRef}
        rotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

function Model({ url, doors }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  const animationStates = useRef({
    openFrontRight: false,
    openFrontRightGlass: false,
    openSlider: false,
    openBackLeft: false,
    openBackRight: false
  });

  useEffect(() => {
    if (animations && animations.length > 0) {
      console.log('🎬 Available animations:', animations.map(anim => anim.name));
    }
  }, [animations, actions]);

  useEffect(() => {
    const playAnimation = (actionName, shouldOpen, stateKey, delay = 0) => {
      const action = actions[actionName];

      if (!action) {
        console.error(`❌ Animation "${actionName}" not found!`);
        return;
      }

      const currentState = animationStates.current[stateKey];

      if (shouldOpen !== currentState) {
        console.log(`🎬 Playing: ${actionName} (delay: ${delay}ms)`);

        const playAnimationWithDelay = () => {
          try {
            action.stop();
            action.reset();

            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.enabled = true;

            if (shouldOpen) {
              action.timeScale = 1;
              action.time = 0;
              console.log(`▶️ Opening ${actionName}`);
            } else {
              action.timeScale = -1;
              action.time = action.getClip().duration;
              console.log(`◀️ Closing ${actionName}`);
            }

            animationStates.current[stateKey] = shouldOpen;
            action.play();

            console.log(`✅ ${actionName} started successfully`);

          } catch (error) {
            console.error(`💥 Error playing ${actionName}:`, error);
          }
        };

        if (delay > 0) {
          setTimeout(playAnimationWithDelay, delay);
        } else {
          playAnimationWithDelay();
        }
      }
    };

    playAnimation("Door_Front_R", doors.openFrontRight, "openFrontRight", 0);
    playAnimation("Door_Front_L", doors.openFrontRight, "openFrontRightGlass", 100);

    playAnimation("Slide_Door", doors.openSlider, "openSlider");
    playAnimation("Rare_Door_R", doors.openBackRight, "openBackRight");
    playAnimation("Rare_Door_L", doors.openBackRight, "openBackLeft");

  }, [doors, actions]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      console.log('🔧 Initializing animations...');

      Object.keys(actions).forEach(actionName => {
        const action = actions[actionName];
        if (action) {
          action.time = 0;
          action.enabled = true;
          action.paused = true;

          if (actionName === "door_front_R_GlassAction") {
            console.log(`🪟 Glass animation initialized: ${actionName}`);
          }

          console.log(`✅ Initialized: ${actionName}`);
        }
      });
    }
  }, [actions]);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
    }
  }, [scene])

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={0.005} />
    </group>
  )
}

export default function VanCanvas({ url }) {
  const [doors, setDoors] = useState({
    openFrontRight: false,
    openSlider: false,
    openBackLeft: false,
    openBackRight: false
  })
  const [isInterior, setIsInterior] = useState(false)
  const [cameraZ, setCameraZ] = useState(0.5);
  const [cameraHeight, setCameraHeight] = useState(2.7);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const moveForward = () => setCameraZ(prev => Math.max(-3, prev - 0.3));
  const moveBackward = () => setCameraZ(prev => Math.min(6, prev + 0.3));
  const moveUp = () => setCameraHeight(prev => Math.min(4, prev + 0.2));
  const moveDown = () => setCameraHeight(prev => Math.max(1, prev - 0.2));
  const resetCamera = () => {
    setCameraZ(0.5);
    setCameraHeight(2.7);
  };

  useEffect(() => {
    if (!isInterior || isMobile) return; // Disable keyboard on mobile

    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w': moveForward(); break;
        case 's': moveBackward(); break;
        case 'q': moveUp(); break;
        case 'e': moveDown(); break;
        case 'r': resetCamera(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isInterior, isMobile]);

  const toggleDoor = (doorKey) => {
    console.log(`🚪 Toggling door: ${doorKey}`);
    setDoors(prev => {
      const newState = { ...prev, [doorKey]: !prev[doorKey] };
      return newState;
    });
  };

  if (!url || url === "loading...") {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#FCFCFB] p-2 md:p-5 gap-3 md:gap-6">
      {/* Canvas Area */}
      <div className="flex-1 lg:flex-[2] relative bg-slate-50 rounded-xl lg:rounded-2xl overflow-hidden border border-slate-100 min-h-[50vh] lg:min-h-0">
        <Canvas shadows>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 2, 0]} intensity={2} />

          <Suspense fallback={<Html center><Loader/></Html>}>
            <Model url={url} doors={doors} />
            <Environment
              files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_straight_afternoon_1k.hdr"
              background={false}
            />

            {isInterior ? (
              <InteriorCameraControls
                isActive={isInterior}
                cameraZ={cameraZ}
                cameraHeight={cameraHeight}
              />
            ) : (
              <>
                <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
                <OrbitControls enableDamping dampingFactor={0.05} minDistance={5} maxDistance={50} />
              </>
            )}
          </Suspense>
        </Canvas>

        {/* Mode Badge */}
        <div className="absolute top-3 md:top-6 left-3 md:left-6 bg-white/80 backdrop-blur-md px-2 md:px-4 py-1 md:py-2 rounded-full border border-slate-100 shadow-sm">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#30364F]">
            Mode: {isInterior ? "Interior View" : "Exterior View"}
          </p>
        </div>

        {/* Position Info - Interior Mode */}
        {isInterior && (
          <div className="absolute top-3 md:top-6 right-3 md:right-6 bg-black/80 text-white p-2 md:p-3 rounded-lg text-[10px] md:text-xs">
            <div>Position: Z = {cameraZ.toFixed(1)}</div>
            <div>Height: Y = {cameraHeight.toFixed(1)}</div>
            <div className="mt-1 text-gray-300 hidden md:block">
              {cameraZ < 0 ? "Front Area" : cameraZ > 1 ? "Back Area" : "Center Area"}
            </div>
          </div>
        )}

        {/* Keyboard Controls Info - Desktop Only */}
        {isInterior && !isMobile && (
          <div className="absolute bottom-6 left-6 bg-black/80 text-white p-3 rounded-lg text-xs hidden lg:block">
            <div className="font-bold mb-2">Controls:</div>
            <div>W: Move Forward</div>
            <div>S: Move Backward</div>
            <div>Q: Move Up</div>
            <div>E: Move Down</div>
            <div>R: Reset to Center</div>
            <div className="mt-2 text-gray-300">Mouse: Look Around</div>
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <div className="flex-1 lg:flex-[0.6] bg-primary p-4 md:p-8 rounded-lg text-secondary shadow-2xl overflow-y-auto max-h-[50vh] lg:max-h-none">
        <h2 className="text-lg md:text-2xl font-black mb-4 md:mb-6 uppercase italic">
          Big Bear <span className="text-secondary">Vans</span>
        </h2>

        <SecondaryButton
          label={isInterior ? "← Exit to Exterior" : "Explore Interior"}
          onClick={() => setIsInterior(!isInterior)}
          className={`w-full uppercase text-sm md:text-base ${
            isInterior ? '!bg-white !text-black' : '!bg-hover !text-white shadow-lg shadow-[#ED3500]/20'
          }`}
        />

        {/* Interior Movement Controls */}
        {isInterior && (
          <div className="mb-6 md:mb-8 p-3 md:p-4 bg-primary rounded-lg mt-4 md:mt-6">
            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4">
              Interior Movement
            </p>

            <div className="space-y-2 md:space-y-3">
              <button
                onClick={moveForward}
                disabled={cameraZ <= -10}
                className="w-full p-2 md:p-3 bg-hover/30 rounded-lg text-xs md:text-sm hover:bg-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑ Move Forward {!isMobile && '(W)'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={moveUp}
                  disabled={cameraHeight >= 4}
                  className="p-2 md:p-3 bg-blue-600/30 rounded-lg text-xs md:text-sm hover:bg-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↗ Up {!isMobile && '(Q)'}
                </button>
                <button
                  onClick={moveDown}
                  disabled={cameraHeight <= 1}
                  className="p-2 md:p-3 bg-blue-600/30 rounded-lg text-xs md:text-sm hover:bg-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↘ Down {!isMobile && '(E)'}
                </button>
              </div>

              <button
                onClick={resetCamera}
                className="w-full p-2 md:p-3 bg-red-600 rounded-lg text-xs md:text-sm hover:bg-red-500 transition-colors"
              >
                ⌂ Reset to Center {!isMobile && '(R)'}
              </button>

              <button
                onClick={moveBackward}
                disabled={cameraZ >= 6}
                className="w-full p-2 md:p-3 bg-hover/30 rounded-lg text-xs md:text-sm hover:bg-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓ Move Backward {!isMobile && '(S)'}
              </button>
            </div>

            {/* Position Sliders */}
            <div className="mt-3 md:mt-4">
              <label className="text-[10px] md:text-xs text-slate-300 block mb-2">
                Z Position: {cameraZ.toFixed(1)}
              </label>
              <input
                type="range"
                min="-3"
                max="6"
                step="0.1"
                value={cameraZ}
                onChange={(e) => setCameraZ(parseFloat(e.target.value))}
                className="w-full h-2 md:h-auto"
              />
            </div>

            <div className="mt-3 md:mt-4">
              <label className="text-[10px] md:text-xs text-slate-300 block mb-2">
                Height: {cameraHeight.toFixed(1)}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.1"
                value={cameraHeight}
                onChange={(e) => setCameraHeight(parseFloat(e.target.value))}
                className="w-full h-2 md:h-auto"
              />
            </div>

            {/* Quick Position Buttons */}
            <div className="mt-3 md:mt-4 grid grid-cols-3 gap-1 md:gap-2">
              <button
                onClick={() => setCameraZ(-10)}
                className="p-1 md:p-2 bg-slate-700 rounded text-[10px] md:text-xs hover:bg-slate-600"
              >
                Max Front
              </button>
              <button
                onClick={() => setCameraZ(0.5)}
                className="p-1 md:p-2 bg-slate-700 rounded text-[10px] md:text-xs hover:bg-slate-600"
              >
                Center
              </button>
              <button
                onClick={() => setCameraZ(6)}
                className="p-1 md:p-2 bg-slate-700 rounded text-[10px] md:text-xs hover:bg-slate-600"
              >
                Max Back
              </button>
            </div>
          </div>
        )}

        {/* Door Controls */}
        <div className="space-y-3 md:space-y-4">
          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2">
            Component Controls
          </p>
          <ControlBtn
            label="Front Right Door"
            active={doors.openFrontRight}
            onClick={() => toggleDoor('openFrontRight')}
          />
          <ControlBtn
            label="Slider Door"
            active={doors.openSlider}
            onClick={() => toggleDoor('openSlider')}
          />
          <ControlBtn
            label="Rear Right Door"
            active={doors.openBackRight}
            onClick={() => toggleDoor('openBackRight')}
          />
        </div>
      </div>
    </div>
  )
}

function ControlBtn({ label, active, onClick }) {
  return (
    <PrimaryButton
      label={`${label} ${active ? '(Close)' : '(Open)'}`}
      onClick={onClick}
      className={`w-full text-xs md:text-sm ${
        active
          ? 'bg-[#ED3500] border-transparent'
          : 'bg-transparent border-slate-700 hover:border-slate-500'
      }`}
    />
  )
}


// "use client"
// import React, { Suspense, useState, useRef, useEffect } from 'react'
// import * as THREE from 'three'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, useGLTF, useAnimations, Html, Environment, PerspectiveCamera } from '@react-three/drei'
// import { PrimaryButton } from '@/components/Common/Common'
// import { easing } from 'maath'
// import Loader from "../../Loader/Loader"

// const cameraViews = {
//   "Door_Front_R": { position: [-20, 4, 6], target: [2, 0, 0] },
//   "Door_Front_L": { position: [20, 4, -6], target: [-2, 0, 0] },
//   "Slide_Door": { position: [-20, 2, 0], target: [2, 0, 0] },
//   "Rare_Door_R": { position: [0, 2, -20], target: [0, 0, -4] },
//   "Rare_Door_L": { position: [0, 2, -20], target: [0, 0, -4] },
//   "default": { position: [15, 15, 15], target: [0, 0, 0] }
// };

// // Combined door groups
// const doorGroups = {
//   "Front Doors": ["Door_Front_R", "Door_Front_L"],
//   "Rear Doors": ["Rare_Door_R", "Rare_Door_L"],
//   "Slide Door": ["Slide_Door"]
// };


// function CameraRig({ view }) {
//   const [isManual, setIsManual] = useState(false);
//   const lastView = useRef(view);

//   useEffect(() => {
//     if (view !== lastView.current) {
//       setIsManual(false);
//       lastView.current = view;
//     }
//   }, [view]);

//   useFrame((state, delta) => {
//     if (isManual) return;

//     const distanceToTarget = state.camera.position.distanceTo(new THREE.Vector3(...view.position));
//     if (distanceToTarget < 0.1) {
//       setIsManual(true);
//       return;
//     }

//     easing.damp3(state.camera.position, view.position, 0.4, delta);
//     easing.damp3(state.controls.target, view.target, 0.4, delta);
//   });

//   return null;
// }

// function Model({ url, setAvailableAnimations, activeAnims }) {
//   const group = useRef()
//   const { scene, animations } = useGLTF(url)
//   const { actions } = useAnimations(animations, group)
//   const [ready, setReady] = useState(false)

//   useEffect(() => {
//     if (actions && Object.keys(actions).length > 0) {
//       setAvailableAnimations(Object.keys(actions));
//       Object.values(actions).forEach(action => {
//         action.stop().reset();
//         action.clampWhenFinished = true;
//         action.setLoop(THREE.LoopOnce, 1);
//       });
//     }
//   }, [actions, setAvailableAnimations]);

//   useEffect(() => {
//     Object.keys(activeAnims).forEach((name) => {
//       const action = actions[name];
//       if (!action) return;
//       action.paused = false;
//       action.timeScale = activeAnims[name] ? 1 : -1;
//       action.play();
//     });
//   }, [activeAnims, actions]);

//   useEffect(() => {
//     if (scene) {
//       const box = new THREE.Box3().setFromObject(scene);
//       const center = box.getCenter(new THREE.Vector3());
//       scene.position.x += (scene.position.x - center.x);
//       scene.position.z += (scene.position.z - center.z);
//       setTimeout(() => setReady(true), 150);
//     }
//   }, [scene]);

//   return (
//     <group ref={group} visible={ready} position={[0, -3, 0]}>
//       <primitive object={scene} scale={0.004} />
//     </group>
//   )
// }

// export default function VanCanvas({ url }) {
//   const [animState, setAnimState] = useState({});
//   const [availableAnimations, setAvailableAnimations] = useState([]);
//   const [currentView, setCurrentView] = useState(cameraViews.default);

//   // Group toggle function
//   const toggleDoorGroup = (groupName, animNames) => {
//     // Check if any door in group is open
//     const anyOpen = animNames.some(name => animState[name]);

//     // Toggle all doors in group to opposite state
//     const newState = { ...animState };
//     animNames.forEach(name => {
//       newState[name] = !anyOpen;
//     });
//     setAnimState(newState);

//     // Set camera view (use first animation's camera view)
//     if (cameraViews[animNames[0]]) {
//       setCurrentView(cameraViews[animNames[0]]);
//     }
//   };

//   // Get grouped buttons
//   const getGroupedButtons = () => {
//     const buttons = [];

//     Object.entries(doorGroups).forEach(([groupName, animNames]) => {
//       // Check if all animations in group are available
//       const allAvailable = animNames.every(name => availableAnimations.includes(name));

//       if (allAvailable) {
//         // Check if any door in group is open
//         const anyOpen = animNames.some(name => animState[name]);

//         buttons.push({
//           key: groupName,
//           label: groupName,
//           active: anyOpen,
//           onClick: () => toggleDoorGroup(groupName, animNames)
//         });
//       }
//     });

//     // Add individual buttons for animations not in groups
//     availableAnimations.forEach(name => {
//       const isInGroup = Object.values(doorGroups).some(group => group.includes(name));
//       if (!isInGroup) {
//         buttons.push({
//           key: name,
//           label: name.replace(/_/g, ' '),
//           active: !!animState[name],
//           onClick: () => {
//             setAnimState(prev => ({ ...prev, [name]: !prev[name] }));
//             if (cameraViews[name]) setCurrentView(cameraViews[name]);
//           }
//         });
//       }
//     });

//     return buttons;
//   };

//   if (!url || url === "loading...") return <div className="h-screen flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="flex flex-col lg:flex-row h-screen w-full bg-[#FCFCFB] p-2 md:p-5 gap-3 md:gap-6">
//       {/* Canvas Area */}
//       <div className="flex-1 lg:flex-[2] relative bg-slate-50 rounded-xl lg:rounded-2xl overflow-hidden border border-slate-100 min-h-[50vh] lg:min-h-0">
//         <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
//           <ambientLight intensity={1.5} />
//           <pointLight position={[0, 2, 0]} intensity={2} />
//           <Suspense fallback={<Html center><Loader /></Html>}>
//             <CameraRig view={currentView} />
//             <Model url={url} setAvailableAnimations={setAvailableAnimations} activeAnims={animState} />
//             <Environment preset="city" />
//             <OrbitControls
//               makeDefault
//               enableDamping
//               dampingFactor={0.05}
//               minDistance={5}
//               maxDistance={50}
//             />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* Controls Panel */}
//       <div className="flex-1 lg:flex-[0.6] bg-primary p-4 md:p-8 rounded-lg text-secondary shadow-2xl overflow-y-auto max-h-[50vh] lg:max-h-none">
//         <h2 className="text-lg md:text-2xl font-black mb-4 md:mb-6 uppercase italic">
//           Big Bear <span className="text-secondary">Vans</span>
//         </h2>

//         <div className="space-y-3 md:space-y-4">
//           <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2">
//             Component Controls
//           </p>

//           {getGroupedButtons().map((button) => (
//             <ControlBtn
//               key={button.key}
//               label={button.label}
//               active={button.active}
//               onClick={button.onClick}
//             />
//           ))}

//           <PrimaryButton
//             label="Reset View"
//             onClick={() => setCurrentView(cameraViews.default)}
//             className="w-full mt-4 border-dashed border-slate-500 opacity-50 hover:opacity-100"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ControlBtn({ label, active, onClick }) {
//   return (
//     <PrimaryButton
//       label={`${label} ${active ? '(Close)' : '(Open)'}`}
//       onClick={onClick}
//       className={`w-full text-xs md:text-sm ${active ? 'bg-[#ED3500] border-transparent' : 'bg-transparent border-slate-700 hover:border-slate-500'}`}
//     />
//   )
// }