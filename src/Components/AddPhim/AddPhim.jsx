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
} from "antd";
import { useFormik, validateYupSchema } from "formik";
import moment from "moment/moment";
import * as yup from "yup";
import { movieServ } from "../../services/movieServices";
import { useDispatch } from "react-redux";
import { themPhim } from "../../redux/slices/movieSlice";
import { NavLink, useNavigate } from "react-router-dom";

const AddPhim = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //formik
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: "",
    },
    // validationSchema: yup.object({
    //   tenPhim: yup.string().required("Tên Phim Không Được Để Trống"),

    //   moTa: yup.string().required("Mô tả không được để trống"),
    // }),
    onSubmit: (values) => {
      //   console.log(values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themPhim(formData));
      formik.resetForm();
      navigate("/admin/movie");
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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
  const handleChangeFiles = (e) => {
    let file = e.target.files[0];
    if (
      file.type == "image/jpeg" ||
      file.type == "image/gif" ||
      file.type == "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
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
        <h1 className="text-xl mb-5">Thêm Phim</h1>

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
            // value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input
            id="tenPhim"
            name="tenPhim"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            id="trailer"
            name="trailer"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input
            size={"middle"}
            id="moTa"
            name="moTa"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker format={"DD/MM/YY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang Chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp Chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Input type="file" onChange={handleChangeFiles} />
          <br />
          <img src={imgSrc} alt="" style={{ width: 150, height: 200 }} />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-500 px-3 py-2 rounded">
            Thêm Phim
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddPhim;
