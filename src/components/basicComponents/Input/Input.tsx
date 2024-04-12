import {
  type ComponentPropsWithoutRef,
  type FocusEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  ReactElement,
} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FocusInput, { inputSize } from "../FocusInput/FocusInput";
import classes from "./Input.module.scss";

type InputHandle = {
  focus: () => void;
  setError: (e: string) => void;
};
type props = {
  error?: string;
  touched?: boolean;
  value: string;
  onBlur?: (e: FocusEvent) => void;
  size?: inputSize;
} & ComponentPropsWithoutRef<"input" | "textarea">;

const Input = forwardRef<InputHandle, props>(
  (
    {
      error = "",
      touched = false,
      value,
      onBlur,
      size = inputSize.md,
      ...props
    },
    ref
  ) => {
    const [dirty, setDirty] = useState<boolean>(false);
    const [stateError, setStateError] = useState<string>("");
    const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    useImperativeHandle(
      ref,
      () => ({
        focus() {
          if (!input.current) return;
          input.current.focus();
        },
        setError(errorMessage) {
          setStateError(errorMessage);
          setDirty(true);
        },
      }),
      []
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
          // @ts-expect-error: Unreachable code error
          onBlur={(e: FocusEvent): void => {
            setDirty(true);
            if (onBlur) {
              onBlur(e);
            }
          }}
          ref={input}
        />
        <ErrorMessage
          show={!!errorMessage && dirty}
          // @ts-expect-error: Unreachable code error
          message={errorMessage}
          size={size}
        />
      </span>
    );
  }
);

export default Input;
