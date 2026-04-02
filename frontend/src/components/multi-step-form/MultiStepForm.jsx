"use client";
import { useState, useEffect, useMemo } from "react";
import { toggleModelSelection } from "@/CustomHooks/toogleModelSelection";
import { isDependencyMet } from "@/CustomHooks/isDependecyMet";
import { StepDescriptions } from "@/CustomHooks/stepDescription";
import { groupByGroup } from "@/CustomHooks/groupByGroup";
import NextBackButton from "./MultiStepPaginationButtons";
import TabButtons from "./MultiStepTabButtons";
import ModelsCard from "./MultiStepCard";
import { goToNextStep } from "@/CustomHooks/goToNextStep";
import { goToPrevStep } from "@/CustomHooks/goToPrevStep"
import SummaryModal from "../summary-modal/SummaryModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterior } from "@/api/model/modelInterior";
import { fetchExterior } from "@/api/model/modelExterior";
import { fetchSystem } from "@/api/model/modelSystem";
import { handleGetQuote } from "@/CustomHooks/handleQuote.js";
import Loader from "../Loader/Loader";
import { useGLTF } from "@react-three/drei";
import { Loader2, CheckCircle2, Sparkles, ShoppingCart } from "lucide-react";
import { Heading2, PrimaryButton, RichParagraph, SecondaryButton } from "../Common/Common";

