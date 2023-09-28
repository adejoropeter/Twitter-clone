import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import HomeRightBar from "../home/HomeRightBar";
import {
  deleteComment,
  quote,
  setShowCommentDlt,
} from "../../redux/tweetSlice";
import { useNavigate } from "react-router-dom";
import AddTweet from "../../components/tweet/AddTweet";
import { UploadTweet } from "../../components";
import CommentTweet from "../../components/comment/CommentTweet";
import { BiDotsHorizontal } from "react-icons/bi";
import { useEffect } from "react";

const Comment = () => {
  const tweet = useSelector((state) => state.post.viewTweet);
  const comment = useSelector((state) => state.post.tweet);
  // const tweets = useSelector((state) => state.post.tweet);
  // const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //    const findIfPinnedTweetExist = comment.find((a) => {
  //      return a?.quoteTweet?.id === tweet.id;
  //    });
  //   dispatch(quote({ id: tweet.id, obj: findIfPinnedTweetExist }));
  // }, [comment]);
  return (
    <div
      className="xsm:border-l-2 border-l-[#16181c] w-full  lg:translate-x-[21.3%] sm:translate-x-[25%]  min-h-screen bg-[#000000] flex sm:w-[80%]  text-white lg:max-w-full
    "
    >
      <main className="    w-full sm:w-[150%] lg:w-[180%] min-h-full flex flex-col text-white border-[#16181c] sm:border-r relative ">
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
        <div className="flex flex-col  ">
          <div className="w-full border-b px-4 py-4 border-[#16181c]">
            <div className="">
              <img src="" alt="" />
              <h2 className="font-bold pb-2">{tweet?.profileName}</h2>
            </div>
            <p className="">{tweet?.text}</p>
          </div>
          <div className="text-[#71767B] py-4 flex gap-2 border-[#16181c] border-b px-4">
            <span className="text-white">16</span>
            <span>Likes</span>
          </div>
          {!tweet?.is && (
            <div onClick={()=>console.log(tweet.quote)} className="text-[#71767B] py-4 flex gap-2 border-[#16181c] border-b px-4">
              <span className="text-white">{tweet?.quote?.length}</span>

              <span>Quote</span>
            </div>
          )}
          <div className="flex gap-3"></div>
          <CommentTweet />
          <div>
            {comment
              ?.filter((a) => {
                return a?.id === tweet?.id;
              })
              .map((a, idx) => {
                return (
                  <div key={idx}>
                    {a?.comment.length ? (
                      a?.comment?.map((a, idx) => (
                        <div
                          key={idx}
                          className="p-5 w-screen xxs:w-full  hover:bg-[#080808]  tweet-border overflow-hidden "
                          // onClick={handleClick}
                        >
                          <div className="flex gap-4 w-full hover:bg-[#080808] relative">
                            <div
                              className="w-10 absolute"
                              // onMouseEnter={handleMouseEnter}
                            >
                              <img
                                src={"/assets/image.png"}
                                alt=""
                                className="xxs:w-10 w-8 h-8 xxs:h-10 rounded-full min-w-full"
                              />
                            </div>

                            <div className="ml-14 w-full flex flex-col ">
                              <div className="flex justify-between  h-full  ">
                                <div className="flex gap-2">
                                  <p className="w-20 sm:w-40 lg:w-fit font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                    {a?.profileName}
                                  </p>
                                  <div className="text-[#6A6F74]  hidden xxs:flex gap-1  ">
                                    <p>@piro</p>
                                    <p className="font-bold">.</p>

                                    <p className="text-sm sm:text-lg">May 13</p>
                                  </div>
                                </div>
                                <div className="relative">
                                  {a.showDlt && (
                                    <p
                                      onClick={() => {
                                        dispatch(
                                          deleteComment({
                                            id: tweet.id,
                                            cmtId: a.id,
                                          })
                                        );
                                      }}
                                      className="absolute top-4 bg-black w-fit p-2 right-5 shadow-sm shadow-orange-50 cursor-pointer"
                                    >
                                      Delete
                                    </p>
                                  )}
                                  <BiDotsHorizontal
                                    color="#6A6F74"
                                    size="20px"
                                    fontWeight="400"
                                    cursor={"pointer"}
                                    className=""
                                    onClick={() =>
                                      dispatch(
                                        setShowCommentDlt({
                                          id: tweet.id,
                                          cmtId: a.id,
                                        })
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="  w-fit">
                                <p className="text-white ">
                                  {" "}
                                  <span className="text-[#1D9BF0]">
                                    @{tweet?.profileName}
                                  </span>{" "}
                                  {a?.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center mb-10">
                        <center className="pt-10 w-1/2 sm:w-full text-center">
                          No comment!! Be the first to react to this tweet🙏😲
                        </center>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <HomeRightBar />
    </div>
  );
};

export default Comment;
