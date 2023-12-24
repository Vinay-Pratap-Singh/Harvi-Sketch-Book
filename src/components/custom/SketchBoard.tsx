import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useHexToRgba from "@/hooks/useHexToRgba";
import {
  addCanvasImageData,
  applySketchBookBackgroundColor,
  setCanvas,
} from "@/redux/canvasSlice";
import { setCurrentShape } from "@/redux/toolkitSlice";
import React, { useEffect, useRef } from "react";
import {
  beginPathFunc,
  drawArrow,
  drawCircle,
  drawLine,
  drawPathFunc,
  drawRectangle,
  writeText,
} from "@/helper/shapes/drawShapes";
import {
  IBeginPathPencil,
  ICoordinate,
  IDrawPathPencil,
  IShapesArgs,
  IWriteText,
} from "@/helper/interface/interface";
import socket from "@/helper/socket/socket";

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
  const { canvas, allCanvasImageData, currentCanvasIndex } = useAppSelector(
    (state) => state.canvas
  );
  const { roomId } = useAppSelector((state) => state.user);

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
            beginPathFunc({
              canvas,
              x: event.clientX - canvas.offsetLeft,
              y: event.clientY - canvas.offsetTop,
            });

            if (socket && roomId) {
              socket.emit("sendBeginPath", {
                roomId,
                x: event.clientX - canvas.offsetLeft,
                y: event.clientY - canvas.offsetTop,
              });
            }
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
            drawPathFunc({
              canvas,
              strokeColor,
              strokeStyle,
              strokeWidth,
              x: event.clientX - canvas.offsetLeft,
              y: event.clientY - canvas.offsetTop,
            });

            if (socket && roomId) {
              socket.emit("sendDrawPath", {
                roomId,
                strokeColor,
                strokeWidth,
                strokeStyle,
                x: event.clientX - canvas.offsetLeft,
                y: event.clientY - canvas.offsetTop,
              });
            }
          }
        };

        const stopDrawing = () => {
          isDrawing.current = false;
          if (context) {
            context.closePath();
            if (socket && roomId) {
              socket.emit("sendClosePath", { roomId });
            }

            // storing canvas image data
            dispatch(addCanvasImageData());
          }
        };

        canvas.addEventListener("pointerdown", startDrawing);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerup", stopDrawing);

        return () => {
          canvas.removeEventListener("pointerdown", startDrawing);
          canvas.removeEventListener("pointermove", draw);
          canvas.removeEventListener("pointerup", stopDrawing);
        };
      }

      case "square": {
        const coordinate: ICoordinate = {
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

          // draw shape on canvas
          drawRectangle({
            coordinate,
            canvas,
            strokeColor,
            strokeStyle,
            currentShapeFillColor,
            strokeWidth,
          });

          if (roomId && socket) {
            socket.emit("sendRectangleData", {
              coordinate,
              strokeColor,
              strokeStyle,
              currentShapeFillColor,
              strokeWidth,
              roomId,
            });
          }

          // storing canvas image data
          dispatch(addCanvasImageData());
        };

        canvas.addEventListener("pointerdown", startDrawing);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerup", stopDrawing);

        return () => {
          canvas.removeEventListener("pointerdown", startDrawing);
          canvas.removeEventListener("pointermove", draw);
          canvas.removeEventListener("pointerup", stopDrawing);
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

          // draw shape on canvas
          drawCircle({
            coordinate,
            canvas,
            strokeColor,
            strokeStyle,
            currentShapeFillColor,
            strokeWidth,
          });

          if (roomId && socket) {
            socket.emit("sendCircleData", {
              coordinate,
              strokeColor,
              strokeStyle,
              currentShapeFillColor,
              strokeWidth,
              roomId,
            });
          }

          // storing canvas image data
          dispatch(addCanvasImageData());
        };

        canvas.addEventListener("pointerdown", startDrawing);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerup", stopDrawing);

        return () => {
          canvas.removeEventListener("pointerdown", startDrawing);
          canvas.removeEventListener("pointermove", draw);
          canvas.removeEventListener("pointerup", stopDrawing);
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

          // draw shape on canvas
          drawArrow({
            coordinate,
            canvas,
            strokeColor,
            strokeStyle,
            currentShapeFillColor,
            strokeWidth,
          });

          if (roomId && socket) {
            socket.emit("sendArrowData", {
              coordinate,
              strokeColor,
              strokeStyle,
              currentShapeFillColor,
              strokeWidth,
              roomId,
            });
          }

          // storing canvas image data
          dispatch(addCanvasImageData());
        };

        canvas.addEventListener("pointerdown", startDrawing);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerup", stopDrawing);

        return () => {
          canvas.removeEventListener("pointerdown", startDrawing);
          canvas.removeEventListener("pointermove", draw);
          canvas.removeEventListener("pointerup", stopDrawing);
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

          // draw shape on canvas
          drawLine({
            coordinate,
            canvas,
            strokeColor,
            strokeStyle,
            currentShapeFillColor,
            strokeWidth,
          });

          if (roomId && socket) {
            socket.emit("sendLineData", {
              coordinate,
              strokeColor,
              strokeStyle,
              currentShapeFillColor,
              strokeWidth,
              roomId,
            });
          }

          // storing canvas image data
          dispatch(addCanvasImageData());
        };

        canvas.addEventListener("pointerdown", startDrawing);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerup", stopDrawing);

        return () => {
          canvas.removeEventListener("pointerdown", startDrawing);
          canvas.removeEventListener("pointermove", draw);
          canvas.removeEventListener("pointerup", stopDrawing);
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

            // Write the entered text on the canvas
            writeText({
              canvas,
              fontType,
              offsetX,
              offsetY,
              strokeColor,
              strokeWidth,
              text,
            });

            if (socket && roomId) {
              socket.emit("sendWriteTextData", {
                fontType,
                offsetX,
                offsetY,
                strokeColor,
                strokeWidth,
                text,
                roomId,
              });
            }

            // changing the current shape to null
            dispatch(setCurrentShape(null));

            // storing canvas image data
            dispatch(addCanvasImageData());
          };

          textInput.addEventListener("blur", handleBlur, { once: true });
        };

        canvas.addEventListener("pointerdown", startWriting, { once: true });

        return () => {
          canvas.removeEventListener("pointerdown", startWriting);
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
            const file = event.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const myImage = document.createElement("img");
                myImage.src = e.target?.result as string;
                myImage.onload = () => {
                  context?.drawImage(myImage, x, y, 200, 200);
                  // storing canvas image data
                  dispatch(addCanvasImageData());

                  // emitting the image data
                  if (socket && roomId) {
                    socket.emit("sendImageData", {
                      url: e.target?.result as string,
                      x,
                      y,
                      roomId,
                    });
                  }
                };
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
          });
          input.click();
        };

        canvas.addEventListener("pointerdown", addImage);

        return () => {
          canvas.removeEventListener("pointerdown", addImage);
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
    allCanvasImageData,
    currentCanvasIndex,
    roomId,
  ]);

  useEffect(() => {
    const handleReact = (data: IShapesArgs) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      drawRectangle(data);
      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleCircle = (data: IShapesArgs) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      drawCircle(data);
      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleArrow = (data: IShapesArgs) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      drawArrow(data);
      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleLine = (data: IShapesArgs) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      drawLine(data);
      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleWriteText = (data: IWriteText) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      writeText(data);
      // changing the current shape to null
      dispatch(setCurrentShape(null));
      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleBeginPath = (data: IBeginPathPencil) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      beginPathFunc(data);
    };

    const handleDrawPath = (data: IDrawPathPencil) => {
      if (canvas) {
        data = { ...data, canvas };
      }
      drawPathFunc(data);
    };

    const handleClosePath = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.closePath();

      // storing canvas image data
      dispatch(addCanvasImageData());
    };

    const handleImageData = ({
      url,
      x,
      y,
    }: {
      url: string;
      x: number;
      y: number;
    }) => {
      const myImage = document.createElement("img");
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      myImage.src = url;
      myImage.onload = () => {
        context?.drawImage(myImage, x, y, 200, 200);
        // storing canvas image data
        dispatch(addCanvasImageData());
      };
    };

    socket.on("receiveRectangleData", handleReact);
    socket.on("receiveCircleData", handleCircle);
    socket.on("receiveArrowData", handleArrow);
    socket.on("receiveLineData", handleLine);
    socket.on("receiveWriteTextData", handleWriteText);
    socket.on("receiveBeginPath", handleBeginPath);
    socket.on("receiveDrawPath", handleDrawPath);
    socket.on("receiveClosePath", handleClosePath);
    socket.on("receiveImageData", handleImageData);

    return () => {
      socket.off("receiveRectangleData", handleReact);
      socket.off("receiveCircleData", handleCircle);
      socket.off("receiveArrowData", handleArrow);
      socket.off("receiveLineData", handleLine);
      socket.off("receiveWriteTextData", handleWriteText);
      socket.off("receiveBeginPath", handleBeginPath);
      socket.off("receiveDrawPath", handleDrawPath);
      socket.off("receiveClosePath", handleClosePath);
      socket.off("receiveImageData", handleImageData);
    };
  }, [dispatch, canvas]);

  return <canvas ref={canvasRef}></canvas>;
};

export default SketchBoard;
