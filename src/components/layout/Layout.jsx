import { useState, useRef, useEffect } from "react";
import FeatureCard from "./LayoutFeaturedCard";
import VanModelCanvas from "./LayoutCanvas";
import { VanModel } from "../../ModelData";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchModelAll } from "../../api/model/modelAll";
import { FiMaximize, FiX } from "react-icons/fi";
import { Interior, System, Exterior } from "../../json data/dummy.json";
import Swal from "sweetalert2";

const allDummy = [...Exterior, ...Interior, ...System];

const Layout = () => {
  const dispatch = useDispatch();
  const { modelAll, loading } = useSelector((state) => state.models);
  const selectModel = useSelector((state) => state.selectLayout.selectLayout);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef(null);
  const controlRef = useRef(null);

  useEffect(() => {
    dispatch(fetchModelAll());
  }, [dispatch]);

  const filteredModel = VanModel?.filter((layout) => layout.layout === selectModel);

  // Handle case where filtered model is not found
  if (!filteredModel || filteredModel.length === 0) {
    return <div>Layout not found.</div>;
  }
  const currentLayout = filteredModel[0];
  const features = currentLayout.includes;

  const matchedModels =
    modelAll?.data?.data?.length > 0
      ? modelAll.data.data.filter((model) => features?.includes(model.label))
      : allDummy.filter((model) => features?.includes(model.label));

  const handleFullScreen = () => {
    if (canvasRef.current && canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4 min-h-screen bg-white">
      {/* Canvas Section */}
      <div
        ref={canvasRef}
        className={`md:col-span-9 h-[50vh] md:h-screen md:sticky md:top-0 flex flex-col justify-center items-center relative overflow-hidden text-white`}
      >
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-50">
          {!isFullScreen ? (
            <button onClick={handleFullScreen} title="Full Screen">
              <FiMaximize size={20} />
            </button>
          ) : (
            <button onClick={exitFullScreen} title="Exit Full Screen">
              <FiX size={20} />
            </button>
          )}
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-dark font-heading mb-4 text-center z-10">
          {currentLayout.layout}
        </h2>

        <div className="relative w-full h-4/4 flex items-center justify-center">
          {loading === "pending" ? (
            <div className="text-dark">Loading 3D model...</div>
          ) : (
            <VanModelCanvas allModels={modelAll} controlRef={controlRef} />
          )}
        </div>
      </div>

      {!isFullScreen && (
        <div className="md:col-span-3 flex flex-col h-[50vh] md:h-screen">
          <div className="text-xl font-bold bg-dark text-brand font-heading mb-4 text-center py-3 border-b">
            <h2>Layout Parts</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scroll bg-white">
            <FeatureCard matchedModels={matchedModels} isLoading={loading === "pending"} />
          </div>

          <div className="sticky bottom-0 pt-3">
            <div className="w-full bg-dark shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300">
              <Link to={"/van"}>
                <button>Configure More</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;