import { MAX_QUANTITY } from "./maxQuatity";
import { getAddedQuantity } from "./addQuantityToModel";
import { focusOnModel } from "./focusOnModel";
import { setAddedModels } from "../redux/slices/addedModels";

export const addModelToScene = (
  model,
  addedModels,
  dispatch,
  setActiveModelId,
  modelRefs,
  cameraRef,
  orbitControlsRef
) => {
  // 1️⃣ Quantity control
  const maxQty = MAX_QUANTITY[model.label] || 1;
  const currentQty = getAddedQuantity(model.label, addedModels);
  if (currentQty >= maxQty) return;

  // 2️⃣ Filter previous models if only 1 allowed
  let filtered = addedModels;
  if (maxQty === 1) {
    filtered = addedModels?.filter((m) => m.type !== model.type);
  }

  // 3️⃣ Clean model object (backend-based)
  const newModel = {
    ...model,
    id: model._id || `${model.label}-${model.type}-${model.group}`, // ✅ Use backend ID if exists
    modelUrl: model.glbFile || model.modelUrl, // ✅ Make sure your loader gets the correct link
    imageUrl: model.image || model.imageUrl,   // ✅ Optional (for thumbnails/UI)
    position: [0, 0, 0],
  };

  // 4️⃣ Debug (optional)

  // 5️⃣ Update active & redux state
  setActiveModelId(newModel.id);
  dispatch(setAddedModels([...filtered, newModel]));

  // 6️⃣ Optional: auto-focus on model after adding
  setTimeout(() => {
    const ref = modelRefs?.current[newModel?.id];
    if (ref && cameraRef?.current && orbitControlsRef?.current) {
      focusOnModel(newModel, ref, cameraRef.current, orbitControlsRef.current);
    }
  }, 100);
};
