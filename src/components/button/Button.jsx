import React from "react";

const Button = ({ text, disabled, onClickFn, color, bg, border }) => {
  return (
    <button
      style={{ color:color, border, backgroundColor: bg }}
      disabled={disabled}
      onClick={onClickFn}
      className={`w-fit px-3 h-10  rounded-full font-bold text-md flex duration-100 hover:bg-[#005D3E] hover:text-white justify-center items-center delay-75 disabled:bg-[#005D3E]`}
    >
      {text}
    </button>
  );
};

export default Button;
