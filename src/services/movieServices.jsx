import { https } from "./config";

export const movieServ = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      return https.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP07&tenPhim=${tenPhim}`
      );
    } else {
      return https.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP07`);
    }
  },
  getShowtime: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
  getMovieDetail: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  themPhim: (formData) => {
    return https.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  },
  xoaPhim: (maPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
  layThongTinPhimEdit: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  capNhatPhim: (formData) => {
    return https.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  },
};
