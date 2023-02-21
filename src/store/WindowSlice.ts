import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "hooks/store";

export interface Size {
  width: number;
  height: number;
}

export interface State {
  size: Size;
}

const initialState: State = {
  size: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

export const WindowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<Size>) => {
      state.size = action.payload;
    },
  },
});

export const { setSize: setWindowSize } = WindowSlice.actions;

export const selectWindow = (state: RootState) => state.window;

export default WindowSlice.reducer;
