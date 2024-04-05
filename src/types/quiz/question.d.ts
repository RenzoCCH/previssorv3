import { QuestionType } from "../enum";

interface QuestionBase {
  id: number;
  question: string;
  isCorrect?: boolean;
  points: number;
  progress?: number;
  time?: number;
  status: QuestionStatus;
  required: boolean;
  score?: number;
}

export interface QuestionParagrah extends QuestionBase {
  type: QuestionType.PARAGRAPH;
  response: string;
}
export interface QuestionMultichoice extends QuestionBase {
  type: QuestionType.MULTICHOICE;
  options: Option[];
}
export type Question = QuestionParagrah | QuestionMultichoice;
