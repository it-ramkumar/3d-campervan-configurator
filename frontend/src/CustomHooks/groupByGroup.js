export const groupByGroup = (models) =>
  (Array.isArray(models) ? models : []).reduce((acc, model) => {
    if (!acc[model?.group]) acc[model?.group] = [];
    acc[model?.group].push(model);
    return acc;
  }, {});
