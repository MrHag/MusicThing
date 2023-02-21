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

type MoveTrackAction = PayloadAction<{
  fromIndex: number;
  toIndex: number;
}>;

type SetPlaylistAction = PayloadAction<PlaylistType>;
type SetPlaylistsAction = PayloadAction<PlaylistType[]>;

export const PlaylistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylist: (state, action: SetPlaylistAction) => {
      state.activePlaylist = action.payload;
    },
    setPlaylists: (state, action: SetPlaylistsAction) => {
      state.playlists = action.payload;
    },
    moveTrack: (state, action: MoveTrackAction) => {
      let { fromIndex, toIndex } = action.payload;
      if (!state.activePlaylist) return;

      const tracks = [...state.activePlaylist.tracks];

      if (fromIndex < toIndex) toIndex--;

      const from = tracks[fromIndex];
      tracks.splice(fromIndex, 1);
      tracks.splice(toIndex, 0, from);

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
