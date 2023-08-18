import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../../components/tweet/Tweet";
import { db } from "../../firebase";
import { addToTweetArr, getAllTweet } from "../../redux/tweetSlice";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaComment, FaRetweet } from "react-icons/fa";
import { TbChartAreaLine } from "react-icons/tb";

const ForYou = () => {
  const dispatch = useDispatch();
  const tweet = useSelector((state) => state.post.tweet);
  const name = useSelector((state) => state.user.user_details);
  // const [tweet, setTweet] = useState([
  //   { name: "Adejoro Peter", text: "lorem ipsum" },
  // ]);
  const [loading, setLoading] = useState(false);
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
  const quote = useSelector((state) => state.post.quote);

  // const a = () => {
  //   return tweet?.map((a, i) => {
  //     return i;
  //   });
  // };
  // console.log(a());
  return (
    <>
      {/* <div className="border-b" >hjj</div>
      <p className="text-white">Hello</p> */}

      {tweet ? (
        tweet.map((tweet, i) => {
          return <Tweet tweet={tweet} key={tweet?.id} />;
        })
      ) : (
        <p className="text-white">Nothing Here</p>
      )}
    </>
  );
};

export default ForYou;
