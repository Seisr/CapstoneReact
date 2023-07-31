import { https } from "./config";

export const nguoiDungServ = {
  dangNhap: (data) => {
    return https.post("api/QuanLyNguoiDung/DangNhap", data);
  },
  register1: (data) => {
    console.log(data);
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  getAllUser: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP07");
  },
  deleteUser: (taiKhoan) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
  addUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
};
