import { memo, useMemo, type FC } from "react";
import classes from "./ProgressBar.module.scss";
type props = {
  total: number;
  current: number;
};
const ProgressBar: FC<props> = memo(({ total, current }) => {
  const percentage = (current * 100) / total;
  const gradient = useMemo(() => {
    let g = `linear-gradient(90deg `;
    const blockSize = 100 / total;
    let block = blockSize;

    for (let index = 1; index <= total; index++) {
      g += `, rgb(44, 116, 179, 0.1) ${block}%`;
      if (index !== total) {
        g += `, rgb(44, 116, 179, 0.7) ,  rgb(44, 116, 179, 0.1) calc(${block}% + 2px) `;
        block += blockSize;
      }
    }
    g += ")";
    return g;
  }, [total]);
  console.log('render ProgressBar');
  
  return (
    <div className={classes.container}>
      <div
        className={classes.progressTotal}
        style={{
          background: gradient,
        }}
      >
        <div
          className={classes.progress}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
});

export default ProgressBar;
