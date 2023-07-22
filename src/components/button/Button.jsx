import React from "react";

const Button = ({ text, disabled, onClickFn, color, disCol, border }) => {
  return (
    <button
      style={{  color, border }}
      disabled={disabled}
      onClick={onClickFn}
      className={`w-fit px-3 h-10  rounded-full font-bold text-md flex duration-100 hover:bg-red-600 hover:text-blue-500 justify-center items-center delay-75 disabled:bg-[#005D3E] bg-[#00BA7C]`}
    >
      {text}
    </button>
  );
};

export default Button;
