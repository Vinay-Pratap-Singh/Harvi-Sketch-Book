import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useHexToRgba from "@/hooks/useHexToRgba";
import {
  addCanvasImageData,
  applySketchBookBackgroundColor,
  setCanvas,
} from "@/redux/canvasSlice";
import { setCurrentShape } from "@/redux/toolkitSlice";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SketchBoard = () => {
  const dispatch = useAppDispatch();
  const {
    sketchBookBackground,
    currentShape,
    strokeColor,
    strokeWidth,
    strokeStyle,
    shapeFillColor,
    fontType,
  } = useAppSelector((state) => state.toolkit);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // for drawing shapes on canvas
  const isDrawing = useRef(false);
  // for handling the text writting on canvas
  const isTyping = useRef(false);
  const currentShapeFillColor = useHexToRgba(shapeFillColor);

  // setting default width and height for canvas
  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      myCanvas.width = window.innerWidth;
      myCanvas.height = window.innerHeight;
      dispatch(setCanvas(myCanvas));
    }
  }, [dispatch]);

  // setting the canvas background color
  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      dispatch(applySketchBookBackgroundColor(sketchBookBackground));
    }
  }, [sketchBookBackground, dispatch]);

  // to draw different shapes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (!currentShape) return;

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

            // storing canvas image data
            dispatch(addCanvasImageData());
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
        };

        const stopDrawing = () => {
          isDrawing.current = false;

          const { x: startX, y: startY } = coordinate.startCoordinate;
          const { x: endX, y: endY } = coordinate.endCoordinate;
          context.strokeStyle = strokeColor;
          strokeStyle.name === "normal"
            ? context.setLineDash([])
            : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
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

          // storing canvas image data
          dispatch(addCanvasImageData());
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
          strokeStyle.name === "normal"
            ? context.setLineDash([])
            : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
          context.fillStyle = currentShapeFillColor;
          context.lineWidth = strokeWidth;
          context.beginPath();
          context.arc(startX, startY, radius, 0, 2 * Math.PI);
          context.stroke();
          context.fill();
          context.closePath();

          // storing canvas image data
          dispatch(addCanvasImageData());
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
          strokeStyle.name === "normal"
            ? context.setLineDash([])
            : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
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

          // storing canvas image data
          dispatch(addCanvasImageData());
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

      case "line": {
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

          // Draw the line
          context.beginPath();
          strokeStyle.name === "normal"
            ? context.setLineDash([])
            : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.lineWidth = strokeWidth;
          context.strokeStyle = strokeColor;
          context.stroke();

          // storing canvas image data
          dispatch(addCanvasImageData());
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

      case "text": {
        const startWriting = (event: MouseEvent) => {
          const offsetX = event.clientX - canvas.offsetLeft;
          const offsetY = event.clientY - canvas.offsetTop;
          isTyping.current = true;

          // Create a contentEditable div dynamically
          const textInput = document.createElement("div");
          textInput.contentEditable = "true";
          textInput.style.position = "absolute";
          textInput.style.left = `${offsetX}px`;
          textInput.style.top = `${offsetY}px`;
          textInput.style.border = "1px solid black";
          textInput.style.padding = "4px";

          // Append the div to the body
          document.body.appendChild(textInput);

          // Set focus on the contentEditable div
          requestAnimationFrame(() => {
            textInput.focus();
          });

          // Handle blur event to capture text input
          const handleBlur = () => {
            isTyping.current = false;
            const text = textInput.innerText;
            // Remove the contentEditable div from the body
            document.body.removeChild(textInput);

            // Draw the entered text on the canvas
            context.font = `${strokeWidth}px ${fontType}`;
            context.fillStyle = strokeColor;
            context.fillText(text, offsetX, offsetY);

            // changing the current shape to null
            dispatch(setCurrentShape(null));

            // storing canvas image data
            dispatch(addCanvasImageData());
          };

          textInput.addEventListener("blur", handleBlur, { once: true });
        };

        canvas.addEventListener("mousedown", startWriting, { once: true });

        return () => {
          canvas.removeEventListener("mousedown", startWriting);
        };
      }

      case "image": {
        const addImage = (event: MouseEvent) => {
          const handleImageUpload = (
            event: React.ChangeEvent<HTMLInputElement>,
            x: number,
            y: number
          ) => {
            if (!event.target) return;
            const img = new Image();
            const file = event.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                img.onload = () => {
                  context?.drawImage(img, x, y, 200, 200);
                };
                img.src = e.target?.result as string;
              };
              reader.readAsDataURL(file);
            }
          };

          const offsetX = event.clientX - canvas.offsetLeft;
          const offsetY = event.clientY - canvas.offsetTop;
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.addEventListener("change", (event) => {
            handleImageUpload(
              event as unknown as React.ChangeEvent<HTMLInputElement>,
              offsetX,
              offsetY
            );
            // storing canvas image data
            dispatch(addCanvasImageData());
          });
          input.click();
        };

        canvas.addEventListener("mousedown", addImage);

        return () => {
          canvas.removeEventListener("mousedown", addImage);
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
    dispatch,
    fontType,
  ]);

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
