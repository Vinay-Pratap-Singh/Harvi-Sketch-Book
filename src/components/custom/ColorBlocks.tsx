import React from "react";
type IColorCode = {
  colorCode: string;
};
const ColorBlocks = ({ colorCode }: IColorCode) => {
  const currentColorCode = "#000000";
  return (
    <div
      tabIndex={0}
      className={`rounded-[8px] w-fit cursor-pointer transition-all ease-in-out duration-300 ${
        currentColorCode === colorCode
          ? "border-[1px] border-mainPrimary"
          : "hover:border-[1px] hover:border-gray-300"
      } `}
    >
      <div
        style={{ backgroundColor: colorCode }}
        className="w-6 h-6 rounded-[6px] m-[2px]"
      />
    </div>
  );
};

export default ColorBlocks;
