import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showIcons, stateValue } from "../../redux/inputFieldSlice";
import InputValue from "./InputValue";

const UploadTweetInput = ({ refr }) => {
  const [inputBool, setInputBool] = useState(false);
  //   const [state, setState] = useState([]);
  //   const [bool, setBool] = useState(false);
  // const ref = useRef(null);
  const state = useSelector((state) => state.input.value);
  const bool = useSelector((state) => state.input.bool);

  const dispatch = useDispatch();
  const changeInputPlaceHolder = () => {
    const value = Object.values(refr?.current?.attributes);
    value[1].value = inputBool
      ? "What's happening"
      : "Minimum of 35 characters🙏";
  };

  const mouseEnter = () => {
    changeInputPlaceHolder();
    setInputBool(true);
  };
  const mouseOut = () => {
    changeInputPlaceHolder();
    setInputBool(false);
  };

  return (
    <>
      <InputValue />
      <abbr title="Note: space is replaced with underscores ( _ )">
        <input
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseOut}
          onChange={(e) => {
            // console.log("k")
            //     setState([...e.target.value]);
            dispatch(stateValue({ value: [...e.target.value] }));

           

            if (state?.value?.length <= 35 || !state.value?.length) {
              dispatch(showIcons(false));
            } else {
              // setBool(true);
              // alert("You no dey hear word??")
              dispatch(showIcons(true));
            }
          }}
          type="text"
          value={state?.value?.join("") || ""}
          // value={state.value}

          ref={refr}
          placeholder="What's happening?"
          className={`placeholder:text-[#6A6F74] placeholder:font-normal outline-none placeholder:text-lg sm:placeholder:text-2xl text-sm sm:text-lg w-full border-none bg-transparent h-fit mb-4  resize-none overflow-hidden
            `}
        ></input>
      </abbr>
    </>
  );
};

export default UploadTweetInput;
