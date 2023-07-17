import React from "react";

const Button = ({ text, disabled, onClickFn, bg, color, disCol, border }) => {
  return (
    <button
      style={{ backgroundColor: bg, color, border }}
      // disabled={disabled}
      onClick={onClickFn}
      className={`w-20 h-10  rounded-full font-bold text-md flex duration-100 hover:bg-red-600 hover:text-blue-500 justify-center items-center delay-75`}
    >
      {text}
    </button>
  );
};

export default Button;
