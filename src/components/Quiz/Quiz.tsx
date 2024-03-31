import { FC } from "react";
import { QuizTaken } from "../../types/quiz/quizTaken";

type pros = {
  quiz: QuizTaken;
};
const Quiz: FC<pros> = ({ quiz }) => {
  return <div>{quiz.studentId}</div>;
};

export default Quiz;
