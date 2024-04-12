import { ReactElement, type ElementType, type FC } from "react";
import FadeInOut from "../../animations/FadeInOut";
import { inputSize } from "../FocusInput/FocusInput";
import classes from "./ErrorMessage.module.scss";

type props = {
  show: boolean;
  message: ReactElement;
  el?: ElementType;
  size?: inputSize;
};
const ErrorMessage: FC<props> = ({
  show = false,
  message = "",
  el = "span",
  size = "",
}) => {
  return (
    <span
      className={`${classes.errorMessage} ${
        size === inputSize.lg ? classes["errorMessage-lg"] : ""
      }`}
    >
      <FadeInOut show={show} el={el}>
        {(message as ReactElement)}
      </FadeInOut>
    </span>
  );
};

export default ErrorMessage;
