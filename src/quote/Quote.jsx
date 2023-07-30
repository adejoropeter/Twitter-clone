import React from "react";
import { TbX } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import QuoteTweet from "./QuoteTweet";

const Quote = () => {
  const navigate = useNavigate();
  const view = useSelector((state) => state.post.viewTweet);
  console.log(view);
  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed  z-50 overflow-y-hidden ">
      <div className="bg-black overflow-scroll sm:w-[600px] sm:min-h-0 min-h-screen sm:h-[300px]  top-[35%] left-[50%]  -translate-x-[50%] -translate-y-[50%] flex flex-col sm:rounded-2xl overflow-x-hidden relative ">
        <div className="flex items-center py-2 px-4">
          <div className="flex-1 flex items-center ">
            <abbr
              title="close"
              className=" w-10 h-10 transition-colors duration-200 hover:bg-[#181919] delay-100 rounded-full flex justify-center items-center"
            >
              <TbX
                size="20px"
                className="text-white   self-center cursor-pointer"
                onClick={() => {
                  navigate(-1);
                  // dispatch(resetGroupTweet());
                  // dispatch(resetCurr());
                  document.body.style.overflow = "visible";
                }}
              />
            </abbr>
            <div className="flex-1 flex justify-end text-[#00BA7C] font-bold">
              Drafts
            </div>
          </div>
        </div>
        <div className="px-6 flex text-white gap-2 h-[100px]">
          <div className="flex flex-col justify-center items-center ">
            <div className="h-full w-12 flex justify-center">
              <img
                src={"/assets/image.png"}
                alt=""
                className={`h-10 w-10 rounded-full `}
              />
            </div>
            <p className="border-l-2 h-full border-[#5b5c5da3]"></p>
          </div>
          <div>
            <h1 className="font-bold">{view.profileName}</h1>
            <p>{view.text}</p>
            <p className="mt-4 font-semibold text-[#6A6F74]">
              Replying to{" "}
              <span className="text-[#00BA7C]">{view.username}</span>
            </p>
          </div>
        </div>
        <div className="px-6 flex mt-4">
          <div className="w-12 flex justify-center">
            <img
              src={"/assets/image.png"}
              alt=""
              className={`h-10 w-10 rounded-full `}
            />
          </div>
          <input
            placeholder="Tweet your Reply!"
            type="text"
            className="w-full border-none bg-transparent outline-none text-white px-3 text-2xl placeholder:text-[#6A6F74]"
          />
        </div>
        <div className="px-6 absolute bottom-0 w-full">
          <QuoteTweet />
        </div>
      </div>
    </div>
  );
};

export default Quote;
