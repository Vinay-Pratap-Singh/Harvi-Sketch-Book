"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setCurrentShape,
  setStrokeColor,
  setStrokeStyle,
  setStrokeWidth,
  toggleCanvasLock,
} from "@/redux/toolkitSlice";
import {
  STROKE_LINE_STYLE,
  STROKE_STYLE_COLOR_CODE,
} from "@/constants/constants";
import {
  redoOperation,
  renderCanvas,
  undoOperation,
} from "@/redux/canvasSlice";
import socket from "@/helper/socket/socket";

const HeaderToolBox = () => {
  const dispatch = useAppDispatch();
  const { isCanvasLocked, currentShape, sketchBookBackground, strokeWidth } =
    useAppSelector((state) => state.toolkit);
  const { roomId } = useAppSelector((state) => state.user);
  const { currentCanvasIndex, allCanvasImageData } = useAppSelector(
    (state) => state.canvas
  );

  // function to set and unset the shape
  function handleShapeSelection(shape: string, color: string, width: number) {
    if (currentShape === shape) {
      dispatch(setCurrentShape(null));
    } else if (shape === "eraser") {
      dispatch(setCurrentShape(shape));
      dispatch(setStrokeColor(color));
      dispatch(setStrokeStyle(STROKE_LINE_STYLE[0]));
    } else {
      dispatch(setCurrentShape(shape));
      dispatch(setStrokeColor(color));
      dispatch(setStrokeWidth(width));
    }
  }

  useEffect(() => {
    function handleIndex({ operation }: { operation: string }) {
      if (operation === "undo") {
        dispatch(undoOperation());
      } else if (operation === "redo") {
        dispatch(redoOperation());
      }
      dispatch(renderCanvas());
    }
    socket.on("receiveIndex", handleIndex);

    return () => {
      socket.off("receiveIndex", handleIndex);
    };
  }, [dispatch, roomId]);

  return (
    <section className="w-[80%] sm:w-fit flex items-center gap-1 sm:gap-2 overflow-x-scroll sm:overflow-x-hidden absolute z-50 mt-2 sm:mt-5 mr-2 sm:mr-0 py-2 px-2 sm:px-4 shadow-md rounded-md bg-white">
      {/* for lock and unlock */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className={` ${
                isCanvasLocked
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                dispatch(toggleCanvasLock(!isCanvasLocked));
              }}
            >
              {isCanvasLocked ? (
                <i className="fa-solid fa-lock" />
              ) : (
                <i className="fa-solid fa-lock-open" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isCanvasLocked ? "Unlock sketch board" : "Lock sketch board"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-6 sm:h-8" />

      {/* for square */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "square"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("square", STROKE_STYLE_COLOR_CODE[0], 1);
              }}
            >
              <i className="fa-regular fa-square" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Square</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for circle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "circle"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("circle", STROKE_STYLE_COLOR_CODE[0], 1);
              }}
            >
              <i className="fa-regular fa-circle" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Circle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for arrow */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "arrow"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("arrow", STROKE_STYLE_COLOR_CODE[0], 1);
              }}
            >
              <i className="fa-solid fa-arrow-right" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Arrow</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for line */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "line"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("line", STROKE_STYLE_COLOR_CODE[0], 1);
              }}
            >
              <i className="fa-solid fa-minus" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Line</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for text */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "text"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("text", STROKE_STYLE_COLOR_CODE[0], 16);
              }}
            >
              <i className="fa-solid fa-font" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for image */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "image"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                currentShape === "image"
                  ? dispatch(setCurrentShape("null"))
                  : dispatch(setCurrentShape("image"));
              }}
            >
              <i className="fa-regular fa-image" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for pencil */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "pencil"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() => {
                handleShapeSelection("pencil", STROKE_STYLE_COLOR_CODE[0], 1);
              }}
            >
              <i className="fa-solid fa-pencil" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Draw</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-6 sm:h-8" />

      {/* for undo */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                dispatch(undoOperation());
                dispatch(renderCanvas());
                if (socket && roomId) {
                  socket.emit("sendIndex", { operation: "undo", roomId });
                }
              }}
              disabled={isCanvasLocked || currentCanvasIndex < 1}
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-rotate-left" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for redo */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                dispatch(redoOperation());
                dispatch(renderCanvas());
                if (socket && roomId) {
                  socket.emit("sendIndex", { operation: "redo", roomId });
                }
              }}
              disabled={
                isCanvasLocked ||
                currentCanvasIndex === allCanvasImageData.length - 1
              }
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-rotate-right" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for eraser */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isCanvasLocked}
              variant={"ghost"}
              size={"sm"}
              className={` ${
                currentShape === "eraser"
                  ? "bg-mainPrimary hover:bg-mainPrimary text-white hover:text-white"
                  : "hover:bg-mainTertiary"
              }`}
              onClick={() =>
                handleShapeSelection(
                  "eraser",
                  sketchBookBackground,
                  strokeWidth
                )
              }
            >
              <i className="fa-solid fa-eraser" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eraser</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
};

export default HeaderToolBox;
