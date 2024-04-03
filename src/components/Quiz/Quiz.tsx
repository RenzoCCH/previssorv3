import { FC } from "react";
import { QuizTaken } from "../../types/quiz/quizTaken";
import classes from "./Quiz.module.scss";
import { AnimatePresence, motion } from "framer-motion";

type pros = {
  quiz: QuizTaken;
};
const Quiz: FC<pros> = ({ quiz }) => {
  console.log(quiz);

  return (
    <div className={classes.container}>
      <AnimatePresence>
        <motion.div
          key={quiz.questions[quiz.currentQuestion].id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          {quiz.questions[quiz.currentQuestion].question}
        </motion.div>
      </AnimatePresence>
      )
    </div>
  );
};

export default Quiz;
