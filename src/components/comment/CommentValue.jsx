import React from "react";
import { useSelector } from "react-redux";

const CommentValue = () => {
  const state = useSelector((state) => state.comment.value);
  return (
    <div
      className={`absolute flex  text-sm sm:text-lg pointer-events-none   w-full bg-lue-400 overflow-hidden bg-black`}
    >
      {state?.value?.map((a, i) => {
        return (
          <div
            key={i}
            className={`${i + 1 > 35 ? "bg-red-600" : "text-white"}`}
          >
            {a === "" ? "" : a.replaceAll(" ", "__")}
          </div>
        );
      })}
    </div>
  );
};

export default CommentValue;
// export default
