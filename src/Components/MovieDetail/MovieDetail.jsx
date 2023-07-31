import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import TabMovieDetail from "./TabMovieDetail/TabMovieDetail";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";

const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [showtime, setShowtime] = useState([]);
  const [maLichChieu, setMaLichChieu] = useState("");
  console.log("maLichChieu:", maLichChieu);
  console.log("movieDetail: ", movieDetail);
  useEffect(() => {
    movieServ
      .getMovieDetail(props.maPhim)
      .then((res) => {
        console.log(res);
        setMovieDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.maPhim]);
  useEffect(() => {
    movieServ
      .getShowtime(props.maPhim)
      .then((res) => {
        console.log("res: ", res);
        setShowtime(res.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.maPhim]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container">
      <div className="bg-white">
        <div className="pt-6 flex">
          {/* Image gallery */}
          <div
            className="w-4/12 mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
            // width="250 mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
            // height=" w-4/12 mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8"
          >
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={movieDetail.hinhAnh}
                alt="Two each of gray, white, and black shirts laying flat."
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          {/* Film info */}
          <div className="w-8/12 mx-auto m ax-w-2xl px-4 pb-5 pt-2 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-10">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {movieDetail.tenPhim}
              </h1>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-gray-900">Mô tả:</h3>
                <div className="space-y-5">
                  <p className="text-base text-gray-900">{movieDetail.moTa}</p>
                </div>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Thời lượng:
                  <span className="font-normal ml-3">
                    {showtime[0]
                      ? showtime[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong
                      : "Chưa rõ"}
                    <span className="ml-2">phút</span>
                  </span>
                </h3>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Đánh giá:
                  <span className="font-normal ml-3">
                    {movieDetail.danhGia}
                  </span>
                </h3>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Trạng thái:
                  <span className="font-normal ml-3">
                    {movieDetail.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </span>
                </h3>
              </div>
            </div>
            <button
              onClick={showModal}
              className="rounded-md border border-transparent bg-green-500 px-5 py-3 mt-5 mr-5 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Xem trailer
            </button>
            <NavLink
              to={maLichChieu ? `booking/${maLichChieu}` : ""}
              className="rounded-md border border-transparent bg-green-500 px-5 py-3 mt-5 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Mua vé ngay
            </NavLink>
          </div>
        </div>
        {/* TrailerVideo Modal */}
        <Modal
          width="1000"
          height="1000"
          title={movieDetail.tenPhim}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <video className="m-auto" width="1000" height="1000" controls>
            <source src={movieDetail.trailer} type="video/mp4" />
          </video>
        </Modal>
      </div>
      <TabMovieDetail showtime={showtime} setMaLichChieu={setMaLichChieu} />
    </div>
  );
};

export default MovieDetail;
