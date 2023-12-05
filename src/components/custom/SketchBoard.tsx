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
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

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
    if (currentShape !== "pencil") return;

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      const startDrawing = (event: MouseEvent) => {
        setIsDrawing(true);
        if (context) {
          context.beginPath();
          context.moveTo(
            event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop
          );
        }
      };

      const draw = (event: MouseEvent) => {
        if (!isDrawing) return;
        if (context) {
          context.strokeStyle = strokeColor;
          context.lineWidth = strokeWidth;
          strokeStyle.name === "normal"
            ? context.setLineDash([])
            : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
          context.lineTo(
            event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop
          );
          context.stroke();
        }
      };

      const stopDrawing = () => {
        setIsDrawing(false);
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
  }, [isDrawing, currentShape, strokeColor, strokeWidth, strokeStyle]);

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
