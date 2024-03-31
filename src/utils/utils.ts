export const getPath = () => {
  const path = window.location.pathname.split("/").filter((p) => !!p);
  return path;
};
