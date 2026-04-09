"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./canvas"; // apna model component yahan import karo

export default function Scene() {
    return (
        <div className="w-full h-screen">
            <Canvas camera={{
                position: [20, 10, 20], fov: 50,
                far: 1000
            }} shadows={{ type: 'basic' }}>
                {/* Lights */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                />

                <Suspense fallback={null}>
                    <Model scale={0.005}  />
                </Suspense>

                {/* Controls */}
                <OrbitControls enableZoom={true} />

                {/* Environment for better rendering */}
                {/* <Environment preset="city" /> */}
            </Canvas>
        </div>
    );
}
