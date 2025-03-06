import { QuestionStatus, StudenStatus } from "../types/enum";
import { QuestionMultichoice, QuestionParagrah } from "../types/quiz/question";
import { QuizTaken } from "../types/quiz/quizTaken";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: QuizTaken = {
  id: "0",
  name: "",
  lastName: "",
  questions: [],
  score: 0,
  email: "",
  studentStatus: StudenStatus.NEW,
  quizId: "0",
  studentId: "0",
  live: false,
  total: 0,
  currentQuestion: 0,
  dateStarted: null,
  createdAt: null,
  updatedAt: null,
  dateFinished: null,
  relativeTotal: null,
  relativeScore: null,
  duration: null,
  language: "en",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<QuizTaken>) => {
      state = action.payload;
      return state;
    },
    start: (state) => {
      state.studentStatus = StudenStatus.PROGRESS;
    },
    updateAnswer: (
      state,
      {
        payload: { index, response },
      }: PayloadAction<{ index: number; response: string }>,
    ) => {
      (state.questions[index] as QuestionParagrah).response = response;
    },
    saveAnswer: (
      state,
      { payload: { index } }: PayloadAction<{ index: number }>,
    ) => {
      // set question status
      state.questions[index].status = QuestionStatus.ANSWERED;
      if (index + 1 >= state.questions.length) {
        state.studentStatus = StudenStatus.FINISHED;
      }
      //quiz, set current question
      state.currentQuestion = index + 1;
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
      }>,
    ) => {
      const question = state.questions[index] as QuestionMultichoice;
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
