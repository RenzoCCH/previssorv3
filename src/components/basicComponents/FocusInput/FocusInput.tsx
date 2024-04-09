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

enum inputSize {
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
  onBlur?: () => void;
  type?: type;
} & ComponentPropsWithoutRef<"input" | "textarea">;

const FocusInput = forwardRef<InputHandle, props>(
  (
    {
      value,
      onChange,
      id = getId(),
      label = "",
      size = inputSize.md,
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

    return (
      <span className={`focusInput ${isFilled ? "filled" : ""} ${size}`}>
        {!contentEditable ? (
          <input
            className="field"
            id={id}
            ref={input}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
        ) : (
          <ContentEditableClass
            innerRef={input}
            className="field"
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
        {!noBorder && <span className="border" />}
      </span>
    );
  }
);

export default FocusInput;
