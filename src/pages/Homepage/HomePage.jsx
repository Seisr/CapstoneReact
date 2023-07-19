import React from "react";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import ListMovie from "../../Components/ListMovie/ListMovie";
import TabMovie from "../../Components/TabMovie/TabMovie";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <HomeBanner />
      {/* Danh sách phim  */}
      <ListMovie />
      <TabMovie />
    </div>
  );
};

export default HomePage;
