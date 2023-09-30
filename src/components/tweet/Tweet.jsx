import React, { useEffect, useRef } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaComment, FaRetweet } from "react-icons/fa";
import { TbChartAreaLine } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  PinTweet,
  changeIDIndexMinusOne,
  clearTotalNumberOfTweetAddedAfterPinnedTweet,
  deleteTweet,
  editTweet,
  pinTweet,
  quote,
  setAddToRetweetArr,
  setRetweet,
  setShowEdit,
  setShowMsg,
  setShowTweetDlt,
  setUserUrlName,
  showMsg,
  unPinTweet,
  viewTweet,
} from "../../redux/tweetSlice";
import { auth } from "../../firebase";
import { copyPrevTextToInput } from "../../redux/inputFieldSlice";
import { BsFillPinFill } from "react-icons/bs";

const Tweet = ({ tweet, reffs ,refd}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const currentUser = useSelector((state) => state.login.currentUser);
  const showMsg = useSelector((state) => state.post.showMsg);
  const tweets = useSelector((state) => state.post.tweet);
  const total = useSelector((state) => state.post.total);
  const copyOfNewTweets = useSelector((state) => state.post.copyOfNewTweets);
  const id = useSelector((state) => state.post.idIndex);
  // console.log(auth.currentUser);
  useEffect(() => {
    dispatch(setAddToRetweetArr());
  }, [tweet.retweeted]);

  const handleClick = () => {
    if (currentUser) {
      // dispatch(quote({ id: tweet.id }));
      console.log(tweet);
      dispatch(viewTweet(tweet));

      dispatch(setUserUrlName(tweet?.profileName));
      navigate(`/comment/${tweet.profileName}`);
      document.documentElement.scrollTop = 0;
    } else {
      dispatch(setShowMsg(true));
    }
  };
  const handleMouseEnter = () => {
    console.log("Mouse Enter");
  };
  // console.log(tweet.text)
  const inputVal = useSelector((state) => state.quote.inputVal);

  const renderColoredText = (value) => {
    // Use regular expression to find words starting with "@"
    const regex = /(?:^|\s)(@\w+)/g;
    const coloredText = value?.join("").replace(regex, (match, word) => {
      return ` ${match} `;
    });
    return coloredText
      .split(" ")
      ?.filter((_, i) => i < 35)
      .map((word, index) => {
        if (word.startsWith("@")) {
          return (
            <span className="text-blue-400" key={index}>
              {word}
            </span>
          );
        } else {
          return (
            <span className="text-white" key={index}>
              {word}{" "}
            </span>
          );
        }
      });
  };

  const handleShowDelete = (e) => {
    e.stopPropagation();
    dispatch(setShowTweetDlt({ id: tweet.id }));
    dispatch(viewTweet(tweet))
  };
  const handlePin = (e) => {
    e.stopPropagation();
    dispatch(unPinTweet({ id: tweet.id }));
  };

  const divRef = useRef(null);
  return (
    <div
      className="xxs:pr-8 xxs:pl-6 px-2 lg:pr-5 lg:pl-5 py-2 w-full  hover:bg-[#080808] cursor-pointer tweet-border overflow-hidden "
      onClick={handleClick}
    >
      {/* {renderColoredText("@sam")} */}
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
        <div className="ml-14 w-full flex flex-col gap-">
          <div className="flex justify-between  h-full  ">
            <div className="flex gap-2 justify-start w-full">
              <p
                onClick={() => console.log(tweet)}
                className="w-20  sm:w-fit md:w-fit font-bold whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {tweet?.profileName}
              </p>
              <div className="text-[#6A6F74]  hidden xxs:flex gap-1  ">
                <p className="w-20  sm:w-fit md:w-fit lg:w-full font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {tweet?.username}
                </p>
                <p className="font-bold">.</p>

                <p className="text-sm sm:text-lg w-full">May 13</p>
              </div>
            </div>
            <div>
              <div className="relative">
                {tweet.showTweetDlt && (
                  <div className="absolute top-4 w-fit flex flex- right-5 gap-3 z-50">
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setShowTweetDlt({ id: tweet.id }));
                        if (currentUser) {
                          dispatch(
                            deleteTweet({
                              id: tweet.id,
                              // qutID: tweet?.quoteTweet.id,
                            })
                          );
                        } else {
                          dispatch(setShowMsg(true));
                        }
                      }}
                      className=" bg-black  p-2  shadow-sm shadow-orange-50 cursor-pointer"
                    >
                      Delete
                    </p>

                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        document.documentElement.scrollTop = 0;

                        dispatch(setShowTweetDlt({ id: tweet.id }));
                        if (currentUser) {
                          if (tweet.isEdit) {
                            return;
                          } else {
                            document.body.style.overflow = "hidden";
                            if (tweet.isQuote || tweet.isThread) {
                              dispatch(
                                copyPrevTextToInput({
                                  value: [...tweet.text],
                                })
                              );
                            } else {
                              dispatch(
                                copyPrevTextToInput({ value: tweet.text })
                              );
                            }
                          }
                          reffs.current?.focus();
                          console.log(reffs)
                          localStorage.setItem("editID", tweet.id);
                          dispatch(setShowEdit(true));
                        } else {
                          dispatch(setShowMsg(true));
                        }
                      }}
                      className={` ${
                        tweet.isEdit && "bg-slate-600 cursor-default"
                      }  bg-black  p-2  shadow-sm shadow-orange-50 cursor-pointer`}
                    >
                      Edit
                    </p>
                    <p
                      ref={divRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setShowTweetDlt({ id: tweet.id }));
                        if (currentUser) {
                          if (divRef.current?.textContent === "Pin") {
                            // document.body.scrollTop=0
                            document.documentElement.scrollTop = 0;

                            const findIfPinnedTweetExist = tweets.find((a) => {
                              return a.isPinned === true;
                            });
                             
                            if (findIfPinnedTweetExist) {
                              dispatch(unPinTweet({ id: tweet.id }));
                              dispatch(
                                pinTweet({ id: tweet.id, text: tweet.text })
                              );
                            } else {
                              dispatch(
                                pinTweet({ id: tweet.id, text: tweet.text })
                              );
                            }
                            localStorage.removeItem("pinned-new-index");
                          } else {
                            dispatch(unPinTweet({ id: tweet.id }));

                            if (copyOfNewTweets.length) {
                              return;
                            } else {
                              dispatch(
                                clearTotalNumberOfTweetAddedAfterPinnedTweet()
                              );
                            }
                          }
                          dispatch(setShowMsg(true));
                        } else {
                          dispatch(setShowMsg(true));
                        }
                      }}
                      className="bg-black w-fit p-2  shadow-sm shadow-orange-50 cursor-pointer"
                    >
                      {tweet.isPinned ? "UnPin" : "Pin"}
                    </p>
                  </div>
                )}
                <div className="flex">
                  {tweet.isEdit && <div className="text-[#6A6F74]">edited</div>}

                  {tweet.isPinned && (
                    <BsFillPinFill
                      color="#6A6F74"
                      size="20px"
                      fontWeight="400"
                      cursor={"pointer"}
                      className=""
                      onClick={(e) => handlePin(e)}
                    />
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
          </div>

          <div className="flex flex-col gap-2">
            {/* <p>{renderColoredText(tweet?.text)}</p> */}
            <p>{tweet?.text}</p>
            {tweet.isQuote && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(tweet.quoteTweet);
                  if (currentUser) {
                    navigate(`/comment/${tweet.profileName}`);
                    document.documentElement.scrollTop = 0;
                    const findTweetIndex = tweets?.find(
                      (x) => tweet.quoteTweet.id === x.id
                    );
                    if (findTweetIndex) {
                      dispatch(viewTweet(tweet.quoteTweet));
                    } else {
                      navigate("/404");
                    }
                  } else {
                    dispatch(setShowMsg(true));
                  }
                }}
                className="border border-[#5b5c5da3] p-3 rounded-xl w-full"
              >
                <h3>{tweet?.quoteTweet?.profileName}</h3>
                <p>{tweet?.quoteTweet?.text}</p>
                {tweet?.quoteTweet?.isThread && (
                  <div className="w-fit mt-2 flex items-center ">
                    <h2 className="text-[#00BA7C] font-normal">
                      Show this Thread
                    </h2>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 w-full">
            <div
              onClick={(e) => {
                e.stopPropagation();
                dispatch(viewTweet(tweet));
                navigate("/compose/tweet");
                console.log(reffs)
                console.log(refd)
                refd.current?.focus()
                localStorage.setItem("quoteId", tweet.id);
              }}
              className="flex items-center gap-2 text-[#6A6F74]"
            >
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
    </div>
  );
};

export default Tweet;
