import { configureStore } from "@reduxjs/toolkit";
import PlaylistReducer from "store/PlaylistSlice";
import PlayerReducer from "store/PlayerSlice";

export const store = configureStore({
  reducer: {
    playlists: PlaylistReducer,
    player: PlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
