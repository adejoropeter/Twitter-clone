import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import HomeRightBar from "../home/HomeRightBar";
import { setShowTweetToFalse } from "../../redux/tweetSlice";
import { useNavigate } from "react-router-dom";
import AddTweet from "../../components/tweet/AddTweet";
import { UploadTweet } from "../../components";
import CommentTweet from "../../components/comment/CommentTweet";

const Comment = () => {
  const tweet = useSelector((state) => state.post.viewTweet);
  console.log(tweet);
  const navigate = useNavigate();
  return (
    <div className="flex w-full  sm:w-fit md:w-[60%] lg:w-full min-h-full text-white relative xsm:border-l-2  border-l-[#16181c] border-r-[#16181c] ">
      <main className=" w-[100%] min-h-full flex flex-col text-white border-[#16181c] sm:border-r ">
        <header className=" sticky w-full top-0 backdrop-blur-md h-fit blur-0 flex flex-col justify-between z-10 ">
          <div className="pl-4 py-4 relative   flex items-center gap-10">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer w-10 h-10 hover:bg-[#181919] flex justify-center items-center rounded-full"
            >
              <BsArrowLeft className="cursor-pointer " size={20} />
            </div>
            <h3 className="text-2xl font-bold ">Tweet</h3>
          </div>
        </header>
        <div className="flex flex-col px-4 ">
          <div className="w-full border-b py-4 border-[#16181c]">
            <div className="">
              <img src="" alt="" />
              <h2 className="font-bold pb-2">{tweet.name}</h2>
            </div>
            <p className="">{tweet.text}</p>
          </div>
          <div className="text-[#71767B] py-4 flex gap-2 border-[#16181c] border-b">
            <span className="text-white">16</span>
            <span>Likes</span>
          </div>
          <div className="flex gap-3"></div>
          <CommentTweet />
        </div>
      </main>
      <HomeRightBar />
    </div>
  );
};

export default Comment;
