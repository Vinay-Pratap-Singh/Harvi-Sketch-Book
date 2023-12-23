import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import ColorBlocks from "./ColorBlocks";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setFontType,
  setShapeFillColor,
  setSketchBookBackgroundColor,
  setStrokeColor,
  setStrokeWidth,
} from "@/redux/toolkitSlice";
import {
  CANVAS_BG_COLOR_CODE,
  FONT_TYPE,
  STROKE_LINE_STYLE,
  STROKE_STYLE_COLOR_CODE,
} from "@/constants/constants";
import { IFontType, ILineStroke } from "@/helper/interface/interface";
import LineStrokeBlock from "./LineStrokeBlock";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ExportSketch from "./sidebar/ExportSketch";
import ColorPicker from "./sidebar/ColorPicker";
import ResetCanvas from "./sidebar/ResetCanvas";
import SocialMedia from "./sidebar/SocialMedia";
import LiveCollaboration from "./sidebar/LiveCollaboration";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const {
    strokeColor,
    sketchBookBackground,
    strokeWidth,
    currentShape,
    shapeFillColor,
    fontType,
  } = useAppSelector((state) => state.toolkit);

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="absolute left-2 sm:left-5 top-4 sm:top-5"
      >
        <Button variant="outline" size={"sm"} className="hover:bg-mainTertiary">
          <i className="fa-solid fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72 overflow-y-scroll">
        <div className="space-y-5">
          {/* for stroke color */}
          <div className="space-y-1">
            <p className="text-xs font-medium">
              {currentShape === "text" ? "Font color" : "Stroke color"}
            </p>
            <div className="flex items-center justify-between">
              {STROKE_STYLE_COLOR_CODE &&
                STROKE_STYLE_COLOR_CODE.map((color) => {
                  return (
                    <ColorBlocks
                      key={uuidv4()}
                      colorCode={color}
                      type="stroke"
                    />
                  );
                })}

              <Separator orientation="vertical" className="h-5" />

              {/* color picker */}
              <ColorPicker
                key={uuidv4()}
                action={setStrokeColor}
                color={strokeColor}
              />
            </div>
          </div>

          {/* for stroke width */}
          <div className="space-y-1">
            <p className="text-xs font-medium">
              {currentShape === "eraser"
                ? "Eraser size"
                : currentShape === "text"
                ? "Font size"
                : "Stroke width"}
            </p>
            <div>
              <Input
                type="range"
                min={currentShape === "text" ? 16 : 1}
                max={
                  currentShape === "eraser"
                    ? 100
                    : currentShape === "text"
                    ? 50
                    : 20
                }
                className="h-4"
                value={strokeWidth}
                onChange={(event) => {
                  dispatch(setStrokeWidth(Number(event.target.value)));
                }}
              />
            </div>
          </div>

          {/* for font type */}
          {currentShape === "text" && (
            <div>
              <Label>
                <p className="mb-2 text-xs">Font type</p>
                <Select
                  value={fontType}
                  onValueChange={(value) => dispatch(setFontType(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fonts</SelectLabel>
                      {FONT_TYPE &&
                        FONT_TYPE.map((font: IFontType) => {
                          return (
                            <SelectItem key={uuidv4()} value={font.value}>
                              {font.name}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          )}

          {/* for stroke style */}
          {currentShape !== "text" && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Stroke style</p>
              <div className="flex items-center gap-2">
                {STROKE_LINE_STYLE &&
                  STROKE_LINE_STYLE.map((stroke: ILineStroke) => {
                    return <LineStrokeBlock key={uuidv4()} data={stroke} />;
                  })}
              </div>
            </div>
          )}

          {/* for shape fill color */}
          {(currentShape === "square" || currentShape === "circle") && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Shape fill color</p>
              <div className="flex items-center justify-between">
                {CANVAS_BG_COLOR_CODE &&
                  CANVAS_BG_COLOR_CODE.map((color) => {
                    return (
                      <ColorBlocks
                        key={uuidv4()}
                        colorCode={color}
                        type="shapeFill"
                      />
                    );
                  })}

                <Separator orientation="vertical" className="h-5" />

                {/* color picker */}
                <ColorPicker
                  key={uuidv4()}
                  action={setShapeFillColor}
                  color={shapeFillColor}
                />
              </div>
            </div>
          )}

          {/* for canvas background color */}
          <div className="space-y-1">
            <p className="text-xs font-medium">Sketch book background</p>
            <div className="flex items-center justify-between">
              {CANVAS_BG_COLOR_CODE &&
                CANVAS_BG_COLOR_CODE.map((color) => {
                  return (
                    <ColorBlocks
                      key={uuidv4()}
                      colorCode={color}
                      type="canvas"
                    />
                  );
                })}

              <Separator orientation="vertical" className="h-5" />

              {/* color picker */}
              <ColorPicker
                key={uuidv4()}
                action={setSketchBookBackgroundColor}
                color={sketchBookBackground}
              />
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* for extra option */}
          <div className="space-y-2">
            {/* export sketch */}
            <ExportSketch />

            {/* live collaboration */}
            <LiveCollaboration />

            {/* reset canvas */}
            <ResetCanvas />
          </div>

          <Separator />

          {/* for social media options */}
          <SocialMedia />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
