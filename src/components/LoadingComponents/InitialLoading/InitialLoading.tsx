import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import "./InitialLoading.scss";
import { LogoAnimation } from "./LogoAnimation/LogoAnimation";

type props = {
  in: boolean;
  duration: number;
};

const InitialLoading: FC<props> = ({ in: inProp, duration = 0.5 }) => {
  return (
    <AnimatePresence>
      {inProp && <LogoAnimation duration={duration} key="logo" />}
    </AnimatePresence>
  );
};

export default InitialLoading;
// scale(${transform.scale})
