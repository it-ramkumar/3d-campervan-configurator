import { TYPE_DEPENDENCIES } from "./typeDependencyData"

export const checkTypeDependencies = (model, currentModels) => {
    const requiredTypes = TYPE_DEPENDENCIES[model.type] || [];

    return requiredTypes.every((requiredType) =>
        currentModels.some((m) => m.type === requiredType)
    );
};