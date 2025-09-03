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
      className="h-full overflow-y-auto color-scroll"
    >
      {Object.keys(groupedModels).map((type) => (
        <div key={type} className="mb-6">
          <div className="grid grid-cols-1 gap-5">
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
                <div
                  key={model.label}
                  className={`bg-white rounded-md border shadow-lg transition-all duration-200
                    ${isSelected ? 'shadow-dark' : 'border-none'}
                    ${isDisabled ? 'opacity-50' : 'hover:shadow-dark cursor-pointer'}`}
                >
                  {/* Main Model Card */}
                  <div
                    className={`flex items-center p-4 ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
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
                  >
                    {/* Image */}
                    <div className="relative flex-shrink-0 w-20 h-20">
                      <img
                        src={model.image}
                        alt={model.label}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-dark text-xs text-brand font-heading font-semibold px-2 py-1 rounded-md shadow-lg">
                          Selected
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 pl-2 text-dark">
                      <h6 className="text-md font-heading font-semibold ">
                        {model.label}
                      </h6>
                      {model.description && (
                        <p className="mt-1 text-xs tracking-tighter font-body">
                          {model.description}
                        </p>
                      )}
                      {isDisabled && (
                        <div className="mt-2 text-xs text-red-600 font-heading flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77-1.333.192-3 1.732-3z" />
                          </svg>
                          {`You need to add ${missingDependencies.map(d => typeof d === "string" ? d : d.type).join(", ")} first`}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Extensions */}
                  {hasExtensions && (
                    <div>
                      <div
                        className="flex items-center justify-between p-3 bg-dark cursor-pointer transition"
                        onClick={() => toggleCountertopExpansion(model.label)}
                      >
                        <span className="text-sm font-medium text-brand">Extensions</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-brand transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {isExpanded && (
                        <div className="p-3 bg-dark border-t border-brand">
                          {matchingExtensions.map((ext) => {
                            const extDependencies = TYPE_DEPENDENCIES[ext.type] || [];
                            const missingExtDeps = extDependencies.filter(dep => {
                              if (typeof dep === "string") {
                                return !addedModels.some(m => m.type === dep || m.label === dep);
                              } else if (typeof dep === "object") {
                                const matchingModel = addedModels.find(m => m.type === dep.type);
                                if (!matchingModel) return true;
                                return Object.keys(dep.conditions).some(key => matchingModel[key] !== dep.conditions[key]);
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
                                className={`flex items-center p-2 mb-2 last:mb-0 rounded-md transition-colors ${isExtDisabled ? 'opacity-50' : 'cursor-pointer'}`}
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
                              >
                                <div className="relative flex-shrink-0 w-12 h-12">
                                  <img
                                    src={ext.image}
                                    alt={ext.label}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                  <h6 className="text-sm font-medium text-brand truncate">{ext.label}</h6>
                                  {ext.description && (
                                    <p className="text-xs text-brand truncate">{ext.description}</p>
                                  )}
                                </div>
                                {isExtSelected ? (
                                  <div className="bg-brand text-dark text-xs font-medium px-2 py-1 rounded-md">
                                    ✔
                                  </div>
                                ) : (
                                  <div className={`w-5 h-5 rounded-md border-2 ${isExtDisabled ? 'border-brand' : 'border-brand'}`}></div>
                                )}
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
