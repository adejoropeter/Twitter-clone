import { async } from "@firebase/util";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInWithGoogleButton from "../../components/SignInWithGoogleButton";
import { auth } from "../../firebase";
import {
  changeVal,
  clearLoginInputField,
  login,
  // login,
  loginAction,
  resetCurr,
} from "../../redux/LoginSlice";
import LoginButton from "./LoginButton";
const Login = () => {
  const [error, setError] = useState(false);
  const inputDetails = useSelector((state) => state.login.loginDetails);
  const currIdx = useSelector((state) => state.login.currIdx);
  const currentUser = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    if (
      !inputDetails[0]?.value ||
      inputDetails[0]?.value.includes("twitter") ||
      !inputDetails[0]?.value.includes("@")
    ) {
      setError(true);
    } else {
      setError(false);
    }
    dispatch(changeVal(event.target.value));
    console.log(inputDetails);
  };
  useEffect(() => {
    // document.body.style.overflowY = "hidden";
  });
  const navigate = useNavigate();
  const signInWithGoogle = () => {};
  const GoToNext = () => {
    dispatch(loginAction());
  };
  const handleSubmit = async () => {
    const email = inputDetails[0]?.value;
    const password = inputDetails[1]?.value;
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), password);
      dispatch(login(res));
      navigate("/foryou");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    console.log(currentUser);
  };
  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed  z-50 overflow-y-hidden ">
      <div className="bg-black  w-[600px]  h-fit  top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%] flex flex-col rounded-2xl overflow-hidden relative ">
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
                  navigate("/explore");
                  dispatch(clearLoginInputField());
                  dispatch(resetCurr());
                  document.body.style.overflow = "visible";
                }}
              />
            </abbr>
          </div>
          <div className="flex-1 ">
            <AiOutlineTwitter size={"45px"} className="flex-1 text-white" />
          </div>
        </div>
        <div className="overflow-scroll overflow-x-hidden w-full h-[450px] py-10 ">
          <div className="w-[400px] flex flex-col items-center justify-center m-[0_auto] gap-8 ">
            <h1 className="text-3xl font-bold text-white">
              {inputDetails[currIdx]?.description}
            </h1>
            {currIdx === 0 ? (
              <>
                <SignInWithGoogleButton onClick={signInWithGoogle} />
                <div className="w-full text-white  border-white mx-[0_auto] flex justify-center items-center gap-3">
                  <span className="border-t border-[#536471] w-full"></span>
                  <span>or</span>
                  <span className="border-t border-[#536471] justify-self-center w-full "></span>
                </div>
              </>
            ) : null}
            {currIdx === 1 ? (
              <div className="w-full rounded px-3 h-[60px] bg-[#242D34] flex justify-center font-semibold text-[#7C8087] flex-col">
                <p>Email</p>
                <p>{inputDetails[0]?.value}</p>
              </div>
            ) : null}
            <div className="relative w-full flex flex-col gap-4 mb-2">
              <div className="relative w-full mb-4">
                <input
                  type="text"
                  className={`${
                    error ? "border border-red-500" : "border"
                  } w-full h-[60px] border outline-none  rounded py-2 px-3 focus:border-[#1D9BF0] bg-transparent text-white ${
                    inputDetails[currIdx]?.value ? "py-3" : "pt-4"
                  }`}
                  id="inp"
                  value={inputDetails[currIdx]?.value}
                  onChange={handleInputChange}
                />
                <label
                  className={`absolute pointer-events-none  focus:text-[#1D9BF0]  left-3 transition-all duration-200   ${
                    inputDetails[currIdx]?.value
                      ? "-top-2 text-xs text-[#1D9BF0]  bg-black px-2"
                      : "top-5 text-[#7C8087] text-lg font-semibold"
                  }`}
                  htmlFor="inp"
                >
                  {inputDetails[currIdx]?.label}
                </label>
              </div>

              <LoginButton
                handleClickEvent={currIdx === 0 ? GoToNext : handleSubmit}
                text={
                  currIdx === 1 ? (
                    loading ? (
                      <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1D9BF0] border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      "Log in"
                    )
                  ) : (
                    "Next"
                  )
                }
                textColor="black"
                space={"10px"}
                disabled={
                  currIdx === 1
                    ? inputDetails[1]?.value.includes("twitter") ||
                      inputDetails[1]?.value.length <= 5
                    : !inputDetails[0]?.value ||
                      inputDetails[0]?.value.includes("twitter") ||
                      !inputDetails[0]?.value.includes("@gmail.com")
                }
              />
              {currIdx === 0 ? (
                <LoginButton
                  text="Forgot Password?"
                  border="1px solid white"
                  textColor="white"
                  bg="black"
                />
              ) : (
                <p className="cursor-pointer text-[#1D9BF0] hover:underline">
                  Forgot password?
                </p>
              )}
            </div>
            <div className="text-white flex gap-2">
              <span className="text-[#7C8087]">Don't have an account?</span>
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-[#1D9BF0] cursor-pointer hover:underline"
              >
                {" "}
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
