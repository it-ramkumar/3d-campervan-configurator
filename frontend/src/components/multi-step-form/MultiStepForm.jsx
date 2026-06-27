"use client";
import { useState, useEffect, useMemo } from "react";
import { toggleModelSelection } from "@/CustomHooks/toogleModelSelection";
import { isDependencyMet } from "@/CustomHooks/isDependecyMet";
import { StepDescriptions } from "@/CustomHooks/stepDescription";
import { groupByGroup } from "@/CustomHooks/groupByGroup";
import TabButtons from "./MultiStepTabButtons";
import ModelsCard from "./MultiStepCard";
import { goToNextStep } from "@/CustomHooks/goToNextStep";
import { goToPrevStep } from "@/CustomHooks/goToPrevStep";
import SummaryModal from "../summary-modal/SummaryModal";
import { useDispatch, useSelector } from "react-redux";
import { handleGetQuote } from "@/CustomHooks/handleQuote.js";
import { fetchAllConfiguratorData } from "@/api/model/modelAll";
import { useGLTF } from "@react-three/drei";
import { Loader2, CheckCircle2, Sparkles, ShoppingCart } from "lucide-react";

const MultiStepForm = ({
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  toggleExterior,
  cameraRef,
  modelRefs,
  orbitControlsRef,
  BaseVan,
}) => {
  const dispatch = useDispatch();
  const [showQuoteConfirm, setShowQuoteConfirm] = useState(false);
  const addedModels = useSelector((state) => state.addedModels.addedModels);

  const [localModels, setLocalModels] = useState({
    interior: [],
    exterior: [],
    system: []
  });

  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryModal, setSummaryModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUnifiedDataPayload = async () => {
      try {
        setLoading(true);
        const responseData = await fetchAllConfiguratorData();
        console.log(responseData, "models");
        const flatList = Array.isArray(responseData)
          ? responseData
          : (responseData?.data || []);
        setLocalModels({
          interior: flatList.filter(item => item?.category === "interior"),
          exterior: flatList.filter(item => item?.category === "exterior"),
          system: flatList.filter(item => item?.category === "system" || item?.category === "systems")
        });
      } catch (err) {
        console.error("Failed downloading single runtime profile context payload:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUnifiedDataPayload();
  }, []);

  useEffect(() => {
    if (!loading) {
      const allData = [
        ...(localModels.interior || []),
        ...(localModels.exterior || []),
        ...(localModels.system || []),
      ];
      allData.forEach((model) => {
        if (model?.glbFile) {
          try { useGLTF.preload(model.glbFile); } catch (e) {}
        }
      });
    }
  }, [loading, localModels]);

  const steps = useMemo(() => {
    if (activeTab === "interior") return Object.entries(groupByGroup(localModels.interior || []));
    if (activeTab === "exterior") return Object.entries(groupByGroup(localModels.exterior || []));
    return Object.entries(groupByGroup(localModels.system || []));
  }, [activeTab, localModels]);

  const progressPercent = Math.round(((currentStep + 1) / (steps.length || 1)) * 100);

  if (loading || !steps || steps.length === 0 || !steps[currentStep] || BaseVan?.layout === null) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: "#001F3D" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full animate-spin"
              style={{ border: "2px solid rgba(237,152,95,0.15)", borderTopColor: "#ED985F" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#ED985F]/60" />
            </div>
          </div>
          <span
            className="font-ui text-[9px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: "rgba(251,251,249,0.35)" }}
          >
            Assembling Build…
          </span>
        </div>
      </div>
    );
  }

  const navBtnBase = {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "10px",
    fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    transition: "all 0.2s",
    cursor: "pointer",
  };

  const primaryNavBtn = {
    ...navBtnBase,
    background: "#ED985F",
    color: "#fff",
    border: "none",
  };

  const secondaryNavBtn = {
    ...navBtnBase,
    background: "rgba(255,255,255,0.05)",
    color: "rgba(251,251,249,0.45)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative" style={{ background: "#001F3D", color: "#FBFBF9" }}>

      {/* Fixed Header */}
      <div
        className="flex-shrink-0 p-3 z-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentStep={setCurrentStep}
          toggleExterior={toggleExterior}
        />

        {/* Progress bar */}
        <div className="mt-3">
          <div
            className="h-[3px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, background: "#ED985F" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="font-ui text-[9px] uppercase tracking-wider" style={{ color: "rgba(251,251,249,0.3)" }}>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="font-ui text-[9px] font-semibold" style={{ color: "#ED985F" }}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Step title */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles size={12} style={{ color: "#ED985F" }} />
              <h2
                className="font-display font-bold leading-none tracking-wide capitalize truncate"
                style={{ fontSize: "1.1rem", color: "#FBFBF9" }}
              >
                {steps[currentStep][0].replace(/-/g, " ")}
              </h2>
            </div>
            <p
              className="font-ui line-clamp-1"
              style={{ fontSize: "11px", color: "rgba(251,251,249,0.4)" }}
            >
              {StepDescriptions[steps[currentStep][0]]}
            </p>
          </div>

          {/* Mobile item count */}
          <div
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0"
            style={{ background: "rgba(237,152,95,0.1)", border: "1px solid rgba(237,152,95,0.2)" }}
          >
            <CheckCircle2 size={11} style={{ color: "#ED985F" }} />
            <span className="font-ui text-[9px] font-semibold" style={{ color: "#ED985F" }}>
              {addedModels.length}
            </span>
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

      {/* Footer Nav */}
      <div
        className="flex-shrink-0 z-20 pb-[env(safe-area-inset-bottom)] lg:pb-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="p-3 flex gap-2">
          {/* Back / Prev button */}
          <div style={{ flex: 1 }}>
            {activeTab === "exterior" && currentStep === 0 ? (
              <button
                style={secondaryNavBtn}
                className="w-full"
                onClick={() => { toggleExterior(false); setActiveTab("interior"); setCurrentStep(0); }}
              >
                ← Interior
              </button>
            ) : activeTab === "system" && currentStep === 0 ? (
              <button
                style={secondaryNavBtn}
                className="w-full"
                onClick={() => { toggleExterior(true); setActiveTab("exterior"); setCurrentStep(0); }}
              >
                ← Exterior
              </button>
            ) : (
              <button
                style={currentStep === 0 ? { ...secondaryNavBtn, opacity: 0.3, cursor: "not-allowed" } : secondaryNavBtn}
                className="w-full"
                disabled={currentStep === 0}
                onClick={() => goToPrevStep(setCurrentStep, currentStep)}
              >
                ← Previous
              </button>
            )}
          </div>

          {/* Next / Forward button */}
          <div style={{ flex: 1 }}>
            {activeTab === "interior" && currentStep === steps.length - 1 ? (
              <button
                style={primaryNavBtn}
                className="w-full"
                onClick={() => { toggleExterior(true); setActiveTab("exterior"); setCurrentStep(0); }}
              >
                Exterior →
              </button>
            ) : activeTab === "exterior" && currentStep === steps.length - 1 ? (
              <button
                style={primaryNavBtn}
                className="w-full"
                onClick={() => { setActiveTab("system"); setCurrentStep(0); }}
              >
                System →
              </button>
            ) : currentStep === steps.length - 1 ? (
              <button
                style={primaryNavBtn}
                className="w-full"
                onClick={() => setSummaryModal(true)}
              >
                Summary →
              </button>
            ) : (
              <button
                style={primaryNavBtn}
                className="w-full"
                onClick={() => goToNextStep(setCurrentStep, steps)}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowQuoteConfirm(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 relative"
          style={{
            background: "#ED985F",
            boxShadow: "0 0 24px rgba(237,152,95,0.35)",
          }}
        >
          <ShoppingCart size={22} color="#fff" />
          {addedModels.length > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#FBFBF9", color: "#001F3D", border: "2px solid #001F3D" }}
            >
              {addedModels.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile quote confirm overlay */}
      {showQuoteConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-12 lg:hidden"
          style={{ background: "rgba(2,12,24,0.92)", backdropFilter: "blur(20px)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 z-10"
            style={{
              background: "#001F3D",
              border: "1px solid rgba(237,152,95,0.25)",
              boxShadow: "0 0 40px rgba(237,152,95,0.1)",
            }}
          >
            <p className="font-ui text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: "#ED985F" }}>
              Configuration
            </p>
            <h3 className="font-display text-2xl font-bold mb-1" style={{ color: "#FBFBF9" }}>
              Get Your Quote
            </h3>
            <p className="font-ui text-sm mb-6" style={{ color: "rgba(251,251,249,0.45)" }}>
              {addedModels.length} items selected for {BaseVan?.layout || "your van"}.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => { setShowQuoteConfirm(false); handleGetQuote(addedModels, dispatch, BaseVan, setLoading); }}
                disabled={loading}
                className="w-full py-3 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98]"
                style={{ background: "#ED985F", color: "#fff" }}
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Sparkles size={16} /> Save &amp; Get Quote</>}
              </button>
              <button
                onClick={() => setShowQuoteConfirm(false)}
                className="w-full py-3 rounded-xl font-ui font-medium text-[11px] uppercase tracking-[0.12em] transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(251,251,249,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Continue Configuring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Console Footer */}
      <div
        className="hidden lg:block flex-shrink-0 p-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="font-ui text-[8px] uppercase tracking-[0.25em] mb-0.5" style={{ color: "rgba(251,251,249,0.3)" }}>
              Selected Van
            </p>
            <p className="font-display text-base font-bold truncate max-w-[150px]" style={{ color: "#FBFBF9" }}>
              {BaseVan?.layout || "Base Van"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-ui text-[8px] uppercase tracking-[0.25em] mb-0.5" style={{ color: "rgba(251,251,249,0.3)" }}>
              Items
            </p>
            <div className="flex items-center justify-end gap-1" style={{ color: "#ED985F" }}>
              <CheckCircle2 size={13} />
              <span className="font-ui text-sm font-bold">{addedModels?.length}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleGetQuote(addedModels, dispatch, BaseVan, setLoading)}
          disabled={loading}
          className="w-full py-3 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
          style={{ background: "#ED985F", color: "#fff" }}
        >
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <><Sparkles size={15} /> Save &amp; Get Quote</>}
        </button>
      </div>

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
