import React from "react";
import { BiDotsHorizontal, BiDownload } from "react-icons/bi";
import { FaComment, FaRetweet } from "react-icons/fa";
import { TbChartAreaLine } from "react-icons/tb";

const Tweet = ({ tweet }) => {
  const handleClick = () => {
    console.log("Click");
    console.log(tweet);
  };
  const handleMouseEnter = () => {
    console.log(tweet?.name);
    console.log("Mouse Enter");
  };
  return (
    <div
      className="p-5 w-full  hover:bg-[#080808] cursor-pointer tweet-border overflow-hidden "
      onClick={handleClick}
    >
      <div className="flex gap-4 w-full hover:bg-[#080808] relative">
        <div
          className="w-10 absolute"
          onMouseEnter={handleMouseEnter}
        >
          <img
            src={"/assets/image.png"}
            alt=""
            className="w-10 h-10 rounded-full min-w-full"
          />
        </div>

        <div className="ml-14 w-full flex flex-col ">
          <div className="flex justify-between  h-full  ">
            <div className="flex gap-2">
              <p className="w-20 sm:w-40 lg:w-fit font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {tweet?.name}
              </p>
              <div className="text-[#6A6F74]  flex gap-1  ">
                <p>{tweet?.username}</p>
                <p className="font-bold">.</p>

                <p className="text-sm sm:text-lg">May 13</p>
              </div>
            </div>

            <BiDotsHorizontal
              color="#6A6F74"
              size="20px"
              fontWeight="400"
              cursor={"pointer"}
              className=""
            />
          </div>
          <div>
            <p>
              {tweet?.text} Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Cupiditate, hic.
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-2 text-[#6A6F74]">
              <FaComment color="" />
              <p>1,222</p>
            </div>
            <div className="flex items-center gap-2 text-[#6A6F74]">
              <FaRetweet />
              <p>1,222</p>
            </div>
            {/* <div className="flex items-center gap-2 text-[#6A6F74]">
              <p>1,222</p>
            </div> */}
            <div className="flex items-center gap-2 text-[#6A6F74]">
              <TbChartAreaLine />
              <p>1,222</p>
            </div>
            {/* <div className="flex items-center gap-2 text-[#6A6F74]">
              <BiDownload />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
