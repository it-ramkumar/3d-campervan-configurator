"use client"
import React, { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html, Environment, PerspectiveCamera } from '@react-three/drei'
import { PrimaryButton, SecondaryButton } from '@/components/Common/Common'


const InteriorCameraControls = ({ isActive, cameraZ, cameraHeight }) => {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  // ✅ Ye values camera ko smooth banayengi
  const currentPos = useRef(new THREE.Vector3(0, cameraHeight, cameraZ));
  const currentTarget = useRef(new THREE.Vector3(0, cameraHeight, cameraZ - 0.5));

  // ✅ useFrame har frame par chalega (60fps smoothness)
  useFrame((state, delta) => {
    if (!isActive || !cameraRef.current || !controlsRef.current) return;

    // 1. Target Position calculate karein
    const targetY = cameraHeight;
    const targetZ = cameraZ;

    // 2. LERP (Linear Interpolation) use karein smooth movement ke liye
    // 0.1 ka matlab hai har frame par 10% distance cover karna
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.1);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.1);

    // 3. Camera position update karein - X axis ko preserve rakhein for left/right rotation
    const currentX = cameraRef.current.position.x;
    cameraRef.current.position.set(currentX, currentPos.current.y, currentPos.current.z);

    // 4. OrbitControls ka target bhi smooth rakhein (agar drag nahi kar rahe)
    if (!isDragging) {
      currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetY, 0.1);
      currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, targetZ - 0.5, 0.1);
      // Target ka X bhi preserve rakhein
      const currentTargetX = controlsRef.current.target.x;
      controlsRef.current.target.set(currentTargetX, currentTarget.current.y, currentTarget.current.z);
    }

    controlsRef.current.update();
  });

  // Drag logic handling
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

  // ✅ Cursor style
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
        minPolarAngle={Math.PI / 4}     // Up look
        maxPolarAngle={Math.PI / 1.3}   // Down look
        minAzimuthAngle={-Math.PI / 3}   // left limit (90°)
        maxAzimuthAngle={Math.PI / 3}    // right limit (90°)    // ✅ Full right rotation
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};
// ✅ Fixed Model with separate glass animation handling
function Model({ url, doors }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  // ✅ Separate tracking for door and glass animations
  const animationStates = useRef({
    openFrontRight: false,
    openFrontRightGlass: false, // Separate glass state
    openSlider: false,
    openBackLeft: false,
    openBackRight: false
  });

  // ✅ Debug
  useEffect(() => {
    if (animations && animations.length > 0) {
      console.log('🎬 Available animations:', animations.map(anim => anim.name));
      // console.log('🎭 Available actions:', Object.keys(actions));
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
            // Stop and reset
            action.stop();
            action.reset();

            // Configure
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

            // Update state immediately
            animationStates.current[stateKey] = shouldOpen;

            // Play
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

    // ✅ Play animations - Glass with slight delay for realistic effect
    // console.log('🔄 Door states changed:', doors)/;

    // Front Right Door - Door first, then glass
    playAnimation("door_front_RAction", doors.openFrontRight, "openFrontRight", 0);
    playAnimation("door_front_R_GlassAction", doors.openFrontRight, "openFrontRightGlass", 100); // 100ms delay

    // Other doors
    playAnimation("side_doorAction", doors.openSlider, "openSlider");
    playAnimation("rare door-RAction", doors.openBackRight, "openBackRight");
    playAnimation("rare-door_LAction", doors.openBackLeft, "openBackLeft");

  }, [doors, actions]);

  // ✅ Initialize animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      console.log('🔧 Initializing animations...');

      Object.keys(actions).forEach(actionName => {
        const action = actions[actionName];
        if (action) {
          action.time = 0;
          action.enabled = true;
          action.paused = true;

          // Special handling for glass animation
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
  const [cameraHeight, setCameraHeight] = useState(2.7); // ✅ Height state add kiya

  const moveForward = () => setCameraZ(prev => Math.max(-3, prev - 0.3));
  const moveBackward = () => setCameraZ(prev => Math.min(6, prev + 0.3));
  const moveUp = () => setCameraHeight(prev => Math.min(4, prev + 0.2)); // ✅ Height controls
  const moveDown = () => setCameraHeight(prev => Math.max(1, prev - 0.2));
  const resetCamera = () => {
    setCameraZ(0.5);
    setCameraHeight(2.7);
  };

  useEffect(() => {
    if (!isInterior) return;

    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w': moveForward(); break;
        case 's': moveBackward(); break;
        case 'q': moveUp(); break;    // ✅ Q for up
        case 'e': moveDown(); break;  // ✅ E for down
        case 'r': resetCamera(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isInterior]);

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
    <div className="flex h-screen w-full bg-[#FCFCFB] p-5 gap-6">
      <div className="flex-[2] relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
        <Canvas shadows>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 2, 0]} intensity={2} />

          <Suspense fallback={<Html center>Loading 3D...</Html>}>
            <Model url={url} doors={doors} />
            <Environment
              files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_straight_afternoon_1k.hdr"
              background={false}
            />

            {isInterior ? (
              <InteriorCameraControls
                isActive={isInterior}
                cameraZ={cameraZ}
                cameraHeight={cameraHeight} // ✅ Height prop pass kiya
              />
            ) : (
              <>
                <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
                <OrbitControls enableDamping dampingFactor={0.05} minDistance={5} maxDistance={50} />
              </>
            )}
          </Suspense>
        </Canvas>

        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#30364F]">
            Mode: {isInterior ? "Interior View" : "Exterior View"}
          </p>
        </div>

        {isInterior && (
          <div className="absolute top-6 right-6 bg-black/80 text-white p-3 rounded-lg text-xs">
            <div>Position: Z = {cameraZ.toFixed(1)}</div>
            <div>Height: Y = {cameraHeight.toFixed(1)}</div> {/* ✅ Height display */}
            <div className="mt-1 text-gray-300">
              {cameraZ < 0 ? "Front Area" : cameraZ > 1 ? "Back Area" : "Center Area"}
            </div>
          </div>
        )}

        {isInterior && (
          <div className="absolute bottom-6 left-6 bg-black/80 text-white p-3 rounded-lg text-xs">
            <div className="font-bold mb-2">Controls:</div>
            <div>W: Move Forward</div>
            <div>S: Move Backward</div>
            <div>Q: Move Up</div>     {/* ✅ New controls */}
            <div>E: Move Down</div>   {/* ✅ New controls */}
            <div>R: Reset to Center</div>
            <div className="mt-2 text-gray-300">Mouse: Look Around</div>
          </div>
        )}
      </div>

      <div className="flex-[0.6] bg-primary p-8 rounded-lg text-secondary shadow-2xl overflow-y-auto">
        <h2 className="text-2xl font-black mb-6 uppercase italic">Big Bear <span className="text-secondary">Vans</span></h2>

        <SecondaryButton
          label={isInterior ? "← Exit to Exterior" : "Explore Interior"}
          onClick={() => setIsInterior(!isInterior)}
          className={`w-full uppercase ${isInterior ? '!bg-white !text-black' : '!bg-hover !text-white shadow-lg shadow-[#ED3500]/20'}`}
        />

        {isInterior && (
          <div className="mb-8 p-4 bg-primary rounded-lg mt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Interior Movement</p>

            <div className="space-y-3">
              <button
                onClick={moveForward}
                disabled={cameraZ <= -10}
                className="w-full p-3 bg-hover/30 rounded-lg text-sm hover:bg-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑ Move Forward (W)
              </button>

              <div className="grid grid-cols-2 gap-2"> {/* ✅ Height controls */}
                <button
                  onClick={moveUp}
                  disabled={cameraHeight >= 4}
                  className="p-3 bg-blue-600/30 rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↗ Up (Q)
                </button>
                <button
                  onClick={moveDown}
                  disabled={cameraHeight <= 1}
                  className="p-3 bg-blue-600/30 rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↘ Down (E)
                </button>
              </div>

              <button onClick={resetCamera} className="w-full p-3 bg-red-600 rounded-lg text-sm hover:bg-red-500 transition-colors">
                ⌂ Reset to Center (R)
              </button>

              <button
                onClick={moveBackward}
                disabled={cameraZ >= 6}
                className="w-full p-3 bg-hover/30 rounded-lg text-sm hover:bg-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓ Move Backward (S)
              </button>
            </div>

            {/* Z Position Slider */}
            <div className="mt-4">
              <label className="text-xs text-slate-300 block mb-2">
                Z Position: {cameraZ.toFixed(1)}
              </label>
              <input
                type="range"
                min="-3"
                max="6"
                step="0.1"
                value={cameraZ}
                onChange={(e) => setCameraZ(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* ✅ Height Slider */}
            <div className="mt-4">
              <label className="text-xs text-slate-300 block mb-2">
                Height: {cameraHeight.toFixed(1)}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.1"
                value={cameraHeight}
                onChange={(e) => setCameraHeight(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button onClick={() => setCameraZ(-10)} className="p-2 bg-slate-700 rounded text-xs hover:bg-slate-600">Max Front</button>
              <button onClick={() => setCameraZ(0.5)} className="p-2 bg-slate-700 rounded text-xs hover:bg-slate-600">Center</button>
              <button onClick={() => setCameraZ(6)} className="p-2 bg-slate-700 rounded text-xs hover:bg-slate-600">Max Back</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2">Component Controls</p>
          <ControlBtn label="Front Right Door" active={doors.openFrontRight} onClick={() => toggleDoor('openFrontRight')} />
          <ControlBtn label="Slider Door" active={doors.openSlider} onClick={() => toggleDoor('openSlider')} />
          <ControlBtn label="Rear Left Door" active={doors.openBackLeft} onClick={() => toggleDoor('openBackLeft')} />
          <ControlBtn label="Rear Right Door" active={doors.openBackRight} onClick={() => toggleDoor('openBackRight')} />
        </div>
      </div>
    </div>
  )
}

function ControlBtn({ label, active, onClick }) {
  return (
    <PrimaryButton label={`${label}${active ? '(Closed)' : '(Open)'}`} onClick={onClick} className={`w-full ${active ? 'bg-[#ED3500] border-transparent' : 'bg-transparent border-slate-700 hover:border-slate-500'
      }`} />

  )
}