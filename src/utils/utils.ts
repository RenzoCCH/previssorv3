let lastId = 0;
export const getId = (prefix = "id") => {
  lastId++;
  return `${prefix}${lastId}`;
};
export const getPath = () => {
  const path = window.location.pathname.split("/").filter((p) => !!p);
  return path;
};
