import { applySketchBookBackgroundColor } from "@/helper/canvas/canvas";
import { useAppSelector } from "@/hooks/redux";
import useHexToRgba from "@/hooks/useHexToRgba";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SketchBoard = () => {
  const {
    sketchBookBackground,
    currentShape,
    strokeColor,
    strokeWidth,
    strokeStyle,
    shapeFillColor,
  } = useAppSelector((state) => state.toolkit);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const currentShapeFillColor = useHexToRgba(shapeFillColor);

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

  // to draw different shapes
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

        const startDrawing = (event: MouseEvent) => {
          isDrawing.current = true;
          coordinate.startCoordinate = { x: event.clientX, y: event.clientY };
        };

        const draw = (event: MouseEvent) => {
          if (!isDrawing.current) return;
          coordinate.endCoordinate = { x: event.clientX, y: event.clientY };
          const { x: startX, y: startY } = coordinate.startCoordinate;
          const { x: endX, y: endY } = coordinate.endCoordinate;

          context.strokeStyle = strokeColor;
          context.fillStyle = currentShapeFillColor;
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

        const stopDrawing = () => {
          isDrawing.current = false;
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

      case "circle": {
        const coordinate = {
          startCoordinate: { x: 0, y: 0 },
          endCoordinate: { x: 0, y: 0 },
        };

        const startDrawing = (event: MouseEvent) => {
          isDrawing.current = true;
          coordinate.startCoordinate = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
          };
        };

        const draw = (event: MouseEvent) => {
          if (!isDrawing.current) return;

          coordinate.endCoordinate = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
          };
        };

        const stopDrawing = () => {
          isDrawing.current = false;
          const { x: startX, y: startY } = coordinate.startCoordinate;
          const { x: endX, y: endY } = coordinate.endCoordinate;
          const radius = Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          );

          context.strokeStyle = strokeColor;
          context.fillStyle = currentShapeFillColor;
          context.lineWidth = strokeWidth;
          context.beginPath();
          context.arc(startX, startY, radius, 0, 2 * Math.PI);
          context.stroke();
          context.fill();
          context.closePath();
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

      case "arrow": {
        const coordinate = {
          startCoordinate: { x: 0, y: 0 },
          endCoordinate: { x: 0, y: 0 },
        };

        const startDrawing = (event: MouseEvent) => {
          isDrawing.current = true;
          coordinate.startCoordinate = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
          };
        };

        const draw = (event: MouseEvent) => {
          if (!isDrawing.current) return;

          coordinate.endCoordinate = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
          };
        };

        const stopDrawing = () => {
          isDrawing.current = false;
          const { x: startX, y: startY } = coordinate.startCoordinate;
          const { x: endX, y: endY } = coordinate.endCoordinate;

          // Draw the arrow
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.lineWidth = strokeWidth;
          context.strokeStyle = strokeColor;
          context.stroke();

          const angle = Math.atan2(endY - startY, endX - startX);
          const arrowSize =
            strokeWidth < 10 ? strokeWidth + 15 : strokeWidth + 30;

          // Calculate positions for both sides of the arrowhead
          const arrowLeftX = endX - arrowSize * Math.cos(angle + Math.PI / 6);
          const arrowLeftY = endY - arrowSize * Math.sin(angle + Math.PI / 6);
          const arrowRightX = endX - arrowSize * Math.cos(angle - Math.PI / 6);
          const arrowRightY = endY - arrowSize * Math.sin(angle - Math.PI / 6);

          // Draw the arrowhead
          context.beginPath();
          context.moveTo(arrowLeftX, arrowLeftY);
          context.lineTo(endX, endY);
          context.lineTo(arrowRightX, arrowRightY);
          context.closePath();
          context.fillStyle = strokeColor;
          context.fill();
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

      default:
        break;
    }
  }, [
    isDrawing,
    currentShape,
    strokeColor,
    strokeWidth,
    strokeStyle,
    shapeFillColor,
    currentShapeFillColor,
  ]);

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
