import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FocusInput from "../FocusInput/FocusInput";
import classes from "./Input.module.scss";

const Input = forwardRef(
  ({ error = "", touched = false, value, onBlur, ...props }, ref) => {
    const [dirty, setDirty] = useState(false);
    const [stateError, setStateError] = useState("");
    const input = useRef({});
    useImperativeHandle(
      ref,
      () => ({
        focus() {
          input.current.focus();
        },
        setError(errorMessage) {
          setStateError(errorMessage);
          setDirty(true);
        },
      }),
      [],
    );
    useEffect(() => {
      if (touched) {
        setDirty(true);
      }
    }, [touched]);

    const errorMessage = stateError || error;

    return (
      <span
        className={`${classes.input} ${errorMessage && dirty ? classes.invalid : ""}`}
      >
        <FocusInput
          value={value}
          {...props}
          onBlur={(e) => {
            setDirty(true);
            if (onBlur) {
              onBlur(e);
            }
          }}
          ref={input}
        />
        <ErrorMessage
          show={!!errorMessage && dirty}
          message={errorMessage}
          size={props.size}
        />
      </span>
    );
  },
);

export default Input;
