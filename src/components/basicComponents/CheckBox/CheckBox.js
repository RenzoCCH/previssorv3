import { ReactComponent as CorrectMark } from "../../../assets/icons/correctMark.svg";
import "./CheckBox.scss";

const CheckBox = ({
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
      className={`checkbox ${checked ? "checked" : ""} ${
        !lbl ? "checkbox-no-label" : ""
      } ${type === "radio" ? "radio" : ""}`}
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
        <span className={`${showAltLabel ? "chbx-label-inc" : ""}`}>{lbl}</span>
      )}
    </label>
  );
};

export default CheckBox;
