import React from "react";
import loadingAnimation from "./../../assets/animation/loadingAnimation.json";
import Lottie from "react-lottie";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="h-screen w-full flex items-center absolute bg-white"
      style={{ zIndex: "9999" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
