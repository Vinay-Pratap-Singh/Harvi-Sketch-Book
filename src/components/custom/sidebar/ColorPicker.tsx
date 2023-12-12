import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React from "react";

type IProps = {
  color: string;
  action: any;
};

const ColorPicker = ({ color, action }: IProps) => {
  const dispatch = useAppDispatch();
  const { currentShape } = useAppSelector((state) => state.toolkit);

  return (
    <div
      tabIndex={0}
      className="rounded-[8px] border-[1px] border-mainPrimary w-fit cursor-pointer"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label className="cursor-pointer">
              <div
                style={{ backgroundColor: color }}
                className="w-5 h-5 rounded-[6px] m-[2px]"
              ></div>
              <Input
                type="color"
                className="hidden"
                onChange={(event) => {
                  if (currentShape === "eraser") {
                    toast({
                      description: "Feature disabled while using eraser",
                    });
                    return;
                  }
                  dispatch(action(event.target.value));
                }}
              />
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose custom color</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ColorPicker;
