import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Tweet } from "../../components";
import CustomButton from "../../components/button/CustomButton";
import SignInWithGoogleButton from "../../components/SignInWithGoogleButton";
import { auth, provider } from "../../firebase";
import HomeRightBar from "../home/HomeRightBar";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowDown } from "react-icons/ai";
import { setShowMsg } from "../../redux/tweetSlice";
const Explore = () => {
  const navigate = useNavigate();
  const tweet = useSelector((state) => state.post.tweet);
  const showMsg = useSelector((state) => state.post.showMsg);
  const dispatch = useDispatch();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setShowMsg(false))
    }, 3000);
    return () => {
      clearInterval(timeout);
    };
  },[showMsg]);

  return (
    <div className="w-full sm:w-[80%] lg:translate-x-[21.3%] sm:translate-x-[25%]  min-h-screen bg-[#000000] flex   text-white ">
      <div className="w-[100%] border-l border-[#16181c] border-r flex text-[#D6D9DB] flex-col relative">
        <header className="flex backdrop-blur-lg justify-between px-4 py-3 w-full sticky z-40 top-0 ">
          <h2 className="font-bold text-2xl">Explore</h2>
          <RiSettings3Line size={20} />
        </header>
        <motion.div
          initial={{ top: "110px", opacity: 0 }}
          animate={
            showMsg
              ? { y: "30%", position: "sticky", translateX: "-50%", opacity: 1 }
              : { top: 0 }
          }
          onClick={() => {
            dispatch(setShowMsg(false));
            navigate("/login");
          }}
          className=" opacity-0 z-10 left-[25%] w-fit  -translate-x-[25%] "
        >
          <div className="cursor-pointer bg-green-400 flex items-center gap-1 fit rounded-full py-1 px-3">
            <h1 className=""> Login </h1>
            <AiOutlineArrowDown />
          </div>
        </motion.div>
        <div className="">
          {tweet ? (
            tweet.map((tweet, i) => {
              return <Tweet tweet={tweet} key={tweet?.id} />;
            })
          ) : (
            <p className="text-white">Nothing Here</p>
          )}
        </div>
      </div>
      {/* Side bar */}
      {localStorage.getItem("user") ? (
        <div className="hidden sm:block w-[75%] px-10 py-4 h-fit sticky top-0">
          <div className="w-5/6 rounded-2xl p-4 border border-[#16181c] gap-4 h-fit flex flex-col">
            <div className="flex-col flex ">
              <h2 className=" mb-4 text-xl font-bold text-white">
                New to Twitter?
              </h2>
              <p className="text-[#918f8f] text-sm">
                Sign up now to get your own personalized timeline!
              </p>
            </div>
            <SignInWithGoogleButton onClick={signInWithGoogle} />
            <CustomButton
              text="Create account"
              textColor="black"
              handleClickEvent={() => navigate("/signup")}
            />
            <div>
              <p className="text-sm text-[#918f8f]">
                By signing up, you agree to the{" "}
                <a
                  href="https://twitter.com/tos"
                  target="_blank"
                  className="text-[#1D9BF0] hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and {"  "}
                <a
                  className="text-[#1D9BF0] hover:underline"
                  href="https://twitter.com/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                , including{" "}
                <a
                  href="https://help.twitter.com/rules-and-policies/twitter-cookies"
                  target="_blank"
                  className="text-[#1D9BF0] hover:underline"
                >
                  Cookie Use
                </a>{" "}
                .
              </p>
            </div>
          </div>
        </div>
      ) : (
        <HomeRightBar />
      )}
    </div>
  );
};

export default Explore;
