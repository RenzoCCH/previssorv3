import MainLayout from "./components/layouts/MainLayout/MainLayout";
import LoadingProvider from "./contexts/LoadingContext";

function App() {
  // call API
  // show a loading test while
  // manage a status with redux
  // Render the components
  return (
    <LoadingProvider>
      <MainLayout>some chiasdfld</MainLayout>
    </LoadingProvider>
  );
}

export default App;
