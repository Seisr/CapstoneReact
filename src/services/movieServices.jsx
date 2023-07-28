import { https } from "./config";

export const movieServ = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      return https.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${tenPhim}`
      );
    } else {
      return https.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
    }
  },
};
