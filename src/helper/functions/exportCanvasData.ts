const exportCanvasData = (
  canvas: HTMLCanvasElement | null,
  fileName: string,
  fileType: string
) => {
  if (!canvas) return;

  // Get the data URL of the canvas
  const dataURL = canvas.toDataURL(fileType);

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = fileName;

  // Append the link to the body and trigger a click to start the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportCanvasData;
