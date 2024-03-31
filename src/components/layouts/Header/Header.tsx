/// <reference types="vite-plugin-svgr/client" />
import classes from "./Header.module.scss";
import SiteLogo from "../../../assets/icons/logo_rect.svg?react";
import { type FC, useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";

const Header: FC = () => {
  const { initLoading } = useContext(LoadingContext);

  return (
    <header className={classes.header}>
      <figure
        className={`${classes["header-logo"]} ${initLoading ? classes["header-logo-init-animation"] : ""}`}
        id="header-logo"
      >
        <SiteLogo />
      </figure>
    </header>
  );
};

export default Header;
