import MainLayout from "./components/layouts/MainLayout/MainLayout";
import LoadingProvider from "./contexts/LoadingContext";
import useQuiz from "./hooks/useQuiz";
import Error from "./components/Error/Error";
import "./services/multiLangauge";
import Quiz from "./components/Quiz/Quiz";

type props = {
  path: string;
};
function App({ path }: props) {
  const [quiz, error, loading] = useQuiz(path);

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
