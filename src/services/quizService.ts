import { QuizTaken } from "../types/quiz/quizTaken";
import i18next from "i18next";
import { localRestore } from "../utils/storage";
import { GraphQLClient, gql } from "graphql-request";
import { setToken } from "../utils/utils";
import mockQuiz from "../mocks/quiztaken.json";
import { mockQuizTaken } from "../mocks/mock";

interface ResponseError extends Error {
  status?: number;
  response?: { errors: [{ extensions: { code: string } }] };
}

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL);

export const getQuiz = async (
  quizId: string,
  quizTakenId: string,
): Promise<QuizTaken> => {
  try {
    const query = gql`
      query getQuizTakenById($quizId: ID!, $quizTakenId: ID!) {
        quizTaken(quizId: $quizId, id: $quizTakenId) {
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

    const { quizTaken } = await client.request<{ quizTaken: QuizTaken }>(
      query,
      { quizId: quizId, quizTakenId: quizTakenId },
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

export const getQuizFromStore = async (
  quizId: string,
  quizTakenId: string,
): Promise<QuizTaken> => {
  let quiz: QuizTaken | null = localRestore(setToken(quizId, quizTakenId));

  if (!quiz) {
    if (import.meta.env.VITE_MOCK_ENABLED === "true") {
      quiz = mockQuizTaken(mockQuiz as unknown as Partial<QuizTaken>); // Use the mock data
    } else {
      quiz = await getQuiz(quizId, quizTakenId);
    }
  }

  return quiz;
};

export const startQuiz = async (quizTakenId: string) => {
  try {
    const query = gql`
      mutation StartQuizTaken($quizTakenId: ID!) {
        startQuizTaken(quizTakenId: $quizTakenId) {
          id
        }
      }
    `;

    await client.request<{ quizTaken: QuizTaken }>(query, {
      quizTakenId: quizTakenId,
    });
  } catch (e) {
    let message = i18next.t("error.no_server");
    const code = (e as ResponseError).response?.errors?.[0].extensions?.code;
    if (code === "NOT_FOUND") {
      message = i18next.t("error.not_found");
    }
    throw new Error(message);
  }
};
