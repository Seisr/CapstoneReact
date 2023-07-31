import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import { useParams } from "react-router-dom";
import FormBook from "../FormBook/FormBook";
import Seat from "../Seat/Seat";

const TicketBook = () => {
  const { maLichChieu } = useParams();
  const [seatList, setSeatList] = useState([]);
  const [movieInfo, setMovieInfo] = useState({});
  useEffect(() => {
    movieServ
      .getBookingList(maLichChieu)
      .then((res) => {
        console.log(res);
        setSeatList(res.data.content.danhSachGhe);
        setMovieInfo(res.data.content.thongTinPhim);
        console.log("content: ", res.data.content.thongTinPhim);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex mt-10">
      <div className="w-8/12">
        <Seats seatList={seatList} />
        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat vip"></div>
            <small>VIP</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat sold"></div>
            <small>Sold</small>
          </li>
        </ul>
      </div>
      <div className="w-4/12">
        <FormBook movieInfo={movieInfo} />
      </div>
    </div>
  );
};

export default TicketBook;
