// use for movie detail page
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { movieServ } from "../../services/movieServices";
import MovieDetail from "../../Components/MovieDetail/MovieDetail";

const UseParam = () => {
  let { maPhim, maLichChieu } = useParams();
  // console.log(maPhim);

  return (
    <div>{maLichChieu ? <Outlet /> : <MovieDetail maPhim={maPhim} />}</div>
  );
};

export default UseParam;
