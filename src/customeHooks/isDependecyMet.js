import { TYPE_DEPENDENCIES } from "./typeDependencyData"


export const isDependencyMet = (model, currentModels) => {
  const dependencyRules = TYPE_DEPENDENCIES[model.type];

  // If no dependencies, assume it's allowed
  if (!dependencyRules) return true;

  return dependencyRules.every((rule) => {
    // If it's just a string, treat as simple type match
    if (typeof rule === "string") {
      return currentModels.some((m) => m.type === rule);
    }

    // Structured rule: match type + conditions
    return currentModels.some((m) => {
      if (m.type !== rule.type) return false;

      if (rule.conditions) {
        return Object.entries(rule.conditions).every(
          ([key, val]) => m[key] === val
        );
      }

      return true;
    });
  });
};

