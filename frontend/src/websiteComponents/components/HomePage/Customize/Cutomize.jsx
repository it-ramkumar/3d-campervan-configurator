"use client";
import React, { useRef, Suspense, useEffect,useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../../Loader/Loader"
import { ChevronDown, ChevronUp } from 'lucide-react'; // Assuming you have lucide-react or similar icon library installed
import { Link } from "react-router-dom";



gsap.registerPlugin(ScrollTrigger);

const VanPart = ({
  modelPath,
  assembledPos = [0, 0, 0],
  initialPos = [0, 0, 0],
  triggerRef,
  rotation = [0, 0, 0],
  initialRotation = [0, 0, 0],
  index
}) => {
  const ref = useRef();
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (ref.current && triggerRef?.current) {
      gsap.set(ref.current.position, { x: initialPos[0], y: initialPos[1], z: initialPos[2] });
      gsap.set(ref.current.rotation, { x: initialRotation[0], y: initialRotation[1], z: initialRotation[2] });

      const animationProps = {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
        },
        delay: index * 0.1,
        ease: "power2.out",
      };

      gsap.to(ref.current.position, { x: assembledPos[0], y: assembledPos[1], z: assembledPos[2], ...animationProps });
      gsap.to(ref.current.rotation, { x: rotation[0], y: rotation[1], z: rotation[2], ...animationProps });
    }
  }, [triggerRef, assembledPos, initialPos, rotation, initialRotation, index]);

  return <primitive ref={ref} object={scene.clone()} scale={1} />;
};


