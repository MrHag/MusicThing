import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Playlist as PlaylistType } from "types";
import { RootState } from "hooks/store";

export interface PlaylistState {
  playlists: PlaylistType[];
  activePlaylist: PlaylistType | null;
}

const initialState: PlaylistState = {
  activePlaylist: null,
  playlists: [],
};

export const PlaylistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<PlaylistType>) => {
      state.activePlaylist = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<PlaylistType[]>) => {
      state.playlists = action.payload;
    },
    moveTrack: (
      state,
      action: PayloadAction<{ from_index: number; to_index: number }>
    ) => {
      let { from_index, to_index } = action.payload;
      let ind = 0;
      let pl = state.playlists.map((tr, index, arr) => {
        if (ind === from_index) ind += 1;
        if (ind === to_index) return arr[ind];
        ind += 1;
        return arr[ind];
      });
      state.playlists = pl;
    },
  },
});

export const { setPlaylist, setPlaylists } = PlaylistSlice.actions;
export const selectPlaylist = (state: RootState) =>
  state.playlists.activePlaylist;
export const selectPlaylists = (state: RootState) => state.playlists.playlists;

export default PlaylistSlice.reducer;
