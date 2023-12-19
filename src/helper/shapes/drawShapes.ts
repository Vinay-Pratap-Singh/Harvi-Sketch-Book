import { IRectangleArgs } from "../interface/interface";
import socket from "../socket/socket";

export const drawRectangle = ({
  coordinate,
  canvas,
  strokeColor,
  strokeStyle,
  currentShapeFillColor,
  strokeWidth,
}: IRectangleArgs) => {
  console.log("inside rect shape");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
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
};
