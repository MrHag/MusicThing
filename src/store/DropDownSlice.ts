import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "hooks/store";

export interface DropDownState {
  elems: { name: string; callback: (index: number) => void }[];
  position: { x: number; y: number };
}

const initialState: DropDownState = {
  elems: [],
  position: { x: 0, y: 0 },
};

export const DropDownSlice = createSlice({
  name: "DropDown",
  initialState,
  reducers: {
    setDropDown: (
      state,
      action: PayloadAction<
        { name: string; callback: (index: number) => void }[]
      >
    ) => {
      state.elems = action.payload;
    },
    setPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.position = action.payload;
    },
  },
});

export const { setDropDown } = DropDownSlice.actions;
export const { setPosition } = DropDownSlice.actions;

export const selectDropDown = (state: RootState) => state.dropdown;

export default DropDownSlice.reducer;
