import { useState, useEffect, useRef, useMemo } from "react";
import { toggleModelSelection } from "../../customeHooks/toogleModelSelection";
import { isDependencyMet } from "../../customeHooks/isDependecyMet";
import { StepDescriptions } from "../../customeHooks/stepDescription";
import { groupByGroup } from "../../customeHooks/groupByGroup";
import NextBackButton from "./MultiStepPaginationButtons";
import TabButtons from "./MultiStepTabButtons";
import ModelsCard from "./MultiStepCard";
import { goToNextStep } from "../../customeHooks/goToNextStep.js"
import { goToPrevStep } from "../../customeHooks/goToPrevStep.js"
import SummaryModal from "../summary-modal/SummaryModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterior } from "../../api/model/modelInterior.js";
import { fetchExterior } from "../../api/model/modelExterior.js";
import { fetchSystem } from "../../api/model/modelSystem.js";
import { handleGetQuote } from "../../customeHooks/handleQuote.js";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "./FullPageLoader.jsx"
import { useGLTF } from "@react-three/drei";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";

const MultiStepForm = ({
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  toggleExterior,
  sceneRef,
  cameraRef,
  modelRefs,
  orbitControlsRef,
  SantaMonica
}) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const models = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const interior = models?.interior?.data?.data;
  const exterior = models?.exterior?.data?.data;
  const system = models?.system?.data?.data;

  const cancelSourceRef = useRef(null);
  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsInitialLoading(true);
        await Promise.all([
          dispatch(fetchInterior()),
          dispatch(fetchExterior()),
          dispatch(fetchSystem())
        ]);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    loadAllData();
  }, [dispatch]);

  useEffect(() => {
    if (!isInitialLoading) {
      const allData = [...(interior || []), ...(exterior || []), ...(system || [])];
      allData.forEach((model) => {
        if (model?.glbFile) {
          try {
            useGLTF.preload(model.glbFile);
          } catch (e) {
            console.warn("Preload failed for:", model.glbFile);
          }
        }
      });
    }
  }, [isInitialLoading, interior, exterior, system]);

  const steps = useMemo(() => {
    if (activeTab === "interior") return Object.entries(groupByGroup(interior || []));
    if (activeTab === "exterior") return Object.entries(groupByGroup(exterior || []));
    return Object.entries(groupByGroup(system || []));
  }, [activeTab, interior, exterior, system]);

  const progressPercent = Math.round(((currentStep + 1) / (steps.length || 1)) * 100);

  if (isInitialLoading || !steps || steps.length === 0 || !steps[currentStep] || SantaMonica?.layout === null) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-3 lg:p-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm z-10">
        {/* Tabs */}
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentStep={setCurrentStep}
          toggleExterior={toggleExterior}
        />

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] lg:text-xs text-slate-400">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span className="text-cyan-400 font-medium">{progressPercent}%</span>
          </div>
        </div>

        {/* Step Title */}
        <div className="mt-2">
          <h2 className="text-sm lg:text-base font-bold text-white capitalize flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            {steps[currentStep][0].replace(/-/g, " ")}
          </h2>
          <p className="text-[10px] lg:text-xs text-slate-400 mt-0.5 line-clamp-1">
            {StepDescriptions[steps[currentStep][0]]}
          </p>
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="flex-1 overflow-hidden relative min-h-0">
        <ModelsCard
          steps={steps}
          currentStep={currentStep}
          activeTab={activeTab}
          isDependencyMet={isDependencyMet}
          toggleModelSelection={toggleModelSelection}
          addModelToScene={addModelToScene}
          getAddedQuantity={getAddedQuantity}
          removeModelFromScene={removeModelFromScene}
          cameraRef={cameraRef}
          modelRefs={modelRefs}
          orbitControlsRef={orbitControlsRef}
        />
      </div>

      {/* Fixed Footer with Navigation & Quote */}
      <div className="flex-shrink-0 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
        {/* Navigation Buttons - Horizontal Layout */}
        <div className="p-2 lg:p-3 border-b border-white/5">
          <div className="flex justify-between items-center gap-2">
            {/* Left Button */}
            <div className="flex-1">
              {activeTab === "exterior" && currentStep === 0 ? (
                <NextBackButton
                  onClick={() => {
                    toggleExterior(false);
                    setActiveTab("interior");
                    setCurrentStep(0);
                  }}
                  text="← Interior"
                  variant="secondary"
                />
              ) : activeTab === "system" && currentStep === 0 ? (
                <NextBackButton
                  onClick={() => {
                    toggleExterior(true);
                    setActiveTab("exterior");
                    setCurrentStep(0);
                  }}
                  text="← Exterior"
                  variant="secondary"
                />
              ) : (
                <NextBackButton
                  onClick={() => goToPrevStep(setCurrentStep, currentStep)}
                  disabled={currentStep === 0}
                  text="← Previous"
                  variant="secondary"
                />
              )}
            </div>

            {/* Right Button */}
            <div className="flex-1 flex justify-end">
              {activeTab === "interior" && currentStep === steps.length - 1 ? (
                <NextBackButton
                  onClick={() => {
                    toggleExterior(true);
                    setActiveTab("exterior");
                    setCurrentStep(0);
                  }}
                  text="Exterior →"
                  variant="primary"
                />
              ) : activeTab === "exterior" && currentStep === steps.length - 1 ? (
                <NextBackButton
                  onClick={() => {
                    setActiveTab("system");
                    setCurrentStep(0);
                  }}
                  text="System →"
                  variant="primary"
                />
              ) : currentStep === steps.length - 1 ? (
                <NextBackButton
                  text="Summary →"
                  onClick={() => setSummaryModal(true)}
                  variant="accent"
                />
              ) : (
                <NextBackButton
                  onClick={() => goToNextStep(setCurrentStep, currentStep, steps)}
                  text="Next →"
                  variant="primary"
                />
              )}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="p-2 lg:p-3 bg-slate-800/50">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase">Selected Van</p>
              <h3 className="text-xs lg:text-sm font-bold text-white truncate">
                {SantaMonica?.layout || "Loading..."}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-slate-400 uppercase">Items</p>
              <div className="flex items-center gap-1 text-cyan-400 font-bold text-sm">
                <CheckCircle2 size={12} />
                <span>{addedModels.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              handleGetQuote(
                sceneRef,
                setUploadProgress,
                setIsUploading,
                setUploadSuccess,
                setModelUrl,
                addedModels,
                router,
                dispatch,
                cancelSourceRef
              )
            }
            disabled={isUploading}
            className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs lg:text-sm font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving... {uploadProgress}%</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Save & Get Quote</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Modal */}
      {summaryModal && (
        <SummaryModal
          SummaryModal={summaryModal}
          setSummaryModal={setSummaryModal}
          sceneRef={sceneRef}
          setUploadProgress={setUploadProgress}
          setIsUploading={setIsUploading}
          setUploadSuccess={setUploadSuccess}
          setModelUrl={setModelUrl}
        />
      )}
    </div>
  );
};

export default MultiStepForm;