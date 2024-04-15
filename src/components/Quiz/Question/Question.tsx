import { FC, Fragment, useEffect } from "react";
import classes from "./Question.module.scss";
import { QuestionType } from "../../../types/enum";
import QuestionParagraph from "./QuestionParagraph/QuestionParagraph";
import QuestionMultichoice from "./QuestionMultichoice/QuestionMultichoice";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { localStore } from "../../../utils/storage";

const QuestionComponent: FC = () => {
  const quiz = useSelector((state: RootState) => state.quiz.quiz);
  const { currentQuestion: index, questions } = quiz;

  useEffect(() => {
    localStore(quiz.id, quiz);
  }, [quiz]);

  const question = questions[index];
  if (!question) {
    return;
  }

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
  const isLast = index + 1 === questions.length;

  return (
    <div className={classes.questionComponent}>
      <QuestionTypeC question={question} index={index} isLast={isLast} />
    </div>
  );
};

export default QuestionComponent;
