import { configureStore } from "@reduxjs/toolkit";
import PlaylistReducer from "store/PlaylistSlice";
import PlayerReducer from "store/PlayerSlice";
import DropDownReducer from "store/DropDownSlice";

export const store = configureStore({
  reducer: {
    playlists: PlaylistReducer,
    player: PlayerReducer,
    dropdown: DropDownReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
