/// <reference types="vite-plugin-svgr/client" />
import classes from "./Header.module.scss";
import SiteLogo from "../../../assets/icons/logo_rect.svg?react";
import { type FC, useContext } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import FadeInOut from "../../animations/FadeInOut";
import { StudenStatus } from "../../../types/enum";

const Header: FC = () => {
  const { initLoading } = useContext(LoadingContext);
  const studentStatus = useSelector(
    (state: RootState) => state.quiz.studentStatus
  );
  const show = studentStatus !== StudenStatus.NEW;

  return (
    <header className={classes.header}>
      <figure
        className={`${classes["header-logo"]} ${initLoading ? classes["header-logo-init-animation"] : ""}`}
        id="header-logo"
      >
        <SiteLogo />
      </figure>
      <FadeInOut show={show} className={classes.progress}>
        <ProgressBar />
      </FadeInOut>
    </header>
  );
};

export default Header;
