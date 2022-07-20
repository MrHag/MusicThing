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
      if (!state.activePlaylist) return;

      const tracks = [...state.activePlaylist.tracks];

      if (from_index < to_index) to_index--;

      const from = tracks[from_index];
      tracks.splice(from_index, 1);
      tracks.splice(to_index, 0, from);

      // const newtracks = tracks.map((tr, index, arr) => {
      //   if (ind === from_index) ind++;
      //   if (ind === to_index) {
      //     ind++;
      //     return tracks[from_index];
      //   }
      //   if (ind - 1 === to_index) {
      //     return tracks[to_index];
      //   }
      //   return tracks[ind++];
      // });
      console.log(tracks);
      state.activePlaylist.tracks = tracks;
    },
  },
});

export const { setPlaylist, setPlaylists, moveTrack } = PlaylistSlice.actions;
export const selectPlaylist = (state: RootState) =>
  state.playlists.activePlaylist;
export const selectPlaylists = (state: RootState) => state.playlists.playlists;

export default PlaylistSlice.reducer;
