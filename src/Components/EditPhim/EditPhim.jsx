import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  message,
} from "antd";
import { useFormik, validateYupSchema } from "formik";

import * as yup from "yup";
import { movieServ } from "../../services/movieServices";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhim,
  editPhim,
  getAllMovie,
  themPhim,
} from "../../redux/slices/movieSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";

const EditPhim = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { thongTinPhimEdit } = useSelector((state) => {
    return state.movies;
  });
  // console.log(thongTinPhimEdit);
  let maPhim = params.id;
  // console.log(maPhim);
  //goi api laythongtinphim
  useEffect(() => {
    dispatch(editPhim(maPhim));
  }, [maPhim]);

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhimEdit.maPhim,
      tenPhim: thongTinPhimEdit.tenPhim,
      trailer: thongTinPhimEdit.trailer,
      moTa: thongTinPhimEdit.moTa,
      ngayKhoiChieu: thongTinPhimEdit.ngayKhoiChieu,
      dangChieu: thongTinPhimEdit.dangChieu,
      sapChieu: thongTinPhimEdit.sapChieu,
      hot: thongTinPhimEdit.hot,
      danhGia: thongTinPhimEdit.danhGia,
      hinhAnh: null,
      maNhom: thongTinPhimEdit.maNhom,
    },
    // validationSchema: yup.object({
    //   tenPhim: yup.string().required("Tên Phim Không Được Để Trống"),

    //   moTa: yup.string().required("Mô tả không được để trống"),
    // }),
    onSubmit: (values) => {
      // console.log(values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("file", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //goi api
      movieServ
        .capNhatPhim(formData)
        .then((res) => {
          // console.log(res);
          message.success("Cập Nhật Thành công");
          dispatch(getAllMovie());
        })
        .catch((err) => {
          // console.log(err);
          message.error(err.response.data.message);
        });
      formik.resetForm();
      navigate("/admin/movie");
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFiles = async (e) => {
    let file = e.target.files[0];
    if (
      file.type == "image/jpeg" ||
      file.type == "image/gif" ||
      file.type == "image/png" ||
      file.type == "image/jpg"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  return (
    <div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <h1 className="text-xl mb-5">Sửa Phim</h1>

        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Input
            placeholder="GP06"
            id="maNhom"
            name="maNhom"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.maNhom}
          />
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input
            id="tenPhim"
            name="tenPhim"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            id="trailer"
            name="trailer"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input
            size={"middle"}
            id="moTa"
            name="moTa"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePicker}
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Input type="file" onChange={handleChangeFiles} />
          <br />
          <img
            src={imgSrc === "" ? thongTinPhimEdit.hinhAnh : imgSrc}
            alt=""
            style={{ width: 150, height: 200 }}
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-500 px-3 py-2 rounded">
            Cập Nhật Phim
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditPhim;
