type NormalizeDescriptionManager = (
  description?: string,
  crop?: boolean
) => string;

export const normalizeDescription: NormalizeDescriptionManager = (
  description?,
  crop?
) =>
  description && description.length > 0
    ? crop
      ? description.length > 100
        ? description.slice(0, 100) + "..."
        : description
      : description
    : "No description provided";
