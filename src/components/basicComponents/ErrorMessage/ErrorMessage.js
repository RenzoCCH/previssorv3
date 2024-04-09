import FadeInOut from "../../AnimationComponents/FadeInOut/FadeInOut";
import { InputSize } from "../FocusInput/FocusInput";
import "./ErrorMessage.scss";

const ErrorMessage = ({
  show = false,
  message = "",
  el = "span",
  size = "",
}) => {
  return (
    <span
      className={`errorMessage ${
        size === InputSize.lg ? "errorMessage-lg" : ""
      }`}
    >
      <FadeInOut show={show} el={el}>
        {message}
      </FadeInOut>
    </span>
  );
};

export default ErrorMessage;
