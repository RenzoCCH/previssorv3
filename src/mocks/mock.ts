import { QuizTaken } from "../types/quiz/quizTaken";
import { QuestionType } from "../types/enum";
import { Question } from "../types/quiz/question";

// functions takes and object and returns a QuizTaken object
export const mockQuizTaken = (data: Partial<QuizTaken>): QuizTaken => {
  const quizTaken = {
    ...data,
    questions: (data.questions || []).map((question: Partial<Question>) => ({
      ...question,
      type: question.type as QuestionType,
    })),
  };
  quizTaken.dateStarted = data.dateStarted ? new Date(data.dateStarted) : null;
  quizTaken.createdAt = data.createdAt ? new Date(data.createdAt) : null;
  quizTaken.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  quizTaken.dateFinished = data.dateFinished
    ? new Date(data.dateFinished)
    : null;
  return data as QuizTaken;
};
