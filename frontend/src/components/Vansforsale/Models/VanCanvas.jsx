import React, { Suspense, useState ,useRef} from 'react'
import * as THREE from 'three' // Euler aur MathUtils ke liye
import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, Html, useProgress, useGLTF } from '@react-three/drei'

// 1. Dynamic Model Component jo Nodes aur Materials nikalega
function Model({ url, doors=false }) {
  // Yahan url load ho raha hai
  const { nodes, materials,scene } = useGLTF(url)
  const group = useRef()

  // side_door ki reference handle karne ke liye
  // Note: Agar aapka door sliding hai to 'position' change hogi,
  // Agar hinge wala hai to 'rotation' change hogi.
useFrame((state, delta) => {
    // 1. Side Door (Slider) Animation
if (nodes.side_door) {
  // 0 is closed, -2 is open (isay door ke size ke mutabiq adjust karein)
  const targetZ = doors.openSlider ? -2 : 0
  nodes.side_door.position.z = THREE.MathUtils.lerp(
    nodes.side_door.position.z,
    targetZ,
    0.1
  )
}
  })

  return (
<group ref={group} scale={0.05} position={[0, -1, 0]} dispose={null}>
      {/* 'scene' use karna sabse safe method hai pura model dikhane ke liye */}
      <primitive object={scene} />
    </group>
  )
}

// Custom Loader Component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{
        color: '#001F3D',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        background: 'rgba(255,255,255,0.8)',
        padding: '10px 20px',
        borderRadius: '10px'
      }}>
        {Math.round(progress)}% Loaded...
      </div>
    </Html>
  )
}

export default function VanCanvas({ glb }) {
  // Animation states
  const [openDriver, setOpenDriver] = useState(false)
  const [openPassenger, setOpenPassenger] = useState(false)
  const [openSlider, setOpenSlider] = useState(false)

  // Safety check: Agar glb URL nahi hai to render na kare
  if (!glb) return <div style={{color: 'red', padding: '20px'}}>No GLB URL provided</div>

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#F5F5F0',
      padding: '20px',
      boxSizing: 'border-box',
      gap: '20px'
    }}>

      {/* LEFT SIDE: CANVAS */}
      <div style={{
        flex: 2,
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <Canvas shadows camera={{ position: [15, 10, 15], fov: 40 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <Suspense fallback={<Loader />}>
            {/* Model ko load kar rahe hain */}
            <Model
              url={glb}
              doors={{ openDriver, openPassenger, openSlider }}
            />

            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          </Suspense>

          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        </Canvas>
      </div>

      {/* RIGHT SIDE: CONTROLS */}
      <div style={{
        flex: 0.8,
        backgroundColor: '#001F3D',
        borderRadius: '20px',
        padding: '30px',
        color: '#F5F5F0',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h2 style={{ borderBottom: '1px solid #ACBAC4', paddingBottom: '10px' }}>Van Controls</h2>
        <p style={{ fontSize: '12px', color: '#ACBAC4' }}>Source: {glb.substring(0, 30)}...</p>

        <p style={{ fontSize: '14px', color: '#ACBAC4' }}>Door Animations</p>

        <button onClick={() => setOpenDriver(!openDriver)} style={buttonStyle(openDriver)}>
          {openDriver ? 'Close Driver Door' : 'Open Driver Door'}
        </button>

        <button onClick={() => setOpenPassenger(!openPassenger)} style={buttonStyle(openPassenger)}>
          {openPassenger ? 'Close Passenger Door' : 'Open Passenger Door'}
        </button>

        <button onClick={() => setOpenSlider(!openSlider)} style={buttonStyle(openSlider)}>
          {openSlider ? 'Close Slider Door' : 'Open Slider Door'}
        </button>
      </div>
    </div>
  )
}

const buttonStyle = (isActive) => ({
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: isActive ? '#E1D9BC' : '#30364F',
  color: isActive ? '#001F3D' : '#F0F0DB',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
})