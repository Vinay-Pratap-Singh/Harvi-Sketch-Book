// function to change background color of canvas
export const applySketchBookBackgroundColor = (
  canvas: HTMLCanvasElement,
  color: string
) => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

// function to draw shapes
// export const drawShapes = (canvas:HTMLCanvasElement,shape:string) => {
//     const context = canvas.getContext("2d");

//     const startDrawing = (event) => {
//       setIsDrawing(true);
//       context.beginPath();
//       context.moveTo(
//         event.clientX - canvas.offsetLeft,
//         event.clientY - canvas.offsetTop
//       );
//     };

//     const draw = (event) => {
//       if (!isDrawing) return;

//       context.lineTo(
//         event.clientX - canvas.offsetLeft,
//         event.clientY - canvas.offsetTop
//       );
//       context.stroke();
//     };

//     const stopDrawing = () => {
//       setIsDrawing(false);
//       context.closePath();
//     };

//     canvas.addEventListener("mousedown", startDrawing);
//     canvas.addEventListener("mousemove", draw);
//     canvas.addEventListener("mouseup", stopDrawing);

//     return () => {
//       canvas.removeEventListener("mousedown", startDrawing);
//       canvas.removeEventListener("mousemove", draw);
//       canvas.removeEventListener("mouseup", stopDrawing);
//     };
// }
