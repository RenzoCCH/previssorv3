import classes from "./MainLayout.module.scss";
const MainLayout = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default MainLayout;
