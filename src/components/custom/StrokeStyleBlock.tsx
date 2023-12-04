import React from "react";

type IStrokeType = {
  strokeType: string;
};

const StrokeStyleBlock = ({ strokeType }: IStrokeType) => {
  return (
    <div
      tabIndex={0}
      className={`rounded-[8px] w-fit cursor-pointer transition-all ease-in-out duration-300 border-[1px] ${
        strokeType === "PLAIN" ? " border-mainPrimary" : " border-gray-200"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-[6px] m-[2px] flex items-center justify-center ${
          strokeType === "PLAIN" ? "bg-mainSecondary" : "bg-gray-200"
        }`}
      >
        {strokeType === "PLAIN" ? <i className="fa-solid fa-minus" /> : "--"}
      </div>
    </div>
  );
};

export default StrokeStyleBlock;
