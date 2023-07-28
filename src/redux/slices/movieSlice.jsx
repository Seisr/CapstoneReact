import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";
// tạo các createAsyncThunk để xử lí các bất đồng bộ trc khi bắn data lên store = redux-thunk
// bên trong createAsyncThunk sẽ có 2 tham số, 1: type của hàm, 2: hàm cần xử lý async

export const getAllMovie = createAsyncThunk(
  "movies/getAllMovie",
  async (tenPhim = "") => {
    const res = await movieServ.getAllMovie(tenPhim);
    console.log(res);
    // sẽ return về giá trị muốn store lưu trữ
    return res.data.content;
  }
);
// lần đầu tiên vào web, store sẽ dc khởi tạo
const initialState = {
  movies: [],
};

// thư viện immerjs
export const movieSlice = createSlice({
  name: "movies/",
  initialState,
  reducers: {},
  // extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lý async có nhiều TH xảy ra
  extraReducers: (builder) => {
    // khi xử lý -> trong hàm có 3  method tương ứng fulfiled,pending,reject
    builder.addCase(getAllMovie.fulfilled, (state, action) => {
      console.log(action.payload);
      // trong action, attri payload sẽ chứa các attri trả về từ hàm createAsyncThunk
      state.movies = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = movieSlice.actions;

export default movieSlice.reducer;
