import { FC } from "react";
import { useTranslation } from "react-i18next";
import classes from "./StartQuiz.module.scss";
import Button from "../../basicComponents/Button/Button";
import { useDispatch } from "react-redux";
import { start } from "../../../store/quizSlice";

type props = {
  title?: string;
};

const StartQuiz: FC<props> = ({ title }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const startQuiz = () => {
    dispatch(start());
  };
  return (
    <section className={`${classes.card} ${classes.startCard}`}>
      {title && <h1>{title}</h1>}
      <p>{t("start")}</p>
      <Button onClick={startQuiz} classList={["btn-lg"]}>
        {t("button")}
      </Button>
    </section>
  );
};

export default StartQuiz;
