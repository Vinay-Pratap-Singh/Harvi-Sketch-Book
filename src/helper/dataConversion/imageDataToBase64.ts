// function to convert image data to base 64
export function imageDataToBase64(data: ImageData[]) {
  const updatedData: string[] = [];
  data.forEach((imageData) => {
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(imageData, 0, 0);
    updatedData.push(canvas.toDataURL());
  });

  return updatedData;
}

// function to convert base 64 to image data
export function base64ToImageData(data: string[]) {
  const updatedData: ImageData[] = [];
  data.forEach((urlData) => {
    const img = new Image();
    img.src = urlData;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    updatedData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  });
  return updatedData;
}
