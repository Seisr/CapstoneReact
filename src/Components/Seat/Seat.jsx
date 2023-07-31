import React from "react";
// import "./Seat.css";

const Seat = (props) => {
  //   const [count, setCount] = useState(0);
  let count = 0;
  const convertArrSeats = () => {
    let arr = [];
    for (let i = 1; i <= props.seatList.length / 16; i++) {
      const seats = props.seatList.filter(
        (item) => Number(item.stt) > count && Number(item.stt) <= 16 * i
      );
      arr.push(seats);
      count += 16;
    }
    return arr;
  };
  //   console.log("props: ", props.seatList);
  //   console.log("convert: ", convertArrSeats());
  return (
    <div className="container">
      <div className="screen">SCREEN</div>
      {convertArrSeats().map((item, index) => {
        return (
          <div className="row" key={index}>
            {item.map((ghe) => {
              return (
                <div
                  className={`seat ${ghe.loaiGhe === "vip" ? "vip" : ""} ${
                    ghe.daDat ? "sold" : ""
                  }`}
                  key={ghe.maGhe}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Seat;
