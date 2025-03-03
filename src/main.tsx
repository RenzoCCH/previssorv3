import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.scss";
import { store } from "./store.ts";
import ResizeComponent from "./components/ResizeComponent/ResizeComponent.tsx";
import { getPath } from "./utils/utils.ts";

const path = getPath();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App quizId={path[0]} quizTakenId={path[1]} />
    <ResizeComponent />
  </Provider>,
  // </React.StrictMode>,
);
