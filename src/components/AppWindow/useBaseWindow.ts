import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useWindowSize } from "components/BrowserWindow/useWindowSize";
import { ToWindowBoundPosition } from "./lib";

interface WindowPosition {
  x: number;
  y: number;
}

export const useBaseWindow = (): [
  HTMLElement | undefined,
  Dispatch<SetStateAction<HTMLElement | undefined>>,
  WindowPosition,
  (pos: WindowPosition) => void,
  {}
] => {
  const [WindowElem, setWindowElem] = useState<HTMLElement>();
  const [Position, setPosition] = useState<WindowPosition>({
    x: 0,
    y: 0,
  });
  const [Deps, setDeps] = useState({});
  const [windowSize] = useWindowSize();

  const InputPosition = (pos: WindowPosition) => {
    setPosition(ToWindowBoundPosition(pos, WindowElem, windowSize));
  };

  useEffect(() => {
    setPosition(ToWindowBoundPosition(Position, WindowElem, windowSize));
    setDeps({});
  }, [windowSize]);

  return [WindowElem, setWindowElem, Position, InputPosition, Deps];
};
