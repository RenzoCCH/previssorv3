export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: Option[];
  response?: string;
  isCorrect?: boolean;
  points: number;
  progress?: number;
  time?: number;
  status: QuestionStatus;
  required: boolean;
  score?: number;
}
