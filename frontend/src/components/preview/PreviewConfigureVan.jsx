import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Next.js: useRouter()
import axios from "axios";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function PreviewPage() {
  const { id } = useParams();
  const mountRef = useRef();
  const [loading, setLoading] = useState(true);
console.log("Preview ID:", id);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    scene.add(light);

    const loader = new GLTFLoader();

    async function loadQuote() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/quote/preview/${id}`
        );
        const data = res.data;

        // 🔹 Load Base Van
        loader.load(`/models/base/${data.model.id}.glb`, (gltf) => {
          scene.add(gltf.scene);
        });

        // 🔹 Load Parts
        data.parts?.forEach((part) => {
          loader.load(`/models/parts/${part.id}.glb`, (gltf) => {
            const model = gltf.scene;
            if (part.position) model.position.set(...part.position);
            if (part.rotation) model.rotation.set(...part.rotation);
            scene.add(model);
          });
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching quote data:", err);
      }
    }

    loadQuote();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [id]);

  return (
    <div style={{ width: "100%", height: "100vh" }} ref={mountRef}>
      {loading && <p style={{ color: "white" }}>Loading preview...</p>}
    </div>
  );
}