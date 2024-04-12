import { FC, Fragment } from "react";
import { Question } from "../../../types/quiz/question";
import classes from "./Question.module.scss";
import { QuestionType } from "../../../types/enum";
import QuestionParagraph from "./QuestionParagraph/QuestionParagraph";
import QuestionMultichoice from "./QuestionMultichoice/QuestionMultichoice";

type props = {
  question: Question;
  index: number;
};
const QuestionComponent: FC<props> = ({ question, index }) => {
  let QuestionTypeC: React.ElementType = Fragment;
  switch (question.type) {
    case QuestionType.MULTICHOICE:
      QuestionTypeC = QuestionMultichoice;
      break;
    case QuestionType.PARAGRAPH:
      QuestionTypeC = QuestionParagraph;
      break;
    default:
      throw new Error("Question should have a type");
  }

  return (
    <div className={classes.questionComponent}>
      <QuestionTypeC question={question} index={index} />
    </div>
  );
};

export default QuestionComponent;
