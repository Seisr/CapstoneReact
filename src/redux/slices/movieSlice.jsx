import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";
// tạo các createAsyncThunk để xử lí các bất đồng bộ trc khi bắn data lên store = redux-thunk
// bên trong createAsyncThunk sẽ có 2 tham số, 1: type của hàm, 2: hàm cần xử lý async
// lay danh sach phim
export const getAllMovie = createAsyncThunk(
  "movies/getAllMovie",
  async (tenPhim = "") => {
    const res = await movieServ.getAllMovie(tenPhim);
    // console.log(res);
    // sẽ return về giá trị muốn store lưu trữ
    return res.data.content;
  }
);
//ThemPhim
export const themPhim = createAsyncThunk(
  "movies/themPhim",
  async (formData) => {
    const res = await movieServ.themPhim(formData);
    // console.log(res);
    return res;
  }
);
//lấy thông tin phim cần edit
export const editPhim = createAsyncThunk("movies/editPhim", async (maPhim) => {
  const res = await movieServ.layThongTinPhimEdit(maPhim);
  // console.log(res.data.content);
  return res.data.content;
});
// lần đầu tiên vào web, store sẽ dc khởi tạo
const initialState = {
  movies: [],
  thongTinPhimEdit: {},
};

// thư viện immerjs
export const movieSlice = createSlice({
  name: "movies/",
  initialState,
  reducers: {},
  // extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lý async có nhiều TH xảy ra
  extraReducers: (builder) => {
    // khi xử lý -> trong hàm có 3  method tương ứng fulfiled,pending,reject
    builder
      .addCase(getAllMovie.fulfilled, (state, action) => {
        // console.log(action.payload);
        // trong action, attri payload sẽ chứa các attri trả về từ hàm createAsyncThunk
        state.movies = action.payload;
      })
      .addCase(themPhim.fulfilled, (state, action) => {
        // console.log(action.payload);
        const newMovie = action.payload.data.content;
        state.movies.push(newMovie);
      })
      .addCase(editPhim.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.thongTinPhimEdit = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = movieSlice.actions;

export default movieSlice.reducer;
