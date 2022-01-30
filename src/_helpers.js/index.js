export const isEqual = (arr1, arr2, key) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((_, idx) => {
    return arr1[idx][key] === arr2[idx][key];
  });
};

export const exists = (arr, val, key) => {
  return [...arr].some(
    (item) => item[key].toLowerCase() === val.toLowerCase()
  );
}