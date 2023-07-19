import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import TabMovieItem from "./TabMovieItem";

const TabMovie = (props) => {
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    rapServ
      .getAllHeThongRap()
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderItemTab = () => {
    return heThongRap.map((item, index) => {
      return {
        label: <img src={item.logo} className="w-10 h-10" alt="" />,
        key: index,
        children: <TabMovieItem maHeThongRap={item.maHeThongRap} />,
      };
    });
  };
  return (
    <div>
      <Tabs tabPosition="left" items={renderItemTab()} />
    </div>
  );
};

export default TabMovie;
