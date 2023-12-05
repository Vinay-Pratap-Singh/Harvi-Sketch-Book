import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  canvasColorCode,
  strokeColorCodes,
  strokeStyle,
} from "@/constants/constants";
import ColorBlocks from "./ColorBlocks";
import StrokeStyleBlock from "./StrokeStyleBlock";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setSketchBookBackgroundColor,
  setStrokeColor,
} from "@/redux/toolkitSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { strokeColor, sketchBookBackground } = useAppSelector(
    (state) => state.toolkit
  );

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-5 top-5">
        <Button variant="outline" size={"sm"} className="hover:bg-mainTertiary">
          <i className="fa-solid fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72 overflow-y-scroll">
        <div className="space-y-5">
          {/* for stroke color */}
          <div className="space-y-1">
            <p className="text-xs">Stroke color</p>
            <div className="flex items-center justify-between">
              {strokeColorCodes &&
                strokeColorCodes.map((color) => {
                  return (
                    <div
                      key={uuidv4()}
                      onClick={() => dispatch(setStrokeColor(color))}
                    >
                      <ColorBlocks colorCode={color} type="stroke" />
                    </div>
                  );
                })}

              <Separator orientation="vertical" className="h-5" />

              {/* color picker */}
              <div
                tabIndex={0}
                className="rounded-[8px] border-[1px] border-mainPrimary w-fit cursor-pointer"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="cursor-pointer">
                        <div
                          style={{ backgroundColor: strokeColor }}
                          className="w-5 h-5 rounded-[6px] m-[2px]"
                        ></div>
                        <Input
                          type="color"
                          className="hidden"
                          onChange={(event) =>
                            dispatch(setStrokeColor(event.target.value))
                          }
                        />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose custom color</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* for stroke width */}
          <div className="space-y-1">
            <p className="text-xs">Stroke width</p>
            <div>
              <Input type="range" className="h-4" />
            </div>
          </div>

          {/* for stroke style */}
          <div className="space-y-1">
            <p className="text-xs">Stroke style</p>
            <div className="flex items-center gap-2">
              {strokeStyle &&
                Object.entries(strokeStyle).map(([key, val]) => {
                  return <StrokeStyleBlock key={key} strokeType={val} />;
                })}
            </div>
          </div>

          {/* for canvas background color */}
          <div className="space-y-1">
            <p className="text-xs">Sketch book background</p>
            <div className="flex items-center justify-between">
              {canvasColorCode &&
                canvasColorCode.map((color) => {
                  return (
                    <div
                      key={uuidv4()}
                      onClick={() =>
                        dispatch(setSketchBookBackgroundColor(color))
                      }
                    >
                      <ColorBlocks colorCode={color} type="canvas" />
                    </div>
                  );
                })}

              <Separator orientation="vertical" className="h-5" />

              {/* color picker */}
              <div
                tabIndex={0}
                className="rounded-[8px] border-[1px] border-mainPrimary w-fit cursor-pointer"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="cursor-pointer">
                        <div
                          style={{ backgroundColor: sketchBookBackground }}
                          className="w-5 h-5 rounded-[6px] m-[2px]"
                        ></div>
                        <Input
                          type="color"
                          className="hidden"
                          onChange={(event) => {
                            dispatch(
                              setSketchBookBackgroundColor(event.target.value)
                            );
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
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* for extra option */}
          <div className="space-y-2">
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-solid fa-download" /> <p>Export sketch</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-solid fa-user-group" />
              <p>Live collaboration</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-solid fa-trash" />
              <p>Reset the canvas</p>
            </Button>
          </div>

          <Separator />

          {/* for social media options */}
          <div className="space-y-2">
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-brands fa-github" />
              <p>Github</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-brands fa-linkedin" />
              <p>Linkedin</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-solid fa-bug" />
              <p>Report a bug</p>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
