import { setAddedModels } from "../redux/slices/addedModels";

export const removeModelFromScene = (label, dispatch, currentModels) => {
  // 1. Remove the parent model
  let updated = currentModels.filter((m) => m.label !== label);

  dispatch(setAddedModels(updated));
};
