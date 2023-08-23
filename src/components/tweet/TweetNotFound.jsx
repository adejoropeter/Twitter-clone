import React from "react";
import { useNavigate } from "react-router-dom";

const TweetNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="xsm:border-l-2 border-l-[#16181c] w-full  lg:translate-x-[21.3%] sm:translate-x-[25%]  min-h-screen bg-[#000000]  sm:w-[80%]  text-white flex lg:max-w-full justify-center items-center">
      <div className="w-[300px] text-center">
        The particular tweet you are looking for may have been deleted by the
        creator. <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/foryou")}>Go to Home Page</span>
      </div>
    </div>
  );
};

export default TweetNotFound;
