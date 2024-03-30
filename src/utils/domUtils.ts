export function getTransformationMetrics(
  fromId: string,
  toId: string,
): {
  x: number;
  y: number;
  scale: number;
} | void {
  if (!fromId || !toId) {
    return;
  }
  const fromElem = document.getElementById(fromId);
  const toElem = document.getElementById(toId);
  if (!fromElem || !toElem) {
    return;
  }
  const fromMetrics = fromElem.getBoundingClientRect();
  const toMetrics = toElem.getBoundingClientRect();

  return {
    x: -(fromMetrics.x - toMetrics.x),
    y: -(fromMetrics.y - toMetrics.y),
    scale: toMetrics.width / fromMetrics.width,
  };
}

window.ren = getTransformationMetrics;