export default function Customize() {
  const modelSectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const imageCardRef = useRef(null);
  const imageRef = useRef(null);
  const modelCanvasCardRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

  const parts = [
    { name: "Wall Panels", modelPath: "/models/in-parts144/wall-panels.glb", initialPos: [8, 0, 0] },
    { name: "Fridge", modelPath: "/models/in-parts144/TallFridge.glb", initialPos: [-8, 0, 0] },
    { name: "Swivel Table", modelPath: "/models/in-parts144/swivel-table.glb", initialPos: [0, 8, 0], initialRotation: [0, 0, Math.PI / 4] },
    { name: "Awning", modelPath: "/models/ex-parts144/awning.glb", initialPos: [0, -8, 0] },
    { name: "Roof Rack", modelPath: "/models/ex-parts144/roof-rack.glb", initialPos: [0, 10, 0] },
    { name: "Solar Panel", modelPath: "/models/ex-parts144/solar.glb", assembledPos: [.5, 0, 0], initialPos: [0, -10, 0] }
  ];

  // useEffect(() => {
  //   gsap.fromTo(mainTitleRef.current,
  //     { y: -20, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1.5,
  //       ease: 'power3.out',
  //       scrollTrigger: {
  //         trigger: mainTitleRef.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: 0.5,
  //       }
  //     }
  //   );

  //   if (section1Ref.current) {
  //     gsap.from(section1Ref.current.querySelectorAll("h2, p, li"), {
  //       scrollTrigger: {
  //         trigger: section1Ref.current,
  //         start: 'top 80%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       y: 40,
  //       scale: 0.98,
  //       duration: 0.8,
  //       ease: 'power3.out',
  //       stagger: 0.15,
  //     });

  //     gsap.from(section1Ref.current.querySelector(".image-container"), {
  //       scrollTrigger: {
  //         trigger: section1Ref.current,
  //         start: 'top 80%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       x: 100,
  //       rotationY: 15,
  //       duration: 1.2,
  //       ease: 'power3.out',
  //     });

  //     gsap.from(section1Ref.current.querySelector(".section1-button"), {
  //       scrollTrigger: {
  //         trigger: section1Ref.current.querySelector(".section1-button"),
  //         start: 'top 90%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       y: 30,
  //       duration: 0.7,
  //       ease: 'power2.out',
  //     });
  //   }

  //   if (section2Ref.current) {
  //     gsap.from(section2Ref.current.querySelectorAll("h2, p, li"), {
  //       scrollTrigger: {
  //         trigger: section2Ref.current,
  //         start: 'top 80%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       y: 40,
  //       scale: 0.98,
  //       duration: 0.8,
  //       ease: 'power3.out',
  //       stagger: 0.15,
  //     });

  //     gsap.from(section2Ref.current.querySelector(".model-container"), {
  //       scrollTrigger: {
  //         trigger: section2Ref.current,
  //         start: 'top 80%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       x: -100,
  //       rotationY: -15,
  //       duration: 1.2,
  //       ease: 'power3.out',
  //     });

  //     gsap.from(section2Ref.current.querySelector(".section2-button"), {
  //       scrollTrigger: {
  //         trigger: section2Ref.current.querySelector(".section2-button"),
  //         start: 'top 90%',
  //         toggleActions: "play none none reverse",
  //       },
  //       opacity: 0,
  //       y: 30,
  //       duration: 0.7,
  //       ease: 'power2.out',
  //     });
  //   }

  //   if (imageCardRef.current && imageRef.current) {
  //     const card = imageCardRef.current;
  //     const imageElement = imageRef.current;

  //     card.addEventListener('mouseenter', () => {
  //       gsap.to(card, {
  //         y: -10,
  //         boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(100,100,100,0.3)',
  //         duration: 0.4,
  //         ease: 'power2.out'
  //       });
  //       gsap.to(imageElement, {
  //         scale: 1.1,
  //         duration: 0.5,
  //         ease: 'power2.out'
  //       });
  //     });

  //     card.addEventListener('mouseleave', () => {
  //       gsap.to(card, {
  //         y: 0,
  //         boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  //         duration: 0.4,
  //         ease: 'power2.out'
  //       });
  //       gsap.to(imageElement, {
  //         scale: 1,
  //         duration: 0.5,
  //         ease: 'power2.out'
  //       });
  //     });
  //   }

  //   if (modelCanvasCardRef.current) {
  //     const card = modelCanvasCardRef.current;

  //     card.addEventListener('mouseenter', () => {
  //       gsap.to(card, {
  //         y: -10,
  //         boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(100,100,100,0.3)',
  //         duration: 0.4,
  //         ease: 'power2.out'
  //       });
  //     });

  //     card.addEventListener('mouseleave', () => {
  //       gsap.to(card, {
  //         y: 0,
  //         boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  //         duration: 0.4,
  //         ease: 'power2.out'
  //       });
  //     });
  //   }

  //   const buttons = document.querySelectorAll('button');
  //   buttons.forEach(button => {
  //     button.addEventListener('mousedown', () => {
  //       gsap.to(button, { scale: 0.95, duration: 0.2, ease: 'power2.out' });
  //     });
  //     button.addEventListener('mouseup', () => {
  //       gsap.to(button, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  //     });
  //     button.addEventListener('mouseleave', () => {
  //       gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
  //     });
  //     button.addEventListener('mouseenter', () => {
  //       gsap.to(button, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
  //     });
  //     button.addEventListener('mouseleave', () => {
  //       gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
  //     });
  //   });

  // }, []);

  return (
    <section className="bg-white py-24 font-serif overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <h1
          ref={mainTitleRef}
          className="text-center text-4xl md:text-5xl font-bold font-serif text-blackish mb-10 md:mb-20"
        >
          Customize Van
        </h1>

        {/* SECTION 1: Customize Your Dream Van */}
        <div ref={section1Ref} className="relative mb-16 md:mb-32 w-full mx-auto" style={{ maxWidth: '1320px' }}>
          <div className="relative w-full md:w-11/12 bg-black/75 rounded-2xl md:rounded-none" style={{ height: 'auto', minHeight: '400px' }}>
            {/* The image container for mobile is now inside to maintain flow */}
            <div className="block md:hidden w-full h-80 px-4 py-6">
              <div
                className="bg-white p-1 w-full h-full"
                style={{
                  borderRadius: '30px',
                  border: '2px solid #464444ff',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="w-full h-full overflow-hidden" style={{ borderRadius: '28px' }}>
                  <img
                    src="/images/custom4.jpg"
                    alt="Custom van interior"
                    width={500}
                    height={500}
                    quality={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
 <div className="h-full flex flex-col md:flex-row items-center p-8 md:p-12 z-20">
      <div className="text-white w-full md:w-1/2 pr-0 md:pr-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
          Customize Your Dream Van
        </h2>

        {/* Text content with toggle */}
        <div
          className={`space-y-4 text-sm md:text-xl font-normal text-white/90 overflow-hidden transition-all duration-500 ${
            !expanded ? "max-h-[130px]" : "max-h-[1000px]"
          }`}
        >
          <p>
            When you give us 4-5 months, we design and build your custom camper
            van from scratch, the way you want it:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              3D renderings to help you visualise your future van before we even
              pick up a tool.
            </li>
            <li>
              3D Scanning, engineered CAD modelling (of your layout), and
              manufacturing in Automated CNC machines.
            </li>
            <li>Every cabinet, seat, and bed is built for your layout.</li>
            <li>
              Power, water, and heating systems are set up for real off-grid
              living.
            </li>
            <li>
              Interior finishes that look like a home, not like a cargo van.
            </li>
          </ul>
          <p>
            Start by filling out our TEST. We’ll ask a few questions and then
            give you a real estimate of what your dream van will cost.
          </p>
        </div>

        {/* See More / See Less button */}
        <div className="flex justify-center md:justify-start pt-4">
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className={`
                        relative z-10 cursor-pointer
                        flex items-center justify-center
                        px-4 py-2
                        bg-black text-white rounded-lg
                        font-semibold text-sm
                        transition-all duration-300
                        shadow-lg
                        transform
                        hover:scale-[1.02] hover:bg-gray-800
                        active:scale-[0.98]
                      `}
                    >
                      {expanded ? (
                       <>
                                                 Show Less <ChevronUp className="ml-2 h-4 w-4" />
                                               </>
                                             ) : (
                                               <>
                                                 See More <ChevronDown className="ml-2 h-4 w-4" />
                                               </>
                      )}
                    </button>
                  </div>
      </div>
    </div>
          </div>

          {/* This container is for desktop only, using absolute positioning */}
          <div
            ref={imageCardRef}
            className="hidden md:block absolute top-[45%] right-0 transform -translate-y-1/2 z-10"
            style={{
              width: '500px',
              height: '500px',
              right: 'calc(-600px + 50%)'
            }}
          >
            <div
              className="bg-white p-1 w-full h-full"
              style={{
                borderRadius: '30px',
                border: '2px solid #464444ff',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="w-full h-full overflow-hidden" style={{ borderRadius: '28px' }}>
                <img
                  ref={imageRef}
                  src="/images/custom4.jpg"
                  alt="Custom van interior"
                  width={500}
                  height={500}
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="w-full text-center md:text-left mt-6 px-8 md:px-12">
         <Link to={"/inquiry"}>
            <button
              className="section1-button cursor-pointer bg-black text-white font-sans font-bold text-sm px-5 py-2.5 rounded-md hover:bg-opacity-80"
              style={{  height: '39px', fontSize: '14px', lineHeight: '100%', letterSpacing: '0%' }}
            >
              Order Custom Build
            </button></Link>
          </div>
        </div>

        {/* SECTION 2: Try Our 3D Configurator */}
        <div ref={section2Ref} className="relative mt-16 md:mt-24 w-full mx-auto" style={{ maxWidth: '1320px' }}>
          <div className="relative w-full md:w-11/12 ml-auto bg-black/75 rounded-2xl md:rounded-none" style={{ height: 'auto', minHeight: '400px' }}>
            {/* Model container for mobile */}
            <div
              className="block md:hidden w-full h-80 px-4 py-6"
              ref={modelSectionRef}
            >
              <div
                className="bg-white p-1 w-full h-full"
                style={{
                  borderRadius: '30px',
                  border: '2px solid #cccccc',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Canvas camera={{ position: [7, 1.5, 3], fov: 50 }} style={{ borderRadius: '28px' }}>
                  <ambientLight intensity={0.7} />
                  <Environment files="./textures/zwartkops_straight_afternoon_1k.hdr" />
                  <Suspense fallback={<Html fullscreen><Loader /></Html>}>
                    <Center position={[0, 1.2, 0]}>
                      <VanPart modelPath="/models/AllColorGLB144/Van_Pebble.glb" triggerRef={modelSectionRef} index={0} initialRotation={[0, Math.PI / 8, -Math.PI / 32]} />
                      {parts.map((part, index) => (
                        <VanPart
                          key={index}
                          modelPath={part.modelPath}
                          assembledPos={part.assembledPos || [0, 0, 0]}
                          initialPos={part.initialPos}
                          rotation={part.rotation || [0, 0, 0]}
                          initialRotation={part.initialRotation || [0, 0, 0]}
                          triggerRef={modelSectionRef}
                          index={index + 1}
                        />
                      ))}
                    </Center>
                  </Suspense>
                  <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={12} />
                </Canvas>
              </div>
            </div>

            <div className="h-full flex flex-col md:flex-row items-center p-8 md:p-12 z-20 justify-end">
              <div className="text-white w-full md:w-1/2 pl-0 md:pl-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
                  Try Our 3D Configurator
                </h2>
                <div className="space-y-4 text-sm md:text-xl font-normal text-white/90">
                  <p>
                    Want to play around with ideas? Jump into our 3D Configurator and start designing your campervan.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Move things around, test different layouts, and see what feels right.</li>
                    <li>Select accessories in our configurator and see how they’ll look on your campervan in real-time.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* This container is for desktop only, using absolute positioning */}
          <div
            className="hidden md:block absolute top-[45%] left-0 transform -translate-y-1/2 z-10"
            ref={modelCanvasCardRef}
            style={{
              width: '500px',
              height: '500px',
              left: 'calc(-600px + 50%)'
            }}
          >
            <div
              className="bg-white p-1 w-full h-full"
              style={{
                borderRadius: '30px',
                border: '2px solid #cccccc',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Canvas camera={{ position: [7, 1.5, 3], fov: 50 }} style={{ borderRadius: '28px' }}>
                <ambientLight intensity={0.7} />
                <Environment files="./textures/zwartkops_straight_afternoon_1k.hdr" />
                <Suspense fallback={<Html fullscreen><Loader /></Html>}>
                  <Center position={[0, 1.2, 0]}>
                    <VanPart modelPath="/models/AllColorGLB144/Van_Pebble.glb" triggerRef={modelSectionRef} index={0} initialRotation={[0, Math.PI / 8, -Math.PI / 32]} />
                    {parts.map((part, index) => (
                      <VanPart
                        key={index}
                        modelPath={part.modelPath}
                        assembledPos={part.assembledPos || [0, 0, 0]}
                        initialPos={part.initialPos}
                        rotation={part.rotation || [0, 0, 0]}
                        initialRotation={part.initialRotation || [0, 0, 0]}
                        triggerRef={modelSectionRef}
                        index={index + 1}
                      />
                    ))}
                  </Center>
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={12} />
              </Canvas>
            </div>
          </div>

          <div className="w-full text-center md:text-right mt-6 px-8 md:px-12">
          <Link to={"/van"}>
            <button
              className="section2-button cursor-pointer bg-black text-white font-sans font-bold text-sm px-5 py-2 rounded-md hover:bg-opacity-80"
              style={{ height: '39px', fontSize: '14px', lineHeight: '100%', letterSpacing: '0%' }}
            >
              Try 3D Configurator
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}