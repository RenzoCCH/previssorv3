import { QuizTaken } from "../types/quiz/quizTaken";
import i18next from "i18next";
import { localRestore } from "../utils/storage";
import { GraphQLClient, gql } from "graphql-request";

interface ResponseError extends Error {
  status?: number;
  response?: { errors: [{ extensions: { code: string } }] };
}

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL);

export const getQuiz = async (quizToken: string): Promise<QuizTaken> => {
  try {
    const query = gql`
      query getQuizTakenById($id: ID!) {
        quizTaken(id: $id) {
          id
          questions {
            id
            type
            question
            options {
              id
              option
              isCorrect
              checked
            }
            response
            required
          }
          email
          studentStatus
          quizId
          currentQuestion
          title
        }
      }
    `;
    ``;
    const { quizTaken } = await client.request<{ quizTaken: QuizTaken }>(
      query,
      { id: quizToken }
    );
    return quizTaken;
  } catch (e) {
    let message = i18next.t("error.no_server");
    const code = (e as ResponseError).response?.errors?.[0].extensions?.code;
    if (code === "NOT_FOUND") {
      message = i18next.t("error.not_found");
    }
    throw new Error(message);
  }
};

export const getQuizFromStore = async (quizToken: string) => {
  let quiz = localRestore(quizToken);

  if (!quiz) {
    quiz = await getQuiz(quizToken);
  }
  return quiz;
};

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
