import React, { useEffect, useState, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, Html } from "@react-three/drei";
import BaseVanModel from "../van/BaseVanModel";
import PartModel from "./PartModel";

// Custom Modern Loader
const Loader3D = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  </Html>
);

export default function PreviewPage() {
  const { id } = useParams();
  const [quoteData, setQuoteData] = useState(null);
  const [baseVan, setBaseVan] = useState(null);
  const [partsData, setPartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchAllData() {
      try {
        setLoading(true);
        setError(null);
        const quoteRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/quote/preview/${id}`);
        const quote = quoteRes.data;
        setQuoteData(quote);

        const baseRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/add-base-van/${quote.model.id}`);
        setBaseVan(baseRes.data.data);

        const modelsRes = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/models/all`);
        const allModels = modelsRes.data.data;

        const filteredParts = quote.parts.map((p) => allModels.find((m) => m._id === p.id)).filter(Boolean);
        setPartsData(filteredParts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load configuration");
        setLoading(false);
      }
    }
    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono tracking-tighter">
        <div className="w-20 h-[1px] bg-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-load-slide"></div>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em]">Loading Configuration</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono tracking-tighter p-8">
        <div className="text-red-500 text-6xl mb-4">⚠</div>
        <p className="text-xl font-bold mb-2">Error Loading Configuration</p>
        <p className="text-zinc-500 text-sm mb-8">{error}</p>
        <Link to="/configurator">
          <button className="bg-white text-black px-8 py-3 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-200 transition-all">
            Back to Configurator
          </button>
        </Link>
      </div>
    );
  }

  if (!quoteData || !baseVan) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono tracking-tighter p-8">
        <div className="text-yellow-500 text-6xl mb-4">⚠</div>
        <p className="text-xl font-bold mb-2">No Configuration Found</p>
        <p className="text-zinc-500 text-sm mb-8">The requested configuration could not be found.</p>
        <Link to="/configurator">
          <button className="bg-white text-black px-8 py-3 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-200 transition-all">
            Back to Configurator
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex">
      {/* Scrollbar Hide Logic */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes load-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-load-slide { animation: load-slide 1.5s infinite linear; }
      `}</style>

      {/* --- Sidebar --- */}
      <aside
        className={`
          relative z-20 h-full bg-black border-r border-white/10
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          flex-shrink-0 overflow-y-auto no-scrollbar
          ${sidebarOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden'}
        `}
      >
        <div className={`p-8 w-full md:w-[400px] transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          {/* Mobile Close Button - Inside Sidebar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 z-50 bg-zinc-900 text-white w-10 h-10 flex items-center justify-center transition-all hover:bg-zinc-800 active:bg-zinc-700 border border-white/10 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <header className="mb-12">
            <h1 className="text-3xl font-black text-white uppercase leading-none italic">Van Build</h1>
            <p className="text-zinc-500 text-[10px] tracking-widest mt-2 uppercase underline underline-offset-4 decoration-zinc-800">Review Specification</p>
          </header>

          {/* Client Box */}
          <div className="mb-10 text-white">
            <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Customer Details</h3>
            <p className="text-xl font-bold italic">{quoteData?.name || 'N/A'}</p>
            <p className="text-sm text-zinc-400 mt-1">{quoteData?.email || 'N/A'}</p>
            <p className="text-sm text-zinc-400">{quoteData?.phone || 'N/A'}</p>
          </div>

          {/* Config Detail */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-5 border border-white/5">
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Base Vehicle</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Layout</p>
                  <p className="text-white text-sm font-medium">{baseVan?.layout || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Drive</p>
                  <p className="text-white text-sm font-medium">{baseVan?.spec?.drivetrain || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Year</p>
                  <p className="text-white text-sm font-medium">{baseVan?.modelYear || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase">Base Price</p>
                  <p className="text-white text-sm font-medium">${baseVan?.price?.toLocaleString() || '0'}</p>
                </div>
              </div>
            </div>

            {/* Selected Parts */}
            <div>
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Added Components</h3>
              {partsData.length > 0 ? (
                <div className="space-y-2">
                  {partsData.map((part) => (
                    <div key={part._id} className="group flex items-center justify-between bg-zinc-900/30 p-3 border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden">
                          <img src={part.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                        </div>
                        <div>
                          <p className="text-xs text-white font-bold">{part.label}</p>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">{part.category}</p>
                        </div>
                      </div>
                      {/* <p className="text-xs text-zinc-300 font-mono">${part.price}</p> */}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm italic">No components added</p>
              )}
            </div>
          </div>

          {/* Checkout Footer */}
          <div className="mt-12 pt-6 border-t border-white/10">
            {/* <div className="flex justify-between items-end mb-6">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none">Total Investment</span>
              <span className="text-3xl font-black text-white italic leading-none">
                ${((baseVan?.price || 0) + partsData.reduce((acc, curr) => acc + (curr.price || 0), 0)).toLocaleString()}
              </span>
            </div> */}
            <Link to={"/configurator"}>
              <button className="w-full bg-white text-black py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-[0.98]">
                Confirm Configuration
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* --- 3D Viewer Area --- */}
      <main className="relative flex-1 bg-[#0a0a0a] transition-all duration-500 overflow-hidden">

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex absolute top-0 left-0 z-40 bg-black text-white w-14 h-14 items-center justify-center transition-all hover:bg-zinc-900 active:bg-zinc-800 border-r border-b border-white/10"
        >
          {sidebarOpen ? (
            <span className="text-sm font-light tracking-widest uppercase italic">Close</span>
          ) : (
            <div className="flex flex-col gap-1.5 items-center">
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-4 h-[1px] bg-white"></span>
              <span className="w-6 h-[1px] bg-white"></span>
            </div>
          )}
        </button>

        {/* Mobile Open Button - Only shows when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-40 bg-black text-white w-12 h-12 flex items-center justify-center transition-all hover:bg-zinc-900 active:bg-zinc-800 border border-white/10 rounded"
          >
            <div className="flex flex-col gap-1.5 items-center">
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-4 h-[1px] bg-white"></span>
              <span className="w-6 h-[1px] bg-white"></span>
            </div>
          </button>
        )}

        <Canvas
          shadows
          flat
          camera={{ position: [8, 4, 8], fov: 45 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0a');
          }}
        >
          <Suspense fallback={<Loader3D />}>
            <OrbitControls
              key={sidebarOpen ? "open" : "closed"}
              makeDefault
              autoRotate={!sidebarOpen}
              autoRotateSpeed={0.4}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.2}
              minDistance={5}
              maxDistance={15}
              target={[0, 0, 0]}
            />

            <Stage environment="city" intensity={0.5} contactShadow={true} adjustCamera={true}>
              <group>
                {baseVan?.glbFileUrl && <BaseVanModel url={baseVan.glbFileUrl} />}
                {partsData.map((part) => (
                  part?.glbFile && <PartModel key={part._id} url={part.glbFile} />
                ))}
              </group>
            </Stage>
          </Suspense>
        </Canvas>

        {/* Floating Label (Bottom Right) */}
        <div className="absolute bottom-8 right-8 text-right pointer-events-none">
          <p className="text-white/10 text-7xl font-black uppercase italic leading-none select-none">
            {baseVan?.layout?.split(' ')[0] || 'VAN'}
          </p>
          <p className="text-white/40 text-[10px] tracking-[0.6em] uppercase mt-2">Precision Built</p>
        </div>
      </main>
    </div>
  );
}