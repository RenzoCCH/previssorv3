import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { sizes } from "../../ResizeComponent/ResizeComponent";
import { getId } from "../../../utils/utils";
import ContentEditableClass from "../ContentEditableClass";
import classes from "./FocusInput.module.scss";

export enum inputSize {
  lg = "input-lg",
  md = "",
}
type type = "text" | "password";
type InputHandle = {
  focus: () => void;
};

type props = {
  value?: string;
  onChange?: () => void;
  id?: string;
  label?: string;
  size?: inputSize;
  focus?: boolean;
  contentEditable?: boolean;
  noBorder?: boolean;
  onBlur?: (e: FocusEvent) => void;
  type?: type;
} & ComponentPropsWithoutRef<"input" | "textarea">;

const FocusInput = forwardRef<InputHandle, props>(
  (
    {
      value,
      onChange,
      id = getId(),
      label = "",
      size = inputSize.lg,
      focus = false,
      contentEditable = false,
      noBorder = false,
      onBlur,
      type = "text",
      ...props
    },
    ref
  ) => {
    const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
      if (focus && input?.current?.focus && sizes.minSm()) {
        input.current.focus();
      }
    }, [focus]);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          if (!input.current) return;
          input.current.scrollIntoView({ behavior: "smooth", block: "center" });
          if (sizes.minSm()) {
            input.current.focus({ preventScroll: true });
          }
        },
      }),
      []
    );
    const isFilled = !!value;

    console.log('filled', isFilled);
    
    console.log(classes);

    return (
      <span
        className={`${classes.focusInput} ${classes["input-label"]} ${isFilled ? classes.filled : ""} ${classes[size]}`}
      >
        {!contentEditable ? (
          <input
            id={id}
            ref={input}
            type={type}
            value={value}
            onChange={onChange}
            className={classes.field}
            onBlur={onBlur}
            {...props}
          />
        ) : (
          <ContentEditableClass
            innerRef={input}
            className={classes.field}
            html={value}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            {...props}
          />
        )}
        <label htmlFor={id}>
          <span>{label}</span>
        </label>
        {!noBorder && <span className={classes.border} />}
      </span>
    );
  }
);

export default FocusInput;
