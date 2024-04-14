import {
  type ReactNode,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import {
  initConfetti,
  render,
  resizeCanvas, setCanvas
} from "./ConfettiUtils";
import classes from "./Confetti.module.scss";

type props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"canvas">;

const Confetti: FC<props> = ({ children, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas) return;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCanvas(canvas, ctx, parent);
    const resize = () => {
      resizeCanvas(parent);
    };
    const init = () => {
      initConfetti();
      render();
    };
    init();

    window.addEventListener("resize", resize);
    window.addEventListener("click", init);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", init);
    };
  }, []);

  return (
    <div ref={parentRef} className={classes.container}>
      <canvas ref={canvasRef} {...props} className={classes.canvas} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Confetti;
