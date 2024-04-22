import { StudenStatus } from "../enum";
import { Question } from "./question";

export interface QuizTaken {
  id: string;
  name?: string;
  lastName?: string;
  questions: Question[];
  score?: number;
  email?: string;
  studentStatus: StudenStatus;
  quizId: number;
  studentId?: number;
  live?: boolean;
  total?: number;
  currentQuestion: number;
  dateStarted?: Date | null;
  dateCreated?: Date | null;
  dateUpdated?: Date | null;
  dateFinished?: Date | null;
  relativeTotal?: number | null;
  relativeScore?: number | null;
  duration?: number | null;
  title?: string;
  language: "en" | "es";
}
