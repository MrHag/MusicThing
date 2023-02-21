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

type Actions = {
  setText: (value: string) => void;
  setPosition: (value: Pos) => void;
};

type Context = [State, Actions];

const initialState: State = {
  text: "",
  position: { x: 0, y: 0 },
};

export const PlaceholderContext = createContext<Context>([
  initialState,
  { setText: () => {}, setPosition: () => {} },
]);

export const PlaceholderContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const Actions = {
    setText: (value: string) => setState({ ...state, text: value }),
    setPosition: (value: Pos) => setState({ ...state, position: value }),
  };

  return (
    <PlaceholderContext.Provider value={[state, Actions]}>
      {children}
    </PlaceholderContext.Provider>
  );
};
