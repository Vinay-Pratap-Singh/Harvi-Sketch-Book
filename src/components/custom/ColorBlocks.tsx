import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setSketchBookBackgroundColor,
  setStrokeColor,
} from "@/redux/toolkitSlice";
import React from "react";
type IColorCode = {
  colorCode: string;
  type: string;
};
const ColorBlocks = ({ colorCode, type }: IColorCode) => {
  const dispatch = useAppDispatch();
  const { strokeColor, sketchBookBackground } = useAppSelector(
    (state) => state.toolkit
  );

  // function to dispatch color change
  const dispatchColorChange = () => {
    if (type === "stroke") {
      dispatch(setStrokeColor(colorCode));
    } else if (type === "canvas") {
      dispatch(setSketchBookBackgroundColor(colorCode));
    }
  };

  return (
    <div
      tabIndex={0}
      className={`rounded-[8px] w-fit cursor-pointer transition-all ease-in-out duration-300 ${
        type === "stroke" && strokeColor === colorCode
          ? "border-[1px] border-mainPrimary"
          : "hover:border-[1px] hover:border-gray-300"
      } ${
        type === "canvas" && sketchBookBackground === colorCode
          ? "border-[1px] border-mainPrimary"
          : "hover:border-[1px] hover:border-gray-300"
      }`}
      onClick={dispatchColorChange}
    >
      <div
        style={{ backgroundColor: colorCode }}
        className={`w-6 h-6 rounded-[6px] m-[2px] ${
          type === "canvas" && "border-[1px] border-gray-200"
        }`}
      />
    </div>
  );
};

export default ColorBlocks;
