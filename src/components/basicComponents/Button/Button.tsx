import { type ComponentPropsWithoutRef, type FC, ReactNode } from "react";
import classes from "./Button.module.scss";
type classProp =
  | "btn-lg"
  | "no-shadow"
  | "btn-secondary"
  | "btn-light"
  | "btn-light-border"
  | "no-button";
type props = {
  children: ReactNode;
  classList?: classProp[];
} & ComponentPropsWithoutRef<"button">;

const Button: FC<props> = ({ children, classList = [], ...props }) => {
  let className = "";
  for (const c of classList) {
    className += ` ${classes[c]}`;
    className += ` ${classes[c]}`;
  }
  return (
    <button className={`${classes.btn} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
