export const deleteNullUndefinedValues = (obj: object) => {
  let newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key as keyof typeof newObj] == null) {
      delete newObj[key as keyof typeof newObj];
    }
  });
  return newObj;
};
