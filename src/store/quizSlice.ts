import { QuestionStatus, StudenStatus } from "../types/enum";
import { QuestionMultichoice, QuestionParagrah } from "../types/quiz/question";
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
    start: (state) => {
      state.quiz.studentStatus = StudenStatus.PROGRESS;
    },
    updateAnswer: (
      state,
      {
        payload: { index, response },
      }: PayloadAction<{ index: number; response: string }>
    ) => {
      (state.quiz.questions[index] as QuestionParagrah).response = response;
    },
    saveAnswer: (
      state,
      { payload: { index } }: PayloadAction<{ index: number }>
    ) => {
      // set question status
      state.quiz.questions[index].status = QuestionStatus.ANSWERED;
      if (index + 1 >= state.quiz.questions.length) {
        state.quiz.studentStatus = StudenStatus.FINISHED;
      }
      //quiz, set current question
      state.quiz.currentQuestion = index + 1;
    },
    updateAnswerMultichoice: (
      state,
      {
        payload: { index, optionId, value, isRadio },
      }: PayloadAction<{
        index: number;
        optionId: number;
        value: boolean;
        isRadio: boolean;
      }>
    ) => {
      const question = state.quiz.questions[index] as QuestionMultichoice;
      if (isRadio && !value) {
        return state;
      }
      question.options.forEach((o) => {
        if (o.id === optionId) {
          o.checked = value;
        } else if (isRadio) {
          o.checked = false;
        }
      });
    },
  },
});

export const { set, saveAnswer, updateAnswerMultichoice, start, updateAnswer } =
  quizSlice.actions;
export default quizSlice.reducer;
