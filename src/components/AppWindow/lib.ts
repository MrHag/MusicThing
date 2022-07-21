export const ToWindowBoundPosition = (
  pos: { x: number; y: number },
  elem: HTMLElement | undefined,
  windowSize: { width: number; height: number }
) => {
  let rect = elem?.getBoundingClientRect();
  if (!rect) return pos;
  let newrect = {
    top: pos.y,
    left: pos.x,
    bottom: pos.y + rect.height,
    right: pos.x + rect.width,
  };
  let x = newrect.left;
  let y = newrect.top;

  if (newrect.right > windowSize.width) x = windowSize.width - rect.width;
  else if (newrect.left < 0) x = 0;

  if (newrect.bottom > windowSize.height) y = windowSize.height - rect.height;
  else if (newrect.top < 0) y = 0;

  return { x: x, y: y };
};
