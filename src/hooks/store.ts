import { configureStore } from "@reduxjs/toolkit";
import PlaylistReducer from "store/PlaylistSlice";
import PlayerReducer from "store/PlayerSlice";
import DropDownReducer from "store/DropDownSlice";
import WindowReducer from "store/WindowSlice";
import PlaceholderReducer from "store/PlaceholderSlice";

export const store = configureStore({
  reducer: {
    playlists: PlaylistReducer,
    player: PlayerReducer,
    dropdown: DropDownReducer,
    window: WindowReducer,
    placeholder: PlaceholderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
