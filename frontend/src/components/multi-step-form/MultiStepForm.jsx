import { useState, useEffect,useRef } from "react";
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
import { handleGetQuote } from "../../customeHooks/handleQuote.js";
import { useNavigate } from "react-router-dom";
import GIFVanLoader from "../gif-van-loader/GifVanLoader.jsx";
import { useGLTF } from "@react-three/drei";






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
  const dispatch = useDispatch()
  const router = useNavigate()
  const models = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels)
  const interior = models?.interior?.data.data ;
  const exterior = models?.exterior?.data.data;
  const system   = models?.system?.data.data   ;
 const cancelSourceRef = useRef(null);
  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  const interiorSteps = Object.entries(groupByGroup(interior))
  const exteriorSteps = Object.entries(groupByGroup(exterior))
  const systemSteps = Object.entries(groupByGroup(system))

// Helper to preload GLTF
const preloadGLTF = (url) => {
  try {
    useGLTF.preload(url); // ✅ drei preload, cache me store karega
    console.log("✅ Preloaded GLTF:", url);
  } catch (err) {
    console.warn("⚠️ Failed to preload GLTF:", url, err);
  }
};

useEffect(() => {
  const fetchAndPreload = async () => {
    let fetchingThunk;

    if (activeTab === "interior") fetchingThunk = fetchInterior;
    else if (activeTab === "exterior") fetchingThunk = fetchExterior;
    else if (activeTab === "system") fetchingThunk = fetchSystem;

    if (!fetchingThunk) return;

    try {
      const resultAction = await dispatch(fetchingThunk());

      if (fetchingThunk.rejected.match(resultAction)) {
        console.warn("❌ Fetch error:", resultAction.error.message);
        return;
      }

      const fetchedData = resultAction.payload?.data || [];
      console.log("✅ Data fetched for:", activeTab, "Models:", fetchedData.length);

      // 🔹 Preload GLTF models
      fetchedData.forEach((model) => {
        if (model?.glbFile) preloadGLTF(model.glbFile);

        // Optional: preload thumbnail
        if (model?.thumbnailUrl) {
          const img = new Image();
          img.src = model.thumbnailUrl;
        }
      });
    } catch (err) {
      console.error("⚠️ Unexpected error:", err);
    }
  };

  fetchAndPreload();
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

  if (interior?.length < 0 || !steps || steps.length === 0 || !steps[currentStep]) {
    return <GIFVanLoader />
  }
  return (
 <div className=" rounded-xl">
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
  <div className="bg-brand p-2 rounded-md lg:h-[50vh] h-[33vh] overflow-y-auto color-scroll">
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
     <div className="mt-4">
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
        className="px-3 py-2 text-sm rounded-full bg-white text-dark w-full shadow-sm"
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