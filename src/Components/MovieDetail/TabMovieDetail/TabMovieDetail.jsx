import React from "react";
import { Tabs } from "antd";
import TabItem from "./TabItem";

const TabMovieDetail = (props) => {
  const renderShowtime = () => {
    return props.showtime.map((item, index) => ({
      label: (
        <div className="flex">
          <img
            src={item.logo}
            className="h-10 w-4/12 items-center justify-center"
            alt=""
          />
          <h3 className="w-8/12">{item.tenHeThongRap}</h3>
        </div>
      ),
      key: index,
      children: (
        <TabItem heThongRap={item} setMaLichChieu={props.setMaLichChieu} />
      ),
    }));
  };
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <Tabs tabPosition={"left"} items={renderShowtime()} />
    </div>
  );
};

export default TabMovieDetail;
