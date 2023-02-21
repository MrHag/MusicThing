import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { selectWindow, setWindowSize, Size } from "store/WindowSlice";

export const useWindowSize = (): [Size] => {
  const windowSize = useAppSelector(selectWindow).size;
  const dispatch = useAppDispatch();

  const onWindowResize = () => {
    dispatch(
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [windowSize]);

  return [windowSize];
};
