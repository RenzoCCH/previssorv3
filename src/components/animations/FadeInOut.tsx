import { AnimatePresence, motion } from "framer-motion";
import { type FC, type ElementType, type ReactNode } from "react";

type props = {
  id?: string;
  show: boolean;
  children: ReactNode;
  className?: string;
  el?: ElementType;
  duration?: number;
};

const FadeInOut: FC<props> = ({
  id = "unique",
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
          key={id}
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
