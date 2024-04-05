import { FC, ReactNode } from "react";
import { QuizTaken } from "../../types/quiz/quizTaken";
import classes from "./Quiz.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import StartQuiz from "./StartQuiz/StartQuiz";
import { StudenStatus } from "../../types/enum";
import Question from "./Question/Question";
import Finish from "./Finish/Finish";

type pros = {
  quiz: QuizTaken;
};

const Quiz: FC<pros> = ({ quiz }) => {
  if (quiz.id === 0) {
    return null;
  }

  let card: ReactNode = <StartQuiz title={quiz.title} />;
  let key = `${StudenStatus.NEW}`;
  if (quiz.studentStatus === StudenStatus.PROGRESS) {
    card = <Question question={quiz.questions[quiz.currentQuestion]} />;
    key = `${quiz.questions[quiz.currentQuestion]}`;
  } else if (quiz.studentStatus === StudenStatus.FINISHED) {
    card = <Finish />;
    key = `${StudenStatus.FINISHED}`;
  }

  return (
    <div className={classes.container}>
      <AnimatePresence initial={false}>
        <motion.div
          className={classes.animation}
          key={key}
          initial={{ x: "100%", position: "absolute" }}
          animate={{ x: "0%", position: "relative" }}
          exit={{ x: "-100%", position: "absolute" }}
          transition={{ duration: 0.3 }}
        >
          {card}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
