import React, { useEffect, useRef } from "react";

const SketchBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      myCanvas.width = window.innerWidth;
      myCanvas.height = window.innerHeight;
    }
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
