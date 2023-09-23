import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UploadTweet from "../../components/tweet/UploadTweet";
import HomeRightBar from "./HomeRightBar";
import { AiOutlineArrowDown, AiOutlineTwitter } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCopyTweetArr,
  addToTweetArr,
  changeIDIndex,
  clearCopyTweetArr,
  clearTotalNumberOfTweetAddedAfterPinnedTweet,
  editOnce,
  editTweet,
  reverseTweetArr,
  setShowEdit,
  totalNumberOfTweetAddedAfterPinnedTweet,
} from "../../redux/tweetSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { clearInputField } from "../../redux/inputFieldSlice";
import { auth, db } from "../../firebase";
import { BiArrowFromTop } from "react-icons/bi";
const Home = ({ refrrr }) => {
  const [nav, setNav] = useState("for you");
  const tweet = useSelector((state) => state.post.tweet);

  const showEdit = useSelector((state) => state.post.showEdit);
  const total = useSelector((state) => state.post.total);
  const id = useSelector((state) => state.post.idIndex);
  const copyOfNewTweets = useSelector((state) => state.post.copyOfNewTweets);
  const state = useSelector((state) => state.input.value);
  const profileName = useSelector((state) => state.user.user_details);
  const [stat, setStat] = useState(false);
  const dispatch = useDispatch();
  const inputVal = state?.value?.join("");
  const renderColoredText = (value) => {
    // Use regular expression to find words starting with "@"
    const regex = /(?:^|\s)(@\w+)/g;
    const coloredText = inputVal?.replace(regex, (match, word) => {
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
  const handleAddTweet = async () => {
  
    dispatch(changeIDIndex());
    dispatch(totalNumberOfTweetAddedAfterPinnedTweet());
    document.body.style.overflowY = "visible";
    const newArr = {
      // text: renderColoredText()||"Nothing here",
      text:state.value,
      profileName: "Adejoro Peter",
      username: "@ade_peter",
      comment: [],
      likes: 1,
      isPinned: false,
      isEdited: false,
      // id: copyOfNewTweets.length - 1 + 1 || 0,
      id: id + 1,
      // id: copyOfNewTweets.length
      //   ? copyOfNewTweets[copyOfNewTweets.length - 1].id + 1
      //   : tweet[0].id + 1 || Math.random(),
      retweeted: false,
    };
    if (showEdit) {
      dispatch(
        editTweet({
          text: "loading...",
          id: Number(localStorage.getItem("editID")),
        })
      );
      console.log(tweet);
      setTimeout(() => {
        dispatch(editOnce(Number(localStorage.getItem("editID"))));
        dispatch(
          editTweet({
            // text: renderColoredText(),
            text: inputVal,

            id: Number(localStorage.getItem("editID")),
          })
        );
      }, 1200);
      dispatch(setShowEdit(false));
    } else {
      dispatch(addToCopyTweetArr([newArr]));
      
      // dispatch(addToTweetArr([newArr]))
    }
    console.log(showEdit);
    // await addDoc(collection(db, "tweets"), {
    //   text: text?.join(""),
    //   profileName: profileName?.name,
    // profilePic:
    //   timeStamp: serverTimestamp(),
    // });
    // console.log(auth);
    dispatch(clearInputField());
  };
  let idd =
    Number(localStorage.getItem("pinned-prev-index")) +
    Number(copyOfNewTweets.length);
  // w-full sm:w-[80%] sm:translate-x-[25%]   h-screen bg-[#000000] flex   text-white
  return (
    <div className=" sm:w-[80%]  flex sm:translate-x-[25%] lg:translate-x-[21.3%]  xsm:border-l-2 border-l-[#16181c] w-full     min-h-screen bg-[#000000]   text-white lg:max-w-full">
      {showEdit && (
        <div
          onClick={() => {
            dispatch(setShowEdit(false));
            dispatch(clearInputField())
            document.body.style.overflowY = "visible";
          }}
          className="absolute overflow-hidden h-full w-full  z-[1000] backdrop-blur-lg blur-0"
        ></div>
      )}
      <main className=" w-full sm:w-[150%] lg:w-[180%] h-full flex flex-col text-white border-[#16181c] sm:border-r relative">
        {/* <main className="relative w-[200px]   h-fit"> */}
        <header className="border-b sticky w-full top-0 backdrop-blur-md border-[#16181c]   sm:h-[115px] blur-0 flex flex-col justify-between z-10">
          <div className="pl-4 py-4 relative xsm:hidden block">
            <div className="absolute">
              <img src="/ldl" className="bg-gray-300 w-8 h-8 rounded-full " />
            </div>
            <div className="flex justify-center">
              <AiOutlineTwitter className="text-[#00BA7C] " size={30} />
            </div>
          </div>
          <h1 className="text-xl font-bold pl-4 pt-4 xsm:block hidden">Home</h1>
          <div className="flex w-full">
            <NavLink
              to="/foryou"
              className={({ isActive }) => {
                if (isActive) {
                  setNav("for you");
                }
                return "flex-1 cursor-pointer flex  h-[51.99px] justify-center hover:bg-[#181818] font-bold transition-colors delay-100";
              }}
            >
              <div className="w-fit flex h-full flex-col justify-end gap-3 ">
                <h2 className="tracking-wider">For you</h2>
                <p
                  className={`${
                    nav === "for you"
                      ? "w-full h-[4px] px-4 bg-[#00BA7C] rounded-md"
                      : ""
                  }`}
                ></p>
              </div>
            </NavLink>
            <NavLink
              to="/following"
              className={({ isActive }) => {
                if (isActive) {
                  setNav("following");
                }
                return "flex-1 cursor-pointer flex  h-[51.99px] justify-center hover:bg-[#181818] font-bold transition-colors delay-100";
              }}
            >
              <div className="w-fit flex h-full flex-col justify-end gap-3 ">
                <h2
                  className={`${
                    nav === "following"
                      ? "text-white"
                      : "text-[#71767B] font-normal"
                  }`}
                >
                  Following
                </h2>
                <p
                  className={`${
                    nav === "following"
                      ? "w-full h-[4px] px-4 bg-[#00BA7C] rounded-md"
                      : ""
                  }`}
                ></p>
              </div>
            </NavLink>
          </div>
        </header>
        <motion.div
          // initial={{ top: "144px", opacity: 0, display: "hidden" }}
          animate={
            copyOfNewTweets?.length && {
              // y: "30%",
              position: "sticky",
              display: "block",
              opacity: 1,
            }
          }
          onClick={() => {
            setStat(false);
            dispatch(addToTweetArr(...[copyOfNewTweets]));
            localStorage.setItem(
              "pinned-new-index",
              Number(localStorage.getItem("pinned-prev-index")) + total
            );

            console.log(idd);
            dispatch(clearCopyTweetArr());
            setTimeout(() => {
              // dispatch(sortArr());
              document.documentElement.scrollTop = 100;
            }, 200);
          }}
          className=" top-[25%] opacity-0 hidden  z-10 left-[50%] -translate-x-[50%] sm:-translate-x-[100%] lg:-translate-x-[200%]    w-fit md:mx-[0px] sticky  "
        >
          <div className="cursor-pointer bg-green-400 flex items-center gap-1 fit rounded-full py-1 px-3">
            <h1 className=""> New Tweet </h1>
            <AiOutlineArrowDown />
          </div>
        </motion.div>
        <UploadTweet handleAddTweet={handleAddTweet} refrr={refrrr} />

        <Outlet />
      </main>
      {/* SIDE BAR */}
      <HomeRightBar />
    </div>
  );
};

export default Home;
