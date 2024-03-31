import SiteLogo from "../../../../assets/icons/logo_rect.svg?react";
import { type FC, useEffect, useState } from "react";
import "./LogoAnimation.scss";
import { useAnimate, usePresence } from "framer-motion";
import { getTransformationMetrics } from "../../../../utils/domUtils";

type props = {
  duration: number;
};

export const LogoAnimation: FC<props> = ({ duration = 0.5 }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate("#loading-bar", { opacity: 1 }, { delay: 1.2 });
        setloading(true);
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        setloading(false);
        await animate("#loading-bar", { opacity: 0 });
        const transform = getTransformationMetrics(
          "logo-animation",
          "header-logo",
        );
        animate(
          scope.current,
          {
            backgroundColor: "rgba(255,255,255,0)",
          },
          { duration },
        );
        if (!transform) {
          await animate("#logo-animation", { opacity: 0 }, { duration });
        } else {
          await animate(
            "#logo-animation",
            {
              x: transform.x,
              y: transform.y,
              scale: transform.scale,
            },
            { duration },
          );
        }
        safeToRemove();
      };
      exitAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  return (
    <div key="logo" className={"initial-loading"} ref={scope}>
      <div id="logo-animation" className={"logo-animation"}>
        <SiteLogo />
        <div
          id="loading-bar"
          className={`loading-bar ${loading ? "loading" : ""}`}
        ></div>
      </div>
    </div>
  );
};
