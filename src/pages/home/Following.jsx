import React from "react";
import UploadTweet from "../../components/UploadTweet";
import { motion } from "framer-motion";
const Following = () => {
  const listParent = {
    hidden: {
      x: -800,
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
      },
    },
  };
  const listChild = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      x: 0,
      opacity: 1,
      staggerChildren: 0.2,
    },
  };
  return (
    <div>
      <motion.div
        variants={listParent}
        animate="visible"
        initial="hidden"
        className="bg-white w-32 flex flex-col justify-center items-center"
      >
        {[1, 2, 3].map((a) => {
          return (
            <motion.div key={a}
              variants={listChild}
              animate="visible"
              initial="hidden"
              className="w-10 h-10 bg-green-600 my-3"
            ></motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Following;
