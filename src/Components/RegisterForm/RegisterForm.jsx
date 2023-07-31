import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import { addUser } from "../../utils/addUser";
import { Input, message } from "antd";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP07",
      hoTen: "",
      maLoaiNguoiDung: "KhachHang",
    },
    onSubmit: async (values) => {
      try {
        console.log("init DK");
        console.log(values);
        const res = await nguoiDungServ.register1(values);
        console.log(res);
        dispatch(getAllUser());
        messageApi.success("DK sucess");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        messageApi.error(error.response.data.content);
      }
    },

    validation: addUser,
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  const userTester = {
    taiKhoan: "test1204",
    matKhau: "test1204",
    email: "test1204@gmail.com",
    soDT: "1204",
    maNhom: "GP07",
    maLoaiNguoiDung: "QuanTri",
    hoTen: "Test",
  };
  useEffect(() => {}, [values]);

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="text"
            name="hoTen"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.hoTen}
          />
          <label
            for="hoTen"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ tên
          </label>
          {formik.errors.hoTen && formik.touched.hoTen ? (
            <p className=" text-red-600">{formik.errors.hoTen}</p>
          ) : (
            ""
          )}
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.email}
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <p className=" text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="password"
            name="matKhau"
            id="matKhau"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.matKhau}
          />
          <span
            onClick={() => {
              if (document.getElementById("matKhau").type == "password") {
                document.getElementById("matKhau").type = "text";
                document.getElementById("eye").classList.remove("fa-eye");
                document.getElementById("eye").classList.add("fa-eye-slash");
              } else {
                document.getElementById("matKhau").type = "password";
                document.getElementById("eye").classList.remove("fa-eye-slash");
                document.getElementById("eye").classList.add("fa-eye");
              }
            }}
            class="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-600 transition-colors duration-400"
            style={{ cursor: "pointer" }}
          >
            <i class="fa-regular fa-eye" id="eye"></i>
          </span>

          <label
            for="matKhau"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className=" text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="text"
              name="soDT"
              id="soDT"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.soDT}
            />
            <label
              for="soDT"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              SDT
            </label>
            {formik.errors.soDT && formik.touched.soDT ? (
              <p className=" text-red-600">{formik.errors.soDT}</p>
            ) : (
              ""
            )}
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="text"
              name="taiKhoan"
              id="taiKhoan"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.taiKhoan}
            />
            <label
              for="taiKhoan"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài khoản
            </label>
            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
              <p className=" text-red-600">{formik.errors.taiKhoan}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Tạo Tài Khoản
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
