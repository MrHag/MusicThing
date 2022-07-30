import React, { useState } from "react";
import { createContext } from "react";

interface State {
  id: string;
}

interface SecondState {
  isDragging: boolean;
}

type Context = [
  State,
  SecondState,
  React.Dispatch<React.SetStateAction<SecondState>>
];

const initialState: State = {
  id: "",
};

const initialSecondState: SecondState = {
  isDragging: false,
};

export const DragDropContext = createContext<Context>([
  initialState,
  initialSecondState,
  () => {},
]);

export const DragDropContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const state = initialState;
  const [secondstate, setState] = useState(initialSecondState);

  return (
    <DragDropContext.Provider value={[state, secondstate, setState]}>
      {children}
    </DragDropContext.Provider>
  );
};
