import classes from "./MainLayout.module.scss";
import { FC, type ReactNode } from "react";
import Header from "../Header/Header";

type props = {
  children: ReactNode;
};

const MainLayout: FC<props> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
