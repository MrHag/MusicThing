import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface NavPlaylistsState {
  playlists: { id: number; name: string }[];
}

const initialState: NavPlaylistsState = {
  playlists: [],
};

export const NavPlaylistsSlice = createSlice({
  name: "navplaylist",
  initialState,
  reducers: {
    setNavPlaylists: (
      state,
      action: PayloadAction<{ id: number; name: string }[]>
    ) => {
      state.playlists = action.payload;
    },
  },
});

export const { setNavPlaylists } = NavPlaylistsSlice.actions;
export const selectNavPlaylists = (state: RootState) =>
  state.navplaylists.playlists;

export default NavPlaylistsSlice.reducer;
