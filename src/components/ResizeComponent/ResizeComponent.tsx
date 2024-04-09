import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { isHidden } from "../../utils/domUtils";
import {
  unsubscribeEvt,
  subscribeEvt,
  triggerEvt,
  subsFn,
} from "../../utils/EventRegister";
import "./ResizeComponent.scss";
type sizesType = "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg" | "elg";
type sizesConstraints = sizesType | "maxXs" | "minSm";
type sizeListType = { [key: string]: sizesType };
const sizesList: sizeListType = {
  xxxs: "xxxs",
  xxs: "xxs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  elg: "elg",
};
const maxXs = [sizesList.xxxs, sizesList.xxs, sizesList.xs];
const minSm = [sizesList.sm, sizesList.md, sizesList.lg, sizesList.elg];

let sizesWrapper = document.getElementById("sizes-wrapper");
if (!sizesWrapper) {
  sizesWrapper = document.createElement("div");
  sizesWrapper.id = "sizes-wrapper";
  document.getElementsByTagName("body")[0].appendChild(sizesWrapper);
}
let currentSize: sizesType;
let prevSize: sizesType;

function resizeListener() {
  for (const size in sizesList) {
    if (!isHidden(document.getElementById(size)!)) {
      currentSize = size as sizesType;
      break;
    }
  }
  if (currentSize === prevSize) {
    return;
  }
  triggerEvt(currentSize, prevSize);
  if (maxXs.includes(currentSize) && !maxXs.includes(prevSize)) {
    triggerEvt("maxXs", prevSize);
  }
  if (minSm.includes(currentSize) && !minSm.includes(prevSize)) {
    triggerEvt("minSm", prevSize);
  }
  prevSize = currentSize;
}

// eslint-disable-next-line react-refresh/only-export-components
export const sizes = {
  xxxs: () => sizesList.xxxs === currentSize,
  xxs: () => sizesList.xxs === currentSize,
  xs: () => sizesList.xs === currentSize,
  sm: () => sizesList.sm === currentSize,
  md: () => sizesList.md === currentSize,
  lg: () => sizesList.lg === currentSize,
  elg: () => sizesList.elg === currentSize,
  maxXs: () => sizes.xxxs() || sizes.xxs() || sizes.xs(),
  minSm: () => sizes.sm() || sizes.md() || sizes.lg() || sizes.elg(),
};

const fnfSubs = (size: sizesConstraints) => (cb: subsFn) => {
  console.log('from reseiz', size);
  
  if (sizes[size]()) cb(prevSize);
  subscribeEvt(cb, size);
};
// eslint-disable-next-line react-refresh/only-export-components
export const onSizes = {
  subsXxxs: fnfSubs("xxxs"),
  subsXxs: fnfSubs("xxs"),
  subsXs: fnfSubs("xs"),
  subsSm: fnfSubs("sm"),
  subsMd: fnfSubs("md"),
  subsLg: fnfSubs("lg"),
  subsElg: fnfSubs("elg"),
  subsMaxXs: fnfSubs("maxXs"),
  subsMinSm: fnfSubs("minSm"),
  unsubsXxxs: (id: string) => unsubscribeEvt(id, "xxxs"),
  unsubsXxs: (id: string) => unsubscribeEvt(id, "xxs"),
  unsubsXs: (id: string) => unsubscribeEvt(id, "xs"),
  unsubsSm: (id: string) => unsubscribeEvt(id, "sm"),
  unsubsMd: (id: string) => unsubscribeEvt(id, "md"),
  unsubsLg: (id: string) => unsubscribeEvt(id, "lg"),
  unsubsElg: (id: string) => unsubscribeEvt(id, "elg"),
  unsubsMaxXs: (id: string) => unsubscribeEvt(id, "maxXs"),
  unsubsMinSm: (id: string) => unsubscribeEvt(id, "minSm"),
};

const ResizeComponent: FC = () => {
  useEffect(() => {
    let doit: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(doit);
      doit = setTimeout(resizeListener, 100);
    };
    // initial call
    resizeListener();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return createPortal(
    window.Object.keys(sizesList).map((size) => <div id={size} key={size} />),
    sizesWrapper!
  );
};

export default ResizeComponent;
