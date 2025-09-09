import { useState, useEffect } from "react";
import { toggleModelSelection } from "../../customeHooks/toogleModelSelection";
import { isDependencyMet } from "../../customeHooks/isDependecyMet";
// import Swal from "sweetalert2";
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
import { componentsMap } from "../../ModelData";
import { handleGetQuote } from "../../customeHooks/handleQuote.js";
import { useNavigate } from "react-router-dom";
import GIFVanLoader from "../gif-van-loader/GifVanLoader.jsx";
import { Interior, System, Exterior } from "../../json data/dummy.json";



const MultiStepForm = ({
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  toggleExterior,
  sceneRef,
  cameraRef,
  modelRefs,
  orbitControlsRef


}) => {
  const dispatch = useDispatch()
  const router = useNavigate()
  const models = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels)
  // fallback if redux empty
  // console.log(models?.interior?.data.data,"models");
  const interior = models?.interior?.data.data ? models?.interior?.data.data : Interior;
  const exterior = models?.exterior?.data.data ? models?.exterior?.data.data : Exterior;
  const system   = models?.system?.data.data   ? models?.system?.data.data   : System;

  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  function attachComponentsToMetadata(metadataArray, components) {
    return metadataArray?.map(item => ({
      ...item,
      component: components[item.componentKey] || null
    }));
  }
  const interiorWithComponents = attachComponentsToMetadata(interior, componentsMap);
  const exteriorWithComponents = attachComponentsToMetadata(exterior, componentsMap);
  const systemWithComponents = attachComponentsToMetadata(system, componentsMap);

  const interiorSteps = Object.entries(groupByGroup(interiorWithComponents))
  const exteriorSteps = Object.entries(groupByGroup(exteriorWithComponents))
  const systemSteps = Object.entries(groupByGroup(systemWithComponents))


  useEffect(() => {
    const fetchData = async () => {
      let fetchingThunk;

      if (activeTab === "interior") {
        fetchingThunk = fetchInterior;
      } else if (activeTab === "exterior") {
        fetchingThunk = fetchExterior;
      } else if (activeTab === "system") {
        fetchingThunk = fetchSystem;
      }

      if (fetchingThunk) {
        try {
          const resultAction = await dispatch(fetchingThunk());

          // Check if action was rejected
          if (fetchingThunk.rejected.match(resultAction)) {
            // return Swal.fire({
            //   text: resultAction.error.message,
            //   icon: 'error',
            // })
            console.warn(resultAction.error.message,"error");
          }
          // else {
          //   console.log("Data fetched successfully:", resultAction.payload);
          // }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchData();
  }, [activeTab, dispatch]);



  let steps;
  if (activeTab === "interior") {
    steps = interiorSteps;
  } else if (activeTab === "exterior") {
    steps = exteriorSteps;
  } else {
    steps = systemSteps;
  }







  const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100);



  if (interior.length < 0 || !steps || steps.length === 0 || !steps[currentStep]) {
    return <GIFVanLoader />
  }
  return (
 <div className="md:h-screen h-full flex flex-col bg-brand overflow-hidden max-w-full">
  {/* Top Section */}
  <div className="shadow-md sticky top-0 z-30 w-full overflow-hidden">
    {/* Tabs */}
    <TabButtons
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setCurrentStep={setCurrentStep}
      toggleExterior={toggleExterior}
    />

    {/* Progress Bar */}
    <div className="w-full h-2 overflow-hidden">
      <div
        className="h-full bg-dark transition-all duration-500"
        style={{ width: `${progressPercent}%` }}
      />
    </div>

    {/* Heading */}
    <div className="p-3 text-center bg-white max-w-full overflow-hidden">
      <h2 className="text-lg md:text-xl font-bold text-dark font-heading capitalize break-words truncate">
        {steps[currentStep][0].replace(/-/g, " ")}
      </h2>
      <p className="text-sm md:text-xs text-dark font-body tracking-tighter break-words">
        {StepDescriptions[steps[currentStep][0]]}
      </p>
    </div>
  </div>

  {/* Cards Section */}
  <div className="flex-1 overflow-y-auto min-w-0">
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
  <div className="bg-dark shadow-inner sticky bottom-0 z-30 md:py-4 w-full overflow-hidden">
    <div className="flex justify-between gap-2 px-2">
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

    {/* Save & Get Quote Button */}
    <div className="w-full mt-3 p-1">
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
            dispatch
          )
        }
        className="w-full bg-brand text-dark font-semibold py-3 md:py-4 px-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-opacity-50 flex items-center justify-center space-x-2 cursor-pointer max-w-full break-words"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-sm md:text-base font-heading truncate">
          Save & Get a Quote
        </span>
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