import { useEffect, useState } from "react";
import { getQuiz } from ".././services/quizService";
import { type QuizTaken } from "../types/quiz/quizTaken";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { set } from "../store/quizSlice";

export default function useQuiz(
  quizToken: string,
): [QuizTaken | null, string, boolean] {
  // const [quiz, setQuiz] = useState<QuizTaken | null>(null);
  const quiz = useSelector((state: RootState) => state.quiz.quiz);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const quizData = await getQuiz(quizToken);
        dispatch(set(quizData));
        // setQuiz(quizData);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [quiz, error, loading];
}
