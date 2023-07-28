import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import nguoiDungSlice from "./slices/nguoiDungSlice";
import movieSlice from "./slices/movieSlice";
export const store = configureStore({
  reducer: {
    nguoiDung: nguoiDungSlice,
    loading: loadingSlice,
    movies: movieSlice,
  },
});
