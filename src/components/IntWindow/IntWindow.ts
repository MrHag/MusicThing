import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useWindowSize } from "Window/WindowSize";

interface Pos {
  x: number;
  y: number;
}

export const useIntWindow = (): [
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  Pos,
  (pos: Pos) => void,
  {}
] => {
  const [Window, setWindow] = useState<HTMLElement>();
  const [Position, setPosition] = useState<Pos>({
    x: 0,
    y: 0,
  });
  const [Deps, setDeps] = useState({});
  const [windowSize] = useWindowSize();

  const CorrectPosition = (pos: Pos) => {
    let rect = Window?.getBoundingClientRect();
    if (!rect) return;
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

    setPosition({ x: x, y: y });
  };

  const InputPosition = (pos: Pos) => {
    CorrectPosition(pos);
  };

  useEffect(() => {
    CorrectPosition(Position);
    setDeps({});
  }, [windowSize]);

  return [Window, setWindow, Position, InputPosition, Deps];
};
