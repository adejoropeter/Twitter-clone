import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../../components/tweet/Tweet";
import { db } from "../../firebase";
import { addToTweetArr, getAllTweet, sortArr } from "../../redux/tweetSlice";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaComment, FaRetweet } from "react-icons/fa";
import { TbChartAreaLine } from "react-icons/tb";

const ForYou = () => {
  const dispatch = useDispatch();
  const tweet = useSelector((state) => state.post.tweet);
  const name = useSelector((state) => state.user.user_details);
  // useEffect(() => {
  //   const fetchTweet = async () => {
  //     let list = [];
  //     setLoading(true);

  //     try {
  //       const querySnapshot = await getDocs(collection(db, "tweets"));
  //       querySnapshot.forEach((user) => {
  //         list.push({ id: user.id, ...user.data() });
  //       });
  //       // dispatch(addToTweetArr(list));
  //       // setTweet(list)
  //       // console.log(list)
  //       setLoading(false);
  //     } catch (error) {}
  //   };
  //   fetchTweet();
  // }, []);
  useEffect(() => {
    dispatch(sortArr());
  }, [tweet]);

  return (
    <>
      {tweet?.length ? (
        tweet.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet?.id} />;
        })
      ) : (
        <p className="text-white text-center">Nothing Here</p>
      )}
    </>
  );
};

export default ForYou;
