import { Space, Table, Tag } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import { nguoiDungServ } from "../../services/nguoiDungServices";

// id, họ tên, email, SDT, mã loại ng dùng, action

const TableUser = () => {
  //   const ref = useRef();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);
  console.log(users);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // custom lại hiển thị column
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại người dùng",
      key: "tags",
      dataIndex: "maLoaiNguoiDung",
      render: (text, record, index) => {
        // text chứa giá trị thuộc tính đó trong data
        console.log(text);
        // record chứa các phần tử trong mảng data
        console.log(record);
        // index là vị trí của phần tử trong mảng data
        console.log(index);
        // text == "QuanTri" ? "Quản Trị" : "Khách Hàng"
        // {} data binding ko dc viết if else
        return (
          <Tag color={text == "QuanTri" ? "magenta" : "blue"}>
            {text == "QuanTri" ? "Quản trị" : "Khách hàng"}
          </Tag>
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
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  alert("Xóa thành công");
                  // getAllUserThunk
                  dispatch(getAllUser());
                })
                .catch((err) => {
                  console.log(err);
                  alert("Có vấn đề");
                });
            }}
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
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  let newUser = users.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  return <Table columns={columns} dataSource={users.length > 0 && newUser} />;
};

export default TableUser;
