import React, { useEffect, useState } from "react";
import { BiDotsHorizontal, BiDownload } from "react-icons/bi";
import { FaComment, FaRetweet } from "react-icons/fa";
import { TbChartAreaLine } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  deleteTweet,
  setAddToRetweetArr,
  setRetweet,
  setShowTweetDlt,
  setUserUrlName,
  viewTweet,
} from "../../redux/tweetSlice";
import { auth } from "../../firebase";
import {motion  } from "framer-motion";

const Tweet = ({ tweet }) => {
  const urlName = useSelector((state) => state.post.userUrlName);
  const tweets = useSelector((state) => state.post.tweet);

  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const { pathname } = useLocation();
   
  // console.log(auth.currentUser);
  useEffect(() => {
    dispatch(setAddToRetweetArr());
  }, [tweet.retweeted]);
  const handleClick = (e) => {
    // e.stopPropagation()
    dispatch(viewTweet(tweet));
    dispatch(setUserUrlName(tweet?.profileName));
    navigate(`/comment/${tweet.profileName}`);
    // console.log("Parent!!!!!!!!!!!!!!");
    console.log(tweets)
  };
  const handleMouseEnter = () => {
    console.log(tweet?.name);
    console.log("Mouse Enter");
  };

  const handleShowDelete = (e) => {
    e.stopPropagation();
    dispatch(setShowTweetDlt({ id: tweet.id }));
  };
  const [sta,setSta]=useState(false)
  return (
    <motion.div
      className="px-5 py-2 w-full  hover:bg-[#080808] cursor-pointer tweet-border overflow-hidden "
      onClick={handleClick}
    >
      <div className="flex gap-4 w-full hover:bg-[#080808] relative">
        <div
          className={`${
            tweet.isThread
              ? "flex flex-col items-center gap-2 h-full w-12"
              : "w-10"
          }   absolute  `}
          onMouseEnter={handleMouseEnter}
        >
          <img
            src={"/assets/image.png"}
            alt=""
            className={` ${
              tweet.isThread ? "h-10 w-10" : "h-10 w-10"
            } rounded-full `}
          />
          {tweet.isThread && (
            <div className="border-l-2 border-[#5b5c5da3] h-10"></div>
          )}
          {tweet.isThread && (
            <img
              src={"/assets/image.png"}
              alt=""
              className={`h-5 w-5 rounded-full `}
            />
          )}
        </div>
        <div className="ml-14 w-full flex flex-col ">
          <div className="flex justify-between  h-full  ">
            <div className="flex gap-2">
              <p className="w-20 sm:w-40 lg:w-fit font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {tweet?.profileName}
              </p>
              <div className="text-[#6A6F74]  flex gap-1  ">
                <p>{tweet?.username}</p>
                <p className="font-bold">.</p>

                <p className="text-sm sm:text-lg">May 13</p>
              </div>
            </div>
            <div>
              <div className="relative">
                {tweet.showTweetDlt && (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      // deleteTweet({
                      //   id: tweet.id,
                      // });
                      dispatch(deleteTweet({ id: tweet.id }));
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
                  onClick={(e) => handleShowDelete(e)}
                />
              </div>
            </div>
          </div>
          <div>
            <p>{tweet?.text}</p>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex items-center gap-2 text-[#6A6F74]">
              <FaComment color="" />
              <p>{tweet?.comment?.length}</p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setRetweet({ id: tweet.id }));
                // dispatch(setAddToRetweetArr())
              }}
              className="flex items-center gap-2 text-[#6A6F74]"
            >
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
          {tweet.isThread && (
            <div className="w-fit mt-2 flex items-center ">
              <h2 className="text-[#00BA7C] font-bold">Show this Thread</h2>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Tweet;
