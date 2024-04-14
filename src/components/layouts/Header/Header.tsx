/// <reference types="vite-plugin-svgr/client" />
import classes from "./Header.module.scss";
import SiteLogo from "../../../assets/icons/logo_rect.svg?react";
import { type FC, useContext, memo } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import FadeInOut from "../../animations/FadeInOut";
import { StudenStatus } from "../../../types/enum";

const Header: FC = memo(() => {
  const { initLoading } = useContext(LoadingContext);
  console.log("rendering Header");
  const { questions, currentQuestion, studentStatus } = useSelector(
    (state: RootState) => state.quiz.quiz
  );
  const size = questions.length;
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
        <ProgressBar total={size} current={currentQuestion} />
      </FadeInOut>
    </header>
  );
});

export default Header;
