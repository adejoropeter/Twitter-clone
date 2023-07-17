import React, { useEffect, useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import { BiPlus, BiPoll, BiWorld } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import DragDropInputComponent from "../DragDropInputComponent";
import UploadTweetInput from "../tweet/UploadTweetInput";
import AddTweet from "../tweet/AddTweet";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import CommentSectionReplyTweet from "./CommentSectionReplyTweet";
import CommentTweetInput from "./CommentTweetInput";
const CommentTweet = ({}) => {
  const curr = useSelector((state) => state.login.currentUser);
  const [img, setImg] = useState("");
  const id = curr?.user?.uid;
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const docRef = doc(db, "users", id);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         // console.log("Document data:", docSnap.data());
  //         // console.log(docSnap.data());
  //         setImg(docSnap.data().profileUrl);
  //       } else {
  //         // docSnap.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     };
  //     // console.log(img);
  //     fetchData();
  //   }, []);
  return (
    <div className="flex h-fit p-5 gap-5  w-full border-b border-[#16181c]">
      <div className="bg-blue-400 w-fit"></div>

      <div className="w-10 absolute">
        <img
          src={
            img?.profilePic
              ? img.profilePic
              : "data:image/jpeg;base64,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"
          }
          alt=""
          className="w-10 h-10  rounded-full"
        />
      </div>

      <div className="w-full ml-10  flex flex-col h-fit mt-5 ">
        <div className="w-full relative h-fit mb-4 ">
          {/* <UploadTweetInput /> */}
          <CommentTweetInput />
        </div>

        <CommentSectionReplyTweet />
      </div>
    </div>
  );
};

export default CommentTweet;
