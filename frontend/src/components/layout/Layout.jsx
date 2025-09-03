import { useState, useRef, useEffect } from "react";
import FeatureCard from "./LayoutFeaturedCard";
import VanModelCanvas from "./LayoutCanvas";
import { VanModel } from "../../ModelData";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchModelAll } from "../../api/model/modelAll";
import { FiMaximize, FiX, FiRotateCw, FiZoomIn, FiZoomOut } from "react-icons/fi";
import { Interior, System, Exterior } from "../../json data/dummy.json";
import Swal from 'sweetalert2';

const Layout = () => {
  const dispatch = useDispatch();
  const modelAll = useSelector((state) => state.models.modelAll || []);
  const selectModel = useSelector((state) => state.selectLayout.selectLayout);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef(null);

  const allDummy = [
    ...Exterior,
    ...Interior,
    ...System
  ]
  // console.log(modelAll,"all");
  if(modelAll?.data?.data?.length === 0){
console.log("No data found from API, showing dummy data");
  }
  // console.log(,"all");
  const filteredModel = VanModel?.filter((layout) => layout.layout === selectModel);
  const features = filteredModel?.[0]?.includes;

  const matchedModels = (modelAll?.data?.data ? modelAll.data.data : allDummy).filter((model) =>
    features?.some((feature) => feature === model.label)
  );

  useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(fetchModelAll());

      // Check if the action was rejected
      if (fetchModelAll.rejected.match(resultAction)) {
//        return Swal.fire({
//   text: resultAction.error.message,
//   icon: 'error',
// })
console.warn(resultAction.error.message,"error");
      }
      // else {
      //   console.log("Data fetched successfully:", resultAction.payload.success);
      // }

    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);


  const handleFullScreen = () => {
    if (canvasRef.current) {
      if (canvasRef.current.requestFullscreen) {
        canvasRef.current.requestFullscreen();
      } else if (canvasRef.current.webkitRequestFullscreen) {
        canvasRef.current.webkitRequestFullscreen();
      } else if (canvasRef.current.msRequestFullscreen) {
        canvasRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

const controlRef = useRef(null);

// Zoom In
// const handleZoomIn = () => {
//   if (controlRef.current) {
//     controlRef.current.zoomIn();
//   }
// };

// // Zoom Out
// const handleZoomOut = () => {
//   // console.log("Zooming out", controlRef.current);
//   if (controlRef.current) {

//     controlRef.current.zoomOut();
//   }
// };

// // Rotate
// const handleRotate = () => {
//   if (controlRef.current) {
//     controlRef.current.rotate();
//   }
// };


  return (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4 min-h-screen bg-white">
  {/* Canvas Section - Fixed on left for desktop */}
  <div
    ref={canvasRef}
    className={`
      md:col-span-9
      h-[50vh] md:h-screen md:sticky md:top-0
      flex flex-col justify-center items-center
      relative overflow-hidden
      text-white
    `}
  >
    {/* Buttons */}
    <div className="absolute left-4 top-4 flex flex-col gap-2 z-50 ">
      {!isFullScreen ? (
        <button
          onClick={handleFullScreen}
          className="bg-dark p-2 rounded-md shadow-md  transition-all duration-300 backdrop-blur-sm"
          title="Full Screen"
        >
          <FiMaximize size={20} className="" />
        </button>
      ) : (
        <button
          onClick={exitFullScreen}
          className=" bg-dark p-2 rounded-md shadow-md transition-all duration-300 backdrop-blur-sm"
          title="Exit Full Screen"
        >
          <FiX size={20} className="" />
        </button>
      )}
    </div>

    {/* 3D Controls */}
    {/* <div className="absolute right-4 top-4 flex flex-col gap-2 z-50 text-white">
      <button
        onClick={handleRotate}
        className="bg-dark p-2 rounded-md shadow-md hover:bg-[#D3DAD9] transition-all duration-300 backdrop-blur-sm"
        title="Rotate"
      >
        <FiRotateCw size={20} />
      </button>
      <button
        onClick={handleZoomIn}
        className="bg-dark p-2 rounded-md shadow-md hover:bg-[#D3DAD9] transition-all duration-300 backdrop-blur-sm"
        title="Zoom In"
      >
        <FiZoomIn size={20}  />
      </button>
      <button
        onClick={handleZoomOut}
        className="bg-dark p-2 rounded-md shadow-md hover:bg-[#D3DAD9] transition-all duration-300 backdrop-blur-sm"
        title="Zoom Out"
      >
        <FiZoomOut size={20}  />
      </button>
    </div> */}

    {/* Heading */}
    <h2 className="text-2xl md:text-4xl font-bold text-dark font-heading mb-4 text-center z-10">
   {filteredModel[0].layout}
    </h2>

    {/* Canvas with Loading State */}
    <div className="relative w-full h-4/4 flex items-center justify-center">

      <VanModelCanvas allModels={modelAll} controlRef={controlRef}/>
    </div>
  </div>

{!isFullScreen && (
  <div className="md:col-span-3 flex flex-col h-[50vh] md:h-screen">
<div className="text-xl font-bold bg-dark text-brand font-heading mb-4 text-center py-3 border-b">
<h2>
      Layout Parts
    </h2>
</div>


    {/* Scrollable Cards */}
   <div className="flex-1 overflow-y-auto pr-2 custom-scroll bg-white">
  <FeatureCard matchedModels={matchedModels} isLoading={isLoading}/>
</div>
    {/* Configure More Button Card - Sticky bottom */}
    <div className="sticky bottom-0 pt-3">
      <div
        className="
          w-full bg-dark shadow-md p-4
          flex flex-col items-center justify-center
          hover:shadow-lg transition-all duration-300
        "
      >
       <Link to={"/van"}>
        <button
          className="
           text-dark bg-brand font-heading font-semibold text-base
            px-6 py-2 rounded-md shadow
            hover:bg-brand hover:text-dark transition transform hover:-translate-y-0.5
          "
        >
          Configure More
        </button>
        </Link>

        {/* <p className="text-[#D3DAD9] text-xs mt-2 text-center">
          Customize further to make your van unique and beautiful
        </p> */}
      </div>
    </div>
  </div>
)}

</div>

  );
};

export default Layout;