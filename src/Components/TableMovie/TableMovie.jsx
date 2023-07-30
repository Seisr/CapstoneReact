import { Space, Table, Input, Popconfirm, message } from "antd";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllMovie } from "../../redux/slices/movieSlice";
import { NavLink } from "react-router-dom";
import { movieServ } from "../../services/movieServices";

const TableMovie = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => {
    return state.movies;
  });
  console.log(movies);
  //Popconfirm

  const confirm = (maPhim) => {
    console.log(maPhim);
    movieServ
      .xoaPhim(maPhim)
      .then((res) => {
        message.success("Xóa Thành Công");
        dispatch(getAllMovie());
      })
      .catch((err) => {
        console.log(err);
        message.error("Xóa Không Thành Công");
      });
  };
  const cancel = (e) => {
    // console.log(e);
    message.error("Xóa Không Thành Công");
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
        return <img src={movies.hinhAnh} alt={movies.tenPhim} width={200} />;
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
          <Popconfirm
            title="Xóa Phim Có Mã Phim"
            description={record.maPhim}
            onConfirm={() => {
              confirm(record.maPhim);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
              // sẽ sửa lại thêm 1 popconfirm vào để hỏi ng dùng có muốn xóa hay ko và thêm thông báo khi xóa thành công cũng như thất bại
            >
              Xóa
            </button>
          </Popconfirm>
          <button className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500">
            <NavLink to={`/admin/edit/${record.maPhim}`}>Sửa</NavLink>
          </button>
        </Space>
      ),
    },
  ];
  //   dữ liệu table
  return (
    <div>
      <button className="px-3 py-2 mb-5 bg-blue-500 rounded-lg">
        <NavLink to="/admin/addphim">Thêm Phim</NavLink>
      </button>
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
      <Table
        className="overflow-x-scroll"
        columns={columns}
        dataSource={movies}
      />
      ;
    </div>
  );
};

export default TableMovie;
