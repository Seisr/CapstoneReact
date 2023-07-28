import React from "react";
import TableMovie from "../../Components/TableMovie/TableMovie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllMovie } from "../../redux/slices/movieSlice";

const FilmManagement = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => {
    return state.movies;
  });

  useEffect(() => {
    dispatch(getAllMovie());
  }, []);
  return (
    <div>
      <TableMovie />
    </div>
  );
};

export default FilmManagement;
