// import React, { Suspense, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, ContactShadows, Environment, Html, useProgress } from '@react-three/drei'
// import VanInventory from '../../../../components/vanInventoryModels/vanInventory'

// // Custom Loader Component
// function Loader() {
//   const { progress } = useProgress()
//   return (
//     <Html center>
//       <div style={{ color: '#001F3D', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
//         {Math.round(progress)}% Loaded...
//       </div>
//     </Html>
//   )
// }

// export default function VanCanvas() {
//   // Animation states for doors
//   const [openDriver, setOpenDriver] = useState(false)
//   const [openPassenger, setOpenPassenger] = useState(false)
//   const [openSlider, setOpenSlider] = useState(false)

//   return (
//     <div style={{
//       display: 'flex',
//       width: '100vw',
//       height: '100vh',
//       backgroundColor: '#F5F5F0',
//       padding: '20px',
//       boxSizing: 'border-box',
//       gap: '20px'
//     }}>

//       {/* LEFT SIDE: CANVAS */}
//       <div style={{
//         flex: 2,
//         position: 'relative',
//         borderRadius: '20px', // Normal rounded borders
//         overflow: 'hidden',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
//       }}>
//         <Canvas shadows camera={{ position: [15, 10, 15], fov: 40 }}>
//           <ambientLight intensity={0.7} />
//           <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

//           <Suspense fallback={<Loader />}>
//             <VanInventory
//               scale={0.005}
//               position={[0, -1, 0]}
//               // Passing states as props to the model
//               doors={{ openDriver, openPassenger, openSlider }}
//             />
//             <Environment preset="city" />
//             <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
//           </Suspense>

//           <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
//         </Canvas>
//       </div>

//       {/* RIGHT SIDE: CONTROLS */}
//       <div style={{
//         flex: 0.8,
//         backgroundColor: '#001F3D', // Dark theme color
//         borderRadius: '20px',
//         padding: '30px',
//         color: '#F5F5F0',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px'
//       }}>
//         <h2 style={{ borderBottom: '1px solid #ACBAC4', paddingBottom: '10px' }}>Van Controls</h2>

//         <p style={{ fontSize: '14px', color: '#ACBAC4' }}>Door Animations</p>

//         <button
//           onClick={() => setOpenDriver(!openDriver)}
//           style={buttonStyle(openDriver)}
//         >
//           {openDriver ? 'Close Driver Door' : 'Open Driver Door'}
//         </button>

//         <button
//           onClick={() => setOpenPassenger(!openPassenger)}
//           style={buttonStyle(openPassenger)}
//         >
//           {openPassenger ? 'Close Passenger Door' : 'Open Passenger Door'}
//         </button>

//         <button
//           onClick={() => setOpenSlider(!openSlider)}
//           style={buttonStyle(openSlider)}
//         >
//           {openSlider ? 'Close Slider Door' : 'Open Slider Door'}
//         </button>
//       </div>
//     </div>
//   )
// }

// // Helper Style for Buttons
// const buttonStyle = (isActive) => ({
//   padding: '12px',
//   borderRadius: '10px',
//   border: 'none',
//   backgroundColor: isActive ? '#E1D9BC' : '#30364F',
//   color: isActive ? '#001F3D' : '#F0F0DB',
//   cursor: 'pointer',
//   fontWeight: 'bold',
//   transition: 'all 0.3s ease'
// })