const MultiStepForm = ({
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  toggleExterior,
  cameraRef,
  modelRefs,
  orbitControlsRef,
  BaseVan
}) => {
  const dispatch = useDispatch();
  const [showQuoteConfirm, setShowQuoteConfirm] = useState(false);
  const models = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const interior = models?.interior;
  const exterior = models?.exterior?.data;
  const system = models?.system?.data;
  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryModal, setSummaryModal] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          dispatch(fetchInterior()),
          dispatch(fetchExterior()),
          dispatch(fetchSystem())
        ]);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
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
  }, [loading, interior, exterior, system]);

  const steps = useMemo(() => {
    if (activeTab === "interior") return Object.entries(groupByGroup(interior || []));
    if (activeTab === "exterior") return Object.entries(groupByGroup(exterior || []));
    return Object.entries(groupByGroup(system || []));
  }, [activeTab, interior, exterior, system]);

  const progressPercent = Math.round(((currentStep + 1) / (steps.length || 1)) * 100);

  if (loading || !steps || steps.length === 0 || !steps[currentStep] || BaseVan?.layout === null) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        {/* <Loader /> */}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-secondary text-primary overflow-hidden relative">

      {/* Fixed Header */}
      <div className="flex-shrink-0 p-3 border-b border-primary bg-secondary z-10">
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentStep={setCurrentStep}
          toggleExterior={toggleExterior}
        />

        {/* Progress */}
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="h-full bg-primary rounded-lg transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-gray-500">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span className="text-primary font-medium">{progressPercent}%</span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-1 flex items-center justify-between">
           <div>
    <div className="flex items-center gap-1">
      <Sparkles size={14} className="text-primary block" />
      <Heading2
        text={steps[currentStep][0].replace(/-/g, " ")}
        className="!text-base  text-primary capitalize"
      />
    </div>
    <RichParagraph className="!text-sm  text-primary/70  line-clamp-1">
      {StepDescriptions[steps[currentStep][0]]}
    </RichParagraph>
  </div>

          {/* Mobile: Items Count Badge */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/5 text-xs text-primary">
            <CheckCircle2 size={12} className="text-primary" />
            <span>{addedModels.length} items</span>
          </div>
        </div>
      </div>

      {/* Cards Section */}
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

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-black/10 bg-white z-20 pb-[env(safe-area-inset-bottom)] lg:pb-0">
        <div className="p-3">
          <div className="flex justify-between items-center gap-3">
            {/* Back Button */}
            <div className="flex-1">
              {activeTab === "exterior" && currentStep === 0 ? (
                <SecondaryButton
                  onClick={() => {
                    toggleExterior(false);
                    setActiveTab("interior");
                    setCurrentStep(0);
                  }}
                  label="← Interior"
              className="w-full !py-2"
                />
              ) : activeTab === "system" && currentStep === 0 ? (
                <PrimaryButton
                  onClick={() => {
                    toggleExterior(true);
                    setActiveTab("exterior");
                    setCurrentStep(0);
                  }}
                  label="← Exterior"
                className="w-full !py-2"
                />
              ) : (
                <SecondaryButton
                  onClick={() => goToPrevStep(setCurrentStep, currentStep)}
                  disabled={currentStep === 0}
                  label="← Previous"
                className="w-full !py-2 !border-0"
                />
              )}
            </div>

            {/* Next Button */}
            <div className="flex-1">
              {activeTab === "interior" && currentStep === steps.length - 1 ? (
                <PrimaryButton
                  onClick={() => {
                    toggleExterior(true);
                    setActiveTab("exterior");
                    setCurrentStep(0);
                  }}
                  label="Exterior →"
                className="w-full !py-2"
                />
              ) : activeTab === "exterior" && currentStep === steps.length - 1 ? (
                <PrimaryButton
                  onClick={() => {
                    setActiveTab("system");
                    setCurrentStep(0);
                  }}
                  label="System →"
                className="w-full !py-2"
                />
              ) : currentStep === steps.length - 1 ? (
                <PrimaryButton
                  label="Summary →"
                  onClick={() => setSummaryModal(true)}
              className="w-full !py-2"
                />
              ) : (
                <PrimaryButton
                  onClick={() => goToNextStep(setCurrentStep, currentStep, steps)}
                  label="Next →"
                 className="w-full !py-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE: FAB for Quote */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowQuoteConfirm(true)}
          className="w-14 h-14 rounded-full bg-primary text-secondary shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-2 border-primary/20"
        >
          <ShoppingCart size={24} />
          {addedModels.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-primary text-sm font-bold flex items-center justify-center border-2 border-white">
              {addedModels.length}
            </span>
          )}
        </button>
      </div>

      {/* Quote Confirmation Modal */}
      {showQuoteConfirm && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 lg:hidden">
          <div className="w-full max-w-sm bg-gray-100 rounded-lg border border-black/10 p-6">
            <h3 className="text-xl font-bold text-primary mb-2">Get Your Quote</h3>
            <p className="text-sm text-primary/70 mb-6">
              You have {addedModels.length} items selected for {BaseVan?.layout || "your van"}.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowQuoteConfirm(false);
                  handleGetQuote(
                    addedModels,
                    dispatch,
                    BaseVan,
                    setLoading
                  );
                }}
                disabled={loading}
                className="w-full py-3 bg-primary text-secondary font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Saving...</>
                ) : (
                  <><Sparkles size={18} /> Save & Get Quote</>
                )}
              </button>

              <button
                onClick={() => setShowQuoteConfirm(false)}
                className="w-full py-3 bg-secondary text-primary font-medium rounded-lg hover:bg-primary/20 transition"
              >
                Continue Configuring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP: Quote Section */}
      <div className="hidden lg:block flex-shrink-0 border-t border-black/10 bg-gray-100 p-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-[10px] text-primary/70 uppercase">Selected Van</p>
            <p className="text-sm font-bold text-primary truncate max-w-[150px]">
              {BaseVan?.layout || "Base Van"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-primary/70 uppercase">Items</p>
            <div className="flex items-center gap-1 text-black font-bold">
              <CheckCircle2 size={14} />
              <span>{addedModels?.length}</span>
            </div>
          </div>
        </div>

        <PrimaryButton
          onClick={() => handleGetQuote(
            addedModels,
            dispatch,
            BaseVan,
            setLoading
          )}
          label= {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Saving...</>
          ) : (
            <><Sparkles size={16} /> Save & Get Quote</>
          )}
          disabled={loading}
          className="w-full py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        />

      </div>

      {/* Summary Modal */}
      {summaryModal && (
        <SummaryModal
          SummaryModal={summaryModal}
          setSummaryModal={setSummaryModal}
          BaseVan={BaseVan}
          addedModels={addedModels}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default MultiStepForm;