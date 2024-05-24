import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Photo } from "../types/Photo";
import { RootState } from "../store";

type PhotoState = {
  items: Photo[];
  searchString: string;
};

const initialState: PhotoState = {
  items: [],
  searchString: "",
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.items = action.payload;
    },
    setPhotoSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;

      if (state.searchString || state.searchString !== "") {
        state.items = state.items.filter((photo) =>
          photo.title.toLowerCase().includes(state.searchString.toLowerCase())
        );
      } else {
        state.items = initialState.items;
      }
    },
  },
});

export const { setPhotos, setPhotoSearchString } = photoSlice.actions;

export default photoSlice.reducer;

export const selectPhotos = (state: RootState) => state.photos.items;
export const selectSearchString = (state: RootState) =>
  state.photos.searchString;
