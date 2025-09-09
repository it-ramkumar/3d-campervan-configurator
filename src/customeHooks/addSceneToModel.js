
import { MAX_QUANTITY } from "./maxQuatity";
import { getAddedQuantity } from "./addQuantityToModel";
import { focusOnModel } from "./focusOnModel"
import { setAddedModels } from "../redux/slices/addedModels";

export const addModelToScene = (model, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef) => {
  const maxQty = MAX_QUANTITY[model.label] || 1;
  const currentQty = getAddedQuantity(model.label, addedModels);

  if (currentQty >= maxQty) return;

  let filtered = addedModels;


  if (maxQty === 1) {
    filtered = addedModels?.filter(m => m.type !== model.type);
  }

  const newModel = {
    ...model,     // Direct reference ke liye
      id: `${model.label}-${model.type}-${model.group}`,
    position: [0, 0, 0],
  };
// console.log(model,"model")
  setActiveModelId(newModel.id);
dispatch(setAddedModels([...filtered, newModel]))    ;
// console.log(newModel.id,"new id")
  setTimeout(() => {
    const ref = modelRefs?.current[newModel?.id];

    if (ref && cameraRef?.current && orbitControlsRef?.current) {
      focusOnModel(model, ref, cameraRef?.current, orbitControlsRef?.current);
    }
  }, 100);


};