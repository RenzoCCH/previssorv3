import { type FC } from "react";
import classes from "./Finish.module.scss";
import { useTranslation } from "react-i18next";
import Confetti from "../../animations/Confetti/Confetti";

const Finish: FC = () => {
  const { t } = useTranslation();
  // display some comfeti
  return (
    <Confetti>
      <section className={`${classes.card} ${classes.startCard}`}>
        <h4>{t("thanks")}</h4>
      </section>
    </Confetti>
  );
};

export default Finish;
