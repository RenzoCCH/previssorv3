import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
} from "react";
import InitialLoading from "../components/LoadingComponents/InitialLoading/InitialLoading";

type props = {
  children: ReactNode;
  appReady: boolean;
};

export const LoadingContext = createContext({
  initLoading: true,
});
const LoadingProvider: FC<props> = ({ children, appReady = false }) => {
  const [initLoading, setInitLoading] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (appReady) {
      // if app ready and has not passed a second
      if (!timer.current) {
        setInitLoading(false);
      } else {
        timer.current = null;
      }
    } else {
      timer.current = setTimeout(() => {
        // if app not ready and has passed a second
        if (!timer.current) {
          setInitLoading(false);
        } else {
          timer.current = null;
        }
      }, 1200);
    }
  }, [appReady]);

  return (
    <LoadingContext.Provider
      value={{
        initLoading,
      }}
    >
      <>
        <InitialLoading in={initLoading} duration={0.5} />
        {appReady && children}
      </>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
