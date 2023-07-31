import * as yup from "yup";

const passRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const soDtRegex = /^[0-9]{10}$/;

export const addUser = yup.object().shape({
  taiKhoan: yup.string().min(4, "ít nhất 4 ký tự").required("Thêm thông tin"),
  matKhau: yup
    .string()
    .matches(passRegex, "ít nhất 6 ký tự, 1 thường, 1 đặc biệt, 1 số")
    .required("Thêm mật khẩu"),
  email: yup
    .string()
    .email("Sai cú pháp email (VD: abc@gmail.com)")
    .required("Thêm email"),
  soDT: yup
    .string()
    .matches(soDtRegex, "SDT cần 10 chữ số")
    .required("Thêm SDT"),
  maNhom: yup.string().required("Thêm mã nhóm"),
  maLoaiNguoiDung: yup.string().required("Thêm loại người dùng"),
  hoTen: yup.string().required("Thêm họ tên"),
});
