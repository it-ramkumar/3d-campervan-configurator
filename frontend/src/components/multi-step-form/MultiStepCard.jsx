import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TYPE_DEPENDENCIES } from '../../CustomHooks/typeDependencyData';
import { ImageWithSkeleton } from '../Common/Common';
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
  const [showExtensionModal, setShowExtensionModal] = useState(null);

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
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
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

  // Extension Modal — dark studio theme
  const ExtensionModal = ({ model, onClose }) => {
    const extensions = getExtensionsForModel(model.label);
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: "#001F3D" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ED985F]" />

        {/* Header */}
        <div
          className="flex items-start justify-between p-4 mt-0.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p className="font-ui text-[9px] uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: "#ED985F" }}>
              Extensions
            </p>
            <h3 className="font-display text-xl font-bold" style={{ color: "#FBFBF9" }}>
              {model.label}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(251,251,249,0.5)",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Extensions list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {extensions.map((ext) => {
            const isExtSelected = addedModels.some(m => m.label === ext.label && m.type === ext.type);
            return (
              <div
                key={ext.label}
                onClick={() => toggleModelSelection(ext, addModelToScene, getAddedQuantity, removeModelFromScene, dispatch, addedModels, cameraRef, modelRefs, orbitControlsRef)}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200"
                style={
                  isExtSelected
                    ? {
                        background: "rgba(237,152,95,0.08)",
                        border: "1px solid rgba(237,152,95,0.35)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                <div
                  className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <ImageWithSkeleton src={ext.image} alt={ext.label} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-sm font-semibold mb-1 truncate" style={{ color: "#FBFBF9" }}>
                    {ext.label}
                  </p>
                  <p className="font-ui text-[11px] mb-2" style={{ color: "rgba(251,251,249,0.4)" }}>
                    Extension Option
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-ui text-[10px] font-semibold uppercase tracking-wider"
                    style={
                      isExtSelected
                        ? { background: "#ED985F", color: "#fff" }
                        : { background: "rgba(255,255,255,0.07)", color: "rgba(251,251,249,0.5)" }
                    }
                  >
                    {isExtSelected ? <><Check size={11} /> Selected</> : <><Plus size={11} /> Add</>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Done button */}
        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)" }}
        >
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.2em] transition-all active:scale-[0.98]"
            style={{ background: "#ED985F", color: "#fff" }}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Desktop Layout — dark studio
  if (!isMobile) {
    return (
      <div className="h-full overflow-y-auto p-3 space-y-2 dark-scrollbar">
        {regularModels.map((model) => {
          const modelDependencies = TYPE_DEPENDENCIES[model.type] || [];
          const missingDependencies = modelDependencies.filter(dep => {
            if (typeof dep === "string") return !addedModels.some(m => m.type === dep || m.label === dep);
            if (typeof dep === "object") {
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
                onClick={() => !isDisabled ? toggleModelSelection(model, addModelToScene, getAddedQuantity, removeModelFromScene, dispatch, addedModels, cameraRef, modelRefs, orbitControlsRef) : undefined}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: isSelected ? "rgba(237,152,95,0.07)" : "rgba(255,255,255,0.03)",
                  border: isSelected
                    ? "1px solid rgba(237,152,95,0.3)"
                    : "1px solid rgba(255,255,255,0.07)",
                  opacity: isDisabled ? 0.4 : 1,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              >
                {/* Thumbnail */}
                <div
                  className="w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <ImageWithSkeleton src={model.image} alt={model.label} click={true} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-ui text-sm font-semibold capitalize truncate mb-0.5"
                    style={{ color: "#FBFBF9" }}
                  >
                    {model.label}
                  </p>
                  {model.description && (
                    <p className="font-ui text-[11px] line-clamp-1" style={{ color: "rgba(251,251,249,0.4)" }}>
                      {model.description}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                  style={
                    isSelected
                      ? { background: "#ED985F", border: "none" }
                      : { background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }
                  }
                >
                  {isSelected && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
              </div>

              {/* Extensions link */}
              {hasExtensions && (
                <button
                  onClick={() => setShowExtensionModal(model)}
                  className="ml-3 mt-1.5 font-ui text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all"
                  style={{ color: "#ED985F", opacity: 0.7 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
                >
                  <Plus size={11} /> {extensions.length} Extension{extensions.length > 1 ? 's' : ''}
                </button>
              )}
            </div>
          );
        })}

        {showExtensionModal && (
          <ExtensionModal model={showExtensionModal} onClose={() => setShowExtensionModal(null)} />
        )}

        <style>{`
          .dark-scrollbar::-webkit-scrollbar { width: 3px; }
          .dark-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .dark-scrollbar::-webkit-scrollbar-thumb { background: rgba(237,152,95,0.25); border-radius: 99px; }
        `}</style>
      </div>
    );
  }

  // Mobile Layout — dark studio
  return (
    <>
      {showExtensionModal && (
        <ExtensionModal model={showExtensionModal} onClose={() => setShowExtensionModal(null)} />
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
                if (typeof dep === "string") return !addedModels.some(m => m.type === dep || m.label === dep);
                if (typeof dep === "object") {
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
                    onClick={() => !isDisabled ? toggleModelSelection(model, addModelToScene, getAddedQuantity, removeModelFromScene, dispatch, addedModels, cameraRef, modelRefs, orbitControlsRef) : undefined}
                    className="flex flex-row rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      background: isSelected ? "rgba(237,152,95,0.07)" : "rgba(255,255,255,0.04)",
                      border: isSelected
                        ? "1px solid rgba(237,152,95,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",
                      opacity: isDisabled ? 0.5 : isActive ? 1 : 0.85,
                      transform: isActive ? "scale(1)" : "scale(0.96)",
                      boxShadow: isSelected ? "0 0 20px rgba(237,152,95,0.1)" : "none",
                    }}
                  >
                    {/* Image */}
                    <div
                      className="w-[40%] aspect-square relative flex items-center justify-center p-3"
                      style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
                    >
                      <ImageWithSkeleton
                        src={model.image}
                        alt={model.label}
                        click={true}
                        className="max-w-full max-h-full object-contain"
                      />
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 w-6 h-6 rounded-lg flex items-center justify-center"
                          style={{ background: "#ED985F" }}
                        >
                          <Check color="#fff" size={13} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-[60%] p-3 flex flex-col justify-between">
                      <div>
                        <p className="font-ui text-sm font-semibold mb-1 line-clamp-1" style={{ color: "#FBFBF9" }}>
                          {model.label}
                        </p>
                        {model.description && (
                          <p className="font-ui text-[11px] line-clamp-1" style={{ color: "rgba(251,251,249,0.4)" }}>
                            {model.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-2">
                        {isDisabled ? (
                          <div
                            className="px-2 py-1 rounded-lg flex items-center gap-1"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            <AlertCircle size={10} style={{ color: "rgba(251,251,249,0.5)", flexShrink: 0 }} />
                            <p className="font-ui text-[10px]" style={{ color: "rgba(251,251,249,0.4)" }}>
                              Add {typeof missingDependencies[0] === "string" ? missingDependencies[0] : missingDependencies[0]?.type}
                            </p>
                          </div>
                        ) : isSelected ? (
                          <div
                            className="px-2 py-1 rounded-lg flex items-center justify-center gap-1"
                            style={{ background: "rgba(237,152,95,0.12)", border: "1px solid rgba(237,152,95,0.25)" }}
                          >
                            <Check size={11} style={{ color: "#ED985F" }} />
                            <p className="font-ui text-[10px] font-semibold" style={{ color: "#ED985F" }}>Selected</p>
                          </div>
                        ) : (
                          <div
                            className="px-2 py-1 rounded-lg text-center"
                            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            <p className="font-ui text-[10px]" style={{ color: "rgba(251,251,249,0.35)" }}>Tap to Select</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Extensions button */}
                  {hasExtensions && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowExtensionModal(model); }}
                      className="w-full mt-2 py-2 px-3 rounded-xl font-ui text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: "rgba(237,152,95,0.07)",
                        border: "1px solid rgba(237,152,95,0.2)",
                        color: "#ED985F",
                      }}
                    >
                      <Plus size={12} />
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
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center disabled:opacity-0 transition-all z-10"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(251,251,249,0.6)",
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollToCard(Math.min(regularModels.length - 1, activeIndex + 1))}
                disabled={activeIndex === regularModels.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center disabled:opacity-0 transition-all z-10"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(251,251,249,0.6)",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {regularModels.length > 1 && (
          <div
            className="flex justify-center gap-2 py-2 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {regularModels.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === activeIndex ? "24px" : "6px",
                  background: idx === activeIndex ? "#ED985F" : "rgba(255,255,255,0.15)",
                  boxShadow: idx === activeIndex ? "0 0 8px rgba(237,152,95,0.4)" : "none",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
