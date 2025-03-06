import { useState, type FC } from "react";
import classes from "./QuestionMultichoice.module.scss";
import { type QuestionMultichoice } from "../../../../types/quiz/question";
import { useTranslation } from "react-i18next";
import Button from "../../../basicComponents/Button/Button";
import CheckBox from "../../../basicComponents/CheckBox/CheckBox";
import { useDispatch } from "react-redux";
import {
  saveAnswer,
  updateAnswerMultichoice,
} from "../../../../store/quizSlice";
import ErrorMessage from "../../../basicComponents/ErrorMessage/ErrorMessage";
import { inputSize } from "../../../basicComponents/FocusInput/FocusInput";

type props = {
  question: QuestionMultichoice;
  index: number;
  isLast?: boolean;
};
const QuestionMultichoice: FC<props> = ({
  question: { id, question, options, required },
  isLast = false,
  index,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isRadio = options.filter((o) => o.isCorrect).length == 1;
  const [error, setError] = useState<string>("");

  const nextQuestion = () => {
    if (required && !options.some((o) => o.checked)) {
      setError(t("validation.required"));
      return;
    }
    setError("");
    dispatch(saveAnswer({ index }));
  };

  return (
    <div className={classes.questionWrapper}>
      <label className={classes.question} htmlFor={`${id}`}>
        <span className={classes.number}>{index + 1}.</span>
        {question}
      </label>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <CheckBox
              id={option.id + "_option"}
              checked={option.checked ?? false}
              label={option.option}
              type={isRadio ? "radio" : "checkbox"}
              onChange={() => {}}
              onClick={() => {
                if (!options.some((o) => o.checked)) {
                  setError("");
                }
                dispatch(
                  updateAnswerMultichoice({
                    index,
                    optionId: option.id,
                    value: !option.checked,
                    isRadio: isRadio,
                  }),
                );
              }}
            />
          </li>
        ))}
      </ul>
      <span className={classes.errorContainer}>
        <ErrorMessage show={!!error} message={error} size={inputSize.lg} />
      </span>
      <Button classList={["btn-lg"]} id="btn" onClick={nextQuestion}>
        {t(isLast ? "finish" : "next")}
      </Button>
    </div>
  );
};

export default QuestionMultichoice;
