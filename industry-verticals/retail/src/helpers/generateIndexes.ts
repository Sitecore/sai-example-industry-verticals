export const generateIndexes = (index: number): string => {
  const updatedIndex = index + 1;
  return updatedIndex.toString().padStart(2, '0');
};
