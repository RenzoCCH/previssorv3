import { type FC, type ComponentPropsWithoutRef } from "react";
import CorrectMark from "../../../assets/icons/correctMark.svg?react";
import classes from "./CheckBox.module.scss";

type type = "checkbox" | "radio";
type props = {
  checked?: boolean;
  label: string;
  labelIncorrect?: string;
  type?: type;
} & ComponentPropsWithoutRef<"input">;

const CheckBox: FC<props> = ({
  checked,
  onChange,
  label = "",
  labelIncorrect,
  type = "checkbox",
  id,
  ...props
}) => {
  const showAltLabel = labelIncorrect && !checked;
  let lbl = label;
  if (showAltLabel) {
    lbl = labelIncorrect;
  }
  return (
    <label
      htmlFor={id}
      className={`${classes.checkbox} ${checked ? classes.checked : ""} ${
        !lbl ? classes["checkbox-no-label"] : ""
      } ${type === "radio" ? classes.radio : ""}`}
    >
      <input
        id={id}
        type={type}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <CorrectMark />
      {lbl && (
        <span className={`${classes.label} ${showAltLabel ? classes["chbx-label-inc"] : ""}`}>
          {lbl}
        </span>
      )}
    </label>
  );
};

export default CheckBox;
