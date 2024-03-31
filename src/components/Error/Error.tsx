import { FC } from "react";
import classes from "./Error.module.scss";

type props = {
  message: string;
};

const Error: FC<props> = ({ message }) => {
  return (
    <section className={classes.container}>
      <p>{message}</p>
    </section>
  );
};

export default Error;
