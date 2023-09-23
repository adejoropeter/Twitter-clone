import React from "react";
import { useSelector } from "react-redux";

const InputValue = () => {
  const state = useSelector((state) => state.input.value);
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
            {a === "" ? " " :a.replaceAll(" ", "_") }
            {/* {a.includes("")?" ":a} */}
          </div>
        );
      })}
    </div>
  );
};

export default InputValue;
// export default 