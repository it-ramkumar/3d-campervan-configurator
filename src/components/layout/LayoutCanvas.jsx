import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Environment,
} from "@react-three/drei";
import { centerModelByBoundingBox } from "../../customeHooks/centerCanvas";
import { VanModel, componentsMap } from "../../ModelData";
import White_Van from "../van-model-components/VanModel";
import { useDispatch, useSelector } from "react-redux";
import { setAddedModels } from "../../redux/slices/addedModels";
import { fetchModelAll } from "../../api/model/modelAll";
import { Interior, System, Exterior } from "../../json data/dummy.json";
import Drag from "../drag/drag";



const LayoutCanvas = ({allModels}) => {


  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const selectModel = useSelector((state) => state.selectLayout.selectLayout);
  // const allModels = useSelector((state) => state.models.modelAll || []);
  const groupRef = useRef();
  const modelRefs = useRef({});
  const dispatch = useDispatch();
  const allDummy = [
    ...Exterior,
    ...Interior,
    ...System
  ]
  useEffect(() => {
    centerModelByBoundingBox(groupRef);
  }, [groupRef]);

  // useEffect(() => {
  //   const loadData = async () => {

  //     try {
  //       await dispatch(fetchModelAll()).unwrap();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadData();
  // }, []);

  useEffect(() => {
    if (!(allModels?.data?.data || allDummy) || !selectModel) return;

    const filterLayout = VanModel.filter((layout) => layout.layout === selectModel);
    if (!filterLayout?.[0]?.includes) return;

    const allowedLabels = filterLayout[0].includes.map((item) => item.trim().toLowerCase());

     let layoutPartsData = (allModels.data.data || allDummy).filter((model) => {
      const modelLabel = model?.label?.trim().toLowerCase();
      return allowedLabels.includes(modelLabel);
    });

    const layoutPartsAttachWithCom = layoutPartsData.map((model) => ({
      ...model,
      component: componentsMap[model.componentKey] || null,
    }));

    dispatch(setAddedModels(layoutPartsAttachWithCom));
  }, [allModels, selectModel]);


  return (
<>

    <Canvas className="cursor-pointer"

      camera={{ position: [0, 2, 6], fov: 50, near: 0.1, far: 1000 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <Environment
        files="./textures/zwartkops_straight_afternoon_1k.hdr"
        background={false}
        environmentIntensity={1.2}
      />

      <Suspense
        fallback={
          <Html fullscreen>
            <div className="w-full h-full flex items-center justify-center">
              <p className="mt-4 text-[#44444E] font-medium bg-none">
                Good things take time — your model is on the way! Please wait a moment.
              </p>
            </div>
          </Html>
        }
      >
        <group ref={groupRef} position={[0, -1.3, 0]}>
          {addedModels.length > 0 ? (
            <>
              <White_Van />
              {addedModels?.map((model) => {
                const ModelComponent = model?.component;
                const modelId = model?.id || `${model.label}-${model.type}-${model.group}`;

                if (!ModelComponent) return null;

                return (
                  <group
                    key={modelId}
                    ref={(el) => {
                      if (el && model.id) modelRefs.current[model?.id] = el;
                    }}
                    position={model.position}
                  >
                    <ModelComponent
                      castShadow
                      receiveShadow
                      scale={model?.scale}
                      rotation={model?.rotation}
                    />
                  </group>
                );
              })}
            </>
          ) : (
            <Html fullscreen>
              <div className="w-full h-full flex items-center justify-center">
                <p className="mt-4 text-[#44444E] font-medium bg-none">
                  Your layout doesn’t contain any parts at the moment. Please click "Configure More" to begin creating your beautiful van.
                </p>
              </div>
            </Html>
          )}
        </group>
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.7}
        autoRotate={false}
      />
    </Canvas>
    <Drag />
    </>
  );
};

export default LayoutCanvas;
