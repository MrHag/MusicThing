import React, { useState } from "react";
import { createContext } from "react";

interface Pos {
  x: number;
  y: number;
}

interface State {
  text: string;
  position: Pos;
}

type Context = [State, React.Dispatch<React.SetStateAction<State>>];

const initialState: State = {
  text: "",
  position: { x: 0, y: 0 },
};

export const PlaceholderContext = createContext<Context>([
  initialState,
  () => {},
]);

export const PlaceholderContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useState(initialState);

  return (
    <PlaceholderContext.Provider value={[state, dispatch]}>
      {children}
    </PlaceholderContext.Provider>
  );
};
