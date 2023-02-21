import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "hooks/store";
import { Track } from "types";

export interface PlayerState {
  track: Track | null;
}

const initialState: PlayerState = {
  track: null,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack: (state, action: PayloadAction<Track>) => {
      state.track = action.payload;
    },
  },
});

export const { setTrack } = PlayerSlice.actions;
export const selectTrack = (state: RootState) => state.player.track;

export default PlayerSlice.reducer;
