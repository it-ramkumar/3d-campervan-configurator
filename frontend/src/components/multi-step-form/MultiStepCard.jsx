import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TYPE_DEPENDENCIES } from '../../customeHooks/typeDependencyData';
import ImageWithSkeleton from '../../websiteComponents/components/Common/ImageWithSkeleton/ImageWithSkeleton.jsx';
import { AlertCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ModelsCard({
  steps,
  currentStep,
  toggleModelSelection,
  addModelToScene,
  getAddedQuantity,
  removeModelFromScene,
  cameraRef,
  modelRefs,
  orbitControlsRef
}) {
  const dispatch = useDispatch();
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const scrollRef = useRef(null);
  const [expandedCountertops, setExpandedCountertops] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      scrollRef.current.scrollLeft = 0;
      setActiveIndex(0);
    }
  }, [currentStep]);

  const toggleCountertopExpansion = (modelLabel) => {
    setExpandedCountertops(prev => ({
      ...prev,
      [modelLabel]: !prev[modelLabel]
    }));
  };

  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = window.innerWidth * 0.85; // 85vw card width
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, allModels.length - 1));
    }
  };

  const scrollToCard = (index) => {
    if (scrollRef.current && isMobile) {
      const cardWidth = window.innerWidth * 0.85;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const allModels = steps[currentStep][1].filter(model => model.type !== "countertop");

  // Desktop Layout - Vertical List
  if (!isMobile) {
    return (
      <div className="h-full overflow-y-auto p-3 space-y-2">
        {allModels.map((model) => {
          const modelDependencies = TYPE_DEPENDENCIES[model.type] || [];
          const missingDependencies = modelDependencies.filter(dep => {
            if (typeof dep === "string") {
              return !addedModels.some(m => m.type === dep || m.label === dep);
            } else if (typeof dep === "object") {
              const matchingModel = addedModels.find(m => m.type === dep.type);
              if (!matchingModel) return true;
              return Object.keys(dep.conditions).some(key => matchingModel[key] !== dep.conditions[key]);
            }
            return false;
          });

          const isDisabled = missingDependencies.length > 0;
          const isSelected = addedModels.some(m => m.label === model.label && m.type === model.type);

          return (
            <div
              key={model.label}
              onClick={() =>
                !isDisabled
                  ? toggleModelSelection(
                      model,
                      addModelToScene,
                      getAddedQuantity,
                      removeModelFromScene,
                      dispatch,
                      addedModels,
                      cameraRef,
                      modelRefs,
                      orbitControlsRef
                    )
                  : undefined
              }
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2
                ${isSelected
                  ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-white/5 border-transparent hover:border-white/20 hover:bg-white/10"
                }
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {/* Desktop Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 flex items-center justify-center">
                <ImageWithSkeleton
                  src={model.image}
                  alt={model.label}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h6 className="text-sm font-bold text-white truncate">{model.label}</h6>
                {model.description && (
                  <p className="text-xs text-slate-400 line-clamp-1">{model.description}</p>
                )}
                {isDisabled && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} />
                    <span>Requires: {missingDependencies.slice(0, 2).map(d => typeof d === "string" ? d : d.type).join(", ")}</span>
                  </p>
                )}
              </div>

              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${isSelected
                  ? "border-cyan-500 bg-cyan-500 text-slate-900"
                  : "border-slate-600"
                }
              `}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // MOBILE LAYOUT - SIDE BY SIDE (Horizontal Card)
  return (
    <div className="h-full flex flex-col">
      {/* Cards Container */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full flex overflow-x-auto snap-x snap-mandatory gap-3 px-[7.5vw]  no-scrollbar items-center"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {allModels.map((model, index) => {
            const modelDependencies = TYPE_DEPENDENCIES[model.type] || [];
            const missingDependencies = modelDependencies.filter(dep => {
              if (typeof dep === "string") {
                return !addedModels.some(m => m.type === dep || m.label === dep);
              } else if (typeof dep === "object") {
                const matchingModel = addedModels.find(m => m.type === dep.type);
                if (!matchingModel) return true;
                return Object.keys(dep.conditions).some(key => matchingModel[key] !== dep.conditions[key]);
              }
              return false;
            });

            const isDisabled = missingDependencies.length > 0;
            const isSelected = addedModels.some(m => m.label === model.label && m.type === model.type);
            const isActive = index === activeIndex;

            return (
              <div
                key={model.label}
                className="w-[85vw] h-[70%] flex-shrink-0 snap-center"
              >
                <div
                  onClick={() =>
                    !isDisabled
                      ? toggleModelSelection(
                          model,
                          addModelToScene,
                          getAddedQuantity,
                          removeModelFromScene,
                          dispatch,
                          addedModels,
                          cameraRef,
                          modelRefs,
                          orbitControlsRef
                        )
                      : undefined
                  }
                  className={`
                    h-full w-full flex flex-row rounded-2xl overflow-hidden border-2 transition-all duration-300
                    ${isSelected
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                      : "bg-slate-800 border-white/10"
                    }
                    ${isDisabled ? "opacity-60" : ""}
                    ${isActive ? "scale-100" : "scale-95 opacity-90"}
                  `}
                >
                  {/* LEFT SIDE - IMAGE (40%) */}
                  <div className="w-[40%] h-full bg-slate-900/50 relative flex items-center justify-center p-3 border-r border-white/5">
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageWithSkeleton
                        src={model.image}
                        alt={model.label}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Selected Badge on Image */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg border-2 border-slate-900">
                        <Check className="text-slate-900" size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE - TEXT & INFO (60%) */}
                  <div className="w-[60%] h-full p-4 flex flex-col justify-between bg-slate-800/30">
                    {/* Top: Title & Description */}
                    <div className="flex-1">
                      <h6 className="text-base font-bold text-white mb-2 line-clamp-1 leading-tight">
                        {model.label}
                      </h6>
                      {model.description && (
                        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                          {model.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom: Status Button */}
                    <div className="mt-3 flex-shrink-0">
                      {isDisabled ? (
                        <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2">
                          <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                          <p className="text-xs text-red-400 font-medium line-clamp-1">
                            Need: {typeof missingDependencies[0] === "string" ? missingDependencies[0] : missingDependencies[0]?.type}
                          </p>
                        </div>
                      ) : isSelected ? (
                        <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center gap-2">
                          <Check size={16} className="text-cyan-400" />
                          <p className="text-sm text-cyan-400 font-bold">Selected</p>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                          <p className="text-sm text-slate-300 font-medium">Tap to Select</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {allModels.length > 1 && (
          <>
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/95 text-white flex items-center justify-center disabled:opacity-0 transition-opacity z-10 border border-white/20 shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(allModels.length - 1, activeIndex + 1))}
              disabled={activeIndex === allModels.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/95 text-white flex items-center justify-center disabled:opacity-0 transition-opacity z-10 border border-white/20 shadow-lg backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {allModels.length > 1 && (
        <div className="flex justify-center gap-2 py-2 bg-slate-900 border-t border-white/5 flex-shrink-0">
          {allModels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${idx === activeIndex
                  ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
                }
              `}
            />
          ))}
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}