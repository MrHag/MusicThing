import { configureStore } from "@reduxjs/toolkit";
import PlaylistReducer from "store/PlaylistSlice";
import PlayerReducer from "store/PlayerSlice";
import NavPlaylistsReducer from "store/NavPlaylistsSlice";
// ...

export const store = configureStore({
  reducer: {
    navplaylists: NavPlaylistsReducer,
    playlist: PlaylistReducer,
    player: PlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
