import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Playlist as PlaylistType } from "types";
import { RootState } from "store";

export interface PlaylistState {
  playlist: PlaylistType | null;
}

const initialState: PlaylistState = {
  playlist: null,
};

export const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<PlaylistType>) => {
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylist } = PlaylistSlice.actions;
export const selectPlaylist = (state: RootState) => state.playlist.playlist;

export default PlaylistSlice.reducer;
