// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit";
import { QuizTaken } from "../types/quiz/quizTaken";
import i18next from "i18next";
import { localRestore } from "../utils/storage";

interface ResponseError extends Error {
  status?: number;
}

// export const getQuiz = async (quizToken: string): Promise<QuizTaken> => {
//   try {
//     const url = import.meta.env.VITE_API + quizToken;
//     const response = await fetch(url);

//     if (!response.ok) {
//       const err: ResponseError = new Error(response.statusText);
//       err.status = response.status;
//       throw err;
//     }

//     const data = await response.json();
//     return data.quiz;
//   } catch (e) {
//     let message = i18next.t("error.no_server");
//     if ((e as ResponseError).status === 404) {
//       message = i18next.t("error.not_found");
//     }
//     throw new Error(message);
//   }
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getQuiz = async (quizToken: string): Promise<QuizTaken> => {
  try {
    const url = import.meta.env.VITE_GRAPHQL;
    const response = await fetch(url);

    if (!response.ok) {
      const err: ResponseError = new Error(response.statusText);
      err.status = response.status;
      throw err;
    }

    const data = await response.json();
    return data.quiz;
  } catch (e) {
    let message = i18next.t("error.no_server");
    if ((e as ResponseError).status === 404) {
      message = i18next.t("error.not_found");
    }
    throw new Error(message);
  }
};

export const getQuizFromStore = async (quizToken: string) => {
  let quiz = localRestore(quizToken);
  console.log("store", quiz);

  if (!quiz) {
    quiz = await getQuiz(quizToken);
  }
  return quiz;
};
