import { FC } from "react";
import { Question } from "../../../types/quiz/question";
import classes from "./Question.module.scss";

type props = {
  question: Question;
};
const QuestionComponent: FC<props> = ({ question }) => {
  return (
    <div className={`${classes.card} ${classes.question}`}>
      {question.question}
    </div>
  );
};

export default QuestionComponent;
