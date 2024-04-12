import { FC } from "react";
import { QuestionParagrah } from "../../../../types/quiz/question";
import { useTranslation } from "react-i18next";
import classes from "./QuestionParagraph.module.scss";
import Input from "../../../basicComponents/Input/Input";

type props = {
  question: QuestionParagrah;
  index: number;
};

const QuestionParagraphComponent: FC<props> = ({
  question: { required, id, question, response },
  index,
}) => {
  const { t } = useTranslation();

  let validate = {};
  if (required) {
    validate = {
      // response: Yup.string().max(3000).required(t("quiz.required")),
    };
  }
  return (
    <div className={classes.questionWrapper}>
      <label className={classes.question} htmlFor={`${id}`}>
        <span className={classes.number}>{index + 1}.</span>
        {question}
        <Input value={response} onChange id={`${id}`} contentEditable error="errokasjdf;lkjr"/>
      </label>
    </div>
  );
};

export default QuestionParagraphComponent;
