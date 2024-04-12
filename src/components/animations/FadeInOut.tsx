import { AnimatePresence, motion } from "framer-motion";
import { type FC, ReactElement, ElementType } from "react";

type props = {
  show: boolean;
  children: ReactElement;
  className?: string;
  el?: ElementType;
  duration?: number;
};

const FadeInOut: FC<props> = ({
  show,
  children,
  className = "",
  el = "div",
  duration = 0.5,
}) => {
  const Wrapper = motion(el);
  return (
    <AnimatePresence>
      {show && (
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          className={className}
        >
          {children}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default FadeInOut;
