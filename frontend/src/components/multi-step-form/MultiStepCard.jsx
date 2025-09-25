import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TYPE_DEPENDENCIES } from '../../customeHooks/typeDependencyData';

export default function ModelsCard({
  steps,
  currentStep,
  activeTab,
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  const toggleCountertopExpansion = (modelLabel) => {
    setExpandedCountertops(prev => ({
      ...prev,
      [modelLabel]: !prev[modelLabel]
    }));
  };

  const groupedModels = steps[currentStep][1]
    .filter((model) => model.type !== "countertop")
    .reduce((groups, model) => {
      if (!groups[model.type]) {
        groups[model.type] = [];
      }
      groups[model.type].push(model);
      return groups;
    }, {});

  return (
    <div
      ref={scrollRef}
      className="md:max-h-[70vh] h-[33vh]"
    >
      {Object.keys(groupedModels).map((type) => (
        <div key={type} className="mb-6">
          <div className="">
            {groupedModels[type].map((model) => {
              // ======== DEPENDENCY CHECK ========
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
              // ======== END DEPENDENCY CHECK ========

              const isSelected = addedModels.some(
                (m) => m.label === model.label && m.type === model.type
              );
              const isCounterTop = model.type === "counter-top";

              const matchingExtensions = steps[currentStep][1].filter((ext) => {
                if (ext.type !== "countertop") return false;
                if (Array.isArray(ext.extensionKey)) {
                  return ext.extensionKey.includes(model.label);
                }
                return ext.extensionKey === model.label;
              });

              const hasExtensions = isCounterTop && matchingExtensions.length > 0;
              const isExpanded = expandedCountertops[model.label];

              return (
                <div key={model.label} className="mb-2 ">
                  {/* Main Model Card */}
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
                    className={`flex items-center bg-white justify-between p-2 rounded-2xl mb-2 shadow-sm cursor-pointer border-2 border-gray-50 transition-all
      ${isSelected ? " shadow-md" : " hover:border-gray-300"}`}
                  >
                    {/* Image */}
                    <div className="flex items-center space-x-4">
                      <img src={model.image} alt={model.label} className="w-10 h-10 object-contain" />
                      <div>
                        <h6 className="text-sm font-semibold">{model.label}</h6>
                        {model.description && <p className="text-gray-500 text-sm">{model.description}</p>}
                        {isDisabled && (
                          <p className="text-red-500 text-xs mt-1">
                            ⚠ {`You need to add ${missingDependencies
                              .map((d) => (typeof d === "string" ? d : d.type))
                              .join(", ")} first`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Selected Badge */}
                    {isSelected && <span className="">Selected</span>}
                  </div>

                  {/* Extensions */}
                  {hasExtensions && (
                    <div className="ml-6">
                      <div
                        className="flex justify-between items-center cursor-pointer text-sm font-medium mb-2"
                        onClick={() => toggleCountertopExpansion(model.label)}
                      >
                        <span>Extensions</span>
                        <span>{isExpanded ? "▲" : "▼"}</span>
                      </div>

                      {isExpanded && (
                        <div className="space-y-2">
                          {matchingExtensions.map((ext) => {
                            const extDependencies = TYPE_DEPENDENCIES[ext.type] || [];
                            const missingExtDeps = extDependencies.filter((dep) => {
                              if (typeof dep === "string") {
                                return !addedModels.some((m) => m.type === dep || m.label === dep);
                              } else if (typeof dep === "object") {
                                const matchingModel = addedModels.find((m) => m.type === dep.type);
                                if (!matchingModel) return true;
                                return Object.keys(dep.conditions).some(
                                  (key) => matchingModel[key] !== dep.conditions[key]
                                );
                              }
                              return false;
                            });

                            const isExtDisabled = missingExtDeps.length > 0;
                            const isExtSelected = addedModels.some(
                              (m) => m.label === ext.label && m.type === ext.type
                            );

                            return (
                              <div
                                key={ext.label}
                                onClick={() =>
                                  !isExtDisabled
                                    ? toggleModelSelection(
                                      ext,
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
                                className={`flex items-center justify-between p-3 rounded-2xl shadow-sm cursor-pointer border-2 transition-all
                  ${isExtSelected ? "border-black shadow-md" : "border-transparent hover:border-gray-300"}
                  ${isExtDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                <div className="flex items-center space-x-4">
                                  <img src={ext.image} alt={ext.label} className="w-16 h-16 object-contain" />
                                  <div>
                                    <h6 className="text-base font-medium">{ext.label}</h6>
                                    {ext.description && <p className="text-gray-500 text-sm">{ext.description}</p>}
                                  </div>
                                </div>
                                {isExtSelected ? <span className="text-lg">✔</span> : <span className="text-lg">☐</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>


              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
