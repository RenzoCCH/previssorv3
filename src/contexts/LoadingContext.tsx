import { FC, ReactNode, createContext, useEffect, useState } from "react";
import InitialLoading from "../components/LoadingComponents/InitialLoading/InitialLoading";

type props = {
  children: ReactNode;
};

export const LoadingContext = createContext({
  initLoading: true,
});

const LoadingProvider: FC<props> = ({ children }) => {
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setInitLoading(false), 1200);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        initLoading,
      }}
    >
      <>
        <InitialLoading in={initLoading} duration={0.5} />
        {children}
      </>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
