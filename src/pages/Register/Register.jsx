import React from "react";
import Lottie from "react-lottie";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import registerAni from "../../assets/animation/registerAni.json";
const Register = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAni,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/4 items-center justify-center bg-white">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
