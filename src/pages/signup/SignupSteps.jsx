import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiArrowFromLeft, BiCheckCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import {
  changeEmailVal,
  changeImageUrl,
  changeNameVal,
  changePassWordVal,
  changeVal,
  decrementAction,
  incrementAction,
  resetCurr,
  signupAction,
} from "../../redux/signupSlice";
import LoginButton from "../login/LoginButton";
const SignupSteps = ({user}) => {
  const inputDetail = useSelector((state) => state.signup.signupDetails);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const currIdx = useSelector((state) => state.signup.currIdx);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    if (
      !inputDetail[0]?.name ||
      inputDetail[0]?.name.includes("twitter") ||
      !inputDetail[0]?.name.includes(" ")
    ) {
      setNameError(true);
      setMessage(
        "Must contain space,and a value and not include the word twitter"
      );
    } else {
      setNameError(false);
    }
    dispatch(changeNameVal(event.target.value));
  };
  const handleEmailChange = (event) => {
    if (
      !inputDetail[0]?.email ||
      inputDetail[0]?.email.includes("twitter") ||
      !inputDetail[0]?.email.includes("@")
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    dispatch(changeEmailVal(event.target.value));
  };
  const handlePasswordChange = (event) => {
    dispatch(changePassWordVal(event.target.value));
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  // const GoToNext = () => {
  //   dispatch(incrementAction());
  //   console.log(currIdx);
  // };
  // const GoToPrevious = () => {
  //   dispatch(decrementAction());
  //   console.log(currIdx);
  // };
  const handleSubmit = async () => {
    const email = inputDetail[0]?.value;
    const password = inputDetail[1]?.value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {currIdx === 0 && (
        <div className="flex flex-col gap-6 w-full">
          <div className="relative ">
            <input
              type="text"
              className={`${
                nameError ? "border border-red-500" : "border"
              } w-full h-[60px]  outline-none  rounded py-2 px-3 focus:border-[#1D9BF0] bg-transparent text-white ${
                inputDetail[currIdx]?.name ? "py-3" : "pt-4"
              }`}
              id="inp"
              value={inputDetail[currIdx]?.name}
              onChange={handleInputChange}
            />
            <label
              className={`absolute pointer-events-none  focus:text-[#1D9BF0]  left-3 transition-all duration-200   ${
                inputDetail[currIdx]?.name
                  ? "-top-2 text-xs text-[#1D9BF0]  bg-black px-2"
                  : "top-5 text-[#7C8087] text-lg font-semibold"
              }`}
              htmlFor="inp"
            >
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              className={`${
                emailError ? "border border-red-500" : "border"
              } w-full h-[60px] border outline-none  rounded py-2 px-3 focus:border-[#1D9BF0] bg-transparent text-white ${
                inputDetail[currIdx]?.email ? "py-3" : "pt-4"
              }`}
              id="inp"
              value={inputDetail[currIdx]?.email}
              onChange={handleEmailChange}
            />
            <label
              className={`absolute pointer-events-none  focus:text-[#1D9BF0]  left-3 transition-all duration-200   ${
                inputDetail[currIdx]?.email
                  ? "-top-2 text-xs text-[#1D9BF0]  bg-black px-2"
                  : "top-5 text-[#7C8087] text-lg font-semibold"
              }`}
              htmlFor="inp"
            >
              Email Address
            </label>
          </div>
          <div>
            <input
              className="text-white"
              type="file"
              name=""
              id=""
              onChange={(e) => {
                setFile(e.target.files[0]);
                dispatch(changeImageUrl(e.target.files[0].name));
              }}
            />
          </div>
        </div>
      )}
      {currIdx === 1 && (
        <>
          <div className="flex flex-col gap-6">
            <div
              className={` w-full h-[60px] border outline-none  rounded py-2 px-3 focus:border-[#1D9BF0] bg-transparent text-white flex justify-between items-center`}
            >
              <p>{inputDetail[1].name}</p>
              <div className="text-green-600">
                <BiCheckCircle size="20px" />
              </div>
            </div>
            <div
              className={` w-full h-[60px] border outline-none  rounded py-2 px-3 bg-transparent flex justify-between items-center text-white`}
            >
              <p>{inputDetail[1].email}</p>
              <div className="text-green-600">
                <BiCheckCircle size="20px" />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                src={file ? URL.createObjectURL(file) : ""}
                alt=""
                className="w-20 h-20 rounded-full bg-red-600"
              />
            </div>
          </div>
        </>
      )}
      {currIdx === 2 && (
        <>
          <div className="flex flex-col gap-6">
            <input
              value={inputDetail[currIdx]?.password}
              onChange={handlePasswordChange}
              type={"password"}
              className={` w-full h-[60px] border outline-none  rounded py-2 px-3 focus:border-[#1D9BF0] bg-transparent text-white flex justify-between items-center`}
            />

            <label
              className={`absolute pointer-events-none  focus:text-[#1D9BF0]  left-3 transition-all duration-200   ${
                inputDetail[currIdx]?.password
                  ? "-top-2 text-xs text-[#1D9BF0]  bg-black px-2"
                  : "top-5 text-[#7C8087] text-lg font-semibold"
              }`}
              htmlFor="inp"
            >
              Password
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default SignupSteps;
