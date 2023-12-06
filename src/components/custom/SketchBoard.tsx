import { applySketchBookBackgroundColor } from "@/helper/canvas/canvas";
import { useAppSelector } from "@/hooks/redux";
import React, { useEffect, useRef, useState } from "react";

const SketchBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    sketchBookBackground,
    currentShape,
    strokeColor,
    strokeWidth,
    strokeStyle,
  } = useAppSelector((state) => state.toolkit);
  const isDrawing = useRef(false);

  // setting default width and height for canvas
  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      myCanvas.width = window.innerWidth;
      myCanvas.height = window.innerHeight;
    }
  }, []);

  // setting the canvas background color
  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      applySketchBookBackgroundColor(myCanvas, sketchBookBackground);
    }
  }, [sketchBookBackground]);

  // to draw using pencil
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    switch (currentShape) {
      case "pencil":
      case "eraser": {
        const startDrawing = (event: MouseEvent) => {
          isDrawing.current = true;
          if (context) {
            context.beginPath();
            context.moveTo(
              event.clientX - canvas.offsetLeft,
              event.clientY - canvas.offsetTop
            );
          }
        };

        const draw = (event: MouseEvent) => {
          if (!isDrawing.current) return;
          if (context) {
            context.strokeStyle = strokeColor;
            context.lineWidth = strokeWidth;
            strokeStyle.name === "normal"
              ? context.setLineDash([])
              : context.setLineDash([
                  strokeStyle.value ? strokeStyle.value : 0,
                ]);
            context.lineTo(
              event.clientX - canvas.offsetLeft,
              event.clientY - canvas.offsetTop
            );
            context.stroke();
          }
        };

        const stopDrawing = () => {
          isDrawing.current = false;
          if (context) {
            context.closePath();
          }
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);

        return () => {
          canvas.removeEventListener("mousedown", startDrawing);
          canvas.removeEventListener("mousemove", draw);
          canvas.removeEventListener("mouseup", stopDrawing);
        };
      }

      case "square": {
        const coordinate = {
          startCoordinate: { x: 0, y: 0 },
          endCoordinate: { x: 0, y: 0 },
        };

        const handleMouseDown = (event: MouseEvent) => {
          isDrawing.current = true;
          coordinate.startCoordinate = { x: event.clientX, y: event.clientY };
        };

        const handleMouseMove = (event: MouseEvent) => {
          if (!isDrawing.current) return;
          coordinate.endCoordinate = { x: event.clientX, y: event.clientY };
          const { x: startX, y: startY } = coordinate.startCoordinate;
          const { x: endX, y: endY } = coordinate.endCoordinate;

          context.strokeStyle = strokeColor;
          context.lineWidth = strokeWidth;
          context.fillRect(
            Math.min(startX, endX),
            Math.min(startY, endY),
            Math.abs(endX - startX),
            Math.abs(endY - startY)
          );

          context.strokeRect(
            Math.min(startX, endX),
            Math.min(startY, endY),
            Math.abs(endX - startX),
            Math.abs(endY - startY)
          );
        };

        const handleMouseUp = () => {
          isDrawing.current = false;
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
        };
      }

      default:
        break;
    }
  }, [isDrawing, currentShape, strokeColor, strokeWidth, strokeStyle]);

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
