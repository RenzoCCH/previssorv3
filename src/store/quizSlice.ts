import { QuestionStatus, StudenStatus } from "../types/enum";
import { QuizTaken } from "../types/quiz/quizTaken";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface QuizState {
  quiz: QuizTaken;
}

const initialState: QuizState = {
  quiz: {
    id: 0,
    name: "",
    lastName: "",
    questions: [],
    score: 0,
    email: "",
    studentStatus: StudenStatus.NEW,
    quizId: 0,
    studentId: 0,
    live: false,
    total: 0,
    currentQuestion: 0,
    dateStarted: null,
    dateCreated: null,
    dateUpdated: null,
    dateFinished: null,
    relativeTotal: null,
    relativeScore: null,
    duration: null,
  },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<QuizTaken>) => {
      state.quiz = action.payload;
    },
    saveAnswer: (
      state,
      {
        payload: { index, response },
      }: PayloadAction<{ index: number; response: string }>,
    ) => {
      // set answer on quesiton
      state.quiz.questions[index].response = response;
      // set question status
      state.quiz.questions[index].status = QuestionStatus.ANSWERED;
      //quiz, set current question
      state.quiz.currentQuestion = index + 1;
    },
    saveAnswerCheckbox: (
      state,
      {
        payload: { index, options },
      }: PayloadAction<{ index: number; options: Option[] }>,
    ) => {
      state.quiz.questions[index].options = options;
      state.quiz.questions[index].status = QuestionStatus.ANSWERED;
      //quiz, set current question
      state.quiz.currentQuestion = index + 1;
    },
  },
});

export const { set, saveAnswer, saveAnswerCheckbox } = quizSlice.actions;
export default quizSlice.reducer;
