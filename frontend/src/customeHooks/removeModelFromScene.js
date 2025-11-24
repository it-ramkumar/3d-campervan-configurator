import { setAddedModels } from "../redux/slices/addedModels";

export const removeModelFromScene = (label, dispatch, currentModels) => {
  // 1. Remove the parent model
  console.log(currentModels, "currentModels before removal");
  let updated = currentModels.filter((m) => m.label !== label);

  dispatch(setAddedModels(updated));
};
