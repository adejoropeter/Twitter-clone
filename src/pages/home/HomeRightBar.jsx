import { signOut } from "firebase/auth";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { TbX } from "react-icons/tb";
import { auth } from "../../firebase";

const HomeRightBar = () => {
  return (
    <div className="lg:flex hidden h-fit sticky top-0  w-[120%]  overflow-hidden flex-col gap-6  p-4">
      <div className="w-full h-fit bg-black pl- shadow-xl">
        <div className=" rounded-full flex items-center gap-2 px-2 sticky top-0 w-[350px] h-[53px] bg-[#202327] justify-between pl-6">
          <BiSearch  className="text-[#00BA7C] w-[10%] h-10 mt-1" size={""} />
          <input
            placeholder="Search Twitter"
            type="text"
            className="placeholder:text-[#6A6F74] placeholder:font-normal outline-none placeholder:text-lg text-lg  border-none bg-transparent text-white w-full"
          />
          <div className="bg-[#00BA7C] h-8 w-10 rounded-full flex justify-center items-center skew-x-12 cursor-pointer">
            <TbX size={"20px"} />
          </div>
        </div>
      </div>
      <div className="ml-1 p-4  rounded-xl w-[350px] h-fit bg-[#1D1F23]">
        <h1 className="text-[rgb(231,233,234)]  text-xl font-bold">
          Trends for you
        </h1>
      </div>
      {/* <div className="w-full h-20 bg-red-300"></div>
      <div className="w-full h-20 bg-pink-300"></div>
      <div className="w-full h-20 bg-black"></div>
      <div className="w-full h-20 bg-blue-300"></div>
      <div className="w-full h-20 bg-purple-300"></div>
      <div className="w-full h-20 bg-green-300"></div>
      <div className="w-full h-20 bg-red-300"></div>
      <div className="w-full h-20 bg-pink-300"></div>
      <div className="w-full h-20 bg-black"></div> */}
      {/* <div className="w-full h-20 bg-blue-300"></div>
      <div className="w-full h-20 bg-purple-300"></div>
      <div className="w-full h-20 bg-green-300"></div>
      <div className="w-full h-20 bg-red-300"></div>
      <div className="w-full h-20 bg-pink-300"></div> */}
      {/* <div className="w-full h-20 bg-black"></div>
      <div className="w-full h-20 bg-blue-300"></div>
      <div className="w-full h-20 bg-purple-300"></div>
      <div className="w-full h-20 bg-green-300"></div> */}
    </div>
  );
};

export default HomeRightBar;
