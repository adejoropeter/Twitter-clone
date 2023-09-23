import React from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import QuoteTweet from "./QuoteTweet";
import { addToTweetArray } from "../redux/quoteSlice";

const Quote = () => {
  const navigate = useNavigate();
  const view = useSelector((state) => state.post.viewTweet);
  const inputVal = useSelector((state) => state.quote.inputVal);
  const quote = useSelector((state) => state.post.quote);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed  z-[200]  overflow-y-hidden ">
      {/* <div className="bg-black      h-screen   w-full    "> */}
      <div className="bg-black h-full overflow-x-hidden flex flex-col sm:top-[35%] -translate-x-[50%]  sm:rounded-2xl   left-[50%] sm:h-[300px] sm:-translate-y-[50%] overflow-scroll sm:w-[600px] relative">
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
                  document.body.style.overflowY = "visible";
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
            <h1 className="font-bold">{view?.profileName}</h1>
            <p>{view?.text}</p>
            <p className="mt-4 font-semibold text-[#6A6F74]">
              Replying to{" "}
              <span className="text-[#00BA7C]">{view?.username}</span>
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
          <textarea
            cols="10"
            rows="10"
            placeholder="Tweet your Reply!"
            className="w-full border-none bg-transparent outline-none text-white px-3 text-2xl placeholder:text-[#6A6F74] resize-none"
            value={inputVal}
            onChange={(e) => {
              dispatch(addToTweetArray( e.target.value ));
            }}
          ></textarea>
          {/* <input
            type="text"
            className="w-full border-none bg-transparent outline-none text-white px-3 text-2xl placeholder:text-[#6A6F74]"
          /> */}
        </div>
        <div className="px-6 mb-4 absolute bottom-0 w-full">
          <QuoteTweet />
        </div>
      </div>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, placeat?</p> */}
    </div>
  );
};

export default Quote;
