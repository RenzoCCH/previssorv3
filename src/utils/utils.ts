let lastId = 0;
export const getId = (prefix = "id") => {
  lastId++;
  return `${prefix}${lastId}`;
};
export const getPath = () => {
  const path = window.location.pathname.split("/").filter((p) => !!p);
  return path;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const delayExecution = (fn: Function, delay: number = 100) => {
  let doit: ReturnType<typeof setTimeout>;
  const delayed = () => {
    clearTimeout(doit);
    doit = setTimeout(fn, delay);
  };
  return delayed;
};
let doit: ReturnType<typeof setTimeout>;
// eslint-disable-next-line @typescript-eslint/ban-types
export const delayExecutionSync = (fn: Function, delay: number = 100) => {
  clearTimeout(doit);
  doit = setTimeout(fn, delay);
};
