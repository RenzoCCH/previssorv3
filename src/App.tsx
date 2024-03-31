import MainLayout from "./components/layouts/MainLayout/MainLayout";
import LoadingProvider from "./contexts/LoadingContext";
import useQuiz from "./hooks/useQuiz";
import Error from "./components/Error/Error";
import "./services/multiLangauge";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [quiz, error] = useQuiz("");

  return (
    <LoadingProvider appReady={!!quiz || !!error}>
      <MainLayout>
        {error && <Error message={error} />}
        {quiz && <Quiz quiz={quiz} />}
      </MainLayout>
    </LoadingProvider>
  );
}

export default App;
