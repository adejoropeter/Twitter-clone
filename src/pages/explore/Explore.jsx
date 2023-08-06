import { signInWithPopup } from "firebase/auth";
import React from "react";
import { RiSettings3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Tweet } from "../../components";
import CustomButton from "../../components/button/CustomButton";
import SignInWithGoogleButton from "../../components/SignInWithGoogleButton";
import { auth, provider } from "../../firebase";
import HomeRightBar from "../home/HomeRightBar";
const Explore = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full bg-[#000000] flex   text-white">
      <div className="w-[100%] border-l border-[#16181c] border-r  h-full flex text-[#D6D9DB] flex-col">
        <div className="flex backdrop-blur-lg justify-between px-4 py-3 w-full sticky z-50 top-0 ">
          <h2 className="font-bold text-2xl">Explore</h2>
          <RiSettings3Line size={20} />
        </div>
        <div className="">
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
          <Tweet tweet={{ name: "Adejor", text: "lorem 10 ", profileName:"Adejoro Peter",username:"@ade_joro" }} />
        </div>
      </div>
      {/* Side bar */}
      {localStorage.getItem("user") ? (
        <div className=" w-[75%] px-10 py-4 h-fit sticky top-0">
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
