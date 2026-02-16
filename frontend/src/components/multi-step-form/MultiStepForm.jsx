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
// import Loader from "../../websiteComponents/components/Loader/Loader.jsx";

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

  // Redux States
  const models = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const interior = models?.interior?.data?.data;
  const exterior = models?.exterior?.data?.data;
  const system = models?.system?.data?.data;

  // Local States
  const cancelSourceRef = useRef(null);
  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  // Global Loading State
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 1. Initial Mega-Fetch: Teenon categories ek sath fetch hongi
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsInitialLoading(true);
        // Parallel fetching for performance
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

  // 2. Preloading logic: Jab data aa jaye toh background mein models preload karein
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

  // 3. Memoized Steps: Taaki tab switch hone par calculation fast ho
  const steps = useMemo(() => {
    if (activeTab === "interior") return Object.entries(groupByGroup(interior || []));
    if (activeTab === "exterior") return Object.entries(groupByGroup(exterior || []));
    return Object.entries(groupByGroup(system || []));
  }, [activeTab, interior, exterior, system]);

  const progressPercent = Math.round(((currentStep + 1) / (steps.length || 1)) * 100);

  // 4. Early Return for Loader: Jab tak saara data nahi milta
  if (isInitialLoading || !steps || steps.length === 0 || !steps[currentStep] || SantaMonica.layout === null || SantaMonica.layout === undefined || SantaMonica.layout.length === 0) {
    return <FullPageLoader />;
  }
  return (
 <div className="  rounded-xl">
  {/* Top Section */}
  <div className=" flex flex-col  bg-white  ">
    <div className="">
    {/* Tabs */}
    <TabButtons
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setCurrentStep={setCurrentStep}
      toggleExterior={toggleExterior}
    />

    {/* Progress Bar */}
    <div>
      <div
        className=" bg-dark p-1 my-1 rounded "
        style={{ width: `${progressPercent}%` }}
      />
    </div>

    {/* Heading */}
    <div className="flex flex-col justify-center items-center p-3">
   <div>
       <h2 className="text-lg text-dark ">
        {steps[currentStep][0].replace(/-/g, " ")}
      </h2>
   </div>
     <p className="text-sm text-gray-900 flex justify-center items-center">
        {StepDescriptions[steps[currentStep][0]]}
      </p>
    </div>
  </div>
  </div>


  {/* Cards Section */}
  <div className="bg-brand p-2 rounded-md lg:h-[49vh]  overflow-y-auto color-scroll">
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

  {/* Bottom Section */}
   <div className="flex justify-between p-2">
      {activeTab === "exterior" && currentStep === 0 ? (
        <NextBackButton
          onClick={() => {
            toggleExterior(false);
            setActiveTab("interior");
            setCurrentStep(0);
          }}
          text={"Interior"}
        />
      ) : activeTab === "system" && currentStep === 0 ? (
        <NextBackButton
          onClick={() => {
            toggleExterior(true);
            setActiveTab("exterior");
            setCurrentStep(0);
          }}
          text={"Exterior"}
        />
      ) : (
        <NextBackButton
          onClick={() => goToPrevStep(setCurrentStep, currentStep)}
          disabled={currentStep === 0}
          text={"Previous"}
        />
      )}

      {activeTab === "interior" && currentStep === steps.length - 1 ? (
        <NextBackButton
          onClick={() => {
            toggleExterior(true);
            setActiveTab("exterior");
            setCurrentStep(0);
          }}
          text={"Exterior"}
        />
      ) : activeTab === "exterior" && currentStep === steps.length - 1 ? (
        <NextBackButton
          onClick={() => {
            setActiveTab("system");
            setCurrentStep(0);
          }}
          text={"System"}
        />
      ) : currentStep === steps.length - 1 ? (
        <NextBackButton
          text={"Summary"}
          onClick={() => {
            setSummaryModal(true);
          }}
        />
      ) : (
        <NextBackButton
          onClick={() => goToNextStep(setCurrentStep, currentStep, steps)}
          text={"Next"}
        />
      )}
    </div>
  <div className="  flex flex-col   justify-between  bg-dark shadow-lg rounded-xl p-4">


    {/* Save & Get Quote Button */}

    <div className="flex justify-between">
          <h1 className="font-bold text-white text-base w-1/2">
{SantaMonica.layout}
    </h1>
      {/* <h1 className=" font-bold text-white text-base">
    $20,323,342
    </h1> */}
    </div>
     <div className="mt-2">
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
        className="px-3 py-1 text-sm rounded-full bg-white text-dark w-full shadow-sm"
        disabled={isUploading}
      >
        Save & Get a Quote
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