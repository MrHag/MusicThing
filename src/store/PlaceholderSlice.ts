import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "hooks/store";

interface Pos {
  x: number;
  y: number;
}

export interface State {
  text: string;
  position: Pos;
}

const initialState: State = {
  text: "",
  position: { x: 0, y: 0 },
};

export const PlaceholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    setPlaceholder: (state, action: PayloadAction<State>) => {
      const pay = action.payload;
      state.text = pay.text;
      state.position = pay.position;
    },
  },
});

export const { setPlaceholder } = PlaceholderSlice.actions;

export const selectPlaceholder = (state: RootState) => state.placeholder;

export default PlaceholderSlice.reducer;
