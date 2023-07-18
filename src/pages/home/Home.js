import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UploadTweet from "../../components/tweet/UploadTweet";
import HomeRightBar from "./HomeRightBar";
import { AiOutlineTwitter } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToTweetArr } from "../../redux/tweetSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { clearInputField } from "../../redux/inputFieldSlice";
import { auth, db } from "../../firebase";
const Home = () => {
  const [nav, setNav] = useState("for you");
  const tweet = useSelector((state) => state.post.tweet);
  const state = useSelector((state) => state.input.value);
  const profileName = useSelector((state) => state.user.user_details);
  const dispatch = useDispatch();
  const inputVal = state?.value?.join("");
  const text = inputVal
    ?.split("")
    ?.filter((_, i) => i < 35)
    ?.map((a) => a);
  const handleAddTweet = async () => {
    dispatch(
      addToTweetArr({
        text: text?.join("") || "Nothing here",
        profileName: "Adejoro Peter",
        username: "@ade_peter",
        comment: 1,
        likes: 1,
        retweet: 3,
      })
    );
    // await addDoc(collection(db, "tweets"), {
    //   text: text?.join(""),
    //   profileName: profileName?.name,
      // profilePic:
    //   timeStamp: serverTimestamp(),
    // });
    // console.log(auth);
    dispatch(clearInputField());
  };
  return (
    <div className="flex w-screen  sm:w-fit md:w-[60%] lg:w-full min-h-full   xsm:border-l-2  border-l-[#16181c]">
      <main className=" w-full min-h-full flex flex-col text-white border-[#16181c] sm:border-r relative">
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
        <UploadTweet handleAddTweet={handleAddTweet} />

        <Outlet />
      </main>
      <HomeRightBar />
    </div>
  );
};

export default Home;
