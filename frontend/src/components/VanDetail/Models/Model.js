import React,{useState,useEffect,useRef} from 'react'
import {useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'



export default function Model({ url, setAvailableAnimations, activeAnims }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      setAvailableAnimations(Object.keys(actions));
      Object.values(actions).forEach(action => {
        action.stop().reset();
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
      });
    }
  }, [actions, setAvailableAnimations]);

  useEffect(() => {
    Object.keys(activeAnims).forEach((name) => {
      const action = actions[name];
      if (!action) return;
      action.paused = false;
      action.timeScale = activeAnims[name] ? 1 : -1;
      action.play();
    });
  }, [activeAnims, actions]);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x += (scene.position.x - center.x);
      scene.position.z += (scene.position.z - center.z);
      setTimeout(() => setReady(true), 150);
    }
  }, [scene]);

  return (
    <group ref={group} visible={ready} position={[0, -3, 0]}>
      <primitive object={scene} scale={0.004} />
    </group>
  )
}
