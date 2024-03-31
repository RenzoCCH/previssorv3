import { useEffect, useState } from "react";
import { getQuiz } from ".././services/quizService";
import { type QuizTaken } from "../types/quiz/quizTaken";

export default function useQuiz(quizToken: string): [QuizTaken | null, string] {
  const [quiz, setQuiz] = useState<QuizTaken | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const quizData = await getQuiz(quizToken);
        setQuiz(quizData);
      } catch (e) {
        setError((e as Error).message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [quiz, error];
}
