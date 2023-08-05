import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AddTweet from "../tweet/AddTweet";
import ComposeTweet from "./ComposeTweet";
import {
  backGroundColor,
  disableFirstObject,
  filterGroupTweet,
  onChange,
  resetGroupTweet,
  setCurrIdx,
} from "../../redux/composeSlice";
// import { auth } from "../../firebase";
// import {} from "../../redux/LoginSlice";
const Compose = () => {
  const compose = useSelector((state) => state.composeTweet.groupTweet);
  const copy = useSelector((state) => state.composeTweet.copyOfGroupTweet);
  const handleClick = (id) => {
    dispatch(setCurrIdx(id));
    dispatch(backGroundColor());
  };
  const inputTextWithEmptyValue = compose.find((a) => {
    return a.inputText === "";
  });
  let idv = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed  z-50 overflow-y-hidden ">
      <div className="bg-black overflow-scroll sm:w-[600px] sm:min-h-0 min-h-screen sm:h-fit  top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[100%] flex flex-col sm:rounded-2xl overflow-x-hidden relative ">
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
                  dispatch(resetGroupTweet());
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
          <div className="w-full  flex flex-col px-4 gap-4 ">
            {compose.map((cmpTweet) => (
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex gap-4 items-center">
                  <img
                    src={"/assets/image.png"}
                    alt=""
                    className={`${
                      !cmpTweet.isFade ? "blur-[1px]" : ""
                    } w-[40px] h-[40px] rounded-full cursor-pointer`}
                  />
                  {/* <h1 className="text-white">{cmpTweet.inputText}</h1> */}
                  <input
                    placeholder="Add another Tweet!"
                    onClick={() => handleClick(cmpTweet.id)}
                    type="text"
                    className={`text-lg w-full outline-none placeholder:text-lg bg-black ${
                      cmpTweet.isFade
                        ? "text-white"
                        : "bg-black text-[rgba(231,233,234,0.65)]"
                    }`}
                    autoFocus
                    disabled={cmpTweet.isDisabled}
                    value={cmpTweet.inputText || ""}
                    onChange={(e) => {
                      console.log(compose);
                      dispatch(onChange(e.target.value));
                    }}
                  />
                  <div>
                    {cmpTweet?.isFade ? (
                      <TbX
                        className="text-white"
                        onClick={() => {
                          // dispatch(filterGroupTweet({ id: cmpTweet.id }));
                          // compose.length===4&&dispatch(setCurrIdx(compose.length-1))
                          // dispatch(filterGroupTweet({ id: cmpTweet.id }));
                          // compose.length===3&&dispatch(setCurrIdx(compose.length-2))
                          dispatch(
                            filterGroupTweet({ id: cmpTweet.id, ids: idv++ })
                          );
                          // dispatch(setCurrIdx( compose.length-2 ));
                          dispatch(backGroundColor(cmpTweet?.id));
                          console.log(compose.length);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                {cmpTweet.isFade ? (
                  <div className="w-full">
                    <ComposeTweet eachTweet={cmpTweet} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
            {compose.length === 1 && (
              <div className="w-full">
                <ComposeTweet />
              </div>
            )}
          </div>
        </div>
        {/* <Outlet/> */}
      </div>
    </div>
  );
};

export default Compose;
