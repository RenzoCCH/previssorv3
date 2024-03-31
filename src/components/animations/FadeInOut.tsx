import { motion } from "framer-motion";
import { type FC, ReactElement } from "react";

type props = {
  wrapper: string;
  children: ReactElement;
  duration?: number;
};

const FadeInOut: FC<props> = ({ wrapper, children, duration = 0.5 }) => {
  const Wrapper = motion(wrapper);
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
    >
      {children}
    </Wrapper>
  );
};

export default FadeInOut;
