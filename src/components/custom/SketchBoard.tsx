import { applySketchBookBackgroundColor } from "@/helper/canvas/canvas";
import { useAppSelector } from "@/hooks/redux";
import React, { useEffect, useRef } from "react";

const SketchBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { sketchBookBackground } = useAppSelector((state) => state.toolkit);

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

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
