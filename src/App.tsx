import MainLayout from "./components/layouts/MainLayout/MainLayout";
import LoadingProvider from "./contexts/LoadingContext";
import useQuiz from "./hooks/useQuiz";
import Error from "./components/Error/Error";
import "./services/multiLangauge";
import Quiz from "./components/Quiz/Quiz";

type props = {
  quizId: string;
  quizTakenId: string;
};
function App({ quizId, quizTakenId }: props) {
  const [quiz, error, loading] = useQuiz(quizId, quizTakenId);

  return (
    <LoadingProvider appReady={!loading}>
      <MainLayout>
        {error && <Error message={error} />}
        {quiz && <Quiz />}
      </MainLayout>
    </LoadingProvider>
  );
}

export default App;
