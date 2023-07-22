import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTweet from "../components/tweet/AddTweet";
import ComposeTweet from "../components/compose/ComposeTweet";
import { backGroundColor, onChange, setCurrIdx } from "../redux/composeSlice";
// import { auth } from "../../firebase";
// import {} from "../../redux/LoginSlice";
const Compose = () => {
  const compose = useSelector((state) => state.composeTweet.groupTweet);
//   const inputVal = state?.value?.join("");
  //   const idx = compose.length - 1 ;
  //   const idx2 = idx+1;

//   const text = inputVal
//     ?.split("")
//     ?.filter((_, i) => i < 35)
//     ?.map((a) => a);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed  z-50 overflow-y-hidden ">
      <div className="bg-black overflow-scroll w-[600px]  h-fit  top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%] flex flex-col rounded-2xl overflow-x-hidden relative ">
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
                  navigate(-1);
                  // dispatch(clearLoginInputField());
                  // dispatch(resetCurr());
                  document.body.style.overflow = "visible";
                }}
              />
            </abbr>
          </div>
          <div className="flex-1 flex justify-end text-[#00BA7C] font-bold">
            Drafts
          </div>
        </div>
        <div className=" w-full h-fit py-4 ">
          <div className="w-[400px] flex flex-col px-4 gap-4 ">
            {compose.map((cmpTweet) => (
              <div className="flex gap-4 items-center">
                <img
                  onClick={() => console.log(cmpTweet.inputText)}
                  src={"/assets/image.png"}
                  alt=""
                  className={`${
                    !cmpTweet.isFade ? "blur-lg" : ""
                  } w-[40px] h-[40px] rounded-full cursor-pointer`}
                />
                {/* <h1 className="text-white">{cmpTweet.inputText}</h1> */}
                <input
                  placeholder="Add another Tweet!"
                  onClick={() => {
                    dispatch(setCurrIdx(cmpTweet.id));
                    dispatch(backGroundColor());
                  }}
                  type="text"
                  className={`text-lg outline-none placeholder:text-lg bg-black ${
                    cmpTweet.isFade
                      ? "text-white"
                      : "bg-black text-[rgba(231,233,234,0.65)]"
                  }`}
                  disabled={cmpTweet.isDisabled}
                  value={cmpTweet.inputText || ""}
                  onChange={(e) => dispatch(onChange(e.target.value))}
                />
              </div>
            ))}
            <ComposeTweet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
