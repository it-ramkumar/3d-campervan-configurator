import { isDependencyMet } from "./isDependecyMet.js";
import { checkTypeDependencies } from "./checkTypeDependencies";
import { TYPE_CONFLICTS } from "./typeConflicts.js";
import { setAddedModels } from "../redux/slices/addedModels.js";
import Swal from "sweetalert2";

export const toggleModelSelection = (
  model,
  addModelToScene,
  getAddedQuantity,
  removeModelFromScene,
  dispatch,
  addedModels,
) => {
  const quantity = getAddedQuantity(model.label, addedModels);

  const maxQty = {
    awning: 2,
    "reading-light": 3,
  }[model.type] || 1;

  if (quantity > 0) {
    // Deselect the model
    removeModelFromScene(model.label, dispatch); // ✅ Fixed

    const updated = addedModels?.filter((m) => m.label !== model.label);

    const invalidModels = updated?.filter((m) => !isDependencyMet(m, updated));

    invalidModels?.forEach((invalid) =>
      removeModelFromScene(invalid.label, dispatch) // ✅ Fixed
    );

    const cleanedModels = updated?.filter((m) =>
      isDependencyMet(m, updated)
    );
    dispatch(setAddedModels(cleanedModels));
    return;
  } else {
    const conflictTypes = TYPE_CONFLICTS[model.type] || [];
    let updated = [...addedModels];

    if (conflictTypes.length > 0) {
      const filtered = updated?.filter(
        (m) => !conflictTypes?.includes(m.type)
      );
      const removed = updated?.filter((m) =>
        conflictTypes?.includes(m.type)
      );

      removed?.forEach((conflicted) => {
        removeModelFromScene(conflicted.label, dispatch); // ✅ Fixed
      });
      updated = filtered;
    } else if (maxQty === 1) {
      const filtered = updated?.filter((m) => m.type !== model.type);
      const removed = updated?.find((m) => m.type === model.type);
      if (removed) removeModelFromScene(removed.label, dispatch); // ✅ Fixed
      updated = filtered;
    }

    const canAdd = checkTypeDependencies(model.type, addedModels);
    if (!canAdd) {
      // alert("Please select kitchen first before adding this item.");
        return Swal.fire({
              text: "Please select kitchen first before adding this item.",
              icon: 'error',
            });
    }
    // --------------------------------------------------

   if (model.type === "counter-top") {
  // Find the existing countertop
  const existingCountertop = addedModels.find((m) => m.type === "countertop");

  if (existingCountertop) {
    // Remove the old countertop and its related models
    const filteredModels = addedModels.filter(
      (m) =>
        m.label !== existingCountertop.label &&
        !(Array.isArray(existingCountertop.extensionKey) &&
          existingCountertop.extensionKey.includes(m.label))
    );

    // Add the new countertop
    dispatch(setAddedModels([...filteredModels, model]));
    return;
  }
}

// If no existing countertop, just add normally
dispatch(setAddedModels([...addedModels, model]));



    const modelToAdd = {
      ...model,
      id: `${model.label}-${model.type}-${model.group}`,
    };

    addModelToScene(modelToAdd);
    updated.push(modelToAdd);

    dispatch(setAddedModels(updated));
  }
};
