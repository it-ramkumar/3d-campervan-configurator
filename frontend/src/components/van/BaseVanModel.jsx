"use client";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function BaseVanModel({ url, showExterior }) {
  const { scene } = useGLTF(url, "https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
  const { camera } = useThree();

  // Parts ke references ko track karne ke liye
  const partsRef = useRef({
    driverSide: null,
    passengerSide: null,
    roof: null,
    rearDoor: null,
  });

  // Vector variables (performance ke liye bahar define kiye hain)
  const meshWorldPosition = new THREE.Vector3();
  const vectorToCamera = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();
  const meshNormal = new THREE.Vector3();

  // 1. Initial Load par meshes ko identify karein (By Name)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        if (name.includes("driver_side")) partsRef.current.driverSide = child;
        if (name.includes("passenger_side")) partsRef.current.passengerSide = child;
        if (name.includes("top") || name.includes("roof")) partsRef.current.roof = child;
        if (name.includes("van_body004") || name.includes("rear")) partsRef.current.rearDoor = child;
      }
    });
  }, [scene]);

  const isFacingCamera = (mesh, normalDirection) => {
    if (!mesh) return false;
    mesh.getWorldPosition(meshWorldPosition);
    vectorToCamera.subVectors(camera.position, meshWorldPosition).normalize();
    normalMatrix.getNormalMatrix(mesh.matrixWorld);
    meshNormal.copy(normalDirection).applyMatrix3(normalMatrix).normalize();
    return meshNormal.dot(vectorToCamera) > 0.3;
  };

  // 2. Har frame par camera facing check karein
  useFrame(() => {
    if (!showExterior) {
      // Clipping Logic
      if (partsRef.current.driverSide)
        partsRef.current.driverSide.visible = !isFacingCamera(partsRef.current.driverSide, new THREE.Vector3(1, 0, 0));

      if (partsRef.current.passengerSide)
        partsRef.current.passengerSide.visible = !isFacingCamera(partsRef.current.passengerSide, new THREE.Vector3(-1, 0, 0));

      if (partsRef.current.roof)
        partsRef.current.roof.visible = !isFacingCamera(partsRef.current.roof, new THREE.Vector3(0, 1, 0));

      if (partsRef.current.rearDoor)
        partsRef.current.rearDoor.visible = !isFacingCamera(partsRef.current.rearDoor, new THREE.Vector3(0, 0, -1));
    } else {
      // Sab show kardo agar exterior view hai
      Object.values(partsRef.current).forEach(mesh => {
        if (mesh) mesh.visible = true;
      });
    }
  });

  return <primitive object={scene} />;
}