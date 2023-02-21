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

  let newstate = state;

  const Actions = {
    setText: (value: string) => {
      newstate = { ...newstate, text: value };
      setState(newstate);
    },
    setPosition: (value: Pos) => {
      newstate = { ...newstate, position: value };
      setState(newstate);
    },
  };

  return (
    <PlaceholderContext.Provider value={[state, Actions]}>
      {children}
    </PlaceholderContext.Provider>
  );
};
