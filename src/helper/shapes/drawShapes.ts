import {
  IBeginPathPencil,
  IDrawPathPencil,
  IShapesArgs,
  IWriteText,
} from "../interface/interface";

export const drawRectangle = ({
  coordinate,
  canvas,
  strokeColor,
  strokeStyle,
  currentShapeFillColor,
  strokeWidth,
}: IShapesArgs) => {
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

export const drawCircle = ({
  coordinate,
  canvas,
  strokeColor,
  strokeStyle,
  currentShapeFillColor,
  strokeWidth,
}: IShapesArgs) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
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
};

export const drawArrow = ({
  coordinate,
  canvas,
  strokeColor,
  strokeStyle,
  currentShapeFillColor,
  strokeWidth,
}: IShapesArgs) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
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
  const arrowSize = strokeWidth < 10 ? strokeWidth + 15 : strokeWidth + 30;

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

export const drawLine = ({
  coordinate,
  canvas,
  strokeColor,
  strokeStyle,
  currentShapeFillColor,
  strokeWidth,
}: IShapesArgs) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
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
};

export const writeText = ({
  text,
  offsetX,
  offsetY,
  fontType,
  strokeColor,
  strokeWidth,
  canvas,
}: IWriteText) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.font = `${strokeWidth}px ${fontType}`;
  context.fillStyle = strokeColor;
  context.fillText(text, offsetX, offsetY);
};

export const beginPathFunc = ({ canvas, x, y }: IBeginPathPencil) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.beginPath();
  context.moveTo(x, y);
};

export const drawPathFunc = ({
  strokeColor,
  strokeStyle,
  strokeWidth,
  x,
  y,
  canvas,
}: IDrawPathPencil) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.strokeStyle = strokeColor;
  context.lineWidth = strokeWidth;
  strokeStyle.name === "normal"
    ? context.setLineDash([])
    : context.setLineDash([strokeStyle.value ? strokeStyle.value : 0]);
  context.lineTo(x, y);
  context.stroke();
};
