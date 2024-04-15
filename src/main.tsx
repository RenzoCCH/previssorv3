import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.scss";
import { store } from "./store.ts";
import ResizeComponent from "./components/ResizeComponent/ResizeComponent.tsx";

const path = window.location.pathname.replace("/", "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App path={path} />
    <ResizeComponent />
  </Provider>
  // </React.StrictMode>,
);
