import { ILineStroke } from "@/helper/interface/interface";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setStrokeStyle } from "@/redux/toolkitSlice";
import React from "react";
import { useToast } from "../ui/use-toast";

type IProps = {
  data: ILineStroke;
};

const LineStrokeBlock = ({ data }: IProps) => {
  const dispatch = useAppDispatch();
  const { strokeStyle, currentShape } = useAppSelector(
    (state) => state.toolkit
  );
  const { toast } = useToast();

  return (
    <div
      tabIndex={0}
      className={`rounded-[8px] w-fit cursor-pointer transition-all ease-in-out duration-300 border-[1px] ${
        strokeStyle.name === data?.name
          ? " border-mainPrimary"
          : " border-gray-200"
      }`}
      onClick={() => {
        if (currentShape === "eraser") {
          toast({
            description: "Feature disabled while using eraser",
          });
          return;
        }
        dispatch(setStrokeStyle(data));
      }}
    >
      <div
        className={`w-6 h-6 rounded-[6px] m-[2px] flex items-center justify-center ${
          strokeStyle.name === data?.name ? "bg-mainSecondary" : "bg-gray-200"
        }`}
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />
    </div>
  );
};

export default LineStrokeBlock;
