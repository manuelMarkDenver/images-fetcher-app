import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./slices/photosSlice";

const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
