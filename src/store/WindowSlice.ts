import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "hooks/store";

export interface State {
  width: number;
  height: number;
}

const initialState: State = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const WindowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWindow: (state, action: PayloadAction<State>) => {
      const pay = action.payload;
      state.height = pay.height;
      state.width = pay.width;
    },
  },
});

export const { setWindow } = WindowSlice.actions;

export const selectWindow = (state: RootState) => state.window;

export default WindowSlice.reducer;
