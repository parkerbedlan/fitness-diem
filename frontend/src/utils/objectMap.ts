// https://stackoverflow.com/a/14810722/
export const objectMap = (
  obj: object,
  fn: (value?: any, key?: any, index?: number) => any
) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
