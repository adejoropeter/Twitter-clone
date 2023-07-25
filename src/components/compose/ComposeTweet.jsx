import React, { useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import { BiPlus, BiPoll } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToTweetArr,
  setAddComment,
  setAddComposedComment,
  setAddComposedComment2,
  setAddComposedComment3,
} from "../../redux/tweetSlice";
import { clearInputField } from "../../redux/inputFieldSlice";
import Button from "../button/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  addToGrpTweet,
  backGroundColor,
  resetGroupTweet,
  setCurrIdx,
  setGroupTweetTo4,
} from "../../redux/composeSlice";
const ComposeTweet = () => {
  const dispatch = useDispatch();
  //   const [state, setState] = useState([]);
  //   const [bool, setBool] = useState(false);
  const navigate = useNavigate();
  const tweet = useSelector((state) => state.post.tweet);
  const bool = useSelector((state) => state.input.bool);
  const compose = useSelector((state) => state.composeTweet.groupTweet);
  //   console.log(compose);

  const text = compose[0]?.inputText;
  const inputTextWithEmptyValue = compose.find((a) => {
    return a.inputText === "";
  });
  const handleAddTweet = () => {
    compose.length > 1
      && dispatch(
          addToTweetArr([
            {
              ...compose[0],
              profileName: "Adejoro Peter",
              username: "@ade_peter",
              comment: [],
              likes: 1,
              id: tweet[0]?.id + 1 || 0,
              retweeted: false,
              text,
              isThread: true,
            },
          ])
        )
       //     dispatch(
      //     addToTweetArr({
      //       ...compose[0],
      //       profileName: "Adejoro Peter",
      //       username: "@ade_peter",
      //       comment: [],
      //       likes: 1,
      //       id: tweet[tweet.length - 1].id + 1,
      //       retweeted: false,
      //       text,
      //     })
      //   );

      //     dispatch(
      //       setAddComment({
      //         id: tweet[tweet.length - 1].id + 1,
      //         profileName: "Ade",
      //         text: compose[1].inputText,
      //         cmtId: Math.random(),
      //       })
      //     );
      compose.length -1===1
      && dispatch(
          setAddComment({
            id: tweet[0]?.id+1||0,
            profileName: "Ade",
            text: compose[1]?.inputText,
            cmtId: Math.random(),
          })
        )
      compose.length - 1 === 2
      && dispatch(
          setAddComposedComment2({
            id: tweet[0]?.id + 1||0,
            // first comment
            firstComment: compose[1],
            firstCommentProfileName: "Ade",
            firstCommentText: compose[1]?.inputText,
            firstCommentCmtId: Math.random(),
            //second comment
            secondComment: compose[2],
            secondCommentProfileName: "Ade",
            secondCommentText: compose[2]?.inputText,
            secondCommentCmtId: Math.random(),
          })
        )
      compose.length - 1 === 3
      && dispatch(
          setAddComposedComment3({
            id: tweet[0]?.id + 1||0,
            // first comment
            firstComment: compose[1],
            firstCommentProfileName: "Ade",
            firstCommentText: compose[1]?.inputText,
            firstCommentCmtId: Math.random(),
            //second comment
            secondComment: compose[2],
            secondCommentProfileName: "Ade",
            secondCommentText: compose[2]?.inputText,
            secondCommentCmtId: Math.random(),
            //third comment
            thirdComment: compose[3],
            thirdCommentProfileName: "Ade",
            thirdCommentText: compose[3]?.inputText,
            thirdCommentCmtId: Math.random(),
          })
        )
     
    dispatch(resetGroupTweet());
    dispatch(clearInputField());
    navigate("/foryou");
  };

  const idx = compose.length - 1;
  const id = idx + 1;
  //   const navigate = useNavigate();
  const [img, setImg] = useState("");
  //   const inputVal = state?.value?.join("");
  //   const text = inputVal
  //     ?.split("")
  //     ?.filter((_, i) => i < 35)
  //     ?.map((a) => a);

  return (
    <div className="flex sm:items-center gap-2 justify-between flex-col sm:flex-row">
      <div className="flex ">
        <abbr
          title="Media"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <input
            type="file"
            onChange={(e) => setImg(e.target.value)}
            name=""
            id="file"
            className="hidden"
          />
          <label htmlFor="file">
            <BsImageFill size={"16px"} className="text-[#00BA7C] " />
          </label>
        </abbr>

        <abbr
          title="Poll"
          className="hover:bg-[#00130D] xsm:flex hidden justify-center items-center w-10 h-10 rounded-full cursor-pointer "
        >
          <BiPoll size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title="Emoji"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <GrEmoji size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title="Schedule"
          className="hover:bg-[#00130D] xsm:flex hidden justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <TbCalendarTime size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title=""
          className="flex justify-center items-center w-10 h-10 rounded-full"
        >
          <HiOutlineLocationMarker size={"16px"} className="text-[#005D3E] " />
        </abbr>
      </div>
      <div className="flex gap-3 items-center">
        {/* {state?.value?.length ? (
          <div className={`items-center  flex justify-center`}>
            <div className="flex items-end justify-center w-8 h-8 overflow-hidden bg-[#1D1F23] rounded-full relative">
              <motion.div
                animate={{
                  height: state.value.length * 2.9 + "%",
                }}
                type={"string"}
                style={{
                  height: state.value.length * 2.9 + "%",
                }}
                className={`w-full   justify-center items-center    bg-[#00BA7C] rounded-sm`}
              ></motion.div>{" "}
              <p className="absolute top-[50%]  left-[50%] -translate-x-[50%] -translate-y-[50%] text-red-500 text-sm font-bold ">
                {35 - state?.value?.length === 0
                  ? null
                  : bool || 35 - state?.value?.length === -1
                  ? 35 - state?.value?.length
                  : null}
              </p>
            </div>
            <div className="h-full w-2 border-l-2 border-[#1D1F23] "></div> */}
        <div
          className="flex items-center justify-center w-8 h-8 overflow-hidden bg-[#1D1F23] rounded-full cursor-pointer"
          onClick={() => {
            compose.length - 1 !== 3
              ? dispatch(
                  addToGrpTweet({
                    inputText: "",
                    isDisabled: false,
                    id,
                    isFade: true,
                  })
                )
              : dispatch(setGroupTweetTo4());
            dispatch(setCurrIdx(id));
            dispatch(backGroundColor());
            console.log(compose);
          }}
        >
          <BiPlus className="text-[#00BA7C]" size={"20"} />
        </div>
        {/* </div>
        ) : null} */}
        <Button
          text={compose.length > 1 ? "Tweet All" : "Tweet"}
          onClickFn={handleAddTweet}
          color={
            inputTextWithEmptyValue?.inputText === "" ? "#808080" : "#ffffff"
          }
          disabled={inputTextWithEmptyValue?.inputText === "" ? true : false}
        />
      </div>
    </div>
  );
};

export default ComposeTweet;
