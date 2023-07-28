import { Space, Table, Input } from "antd";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllMovie } from "../../redux/slices/movieSlice";

const { Search } = Input;

const TableMovie = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => {
    return state.movies;
  });
  console.log(movies);

  // Search input
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const onSearch = (value) => {
    dispatch(getAllMovie(value));
  };

  //table movie
  const columns = [
    {
      title: "mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      // custom lại hiển thị column
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, movies) => {
        return <img src={movies.hinhAnh} alt={movies.tenPhim} width={500} />;
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 250,
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (text, movies) => {
        return (
          <span className="line-clamp-1 hover:line-clamp-none">
            {movies.moTa}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
            // sẽ sửa lại thêm 1 popconfirm vào để hỏi ng dùng có muốn xóa hay ko và thêm thông báo khi xóa thành công cũng như thất bại
            // onClick={() => {
            //   nguoiDungServ
            //     .deleteUser(record.taiKhoan)
            //     .then((res) => {
            //       alert("Xóa thành công");
            //       // getAllUserThunk
            //       dispatch(getAllUser());
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //       alert("Có vấn đề");
            //     });
            // }}
          >
            Xóa
          </button>
          <button className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500">
            Sửa
          </button>
        </Space>
      ),
    },
  ];
  //   dữ liệu table
  return (
    <div>
      <input
        size="large"
        className="border-2 mb-5 w-full px-2 py-2"
        placeholder="tìm kiếm tên phim"
        onChange={(event) => {
          dispatch(getAllMovie(event.target.value));
        }}
      >
        {}
      </input>
      <Table columns={columns} dataSource={movies} />;
    </div>
  );
};

export default TableMovie;
