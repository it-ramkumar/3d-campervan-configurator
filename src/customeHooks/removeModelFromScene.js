import { setAddedModels } from "../redux/slices/addedModels";

export const removeModelFromScene = (label, dispatch, currentModels) => {
  // 1. Remove the parent model
  console.log(currentModels, "currentModels before removal");
  let updated = currentModels.filter((m) => m.label !== label);

  // 2. Remove extensions linked to the parent model
  // updated = updated.filter((m) => {
  //   if (Array.isArray(m.extensionKey)) {
  //     return !m.extensionKey.includes(label); // If extensionKey contains parent label
  //   }
  //   return m.extensionKey !== label; // If it's a single string
  // });

  // 3. Save to Redux
  dispatch(setAddedModels(updated));
};
