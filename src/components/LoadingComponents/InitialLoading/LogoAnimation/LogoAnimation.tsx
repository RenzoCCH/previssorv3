import SiteLogo from "../../../../assets/icons/logo_rect.svg?react";
import { FC, useEffect } from "react";
import "./LogoAnimation.scss";
import { useAnimate, usePresence } from "framer-motion";
import { getTransformationMetrics } from "../../../../utils/domUtils";

type props = {
  duration: number;
};

export const LogoAnimation: FC<props> = ({ duration = 0.5 }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
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
      </div>
    </div>
  );
};
