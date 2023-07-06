import React from "react";

const CustomButton = ({
  handleClickEvent,
  text,
  textColor,
  bg,
  border,
  disabled,
  space,
}) => {
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
      className={`w-full rounded-full font-semibold bg-white py-2 px-2  transition-colors duration-75 text-lg  `}
    >
      {text}
    </button>
  );
};

export default CustomButton;
