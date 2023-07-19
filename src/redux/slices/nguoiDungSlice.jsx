import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { layDuLieuLocal } from "../../utils/localStore";

// tạo các createAsyncThunk để xử lí các bất đồng bộ trc khi bắn data lên store = redux-thunk
// bên trong createAsyncThunk sẽ có 2 tham số, 1: type của hàm, 2: hàm cần xử lý async

export const getAllUser = createAsyncThunk("nguoiDung/getAllUser", async () => {
  const res = await nguoiDungServ.getAllUser();
  // sẽ return về giá trị muốn store lưu trữ
  return res.data.content;
});
// lần đầu tiên vào web, store sẽ dc khởi tạo
const initialState = {
  hoTen: layDuLieuLocal("user"),
  users: [],
};

// thư viện immerjs
export const nguoiDungSlice = createSlice({
  name: "nguoiDung/",
  initialState,
  reducers: {
    // tạo 1 phương thức xử lý state trên store redux
    setDuLieuHoten: (state, action) => {
      // check hoTen có data k, k thì -> set data
      console.log(action);
      if (state.hoTen == null) {
        state.hoTen = action.payload;
      }
    },
  },
  // extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lý async có nhiều TH xảy ra
  extraReducers: (builder) => {
    // khi xử lý -> trong hàm có 3  method tương ứng fulfiled,pending,reject
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // trong action, attri payload sẽ chứa các attri trả về từ hàm createAsyncThunk
      state.users = action.payload;
    });
    // reject khi async lỗi, vào code này xử lý
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.users = [
        {
          hoTen: "Khai",
          maLoaiNguoiDung: "QuanTri",
        },
      ];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setDuLieuHoten } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
