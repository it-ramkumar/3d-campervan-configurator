import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TYPE_DEPENDENCIES } from '../../customeHooks/typeDependencyData';
import ImageWithSkeleton from '../../websiteComponents/components/Common/ImageWithSkeleton/ImageWithSkeleton.jsx';
import { AlertCircle, Check, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(null); // null or model object

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
      setShowExtensionModal(null);
    }
  }, [currentStep]);

  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = window.innerWidth * 0.85;
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

  const allModels = steps[currentStep][1];
  const regularModels = allModels.filter(model => model.type !== "countertop");
  const countertopModels = allModels.filter(model => model.type === "countertop");

  const getExtensionsForModel = (modelLabel) => {
    return countertopModels.filter(ext => {
      if (Array.isArray(ext.extensionKey)) return ext.extensionKey.includes(modelLabel);
      return ext.extensionKey === modelLabel;
    });
  };

  // Extension Modal Component
  const ExtensionModal = ({ model, onClose }) => {
    const extensions = getExtensionsForModel(model.label);

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white">{model.label}</h3>
            <p className="text-sm text-slate-400">Select Extensions</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Extensions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {extensions.map((ext) => {
            const isExtSelected = addedModels.some(m => m.label === ext.label && m.type === ext.type);

            return (
              <div
                key={ext.label}
                onClick={() => {
                  toggleModelSelection(
                    ext,
                    addModelToScene,
                    getAddedQuantity,
                    removeModelFromScene,
                    dispatch,
                    addedModels,
                    cameraRef,
                    modelRefs,
                    orbitControlsRef
                  );
                }}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${isExtSelected
                    ? "bg-cyan-500/10 border-cyan-500/50"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                  }
                `}
              >
                <div className="w-20 h-20 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden">
                  <ImageWithSkeleton
                    src={ext.image}
                    alt={ext.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white mb-1">{ext.label}</h4>
                  <p className="text-sm text-slate-400 mb-2">Extension Option</p>
                  <div className={`
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                    ${isExtSelected
                      ? "bg-cyan-500 text-slate-900"
                      : "bg-white/10 text-slate-300"
                    }
                  `}>
                    {isExtSelected ? (
                      <><Check size={12} /> Selected</>
                    ) : (
                      <><Plus size={12} /> Tap to Add</>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Done Button */}
        <div className="p-4 border-t border-white/10 bg-slate-900">
          <button
            onClick={onClose}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Desktop Layout...
  if (!isMobile) {
    return (
      <div className="h-full overflow-y-auto p-3 space-y-2">
        {/* Desktop code same as before */}
        {regularModels.map((model) => {
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
          const extensions = getExtensionsForModel(model.label);
          const hasExtensions = extensions.length > 0;

          return (
            <div key={model.label}>
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
                  flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2
                  ${isSelected
                    ? "bg-cyan-500/10 border-cyan-500/50"
                    : "bg-white/5 border-transparent hover:border-white/20"
                  }
                  ${isDisabled ? "opacity-50" : ""}
                `}
              >
                <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0">
                  <ImageWithSkeleton src={model.image} alt={model.label} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="text-sm font-bold text-white truncate">{model.label}</h6>
                  {model.description && <p className="text-xs text-slate-400 line-clamp-1">{model.description}</p>}
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-cyan-500 bg-cyan-500 text-slate-900" : "border-slate-600"}
                `}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </div>

              {/* Desktop Extensions Button */}
              {hasExtensions && (
                <button
                  onClick={() => setShowExtensionModal(model)}
                  className="ml-4 mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Plus size={12} /> {extensions.length} Extensions Available
                </button>
              )}
            </div>
          );
        })}

        {/* Desktop Extension Modal */}
        {showExtensionModal && (
          <ExtensionModal
            model={showExtensionModal}
            onClose={() => setShowExtensionModal(null)}
          />
        )}
      </div>
    );
  }

  // MOBILE LAYOUT
  return (
    <>
      {/* Extension Modal */}
      {showExtensionModal && (
        <ExtensionModal
          model={showExtensionModal}
          onClose={() => setShowExtensionModal(null)}
        />
      )}

      <div className="h-full flex flex-col">
        {/* Cards Container */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full flex overflow-x-auto snap-x snap-mandatory gap-3 px-[7.5vw] py-2 no-scrollbar items-center"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {regularModels.map((model, index) => {
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
              const extensions = getExtensionsForModel(model.label);
              const hasExtensions = extensions.length > 0;

              return (
                <div key={model.label} className="w-[85vw] flex-shrink-0 snap-center">
                  {/* Main Card */}
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
                      flex flex-row rounded-2xl overflow-hidden border-2 transition-all duration-300
                      ${isSelected
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                        : "bg-slate-800 border-white/10"
                      }
                      ${isDisabled ? "opacity-60" : ""}
                      ${isActive ? "scale-100" : "scale-95 opacity-90"}
                    `}
                  >
                    {/* Image */}
                    <div className="w-[40%] aspect-square bg-slate-900/50 relative flex items-center justify-center p-3 border-r border-white/5">
                      <ImageWithSkeleton
                        src={model.image}
                        alt={model.label}
                        className="max-w-full max-h-full object-contain"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <Check className="text-slate-900" size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                      <div>
                        <h6 className="text-sm font-bold text-white mb-1 line-clamp-1">{model.label}</h6>
                        <p className="text-xs text-slate-400 line-clamp-2">{model.description}</p>
                      </div>

                      <div className="mt-2">
                        {isDisabled ? (
                          <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 flex items-center gap-1">
                            <AlertCircle size={10} className="text-red-400" />
                            <p className="text-[10px] text-red-400">Add {typeof missingDependencies[0] === "string" ? missingDependencies[0] : missingDependencies[0]?.type}</p>
                          </div>
                        ) : isSelected ? (
                          <div className="px-2 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center gap-1">
                            <Check size={12} className="text-cyan-400" />
                            <p className="text-xs text-cyan-400 font-bold">Selected</p>
                          </div>
                        ) : (
                          <div className="px-2 py-1 rounded bg-white/5 border border-white/20">
                            <p className="text-xs text-slate-300 text-center">Tap to Select</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Extensions Button - Outside Card */}
                  {hasExtensions && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExtensionModal(model);
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-700/50 border border-white/10 text-xs text-cyan-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-700 transition"
                    >
                      <Plus size={14} />
                      {extensions.length} Extension{extensions.length > 1 ? 's' : ''} Available
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {regularModels.length > 1 && (
            <>
              <button
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/95 text-white flex items-center justify-center disabled:opacity-0 transition-opacity z-10 border border-white/20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollToCard(Math.min(regularModels.length - 1, activeIndex + 1))}
                disabled={activeIndex === regularModels.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/95 text-white flex items-center justify-center disabled:opacity-0 transition-opacity z-10 border border-white/20"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {regularModels.length > 1 && (
          <div className="flex justify-center gap-2 py-2 bg-slate-900 border-t border-white/5 flex-shrink-0">
            {regularModels.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`
                  h-1.5 rounded-full transition-all duration-300
                  ${idx === activeIndex
                    ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                    : 'w-1.5 bg-slate-600'
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}