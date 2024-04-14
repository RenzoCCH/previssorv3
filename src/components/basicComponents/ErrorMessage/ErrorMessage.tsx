import { ReactElement, type ElementType, type FC } from "react";
import FadeInOut from "../../animations/FadeInOut";
import { inputSize } from "../FocusInput/FocusInput";
import classes from "./ErrorMessage.module.scss";

type props = {
  show: boolean;
  message: string;
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
        <span>{message}</span>
      </FadeInOut>
    </span>
  );
};

export default ErrorMessage;
