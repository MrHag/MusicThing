import { useAppDispatch, useAppSelector } from "hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { selectWindow, setWindow, State } from "store/WindowSlice";

export const useWindowSize = (): [State] => {
  const windowSize = useAppSelector(selectWindow);
  const dispatch = useAppDispatch();

  const onWindowResize = () => {
    dispatch(
      setWindow({
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
