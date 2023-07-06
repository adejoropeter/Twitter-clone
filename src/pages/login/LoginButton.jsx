import React from "react";

const LoginButton = ({
  handleClickEvent,
  text,
  textColor,
  bg,
  border,
  disabled,
  space,
}) => {
  // console.log(color);
  return (
    <button
      disabled={disabled}
      onClick={handleClickEvent}
      style={{
        backgroundColor: bg,
        color: textColor,
        border,
        marginBottom: space,
      }}
      className={`w-full rounded-full font-semibold bg-white py-3 px-2  transition-colors duration-75 disabled text-lg disabled:cursor-not-allowed `}
    >
      {text}
    </button>
  );
};

export default LoginButton;
